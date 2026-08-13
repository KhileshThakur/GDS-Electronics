import { useState } from "react";
import {
    Link,
    useNavigate,
    useSearchParams
} from "react-router-dom";
import {
    toast
} from "react-hot-toast";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
    verifyForgotPasswordOtp,
    resendOtp
} from "../services/auth.service";

const VerifyForgotPasswordOtpPage = () => {

    const navigate = useNavigate();

    const [
        searchParams
    ] = useSearchParams();

    const email =
        searchParams.get("email") || "";

    const [
        otp,
        setOtp
    ] = useState("");

    const [
        loading,
        setLoading
    ] = useState(false);

    const [
        resendLoading,
        setResendLoading
    ] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (loading) {
            return;
        }

        if (!email) {
            toast.error("Email is missing");
            return;
        }

        if (
            !/^\d{6}$/.test(
                otp.trim()
            )
        ) {
            toast.error(
                "Enter a valid 6-digit OTP"
            );
            return;
        }

        try {

            setLoading(true);

            const response =
                await verifyForgotPasswordOtp({
                    email,
                    otp: otp.trim()
                });

            toast.success(
                response.message ||
                "OTP verified successfully"
            );

            navigate(
                `/reset-password?email=${encodeURIComponent(
                    email
                )}`
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Invalid or expired OTP"
            );

        }
        finally {

            setLoading(false);

        }

    };

    const handleResend = async () => {

        if (resendLoading) {
            return;
        }

        if (!email) {
            toast.error("Email is missing");
            return;
        }

        try {

            setResendLoading(true);

            const response =
                await resendOtp({
                    email,
                    purpose: "FORGOT_PASSWORD"
                });

            toast.success(
                response.message ||
                "OTP sent successfully"
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to resend OTP"
            );

        }
        finally {

            setResendLoading(false);

        }

    };

    return (

        <Card className="
            w-full
            max-w-xl
            min-h-[560px]
            flex
            flex-col
            justify-center
        ">

            <div className="
                max-w-md
                mx-auto
                w-full
                text-center
            ">

                <div className="
                    mx-auto
                    mb-7
                    h-16
                    w-16
                    rounded-full
                    border-4
                    border-[var(--primary-soft)]
                    flex
                    items-center
                    justify-center
                    text-[var(--primary)]
                    font-bold
                ">
                    OTP
                </div>

                <p className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[var(--primary)]
                ">
                    Password Recovery
                </p>

                <h1 className="
                    mt-3
                    text-3xl
                    sm:text-4xl
                    font-bold
                ">
                    Verify your code
                </h1>

                <p className="
                    mt-3
                    text-sm
                    leading-6
                    text-[var(--text-light)]
                ">
                    Enter the 6-digit OTP sent to
                    <strong className="
                        ml-1
                        text-[var(--text)]
                    ">
                        {email}
                    </strong>
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="
                        mt-9
                        space-y-5
                    "
                >

                    <Input
                        label="6-Digit OTP"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(event) =>
                            setOtp(
                                event.target.value
                                    .replace(/\D/g, "")
                            )
                        }
                        autoComplete="one-time-code"
                        required
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full"
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify OTP"
                        }
                    </Button>

                </form>

                <div className="
                    mt-7
                    flex
                    justify-center
                    gap-2
                    text-sm
                ">

                    <span className="
                        text-[var(--text-light)]
                    ">
                        Didn't receive it?
                    </span>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendLoading}
                        className="
                            font-bold
                            text-[var(--primary)]
                        "
                    >
                        {resendLoading
                            ? "Sending..."
                            : "Resend OTP"
                        }
                    </button>

                </div>

                <div className="mt-5">

                    <Link
                        to="/login"
                        className="
                            text-sm
                            font-medium
                            text-[var(--text-light)]
                            hover:text-[var(--primary)]
                        "
                    >
                        Cancel and return to Login
                    </Link>

                </div>

            </div>

        </Card>

    );

};

export default VerifyForgotPasswordOtpPage;