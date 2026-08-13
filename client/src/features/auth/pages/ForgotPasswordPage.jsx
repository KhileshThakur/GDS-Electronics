import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import {
    toast
} from "react-hot-toast";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
    forgotPassword
} from "../services/auth.service";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();

    const [
        email,
        setEmail
    ] = useState("");

    const [
        loading,
        setLoading
    ] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (loading) {
            return;
        }

        try {

            setLoading(true);

            const response =
                await forgotPassword(email);

            toast.success(
                response.message ||
                "OTP sent to your email"
            );

            navigate(
                `/verify-forgot-password?email=${encodeURIComponent(
                    email
                )}`
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to process request"
            );

        }
        finally {

            setLoading(false);

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
            ">

                {/* Recovery Badge */}

                <div className="
                    mx-auto
                    mb-7
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[var(--primary-soft)]
                    text-[var(--primary)]
                    text-xl
                    font-bold
                ">
                    ?
                </div>

                <div className="
                    text-center
                ">

                    <p className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-[var(--primary)]
                    ">
                        Account Recovery
                    </p>

                    <h1 className="
                        mt-3
                        text-3xl
                        sm:text-4xl
                        font-bold
                    ">
                        Forgot your password?
                    </h1>

                    <p className="
                        mt-3
                        text-sm
                        leading-6
                        text-[var(--text-light)]
                    ">
                        Enter your registered email
                        and we'll send you a secure
                        verification OTP.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="
                        mt-9
                        space-y-5
                    "
                >

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                        autoComplete="email"
                        required
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full"
                    >
                        {loading
                            ? "Sending..."
                            : "Send Verification OTP"
                        }
                    </Button>

                </form>

                <div className="
                    mt-7
                    text-center
                ">

                    <Link
                        to="/login"
                        className="
                            text-sm
                            font-semibold
                            text-[var(--text-light)]
                            hover:text-[var(--primary)]
                        "
                    >
                        ← Back to Login
                    </Link>

                </div>

            </div>

        </Card>

    );

};

export default ForgotPasswordPage;