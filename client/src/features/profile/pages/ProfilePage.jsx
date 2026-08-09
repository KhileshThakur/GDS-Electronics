import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Container from "../../../components/ui/Container";

import "./ProfilePage.css";

const ProfilePage = () => {

    const { user } = useSelector(
        state => state.auth
    );

    const initials =
        `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`
            .toUpperCase();

    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString(
            "en-IN",
            {
                month: "long",
                year: "numeric"
            }
        )
        : "—";

    const accountType =
        user?.role === "admin"
            ? "Administrator"
            : "Customer";

    const phone = user?.phone?.number
        ? `${user.phone.countryCode || "+91"} ${user.phone.number}`
        : "Not added";

    return (

        <Container>

            <div className="profile-page">

                {/* HEADER */}

                <header className="profile-page-header">

                    <span className="profile-label">
                        ACCOUNT
                    </span>

                    <h1>
                        My Profile
                    </h1>

                    <p>
                        View and manage your account information.
                    </p>

                </header>


                {/* OVERVIEW */}

                <section className="profile-overview">

                    {/* USER */}

                    <div className="profile-overview-user">

                        <div className="profile-avatar">

                            {user?.avatar?.url ? (

                                <img
                                    src={user.avatar.url}
                                    alt={`${user.firstName} ${user.lastName}`}
                                />

                            ) : (

                                <span>
                                    {initials || "U"}
                                </span>

                            )}

                        </div>


                        <div className="profile-user-details">

                            <div className="profile-name-row">

                                <h2>
                                    {user?.firstName} {user?.lastName}
                                </h2>

                                {user?.isVerified && (
                                    <span className="profile-badge">
                                        ✓ Verified
                                    </span>
                                )}

                            </div>

                            <p className="profile-email">
                                {user?.email}
                            </p>

                            <div className="profile-user-meta">

                                <span>
                                    {accountType}
                                </span>

                                <i>•</i>

                                <span>
                                    Member since {joinedDate}
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* INFORMATION */}

                    <div className="profile-overview-info">

                        <div className="profile-info-heading">

                            <span>
                                PERSONAL INFORMATION
                            </span>

                            <h2>
                                Account Details
                            </h2>

                        </div>


                        <div className="profile-mini-grid">

                            <div className="profile-info-item">

                                <span>
                                    First Name
                                </span>

                                <strong>
                                    {user?.firstName || "—"}
                                </strong>

                            </div>


                            <div className="profile-info-item">

                                <span>
                                    Last Name
                                </span>

                                <strong>
                                    {user?.lastName || "—"}
                                </strong>

                            </div>


                            <div className="profile-info-item">

                                <span>
                                    Email Address
                                </span>

                                <strong>
                                    {user?.email || "—"}
                                </strong>

                            </div>


                            <div className="profile-info-item">

                                <span>
                                    Phone
                                </span>

                                <strong>
                                    {phone}
                                </strong>

                            </div>


                            <div className="profile-info-item">

                                <span>
                                    Account Type
                                </span>

                                <strong>
                                    {accountType}
                                </strong>

                            </div>


                            <div className="profile-info-item">

                                <span>
                                    Account Status
                                </span>

                                <strong className="profile-status">

                                    <i />

                                    {user?.status || "Active"}

                                </strong>

                            </div>

                        </div>

                    </div>

                </section>


                {/* SETTINGS */}

                <section className="profile-settings">

                    <div className="profile-section-label">
                        SETTINGS
                    </div>


                    <div className="profile-settings-list">

                        <Link
                            to="/profile/edit"
                            className="profile-setting"
                        >

                            <div className="profile-setting-icon">
                                ✎
                            </div>

                            <div className="profile-setting-content">

                                <h3>
                                    Update Profile
                                </h3>

                                <p>
                                    Update your personal information
                                </p>

                            </div>

                            <span className="profile-setting-arrow">
                                →
                            </span>

                        </Link>


                        <Link
                            to="/change-password"
                            className="profile-setting"
                        >

                            <div className="profile-setting-icon">
                                🔒
                            </div>

                            <div className="profile-setting-content">

                                <h3>
                                    Change Password
                                </h3>

                                <p>
                                    Keep your account secure
                                </p>

                            </div>

                            <span className="profile-setting-arrow">
                                →
                            </span>

                        </Link>


                        <Link
                            to="/addresses"
                            className="profile-setting"
                        >

                            <div className="profile-setting-icon">
                                ⌖
                            </div>

                            <div className="profile-setting-content">

                                <h3>
                                    Manage Addresses
                                </h3>

                                <p>
                                    Add or update your delivery addresses
                                </p>

                            </div>

                            <span className="profile-setting-arrow">
                                →
                            </span>

                        </Link>


                        <button
                            type="button"
                            className="profile-setting"
                        >

                            <div className="profile-setting-icon">
                                ⏸
                            </div>

                            <div className="profile-setting-content">

                                <h3>
                                    Deactivate Account
                                </h3>

                                <p>
                                    Temporarily disable your account
                                </p>

                            </div>

                            <span className="profile-setting-arrow">
                                →
                            </span>

                        </button>

                    </div>


                    {/* DELETE */}

                    <div className="profile-danger">

                        <button
                            type="button"
                            className="profile-delete"
                        >

                            <div className="profile-setting-icon">
                                ×
                            </div>

                            <div className="profile-setting-content">

                                <h3>
                                    Delete Account
                                </h3>

                                <p>
                                    Permanently delete your account and data
                                </p>

                            </div>

                            <span className="profile-setting-arrow">
                                →
                            </span>

                        </button>

                    </div>

                </section>

            </div>

        </Container>

    );
};

export default ProfilePage;