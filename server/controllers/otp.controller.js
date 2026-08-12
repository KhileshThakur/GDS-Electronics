import Otp from "../models/Otp.js";

import {
    generateOtp
} from "../utils/otp.js";

import {
    sendEmail
} from "../utils/emailSender.js";

import {
    verificationOtpEmail
} from "../templates/email/verificationOtp.js";

import {
    passwordResetOtpEmail
} from "../templates/email/passwordResetOtp.js";


const OTP_EXPIRY_MINUTES = 5;


export const createAndSendOtp = async ({
    email,
    firstName,
    purpose
}) => {

    const normalizedEmail =
        email.toLowerCase().trim();


    /*
    Remove previous OTP
    for the same purpose.
    */

    await Otp.deleteMany({

        email: normalizedEmail,

        purpose

    });


    const otp =
        generateOtp();


    const expiresAt =
        new Date(
            Date.now() +
            OTP_EXPIRY_MINUTES *
            60 *
            1000
        );


    await Otp.create({

        email:
            normalizedEmail,

        otp,

        purpose,

        expiresAt

    });


    let html;


    if (
        purpose === "REGISTRATION"
    ) {

        html =
            verificationOtpEmail({

                firstName,

                otp

            });

    }


    if (
        purpose === "FORGOT_PASSWORD"
    ) {

        html =
            passwordResetOtpEmail({

                firstName,

                otp

            });

    }


    await sendEmail({

        to:
            normalizedEmail,

        subject:
            purpose === "REGISTRATION"
                ? "Verify your GDS Electronics account"
                : "Reset your GDS Electronics password",

        html

    });


    return {
        success: true
    };

};


export const verifyOtp = async ({
    email,
    otp,
    purpose
}) => {

    const normalizedEmail =
        email.toLowerCase().trim();


    const otpRecord =
        await Otp.findOne({

            email:
                normalizedEmail,

            purpose

        });


    if (!otpRecord) {

        return {

            success: false,

            message:
                "OTP expired or not found"

        };

    }


    if (
        otpRecord.expiresAt <
        new Date()
    ) {

        await Otp.deleteOne({

            _id:
                otpRecord._id

        });

        return {

            success: false,

            message:
                "OTP has expired"

        };

    }


    if (
        otpRecord.attempts >= 5
    ) {

        await Otp.deleteOne({

            _id:
                otpRecord._id

        });

        return {

            success: false,

            message:
                "Too many invalid attempts"

        };

    }


    if (
        otpRecord.otp !==
        String(otp).trim()
    ) {

        otpRecord.attempts += 1;

        await otpRecord.save();

        return {

            success: false,

            message:
                "Invalid OTP"

        };

    }


    /*
    Registration OTP is
    consumed immediately.
    */

    if (
        purpose === "REGISTRATION"
    ) {

        await Otp.deleteOne({

            _id:
                otpRecord._id

        });

        return {

            success: true

        };

    }


    /*
    Forgot-password OTP remains
    until password is reset.
    */

    otpRecord.verified = true;

    await otpRecord.save();


    return {

        success: true

    };

};