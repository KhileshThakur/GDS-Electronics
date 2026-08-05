import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { registerUser } from "../services/auth.service";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        firstName: "",

        lastName: "",

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

            const response = await registerUser(formData);

            toast.success(response.message);

            navigate("/login");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <Card>

            <h2 className="text-2xl font-bold mb-6">

                Register

            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />

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
                    onChange={handleChange}q
                />

                <Button
                    type="submit"
                    className="w-full"
                >

                    Register

                </Button>

            </form>

        </Card>

    );

};

export default RegisterPage;