import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

import { updateProfile } from "../../auth/services/auth.service";
import { setUser } from "../../../redux/slices/authSlice";

const DEFAULT_FORM = {
    firstName: "",
    lastName: "",
    countryCode: "+91",
    phone: ""
};

const ProfileEditModal = ({
    isOpen,
    onClose,
    user
}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState(
        DEFAULT_FORM
    );

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (!isOpen) {
            return;
        }

        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            countryCode:
                user?.phone?.countryCode || "+91",
            phone:
                user?.phone?.number || ""
        });

        setErrors({});

    }, [isOpen, user]);


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

        if (!formData.firstName.trim()) {

            newErrors.firstName =
                "First name is required";

        }

        if (!formData.lastName.trim()) {

            newErrors.lastName =
                "Last name is required";

        }

        if (
            formData.phone.trim() &&
            !/^[0-9]{7,15}$/.test(
                formData.phone.trim()
            )
        ) {

            newErrors.phone =
                "Enter a valid phone number";

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
                await updateProfile({

                    firstName:
                        formData.firstName.trim(),

                    lastName:
                        formData.lastName.trim(),

                    phone: {

                        countryCode:
                            formData.countryCode.trim() ||
                            "+91",

                        number:
                            formData.phone.trim()

                    }

                });


            if (!response?.success) {

                throw new Error(
                    response?.message ||
                    "Unable to update profile"
                );

            }


            dispatch(
                setUser(response.data)
            );


            toast.success(
                response.message ||
                "Profile updated successfully"
            );

            onClose();

        }
        catch (error) {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to update profile"
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
            title="Update Profile"
            size="medium"
        >

            <form
                className="profile-edit-form"
                onSubmit={handleSubmit}
            >

                {/* PERSONAL INFORMATION */}

                <section className="profile-edit-section">

                    <div className="profile-edit-section-heading">

                        <span>
                            PERSONAL INFORMATION
                        </span>

                        <h3>
                            Basic Details
                        </h3>

                        <p>
                            Update your name and
                            contact information.
                        </p>

                    </div>


                    <div className="profile-edit-grid">

                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                            required
                        />

                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                            required
                        />

                    </div>

                </section>


                {/* CONTACT INFORMATION */}

                <section className="profile-edit-section">

                    <div className="profile-edit-section-heading">

                        <span>
                            CONTACT INFORMATION
                        </span>

                        <h3>
                            Email & Phone
                        </h3>

                        <p>
                            Your email address
                            cannot be changed here.
                        </p>

                    </div>


                    <div className="profile-edit-grid">

                        <Input
                            label="Email Address"
                            type="email"
                            value={user?.email || ""}
                            disabled
                        />


                        <div className="profile-phone-field">

                            <label className="profile-phone-label">
                                Phone Number
                            </label>

                            <div className="profile-phone-input">

                                <input
                                    type="text"
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="profile-country-code"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="profile-phone-number"
                                    placeholder="Phone number"
                                />

                            </div>


                            {errors.phone && (

                                <p className="profile-form-error">
                                    {errors.phone}
                                </p>

                            )}

                        </div>

                    </div>

                </section>


                {/* ACTIONS */}

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
                        Save Changes
                    </Button>

                </div>

            </form>

        </Modal>
    );
};

export default ProfileEditModal;