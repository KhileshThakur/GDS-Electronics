import { useSelector } from "react-redux";

const ProfilePage = () => {

    const { user } = useSelector(
        (state) => state.auth
    );

    return (

        <div>

            <h1>Profile</h1>

            <p>{user?.firstName}</p>

            <p>{user?.lastName}</p>

            <p>{user?.email}</p>

            <p>{user?.role}</p>

        </div>

    );

};

export default ProfilePage;