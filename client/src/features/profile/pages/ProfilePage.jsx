import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Container from "../../../components/ui/Container";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import {
  updateProfile,
  changePassword,
} from "../../auth/services/auth.service";
import AddressManager from "../../address/components/AddressManager";
import { setUser } from "../../../redux/slices/authSlice";

import "./ProfilePage.css";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  /* =========================================
       PROFILE EDIT STATE
    ========================================= */

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+91",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);

  /* =========================================
       PASSWORD MODAL STATE
    ========================================= */

  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});

  const [passwordSaving, setPasswordSaving] = useState(false);

  /* =========================================
       PROFILE DISPLAY DATA
    ========================================= */

  const initials = `
        ${user?.firstName?.[0] || ""}
        ${user?.lastName?.[0] || ""}
    `
    .trim()
    .toUpperCase();

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "—";

  /* =========================================
       UPDATE PROFILE
    ========================================= */

  const openEditModal = () => {
    setFormData({
      firstName: user?.firstName || "",

      lastName: user?.lastName || "",

      countryCode: user?.phone?.countryCode || "+91",

      phone: user?.phone?.number || "",
    });

    setErrors({});

    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    if (saving) {
      return;
    }

    setErrors({});

    setIsEditOpen(false);
  };

  const openAddressModal = () => {
    setIsAddressOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressOpen(false);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateEditForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (formData.phone.trim() && !/^[0-9]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!validateEditForm()) {
      return;
    }

    setSaving(true);

    try {
      const response = await updateProfile({
        firstName: formData.firstName.trim(),

        lastName: formData.lastName.trim(),

        phone: {
          countryCode: formData.countryCode.trim() || "+91",

          number: formData.phone.trim(),
        },
      });

      if (!response?.success) {
        throw new Error(response?.message || "Unable to update profile");
      }

      dispatch(setUser(response.data));

      toast.success(response.message || "Profile updated successfully");

      setIsEditOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update profile",
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
       CHANGE PASSWORD
    ========================================= */

  const openPasswordModal = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordErrors({});

    setIsPasswordOpen(true);
  };

  const closePasswordModal = () => {
    if (passwordSaving) {
      return;
    }

    setPasswordErrors({});

    setIsPasswordOpen(false);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (passwordErrors[name]) {
      setPasswordErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.currentPassword === passwordData.newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setPasswordErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setPasswordSaving(true);

    try {
      const response = await changePassword({
        currentPassword: passwordData.currentPassword,

        newPassword: passwordData.newPassword,

        confirmPassword: passwordData.confirmPassword,
      });

      if (!response?.success) {
        throw new Error(response?.message || "Unable to change password");
      }

      toast.success(response.message || "Password changed successfully");

      setPasswordData({
        currentPassword: "",

        newPassword: "",

        confirmPassword: "",
      });

      setPasswordErrors({});

      setIsPasswordOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to change password",
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <Container>
      <div className="profile-page">
        {/* =================================
                    HEADER
                ================================= */}

        <div className="profile-page-header">
          <div>
            <span className="profile-label">ACCOUNT</span>

            <h1>My Profile</h1>

            <p>View and manage your account information.</p>
          </div>
        </div>

        {/* =================================
                    PROFILE HERO
                ================================= */}

        <section className="profile-hero">
          <div className="profile-avatar">
            {user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt={`${user.firstName} ${user.lastName}`}
              />
            ) : (
              <span>{initials || "U"}</span>
            )}
          </div>

          <div className="profile-hero-content">
            <div className="profile-name-row">
              <h2>
                {user?.firstName} {user?.lastName}
              </h2>

              {user?.isVerified && (
                <span className="profile-badge">✓ Verified</span>
              )}
            </div>

            <p className="profile-email">{user?.email}</p>

            <div className="profile-hero-meta">
              <span>
                {user?.role === "admin" ? "Administrator" : "Customer"}
              </span>

              <span className="profile-meta-dot">•</span>

              <span>Member since {joinedDate}</span>
            </div>
          </div>
        </section>

        {/* =================================
                    PERSONAL INFORMATION
                ================================= */}

        <section className="profile-info-card">
          <div className="profile-card-heading">
            <div>
              <span>PERSONAL</span>

              <h2>Personal Information</h2>
            </div>
          </div>

          <div className="profile-info-grid">
            <div className="profile-info-item">
              <span>First Name</span>

              <strong>{user?.firstName || "—"}</strong>
            </div>

            <div className="profile-info-item">
              <span>Last Name</span>

              <strong>{user?.lastName || "—"}</strong>
            </div>

            <div className="profile-info-item">
              <span>Email Address</span>

              <strong>{user?.email || "—"}</strong>
            </div>

            <div className="profile-info-item">
              <span>Phone Number</span>

              <strong>
                {user?.phone?.number
                  ? `${user?.phone?.countryCode || "+91"} ${user.phone.number}`
                  : "Not added"}
              </strong>
            </div>

            <div className="profile-info-item">
              <span>Account Status</span>

              <strong className="profile-status">
                <i />

                {user?.status || "Active"}
              </strong>
            </div>

            <div className="profile-info-item">
              <span>Account Type</span>

              <strong>
                {user?.role === "admin" ? "Administrator" : "Customer"}
              </strong>
            </div>
          </div>
        </section>

        {/* =================================
                    ACCOUNT ACTIONS
                ================================= */}

        <section className="profile-account-card">
          <div className="profile-card-heading">
            <div>
              <span>ACCOUNT</span>

              <h2>Manage Account</h2>
            </div>
          </div>

          <div className="profile-action-list">
            {/* =================================
                            UPDATE PROFILE
                        ================================= */}

            <button
              type="button"
              className="profile-action"
              onClick={openEditModal}
            >
              <div className="profile-action-icon">✎</div>

              <div className="profile-action-content">
                <h3>Update Profile</h3>

                <p>Change your name, phone number and profile information.</p>
              </div>

              <span className="profile-action-arrow">→</span>
            </button>

            {/* =================================
                            CHANGE PASSWORD
                        ================================= */}

            <button
              type="button"
              className="profile-action"
              onClick={openPasswordModal}
            >
              <div className="profile-action-icon">🔐</div>

              <div className="profile-action-content">
                <h3>Change Password</h3>

                <p>Update your password to keep your account secure.</p>
              </div>

              <span className="profile-action-arrow">→</span>
            </button>

            {/* =================================
                            MANAGE ADDRESSES
                        ================================= */}

            <button
              type="button"
              className="profile-action"
              onClick={openAddressModal}
            >
              <div className="profile-action-icon">📍</div>

              <div className="profile-action-content">
                <h3>Manage Addresses</h3>

                <p>Add, edit or manage your delivery addresses.</p>
              </div>

              <span className="profile-action-arrow">→</span>
            </button>
          </div>
        </section>

        {/* =========================================
                    UPDATE PROFILE MODAL
                ========================================= */}

        <Modal
          isOpen={isEditOpen}
          onClose={closeEditModal}
          title="Update Profile"
          size="medium"
        >
          <form className="profile-edit-form" onSubmit={handleEditSubmit}>
            <section className="profile-edit-section">
              <div className="profile-edit-section-heading">
                <span>PERSONAL INFORMATION</span>

                <h3>Basic Details</h3>

                <p>Update your name and contact information.</p>
              </div>

              <div className="profile-edit-grid">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleEditChange}
                  error={errors.firstName}
                  required
                />

                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleEditChange}
                  error={errors.lastName}
                  required
                />
              </div>
            </section>

            <section className="profile-edit-section">
              <div className="profile-edit-section-heading">
                <span>CONTACT INFORMATION</span>

                <h3>Email & Phone</h3>

                <p>Your email address cannot be changed here.</p>
              </div>

              <div className="profile-edit-grid">
                <Input
                  label="Email Address"
                  type="email"
                  value={user?.email || ""}
                  disabled
                />

                <div className="profile-phone-field">
                  <label className="profile-phone-label">Phone Number</label>

                  <div className="profile-phone-input">
                    <input
                      type="text"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleEditChange}
                      className="profile-country-code"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleEditChange}
                      className="profile-phone-number"
                      placeholder="Phone number"
                    />
                  </div>

                  {errors.phone && (
                    <p className="profile-form-error">{errors.phone}</p>
                  )}
                </div>
              </div>
            </section>

            <div className="profile-edit-actions">
              <button
                type="button"
                className="profile-edit-cancel"
                onClick={closeEditModal}
                disabled={saving}
              >
                Cancel
              </button>

              <Button type="submit" loading={saving} disabled={saving}>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>

        {/* =========================================
                    CHANGE PASSWORD MODAL
                ========================================= */}

        <Modal
          isOpen={isPasswordOpen}
          onClose={closePasswordModal}
          title="Change Password"
          size="medium"
        >
          <form
            className="profile-password-form"
            onSubmit={handlePasswordSubmit}
          >
            <section className="profile-password-section">
              <div className="profile-edit-section-heading">
                <span>SECURITY</span>

                <h3>Update Password</h3>

                <p>Choose a strong password to keep your account secure.</p>
              </div>

              <div className="profile-password-fields">
                <Input
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  error={passwordErrors.currentPassword}
                  required
                  autoComplete="current-password"
                />

                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  error={passwordErrors.newPassword}
                  required
                  autoComplete="new-password"
                />

                <Input
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  error={passwordErrors.confirmPassword}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="profile-password-hint">
                <span>🔒</span>

                <p>
                  Use at least 8 characters. Avoid using passwords you've used
                  elsewhere.
                </p>
              </div>
            </section>

            <div className="profile-edit-actions">
              <button
                type="button"
                className="profile-edit-cancel"
                onClick={closePasswordModal}
                disabled={passwordSaving}
              >
                Cancel
              </button>

              <Button
                type="submit"
                loading={passwordSaving}
                disabled={passwordSaving}
              >
                Change Password
              </Button>
            </div>
          </form>
        </Modal>

        {/* =========================================
            MANAGE ADDRESSES MODAL
        ========================================= */}

        <Modal
          isOpen={isAddressOpen}
          onClose={closeAddressModal}
          title="Manage Addresses"
          size="large"
        >
          <AddressManager mode="modal" />
        </Modal>
      </div>
    </Container>
  );
};

export default ProfilePage;
