import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validation';
import { portfolioData } from '@/data/portfolio';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    if (!process.env.RESEND_API_KEY) {
      console.error('Contact form submission received but RESEND_API_KEY is not set:', validatedData);
      return NextResponse.json(
        { success: false, error: 'Email delivery is not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: portfolioData.personal.email,
      replyTo: validatedData.email,
      subject: `Portfolio Contact: ${validatedData.subject}`,
      html: `<p><strong>From:</strong> ${escapeHtml(validatedData.name)} (${escapeHtml(validatedData.email)})</p><p>${escapeHtml(validatedData.message).replace(/\n/g, '<br>')}</p>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send message' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
