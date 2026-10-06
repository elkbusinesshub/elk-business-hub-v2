'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { request } from '@/lib/super-admin/client';

const input =
  'w-full rounded-[10px] border border-sa-line bg-white px-4 py-3 text-[0.95rem] outline-none focus:border-sa-green focus:ring-2 focus:ring-sa-green/15';
const primary =
  'w-full rounded-[10px] bg-sa-green px-4 py-3 font-bold text-white transition-colors hover:bg-sa-green-dark disabled:opacity-60 disabled:cursor-not-allowed';

export default function LoginForm() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [digits, setDigits] = useState('');
  const [otp, setOtp] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);

  const phone = `+91${digits}`;

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  async function sendOtp() {
    setBusy(true);
    setError(null);
    try {
      const { data } = await request<{ resendInSeconds: number }>('auth/otp', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      });
      setStep('otp');
      setOtp('');
      setResendIn(data.resendInSeconds ?? 30);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function onPhone(e: FormEvent) {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }
    await sendOtp();
  }

  async function onOtp(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await request('auth/verify', {
        method: 'POST',
        body: JSON.stringify({ phone, otp }),
      });
      window.location.assign('/super-admin/approvals');
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  if (step === 'phone') {
    return (
      <form onSubmit={onPhone} noValidate>
        <label htmlFor="phone" className="block text-[0.85rem] font-bold mb-2">
          Phone number
        </label>
        <div className="flex gap-2">
          <span className="flex items-center rounded-[10px] border border-sa-line bg-sa-bg px-3 text-[0.95rem] text-sa-muted">
            +91
          </span>
          <input
            id="phone"
            className={input}
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="98765 43210"
            maxLength={10}
            value={digits}
            onChange={(e) => setDigits(e.target.value.replace(/\D/g, ''))}
            autoFocus
          />
        </div>
        {error && <p className="mt-3 text-[0.88rem] text-sa-red">{error}</p>}
        <button type="submit" className={`${primary} mt-5`} disabled={busy}>
          {busy ? 'Sending…' : 'Send OTP'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onOtp} noValidate>
      <p className="text-[0.9rem] text-sa-muted mb-4">
        Enter the code sent to{' '}
        <span className="font-bold text-ink">+91 {digits}</span>{' '}
        <button
          type="button"
          className="text-sa-green font-bold underline-offset-2 hover:underline"
          onClick={() => {
            setStep('phone');
            setError(null);
          }}
        >
          Change
        </button>
      </p>
      <label htmlFor="otp" className="block text-[0.85rem] font-bold mb-2">
        One-time passcode
      </label>
      <input
        id="otp"
        className={`${input} tracking-[0.4em] text-center text-[1.1rem]`}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
        autoFocus
      />
      {error && <p className="mt-3 text-[0.88rem] text-sa-red">{error}</p>}
      <button
        type="submit"
        className={`${primary} mt-5`}
        disabled={busy || otp.length < 4}
      >
        {busy ? 'Verifying…' : 'Verify and sign in'}
      </button>
      <p className="mt-4 text-center text-[0.88rem] text-sa-muted">
        {resendIn > 0 ? (
          <>Resend code in {resendIn}s</>
        ) : (
          <button
            type="button"
            className="text-sa-green font-bold hover:underline underline-offset-2"
            onClick={sendOtp}
            disabled={busy}
          >
            Resend code
          </button>
        )}
      </p>
    </form>
  );
}
