import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactFormSchema.parse(body);
    
    // TODO: Implement email sending with Resend or Nodemailer
    // For now, just log the data and return success
    console.log('Contact form submission:', validatedData);
    
    // Simulate email sending
    // In production, you would use:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'portfolio@yourdomain.com',
    //   to: 'alemu.maedot@gmail.com',
    //   subject: `Portfolio Contact: ${validatedData.subject}`,
    //   html: `<p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p><p>${validatedData.message}</p>`,
    // });
    
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
