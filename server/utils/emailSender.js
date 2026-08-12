import transporter from "../config/email.js";

export const sendEmail = async ({
    to,
    subject,
    html
}) => {

    return transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html
    });

};