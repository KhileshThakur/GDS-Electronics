import { useState } from "react";
import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";
import {
    toast
} from "react-hot-toast";
import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import {
    resetPassword
} from "../services/auth.service";
const ResetPasswordPage = () => {
    const {
        token
    } = useParams();
    const navigate =
        useNavigate();
    const [
        formData,
        setFormData
    ] = useState({
        password: "",
        confirmPassword: ""
    });
    const [
        loading,
        setLoading
    ] = useState(false);
    const handleChange =
        (event) => {
            setFormData(
                previous => ({
                    ...previous,
                    [event.target.name]:
                        event.target.value
                })
            );
        };
    const handleSubmit =
        async (event) => {
            event.preventDefault();
            if (
                formData.password !==
                formData.confirmPassword
            ) {
                toast.error(
                    "Passwords do not match"
                );
                return;
            }
            try {
                setLoading(true);
                const response =
                    await resetPassword(
                        token,
                        formData.password
                    );
                toast.success(
                    response.message ||
                    "Password reset successfully"
                );
                navigate("/login");
            }
            catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Reset link is invalid or expired"
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
                        Create New Password
                    </h1>
                    <p className="
                        mt-2
                        text-sm
                        text-[var(--text-light)]
                    ">
                        Choose a new password for your
                        account.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="
                            mt-7
                            space-y-5
                        "
                    >
                        <Input
                            label="New Password"
                            name="password"
                            type="password"
                            value={
                                formData.password
                            }
                            onChange={
                                handleChange
                            }
                            autoComplete="new-password"
                            required
                        />
                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={
                                formData.confirmPassword
                            }
                            onChange={
                                handleChange
                            }
                            autoComplete="new-password"
                            required
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading
                                ? "Resetting..."
                                : "Reset Password"
                            }
                        </Button>
                    </form>
                    <div className="
                        mt-5
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
                </Card>
            </div>
        </Container>
    );
};
export default ResetPasswordPage;