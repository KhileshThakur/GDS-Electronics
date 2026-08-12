import { useState } from "react";

import {
    Link,
    useNavigate,
    useSearchParams
} from "react-router-dom";

import {
    toast
} from "react-hot-toast";

import Container from "../../../components/ui/Container";
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

    const handleSubmit =
        async (event) => {

            event.preventDefault();

            if (loading) {
                return;
            }

            if (!email) {
                toast.error(
                    "Email is missing"
                );
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

    const handleResend =
        async () => {

            if (resendLoading) {
                return;
            }

            if (!email) {
                toast.error(
                    "Email is missing"
                );
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

        <Container>

            <div className="
                max-w-lg
                mx-auto
                py-10
                sm:py-14
            ">

                <Card>

                    <p className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-[var(--primary)]
                    ">
                        Account Recovery
                    </p>

                    <h1 className="
                        mt-2
                        text-2xl
                        sm:text-3xl
                        font-bold
                    ">
                        Verify OTP
                    </h1>

                    <p className="
                        mt-2
                        text-sm
                        leading-6
                        text-[var(--text-light)]
                    ">
                        Enter the 6-digit OTP sent to
                        <strong className="
                            text-[var(--text)]
                        ">
                            {" "}{email}
                        </strong>.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="
                            mt-7
                            space-y-5
                        "
                    >

                        <Input
                            label="Reset OTP"
                            name="otp"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={
                                event =>
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
                        mt-5
                        text-center
                    ">

                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resendLoading}
                            className="
                                text-sm
                                font-medium
                                text-[var(--primary)]
                            "
                        >
                            {resendLoading
                                ? "Sending..."
                                : "Resend OTP"
                            }
                        </button>

                    </div>

                    <div className="
                        mt-4
                        text-center
                    ">

                        <Link
                            to="/login"
                            className="
                                text-sm
                                font-medium
                                text-[var(--text-light)]
                            "
                        >
                            Back to Login
                        </Link>

                    </div>

                </Card>

            </div>

        </Container>

    );

};

export default VerifyForgotPasswordOtpPage;