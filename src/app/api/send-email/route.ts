import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { getAuthPayload } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const payload = await getAuthPayload(request);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (payload.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: only admins can send emails" }, { status: 403 });
  }

  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, html' },
        { status: 400 }
      );
    }

    const result = await sendEmail(to, subject, html);

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
