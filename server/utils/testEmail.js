import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../../.env")
});

const { sendEmail } =
    await import("./emailSender.js");

const testEmail = async () => {

    try {

        console.log(
            "SMTP HOST:",
            process.env.SMTP_HOST
        );

        console.log(
            "SMTP PORT:",
            process.env.SMTP_PORT
        );

        console.log(
            "SMTP USER:",
            process.env.SMTP_USER
        );

        const result = await sendEmail({

            to: process.env.SMTP_USER,

            subject:
                "GDS Electronics Email Test",

            html: `
                <div
                    style="
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    "
                >
                    <h1>
                        GDS Electronics
                    </h1>

                    <p>
                        This is a test email.
                    </p>

                    <p>
                        Your Gmail SMTP
                        configuration is working.
                    </p>
                </div>
            `
        });

        console.log(
            "✅ EMAIL SENT:",
            result.messageId
        );

    } catch (error) {

        console.error(
            "❌ EMAIL FAILED:",
            error
        );

    }

};

testEmail();