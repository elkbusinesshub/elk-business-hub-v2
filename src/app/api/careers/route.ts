import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const name     = form.get('name')     as string;
  const email    = form.get('email')    as string;
  const phone    = form.get('phone')    as string;
  const position = form.get('position') as string;
  const message  = form.get('message')  as string;
  const cv       = form.get('cv')       as File | null;

  if (!name || !email || !phone || !position || !cv) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const cvBuffer = Buffer.from(await cv.arrayBuffer());

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  });

  await transporter.sendMail({
    from: `"ELK Careers" <${process.env.MAIL_USER}>`,
    to: 'elkcompanyin@gmail.com',
    subject: `New Job Application — ${position} · ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
        <div style="background:#1BBFBF;padding:24px 28px;">
          <h2 style="color:#fff;margin:0;font-size:1.2rem;">New Job Application</h2>
          <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:0.85rem;">Submitted via ELK Business Hub Careers</p>
        </div>
        <div style="padding:28px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <tr><td style="padding:8px 0;color:#888;width:130px;">Name</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">+91 ${phone}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Position</td><td style="padding:8px 0;font-weight:600;color:#1BBFBF;">${position}</td></tr>
            ${message ? `<tr><td style="padding:8px 0;color:#888;vertical-align:top;">Cover Note</td><td style="padding:8px 0;color:#1A1A1A;line-height:1.6;">${message}</td></tr>` : ''}
          </table>
        </div>
        <div style="padding:16px 28px;background:#f9f9f9;font-size:0.75rem;color:#aaa;">
          CV attached · ELK Business Hub · elkbusinesshub.com
        </div>
      </div>
    `,
    attachments: [{ filename: cv.name, content: cvBuffer }],
  });

  return NextResponse.json({ success: true });
}
