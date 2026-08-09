import { useState } from "react";
import {
    Link
} from "react-router-dom";
import {
    toast
} from "react-hot-toast";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import {
    forgotPassword
} from "../services/auth.service";
const ForgotPasswordPage = () => {
    const [
        email,
        setEmail
    ] = useState("");
    const [
        loading,
        setLoading
    ] = useState(false);
    const [
        submitted,
        setSubmitted
    ] = useState(false);
    const handleSubmit =
        async (event) => {
            event.preventDefault();
            try {
                setLoading(true);
                const response =
                    await forgotPassword(
                        email
                    );
                toast.success(
                    response.message ||
                    "Check your email"
                );
                setSubmitted(true);
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
                    {submitted ? (
                        <div className="
                            mt-5
                            space-y-4
                        ">
                            <p className="
                                text-sm
                                leading-6
                                text-[var(--text-light)]
                            ">
                                If an account exists for
                                <strong className="
                                    text-[var(--text)]
                                ">
                                    {" "}{email}
                                </strong>,
                                we've sent a password reset
                                link.
                            </p>
                            <Link
                                to="/login"
                                className="
                                    inline-flex
                                    text-sm
                                    font-semibold
                                    text-[var(--primary)]
                                "
                            >
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="
                                mt-6
                                space-y-5
                            "
                        >
                            <p className="
                                text-sm
                                leading-6
                                text-[var(--text-light)]
                            ">
                                Enter your email and we'll
                                send you a secure link to
                                reset your password.
                            </p>
                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onChange={
                                    event =>
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
                                    : "Send Reset Link"
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
                    )}
                </Card>
            </div>
        </Container>
    );
};
export default ForgotPasswordPage;