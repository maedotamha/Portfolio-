import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = contactSchema.parse(body);

        // In a real application, you'd use a service like Resend or Nodemailer
        // Log the message for now as a fallback
        console.log("Contact Form Submission Received:", validatedData);

        return NextResponse.json(
            { success: true, message: "Your message has been sent successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}
