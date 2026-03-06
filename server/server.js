const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email transporter error:', error.message);
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate fields
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please fill in all fields.'
        });
    }

    try {
        // 1. Send notification email to you
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `📩 New Contact from ${name}`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 24px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 22px;">🚀 New Portfolio Message</h1>
                    </div>
                    <div style="padding: 24px; color: #e2e8f0;">
                        <p style="margin: 0 0 8px;"><strong style="color: #a78bfa;">Name:</strong> ${name}</p>
                        <p style="margin: 0 0 8px;"><strong style="color: #a78bfa;">Email:</strong> <a href="mailto:${email}" style="color: #818cf8;">${email}</a></p>
                        <hr style="border: none; border-top: 1px solid #334155; margin: 16px 0;" />
                        <p style="margin: 0 0 8px;"><strong style="color: #a78bfa;">Message:</strong></p>
                        <p style="margin: 0; color: #cbd5e1; line-height: 1.6;">${message}</p>
                    </div>
                    <div style="padding: 16px 24px; background: #0f0f23; text-align: center;">
                        <p style="margin: 0; color: #64748b; font-size: 12px;">Sent from your portfolio contact form</p>
                    </div>
                </div>
            `,
        });

        // 2. Send auto-reply to the sender
        await transporter.sendMail({
            from: `"Abhi Aryan" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Thanks for reaching out, ${name}! 🙌`,
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 24px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 22px;">Hey ${name}! 👋</h1>
                    </div>
                    <div style="padding: 24px; color: #e2e8f0;">
                        <p style="line-height: 1.6;">Thank you for getting in touch! I've received your message and will get back to you as soon as possible.</p>
                        <p style="line-height: 1.6;">Here's a copy of what you sent:</p>
                        <div style="background: #0f0f23; border-left: 3px solid #7c3aed; padding: 16px; border-radius: 8px; margin: 16px 0;">
                            <p style="margin: 0; color: #cbd5e1; font-style: italic;">"${message}"</p>
                        </div>
                        <p style="line-height: 1.6;">I'll respond within 24 hours. In the meantime, feel free to check out my work!</p>
                        <p style="margin-top: 24px; color: #a78bfa;">Best regards,<br/><strong>Abhi Aryan</strong></p>
                    </div>
                    <div style="padding: 16px 24px; background: #0f0f23; text-align: center;">
                        <a href="https://github.com/abhisingh1977" style="color: #818cf8; text-decoration: none; margin: 0 8px;">GitHub</a>
                        <a href="https://www.linkedin.com/in/abhi-aryan-7176b3327/" style="color: #818cf8; text-decoration: none; margin: 0 8px;">LinkedIn</a>
                    </div>
                </div>
            `,
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('❌ Email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
