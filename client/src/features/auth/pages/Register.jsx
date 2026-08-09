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
    /* =========================================
       Change Handler
    ========================================= */
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
    /* =========================================
       Submit
    ========================================= */
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            const response =
                await registerUser(
                    formData
                );
            toast.success(
                response.message ||
                "Registration successful"
            );
            navigate("/login");
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
        ">
            {/* =================================
                Header
            ================================= */}
            <div className="
                mb-7
            ">
                <p className="
                    mb-2
                    text-xs
                    sm:text-sm
                    font-semibold
                    uppercase
                    tracking-[0.1em]
                    text-[var(--primary)]
                ">
                    Create Account
                </p>
                <h1 className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                    leading-tight
                    text-[var(--text)]
                ">
                    Create your account
                </h1>
                <p className="
                    mt-2
                    text-sm
                    sm:text-[15px]
                    leading-6
                    text-[var(--text-light)]
                ">
                    Join GDS Electronics and start
                    shopping with us.
                </p>
            </div>
            {/* =================================
                Form
            ================================= */}
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
                        onChange={
                            handleChange
                        }
                        autoComplete="given-name"
                        required
                    />
                    <Input
                        label="Last Name"
                        name="lastName"
                        value={
                            formData.lastName
                        }
                        onChange={
                            handleChange
                        }
                        autoComplete="family-name"
                        required
                    />
                </div>
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={
                        formData.email
                    }
                    onChange={
                        handleChange
                    }
                    autoComplete="email"
                    required
                />
                <Input
                    label="Password"
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
                <Button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full
                    "
                >
                    {loading
                        ? "Creating Account..."
                        : "Create Account"
                    }
                </Button>
            </form>
            {/* =================================
                Login Link
            ================================= */}
            <div className="
                mt-6
                pt-5
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
                            font-semibold
                            text-[var(--primary)]
                            hover:text-[var(--primary-dark)]
                            transition-colors
                            duration-200
                        "
                    >
                        Login
                    </Link>
                </p>
            </div>
        </Card>
    );
};
export default RegisterPage;