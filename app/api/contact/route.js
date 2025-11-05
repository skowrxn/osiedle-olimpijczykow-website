import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        // Walidacja danych
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Brak wymaganych pól" },
                { status: 400 }
            );
        }

        // Walidacja email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Nieprawidłowy adres email" },
                { status: 400 }
            );
        }

        // Adres email odbiorcy (z .env)
        const recipientEmail = process.env.CONTACT_EMAIL_RECIPIENT;

        if (!recipientEmail) {
            console.error("CONTACT_EMAIL_RECIPIENT not set in environment");
            return NextResponse.json(
                { error: "Konfiguracja serwera jest nieprawidłowa" },
                { status: 500 }
            );
        }

        // Wysyłanie emaila przez Resend
        const data = await resend.emails.send({
            from: "Osiedle Olimpijczyków <onboarding@resend.dev>", // Domyślny adres Resend (zmień po weryfikacji domeny)
            to: recipientEmail,
            replyTo: email, // Umożliwia odpowiedź bezpośrednio do osoby wypełniającej formularz
            subject: `Nowa wiadomość z formularza kontaktowego - ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f8f9fa;
                        }
                        .header {
                            background-color: #232323;
                            color: white;
                            padding: 20px;
                            text-align: center;
                        }
                        .content {
                            background-color: white;
                            padding: 30px;
                            margin-top: 20px;
                            border-radius: 5px;
                        }
                        .field {
                            margin-bottom: 20px;
                        }
                        .field-label {
                            font-weight: bold;
                            color: #232323;
                            margin-bottom: 5px;
                        }
                        .field-value {
                            color: #555;
                        }
                        .message-box {
                            background-color: #f8f9fa;
                            padding: 15px;
                            border-left: 4px solid #232323;
                            margin-top: 10px;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            color: #666;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Nowa wiadomość z formularza kontaktowego</h2>
                            <p>Osiedle Olimpijczyków</p>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="field-label">Imię:</div>
                                <div class="field-value">${name}</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Email:</div>
                                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                            </div>
                            ${
                                phone
                                    ? `
                            <div class="field">
                                <div class="field-label">Telefon:</div>
                                <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
                            </div>
                            `
                                    : ""
                            }
                            <div class="field">
                                <div class="field-label">Wiadomość:</div>
                                <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Ta wiadomość została wysłana z formularza kontaktowego na stronie Osiedle Olimpijczyków</p>
                            <p>Możesz odpowiedzieć bezpośrednio na ten email, aby skontaktować się z osobą wypełniającą formularz</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        console.log("Email sent successfully:", data);

        return NextResponse.json(
            { success: true, message: "Email został wysłany pomyślnie" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);

        return NextResponse.json(
            {
                error: "Wystąpił błąd podczas wysyłania wiadomości",
                details: error.message,
            },
            { status: 500 }
        );
    }
}
