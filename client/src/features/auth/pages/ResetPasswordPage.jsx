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
    resetPassword
} from "../services/auth.service";

const ResetPasswordPage = () => {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const email =
        params.get("email");

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

    const handleChange = (event) => {

        setFormData(previous => ({
            ...previous,
            [event.target.name]:
                event.target.value
        }));

    };

    const handleSubmit = async (event) => {

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
                await resetPassword({
                    email,
                    password:
                        formData.password
                });

            toast.success(
                response.message ||
                "Password reset successfully"
            );

            navigate("/login");

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to reset password"
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

                <div className="
                    mb-8
                ">

                    <div className="
                        inline-flex
                        rounded-lg
                        bg-[var(--secondary)]
                        px-3
                        py-1
                        text-xs
                        font-bold
                        uppercase
                        tracking-wide
                        text-[var(--sidebar)]
                    ">
                        Security
                    </div>

                    <h1 className="
                        mt-4
                        text-3xl
                        sm:text-4xl
                        font-bold
                    ">
                        Create a new password
                    </h1>

                    <p className="
                        mt-3
                        text-sm
                        leading-6
                        text-[var(--text-light)]
                    ">
                        Choose a strong password to
                        protect your GDS Electronics
                        account.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            mt-2
                        "
                    >
                        {loading
                            ? "Updating Password..."
                            : "Set New Password"
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

export default ResetPasswordPage;