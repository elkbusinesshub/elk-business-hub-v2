import type { Metadata } from 'next';
import Image from 'next/image';
import LoginForm from './LoginForm';

export const metadata: Metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="flex justify-center mb-8">
          <Image
            src="/brand/elk-business-hub-logo.png"
            alt="ELK Business Hub"
            width={180}
            height={72}
            priority
          />
        </div>
        <div className="bg-white rounded-[14px] border border-sa-line p-7 shadow-soft">
          <h1 className="text-[1.4rem] font-bold">Super admin</h1>
          <p className="text-sa-muted text-[0.92rem] mt-1 mb-6">
            Sign in with your registered phone number.
          </p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
