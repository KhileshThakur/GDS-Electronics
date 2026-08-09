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
            setLoadingState(true);
            dispatch(
                setLoading(true)
            );
            const response =
                await loginUser(
                    formData
                );
            dispatch(
                setUser(
                    response.data
                )
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
            console.error(
                error
            );
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
                    Welcome Back
                </p>
                <h1 className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                    leading-tight
                    text-[var(--text)]
                ">
                    Sign in to your account
                </h1>
                <p className="
                    mt-2
                    text-sm
                    sm:text-[15px]
                    leading-6
                    text-[var(--text-light)]
                ">
                    Access your account and continue
                    shopping with GDS Electronics.
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
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                />
                {/* =================================
                    Forgot Password
                ================================= */}
                <div className="
                    -mt-2
                    flex
                    justify-end
                ">
                    <Link
                        to="/forgot-password"
                        className="
                            text-sm
                            font-medium
                            text-[var(--primary)]
                            hover:text-[var(--primary-dark)]
                            transition-colors
                            duration-200
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
                    "
                >
                    {loading
                        ? "Signing In..."
                        : "Sign In"
                    }
                </Button>
            </form>
            {/* =================================
                Register Link
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
                    Don't have an account?
                    <Link
                        to="/register"
                        className="
                            ml-1.5
                            font-semibold
                            text-[var(--primary)]
                            hover:text-[var(--primary-dark)]
                            transition-colors
                            duration-200
                        "
                    >
                        Create Account
                    </Link>
                </p>
            </div>
        </Card>
    );
};
export default LoginPage;