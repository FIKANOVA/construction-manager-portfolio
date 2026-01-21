import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, serviceType, message } = await req.json();

        if (!name || !email || !serviceType || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <contact@bruce.fikanova.co.ke>',
            to: ['cmbruce1015@gmail.com'],
            subject: `New Portfolio Inquiry from ${name}`,
            replyTo: email,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #0d2137; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">New Contact Form Submission</h2>
                    <div style="margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Service Type:</strong> ${serviceType}</p>
                    </div>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #666; text-align: center;">Sent from Bruce Odhiambo's Construction Manager Portfolio</p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            // Handle common Resend errors gracefully
            if (error.name === 'validation_error' && error.message.includes('verify a domain')) {
                return NextResponse.json({
                    error: 'Resend restriction: Since you are using a new account without a verified domain, you can only send emails to the address you used to sign up for Resend. Please verify your domain at resend.com or use the account owner email as the recipient.'
                }, { status: 403 });
            }
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('API Error:', err);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
