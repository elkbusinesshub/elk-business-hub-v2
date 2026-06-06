import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, phone: rawPhone, email, location } = await req.json();
  const phone = `+91 ${rawPhone}`;

  if (!name || !phone || !email || !location) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ELK Business Hub" <${process.env.MAIL_USER}>`,
    to: 'elkcompanyin@gmail.com',
    subject: `New Advertising Enquiry — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
        <div style="background:#1BBFBF;padding:24px 28px;">
          <h2 style="color:#fff;margin:0;font-size:1.2rem;">New Advertising Enquiry</h2>
          <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:0.85rem;">Submitted via ELK Business Hub</p>
        </div>
        <div style="padding:28px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <tr><td style="padding:8px 0;color:#888;width:110px;">Name</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${phone}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Location</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${location}</td></tr>
          </table>
        </div>
        <div style="padding:16px 28px;background:#f9f9f9;font-size:0.75rem;color:#aaa;">ELK Business Hub · elkbusinesshub.com</div>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
