import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import { changePassword } from "../../auth/services/auth.service";

const DEFAULT_FORM = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
};

const ChangePasswordModal = ({
    isOpen,
    onClose
}) => {

    const [formData, setFormData] =
        useState(DEFAULT_FORM);

    const [errors, setErrors] =
        useState({});

    const [saving, setSaving] =
        useState(false);


    useEffect(() => {

        if (!isOpen) {
            return;
        }

        setFormData(DEFAULT_FORM);
        setErrors({});

    }, [isOpen]);


    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));

        if (errors[name]) {

            setErrors(previous => ({
                ...previous,
                [name]: ""
            }));

        }

    };


    const validate = () => {

        const newErrors = {};

        if (!formData.currentPassword) {

            newErrors.currentPassword =
                "Current password is required";

        }


        if (!formData.newPassword) {

            newErrors.newPassword =
                "New password is required";

        }
        else if (
            formData.newPassword.length < 8
        ) {

            newErrors.newPassword =
                "Password must be at least 8 characters";

        }


        if (!formData.confirmPassword) {

            newErrors.confirmPassword =
                "Please confirm your new password";

        }
        else if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            newErrors.confirmPassword =
                "Passwords do not match";

        }


        if (
            formData.currentPassword &&
            formData.newPassword &&
            formData.currentPassword ===
            formData.newPassword
        ) {

            newErrors.newPassword =
                "New password must be different from current password";

        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!validate()) {
            return;
        }

        setSaving(true);

        try {

            const response =
                await changePassword({

                    currentPassword:
                        formData.currentPassword,

                    newPassword:
                        formData.newPassword,

                    confirmPassword:
                        formData.confirmPassword

                });


            if (!response?.success) {

                throw new Error(
                    response?.message ||
                    "Unable to change password"
                );

            }


            toast.success(
                response.message ||
                "Password changed successfully"
            );

            setFormData(DEFAULT_FORM);
            setErrors({});

            onClose();

        }
        catch (error) {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to change password"
            );

        }
        finally {

            setSaving(false);

        }

    };


    const handleClose = () => {

        if (saving) {
            return;
        }

        setErrors({});
        onClose();

    };


    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Change Password"
            size="medium"
        >

            <form
                className="profile-password-form"
                onSubmit={handleSubmit}
            >

                <section className="profile-password-section">

                    <div className="profile-edit-section-heading">

                        <span>
                            SECURITY
                        </span>

                        <h3>
                            Update Password
                        </h3>

                        <p>
                            Choose a strong password
                            to keep your account secure.
                        </p>

                    </div>


                    <div className="profile-password-fields">

                        <Input
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            error={errors.currentPassword}
                            required
                            autoComplete="current-password"
                        />

                        <Input
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={errors.newPassword}
                            required
                            autoComplete="new-password"
                        />

                        <Input
                            label="Confirm New Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                            autoComplete="new-password"
                        />

                    </div>


                    <div className="profile-password-hint">

                        <span>
                            🔒
                        </span>

                        <p>
                            Use at least 8 characters.
                            Avoid using passwords
                            you've used elsewhere.
                        </p>

                    </div>

                </section>


                <div className="profile-edit-actions">

                    <button
                        type="button"
                        className="profile-edit-cancel"
                        onClick={handleClose}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <Button
                        type="submit"
                        loading={saving}
                        disabled={saving}
                    >
                        Change Password
                    </Button>

                </div>

            </form>

        </Modal>
    );
};

export default ChangePasswordModal;