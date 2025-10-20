import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Mailjet from 'node-mailjet';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Mailjet client
const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_API_SECRET
});

// Email configuration
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@alderautomations.com';
const EMAIL_TO = process.env.EMAIL_TO || 'contact@alderautomations.com';
const EMAIL_FROM_NAME = 'Alder Automations Contact Form';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Validates email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Sanitizes input to prevent XSS
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
    try {
        console.log('Received email request:', {
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject
        });

        // Parse request body
        const { name, email, subject, message } = req.body;

        // Validate required fields
        const errors = [];

        if (!name || name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        if (!email || !isValidEmail(email)) {
            errors.push('Please provide a valid email address');
        }

        if (!subject || subject.trim().length < 3) {
            errors.push('Subject must be at least 3 characters long');
        }

        if (!message || message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        if (errors.length > 0) {
            console.log('Validation errors:', errors);
            return res.status(400).json({
                error: 'Validation failed',
                details: errors
            });
        }

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name.trim());
        const sanitizedEmail = sanitizeInput(email.trim());
        const sanitizedSubject = sanitizeInput(subject.trim());
        const sanitizedMessage = sanitizeInput(message.trim());

        // Prepare email HTML content
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
                    .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
                    .field { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #555; }
                    .value { margin-top: 5px; padding: 10px; background: white; border-radius: 3px; }
                    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee; font-size: 12px; color: #777; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2 style="margin: 0;">New Contact Form Submission</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Name:</div>
                            <div class="value">${sanitizedName}</div>
                        </div>
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value">${sanitizedEmail}</div>
                        </div>
                        <div class="field">
                            <div class="label">Subject:</div>
                            <div class="value">${sanitizedSubject}</div>
                        </div>
                        <div class="field">
                            <div class="label">Message:</div>
                            <div class="value">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                        </div>
                        <div class="footer">
                            This email was sent from the contact form on Alder Automations website.
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Prepare plain text content as fallback
        const textContent = `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
This email was sent from the contact form on Alder Automations website.
        `.trim();

        console.log('Sending email via Mailjet...');

        // Send email using Mailjet
        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: EMAIL_FROM,
                            Name: EMAIL_FROM_NAME
                        },
                        To: [
                            {
                                Email: EMAIL_TO,
                                Name: 'Alder Automations'
                            }
                        ],
                        ReplyTo: {
                            Email: sanitizedEmail,
                            Name: sanitizedName
                        },
                        Subject: `Contact Form: ${sanitizedSubject}`,
                        TextPart: textContent,
                        HTMLPart: htmlContent,
                        CustomID: `contact-form-${Date.now()}`
                    }
                ]
            });

        console.log('Mailjet response:', request.body);

        // Check if email was sent successfully
        if (request.body.Messages && request.body.Messages[0] && request.body.Messages[0].Status === 'success') {
            console.log('Main email sent successfully, sending confirmation...');

            // Send confirmation email to the sender
            try {
                const confirmationRequest = await mailjet
                    .post('send', { version: 'v3.1' })
                    .request({
                        Messages: [
                            {
                                From: {
                                    Email: EMAIL_FROM,
                                    Name: 'Alder Automations'
                                },
                                To: [
                                    {
                                        Email: sanitizedEmail,
                                        Name: sanitizedName
                                    }
                                ],
                                Subject: 'Thank you for contacting Alder Automations',
                                TextPart: `
Dear ${sanitizedName},

Thank you for reaching out to Alder Automations. We have received your message and will get back to you as soon as possible.

Your message summary:
Subject: ${sanitizedSubject}
Message: ${sanitizedMessage}

Best regards,
The Alder Automations Team
                                `.trim(),
                                HTMLPart: `
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                        <style>
                                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                            .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 5px; text-align: center; }
                                            .content { margin-top: 20px; }
                                            .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="container">
                                            <div class="header">
                                                <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
                                            </div>
                                            <div class="content">
                                                <p>Dear ${sanitizedName},</p>
                                                <p>Thank you for reaching out to Alder Automations. We have received your message and will get back to you as soon as possible.</p>
                                                <div class="message-box">
                                                    <strong>Your message summary:</strong><br>
                                                    <strong>Subject:</strong> ${sanitizedSubject}<br>
                                                    <strong>Message:</strong> ${sanitizedMessage.replace(/\n/g, '<br>')}
                                                </div>
                                                <p>Best regards,<br>The Alder Automations Team</p>
                                            </div>
                                        </div>
                                    </body>
                                    </html>
                                `
                            }
                        ]
                    });

                console.log('Confirmation email sent');
            } catch (confirmError) {
                console.error('Failed to send confirmation email:', confirmError);
                // Don't fail the request if confirmation email fails
            }

            return res.status(200).json({
                success: true,
                message: 'Your message has been sent successfully!'
            });
        } else {
            throw new Error('Failed to send email - invalid response from Mailjet');
        }

    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', error.response?.data || error.message);

        // Don't expose internal error details to the client
        return res.status(500).json({
            error: 'Failed to send message. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Email API endpoint: http://localhost:${PORT}/api/send-email`);
    console.log('Environment variables loaded:', {
        MAILJET_API_KEY: process.env.MAILJET_API_KEY ? '✓ Set' : '✗ Missing',
        MAILJET_API_SECRET: process.env.MAILJET_API_SECRET ? '✓ Set' : '✗ Missing',
        EMAIL_FROM: process.env.EMAIL_FROM || 'Using default',
        EMAIL_TO: process.env.EMAIL_TO || 'Using default'
    });
});
