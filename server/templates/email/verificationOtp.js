export const verificationOtpEmail = ({
    firstName,
    otp
}) => {

    return `
        <!DOCTYPE html>

        <html>

        <body
            style="
                margin: 0;
                padding: 0;
                background: #f6f7fb;
                font-family: Arial, sans-serif;
            "
        >

            <div
                style="
                    max-width: 600px;
                    margin: 40px auto;
                    background: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid #e5e7eb;
                "
            >

                <div
                    style="
                        padding: 24px;
                        background: #0a0f44;
                        color: #ffffff;
                    "
                >

                    <h1
                        style="
                            margin: 0;
                            font-size: 24px;
                        "
                    >
                        GDS Electronics
                    </h1>

                </div>

                <div
                    style="
                        padding: 32px 24px;
                    "
                >

                    <h2>
                        Verify your email
                    </h2>

                    <p>
                        Hi ${firstName || "there"},
                    </p>

                    <p>
                        Thank you for creating an
                        account with GDS Electronics.
                        Use the OTP below to verify
                        your email address.
                    </p>

                    <div
                        style="
                            margin: 28px 0;
                            padding: 18px;
                            text-align: center;
                            background: #f6f7fb;
                            border-radius: 10px;
                        "
                    >

                        <strong
                            style="
                                font-size: 32px;
                                letter-spacing: 8px;
                                color: #0a0f44;
                            "
                        >
                            ${otp}
                        </strong>

                    </div>

                    <p>
                        This OTP is valid for
                        <strong>5 minutes</strong>.
                    </p>

                    <p
                        style="
                            color: #6b7280;
                            font-size: 13px;
                        "
                    >
                        If you did not create this
                        account, you can safely ignore
                        this email.
                    </p>

                </div>

            </div>

        </body>

        </html>
    `;

};