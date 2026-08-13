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
    registerUser
} from "../services/auth.service";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [
        formData,
        setFormData
    ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [
        loading,
        setLoading
    ] = useState(false);

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (loading) {
            return;
        }

        try {

            setLoading(true);

            const response =
                await registerUser(formData);

            toast.success(
                response.message ||
                "Verification OTP sent"
            );

            navigate(
                `/verify-email?email=${encodeURIComponent(
                    formData.email
                )}`
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration failed"
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
            justify-between
        ">

            <div>

                {/* Header */}

                <div className="
                    mb-8
                ">

                    <div className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-[var(--primary-soft)]
                        px-3
                        py-1
                        text-xs
                        font-bold
                        text-[var(--primary)]
                    ">
                        New Customer
                    </div>

                    <h1 className="
                        mt-4
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-[var(--text)]
                    ">
                        Create your account
                    </h1>

                    <p className="
                        mt-3
                        text-sm
                        leading-6
                        text-[var(--text-light)]
                    ">
                        Create an account to manage
                        orders, addresses and your
                        shopping experience.
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        space-y-5
                    "
                >

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        gap-4
                    ">

                        <Input
                            label="First Name"
                            name="firstName"
                            value={
                                formData.firstName
                            }
                            onChange={handleChange}
                            autoComplete="given-name"
                            required
                        />

                        <Input
                            label="Last Name"
                            name="lastName"
                            value={
                                formData.lastName
                            }
                            onChange={handleChange}
                            autoComplete="family-name"
                            required
                        />

                    </div>

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
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
                            ? "Creating Account..."
                            : "Create Account"
                        }
                    </Button>

                </form>

            </div>

            {/* Footer */}

            <div className="
                mt-8
                pt-6
                border-t
                border-[var(--border)]
                text-center
            ">

                <p className="
                    text-sm
                    text-[var(--text-light)]
                ">

                    Already have an account?

                    <Link
                        to="/login"
                        className="
                            ml-1.5
                            font-bold
                            text-[var(--primary)]
                            hover:text-[var(--primary-dark)]
                        "
                    >
                        Sign in
                    </Link>

                </p>

            </div>

        </Card>

    );

};

export default RegisterPage;