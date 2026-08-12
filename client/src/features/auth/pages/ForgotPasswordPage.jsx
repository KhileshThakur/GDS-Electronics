import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { forgotPassword } from "../services/auth.service";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) {
            return;
        }

        try {
            setLoading(true);

            const response = await forgotPassword(email);

            toast.success(
                response.message ||
                "OTP sent to your email"
            );

            navigate(
                `/verify-forgot-password?email=${encodeURIComponent(
                    email
                )}`
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to process request"
            );
        } finally {
            setLoading(false);
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
                        Forgot Password?
                    </h1>

                    <p className="
                        mt-2
                        text-sm
                        leading-6
                        text-[var(--text-light)]
                    ">
                        Enter your email and we'll
                        send you a verification OTP
                        to reset your password.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="
                            mt-6
                            space-y-5
                        "
                    >
                        <Input
                            label="Email"
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
                                : "Send OTP"
                            }
                        </Button>

                        <div className="
                            text-center
                        ">
                            <Link
                                to="/login"
                                className="
                                    text-sm
                                    font-medium
                                    text-[var(--primary)]
                                "
                            >
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </Container>
    );
};

export default ForgotPasswordPage;