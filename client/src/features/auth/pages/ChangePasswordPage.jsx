import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    toast
} from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import {
    changePassword
} from "../services/auth.service";


const ChangePasswordPage = () => {

    const navigate =
        useNavigate();


    const [
        formData,
        setFormData
    ] = useState({

        currentPassword: "",
        newPassword: "",
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
                formData.newPassword !==
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
                    await changePassword({

                        currentPassword:
                            formData.currentPassword,

                        newPassword:
                            formData.newPassword

                    });


                toast.success(
                    response.message ||
                    "Password changed successfully"
                );


                navigate("/profile");

            }
            catch (error) {

                toast.error(

                    error.response?.data?.message ||
                    "Failed to change password"

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
                        Security
                    </p>


                    <h1 className="
                        mt-2

                        text-2xl
                        sm:text-3xl

                        font-bold
                    ">
                        Change Password
                    </h1>


                    <p className="
                        mt-2

                        text-sm

                        text-[var(--text-light)]
                    ">
                        Choose a strong password for
                        your account.
                    </p>


                    <form
                        onSubmit={handleSubmit}
                        className="
                            mt-7
                            space-y-5
                        "
                    >

                        <Input
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            value={
                                formData.currentPassword
                            }
                            onChange={
                                handleChange
                            }
                            autoComplete="current-password"
                            required
                        />


                        <Input
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={
                                formData.newPassword
                            }
                            onChange={
                                handleChange
                            }
                            autoComplete="new-password"
                            required
                        />


                        <Input
                            label="Confirm New Password"
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
                                ? "Updating..."
                                : "Update Password"
                            }
                        </Button>

                    </form>


                    <div className="
                        mt-5
                        text-center
                    ">

                        <Link
                            to="/forgot-password"
                            className="
                                text-sm
                                font-medium

                                text-[var(--primary)]
                            "
                        >
                            Forgot your password?
                        </Link>

                    </div>

                </Card>

            </div>

        </Container>

    );

};


export default ChangePasswordPage;