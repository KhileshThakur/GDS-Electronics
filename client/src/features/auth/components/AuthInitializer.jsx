import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getProfile } from "../services/auth.service";
import { setUser, setInitialized } from "../../../redux/slices/authSlice";

const AuthInitializer = ({ children }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await getProfile();
                dispatch(setUser(response.data));
            }

            catch (error) {
                // User is not logged in
            }

            finally {
                dispatch(setInitialized());
            }

        };
        initializeAuth();
    }, [dispatch]);
    return children;
};

export default AuthInitializer;