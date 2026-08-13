import { useState } from "react";
import { useSelector } from "react-redux";

import Container from "../../../components/ui/Container";

import ProfileAction from "../components/ProfileAction";
import ProfileEditModal from "../components/ProfileEditModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ProfileAddressModal from "../components/ProfileAddressModal";

import "./ProfilePage.css";
import toast from "react-hot-toast";
import { GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { PiLockKeyFill } from "react-icons/pi";
import { FaCross, FaPencilAlt, FaStop } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";


const ProfileInfoItem = ({
  label,
  children
}) => {

  return (
    <div className="profile-info-item">

      <span>
        {label}
      </span>

      <strong>
        {children}
      </strong>

    </div>
  );

};


const ProfilePage = () => {

  const { user } = useSelector(
    state => state.auth
  );


  const [
    editOpen,
    setEditOpen
  ] = useState(false);

  const [
    passwordOpen,
    setPasswordOpen
  ] = useState(false);

  const [
    addressOpen,
    setAddressOpen
  ] = useState(false);


  const initials =
    `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`
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


  const accountType =
    user?.role === "admin"
      ? "Administrator"
      : "Customer";


  const phone = user?.phone?.number
    ? `${user.phone.countryCode || "+91"} ${user.phone.number}`
    : "Not added";


  const accountStatus =
    user?.status || "Active";

  return (
    <Container>

      <div className="profile-page">

        {/* ================================
                    HEADER
                ================================= */}

        <header className="profile-page-header">

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

        </header>


        {/* ================================
                    ACCOUNT OVERVIEW
                ================================= */}

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
                  {user?.firstName}{" "}
                  {user?.lastName}
                </h2>

                {user?.isVerified && (

                  <span className="profile-badge">
                    <FaCheck/> Verified
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

                <i>
                  <GoDotFill />
                </i>

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

              <ProfileInfoItem label="First Name">
                {user?.firstName || "—"}
              </ProfileInfoItem>

              <ProfileInfoItem label="Last Name">
                {user?.lastName || "—"}
              </ProfileInfoItem>

              <ProfileInfoItem label="Email Address">
                {user?.email || "—"}
              </ProfileInfoItem>

              <ProfileInfoItem label="Phone">
                {phone}
              </ProfileInfoItem>

              <ProfileInfoItem label="Account Type">
                {accountType}
              </ProfileInfoItem>

              <div className="profile-info-item">

                <span>
                  Account Status
                </span>

                <strong className="profile-status">

                  <i />

                  {accountStatus}

                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* ================================
                    SETTINGS
                ================================= */}

        <section className="profile-settings">

          <div className="profile-section-label">
            SETTINGS
          </div>


          <div className="profile-settings-list">

            <ProfileAction
              icon=<FaPencilAlt />
              title="Update Profile"
              description="Change your name, phone number and profile information."
              onClick={() => setEditOpen(true)}
            />


            <ProfileAction
              icon=<PiLockKeyFill />
              title="Change Password"
              description="Update your password to keep your account secure."
              onClick={() => setPasswordOpen(true)}
            />


            <ProfileAction
              icon=<MdLocationPin />
              title="Manage Addresses"
              description="Add, edit or manage your delivery addresses."
              onClick={() => setAddressOpen(true)}
            />


            <ProfileAction
              icon=<FaStop />
              title="Deactivate Account"
              description="Temporarily disable your account."
              onClick={() => {
                toast("This feature is not implemented yet.", {
                  icon: <IoMdInformationCircle />
                });
              }}
            />

          </div>


          {/* DELETE */}

          <div className="profile-danger">

            <ProfileAction
              icon=<RxCross2 />
              title="Delete Account"
              description="Permanently delete your account and data."
              danger
              onClick={() => {
                toast("This feature is not implemented yet.", {
                  icon: <IoMdInformationCircle />
                });
              }}
            />

          </div>

        </section>


        {/* ================================
                    MODALS
                ================================= */}

        <ProfileEditModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          user={user}
        />


        <ChangePasswordModal
          isOpen={passwordOpen}
          onClose={() => setPasswordOpen(false)}
        />


        <ProfileAddressModal
          isOpen={addressOpen}
          onClose={() => setAddressOpen(false)}
        />

      </div>

    </Container>
  );

};


export default ProfilePage;