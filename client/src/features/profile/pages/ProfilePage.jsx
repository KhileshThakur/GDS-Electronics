import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Container from "../../../components/ui/Container";

import "./ProfilePage.css";


const ProfilePage = () => {

    const { user } = useSelector(
        state => state.auth
    );


    const initials = `
        ${user?.firstName?.[0] || ""}
        ${user?.lastName?.[0] || ""}
    `
        .trim()
        .toUpperCase();


    const joinedDate = user?.createdAt
        ? new Date(
            user.createdAt
        ).toLocaleDateString(
            "en-IN",
            {
                month: "long",
                year: "numeric"
            }
        )
        : "—";


    return (

        <Container>

            <div className="profile-page">


                {/* =================================
                    Header
                ================================= */}

                <div className="profile-page-header">

                    <div>

                        <span className="profile-label">
                            ACCOUNT
                        </span>

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            View and manage your account
                            information.
                        </p>

                    </div>

                </div>


                {/* =================================
                    Profile Hero
                ================================= */}

                <section className="profile-hero">

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


                    <div className="profile-hero-content">

                        <div className="profile-name-row">

                            <h2>
                                {user?.firstName}{" "}
                                {user?.lastName}
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


                        <div className="profile-hero-meta">

                            <span>
                                {user?.role === "admin"
                                    ? "Administrator"
                                    : "Customer"
                                }
                            </span>

                            <span className="profile-meta-dot">
                                •
                            </span>

                            <span>
                                Member since {joinedDate}
                            </span>

                        </div>

                    </div>

                </section>


                {/* =================================
                    Personal Information
                ================================= */}

                <section className="profile-info-card">

                    <div className="profile-card-heading">

                        <div>

                            <span>
                                PERSONAL
                            </span>

                            <h2>
                                Personal Information
                            </h2>

                        </div>

                    </div>


                    <div className="profile-info-grid">


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
                                Phone Number
                            </span>

                            <strong>

                                {user?.phone?.number
                                    ? `${user?.phone?.countryCode || "+91"} ${user.phone.number}`
                                    : "Not added"
                                }

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


                        <div className="profile-info-item">

                            <span>
                                Account Type
                            </span>

                            <strong>
                                {user?.role === "admin"
                                    ? "Administrator"
                                    : "Customer"
                                }
                            </strong>

                        </div>


                    </div>

                </section>


                {/* =================================
                    Account Actions
                ================================= */}

                <section className="profile-account-card">

                    <div className="profile-card-heading">

                        <div>

                            <span>
                                ACCOUNT
                            </span>

                            <h2>
                                Manage Account
                            </h2>

                        </div>

                    </div>


                    <div className="profile-action-list">


                        {/* Update Profile */}

                        <Link
                            to="/profile/edit"
                            className="profile-action"
                        >

                            <div className="profile-action-icon">
                                ✎
                            </div>


                            <div className="profile-action-content">

                                <h3>
                                    Update Profile
                                </h3>

                                <p>
                                    Change your name,
                                    phone number and
                                    profile information.
                                </p>

                            </div>


                            <span className="profile-action-arrow">
                                →
                            </span>

                        </Link>


                        {/* Change Password */}

                        <Link
                            to="/change-password"
                            className="profile-action"
                        >

                            <div className="profile-action-icon">
                                🔐
                            </div>


                            <div className="profile-action-content">

                                <h3>
                                    Change Password
                                </h3>

                                <p>
                                    Update your password
                                    to keep your account secure.
                                </p>

                            </div>


                            <span className="profile-action-arrow">
                                →
                            </span>

                        </Link>


                        {/* Addresses */}

                        <Link
                            to="/addresses"
                            className="profile-action"
                        >

                            <div className="profile-action-icon">
                                📍
                            </div>


                            <div className="profile-action-content">

                                <h3>
                                    Manage Addresses
                                </h3>

                                <p>
                                    Add, edit or manage
                                    your delivery addresses.
                                </p>

                            </div>


                            <span className="profile-action-arrow">
                                →
                            </span>

                        </Link>


                    </div>

                </section>


            </div>

        </Container>

    );

};


export default ProfilePage;