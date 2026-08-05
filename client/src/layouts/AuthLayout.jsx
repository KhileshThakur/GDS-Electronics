import { Outlet } from "react-router-dom";

import Logo from "../components/common/Logo";

const AuthLayout = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <Logo />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;