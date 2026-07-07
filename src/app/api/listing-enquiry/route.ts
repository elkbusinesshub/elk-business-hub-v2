import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const name     = form.get('name') as string;
  const rawPhone = form.get('phone') as string;
  const category = form.get('category') as string;
  const location = form.get('location') as string;
  const isBusiness = form.get('isBusiness') === 'true';
  const businessTitle = form.get('businessTitle') as string | null;
  const businessDescription = form.get('businessDescription') as string | null;
  const images = form.getAll('images').filter((f): f is File => f instanceof File);

  const phone = `+91 ${rawPhone}`;

  if (!name || !rawPhone || !category || !location) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  if (isBusiness && (!businessTitle || !businessDescription)) {
    return NextResponse.json({ error: 'Business title and description are required.' }, { status: 400 });
  }

  const imageAttachments = await Promise.all(
    images.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    }))
  );

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
    subject: `New Listing Enquiry — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
        <div style="background:#1BBFBF;padding:24px 28px;">
          <h2 style="color:#fff;margin:0;font-size:1.2rem;">New Listing Enquiry</h2>
          <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:0.85rem;">Submitted via ELK Business Hub</p>
        </div>
        <div style="padding:28px;background:#fff;">
          <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <tr><td style="padding:8px 0;color:#888;width:110px;">Name</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${phone}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Looking For</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${category}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Location</td><td style="padding:8px 0;font-weight:600;color:#1A1A1A;">${location}</td></tr>
            ${isBusiness ? `
            <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Business</td><td style="padding:8px 0;font-weight:600;color:#1BBFBF;">${businessTitle}</td></tr>
            <tr><td style="padding:8px 0;color:#888;vertical-align:top;">Description</td><td style="padding:8px 0;color:#1A1A1A;line-height:1.6;">${businessDescription}</td></tr>
            ` : ''}
          </table>
        </div>
        <div style="padding:16px 28px;background:#f9f9f9;font-size:0.75rem;color:#aaa;">
          ${imageAttachments.length ? `${imageAttachments.length} image(s) attached · ` : ''}ELK Business Hub · elkbusinesshub.com
        </div>
      </div>
    `,
    attachments: imageAttachments,
  });

  return NextResponse.json({ success: true });
}
