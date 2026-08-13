import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import {
    useDispatch
} from "react-redux";
import {
    toast
} from "react-hot-toast";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
    loginUser
} from "../services/auth.service";

import {
    ROLES
} from "../../../constants/constants";

import {
    setLoading,
    setUser
} from "../../../redux/slices/authSlice";

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [
        formData,
        setFormData
    ] = useState({
        email: "",
        password: ""
    });

    const [
        loading,
        setLoadingState
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

            setLoadingState(true);

            dispatch(
                setLoading(true)
            );

            const response =
                await loginUser(formData);

            dispatch(
                setUser(response.data)
            );

            toast.success(
                "Login successful"
            );

            if (
                response.data.role ===
                ROLES.ADMIN
            ) {
                navigate("/admin");
            }
            else {
                navigate("/");
            }

        }
        catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );

        }
        finally {

            setLoadingState(false);

            dispatch(
                setLoading(false)
            );

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
            overflow-hidden
        ">

            <div>

                {/* Brand Accent */}

                <div className="
                    mb-8
                    h-1
                    w-14
                    rounded-full
                    bg-[var(--primary)]
                " />

                {/* Header */}

                <div>

                    <p className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-[var(--primary)]
                    ">
                        GDS Electronics
                    </p>

                    <h1 className="
                        mt-3
                        text-3xl
                        sm:text-4xl
                        font-bold
                        leading-tight
                        text-[var(--text)]
                    ">
                        Welcome back.
                    </h1>

                    <p className="
                        mt-3
                        max-w-md
                        text-sm
                        leading-6
                        text-[var(--text-light)]
                    ">
                        Sign in to manage your account,
                        orders and shopping experience.
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        mt-9
                        space-y-5
                    "
                >

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
                        autoComplete="current-password"
                        required
                    />

                    <div className="
                        flex
                        justify-end
                        -mt-2
                    ">

                        <Link
                            to="/forgot-password"
                            className="
                                text-sm
                                font-semibold
                                text-[var(--primary)]
                                hover:text-[var(--primary-dark)]
                                transition-colors
                            "
                        >
                            Forgot password?
                        </Link>

                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            mt-2
                        "
                    >
                        {loading
                            ? "Signing In..."
                            : "Sign In"
                        }
                    </Button>

                </form>

            </div>

            {/* Footer */}

            <div className="
                mt-10
                pt-6
                border-t
                border-[var(--border)]
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

                <p className="
                    text-sm
                    text-[var(--text-light)]
                ">
                    New to GDS Electronics?
                </p>

                <Link
                    to="/register"
                    className="
                        text-sm
                        font-bold
                        text-[var(--primary)]
                        hover:text-[var(--primary-dark)]
                    "
                >
                    Create an account →
                </Link>

            </div>

        </Card>

    );

};

export default LoginPage;