import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";


const AuthLayout = () => {

    return (
        <div className="
            min-h-screen
            flex
            flex-col
            bg-[var(--background)]
            text-[var(--text)]
        ">

            {/* =========================
                Navbar
            ========================== */}

            <Navbar />

            {/* =========================
                Auth Content
            ========================== */}

            <main className="
                flex-1
                w-full
                flex
                items-center
                justify-center
                px-4
                sm:px-6
                py-10
                sm:py-14
            ">
                <div className="
                    w-full
                    max-w-md
                ">

                    <Outlet />
                </div>
            </main>

            {/* =========================
                Footer
            ========================== */}

            <Footer />
        </div>
    );
};


export default AuthLayout;