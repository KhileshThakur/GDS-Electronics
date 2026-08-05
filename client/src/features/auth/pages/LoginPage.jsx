import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { loginUser } from "../services/auth.service";
import { ROLES } from "../../../constants/constants";
import { setLoading, setUser } from "../../../redux/slices/authSlice";

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const response = await loginUser(formData);
            dispatch(setUser(response.data));

            toast.success("Login Successful");
            if (response.data.role === ROLES.ADMIN) {
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
                "Login Failed"
            );
        }

        finally {
            dispatch(setLoading(false));
        }

    };

    return (

        <Card>
            <h2 className="text-2xl font-bold mb-6">
                Login
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    className="w-full"
                >
                    Login
                </Button>
            </form>
        </Card>
    );
};

export default LoginPage;