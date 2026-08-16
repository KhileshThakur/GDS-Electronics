import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ViewToggle from "../components/common/ViewToggle";

import { homeContent } from "../utils/content.home";


const CustomerLayout = () => {

    const { navbar } = homeContent;

    const {
        user,
        isAuthenticated
    } = useSelector(
        state => state.auth
    );

    const showToggle =
        isAuthenticated &&
        user?.role === "admin";


    return (

        <div className="
            min-h-screen
            flex
            flex-col

            bg-[var(--background)]
            text-[var(--text)]
        ">


            {/* =================================
                GLOBAL TOP STRIP
            ================================= */}

            <div
                className={`
                    relative

                    shrink-0
                    h-12
                    w-full

                    bg-[var(--sidebar)]
                    text-white

                    border-b
                    border-white/10

                    ${showToggle
                        ? "lg:grid lg:grid-cols-[240px_minmax(0,1fr)]"
                        : ""
                    }
                `}
            >


                {/* =================================
                    ANNOUNCEMENT
                ================================= */}

                <div
                    className={`
                        absolute
                        inset-0

                        flex
                        items-center

                        min-w-0

                        px-3

                        ${showToggle
                            ? "right-[145px] lg:static lg:col-start-2 lg:px-5"
                            : "right-0 lg:px-5"
                        }
                    `}
                >

                    <marquee
                        className="
                            w-full

                            text-[10px]
                            sm:text-[11px]

                            font-medium
                            text-white/80

                            whitespace-nowrap
                        "
                        scrollamount="5"
                        loop="infinite"
                    >
                        {navbar.announcement}
                    </marquee>

                </div>


                {/* =================================
                    TOGGLE
                ================================= */}

                {showToggle && (

                    <div className="
                        absolute
                        inset-y-0
                        right-0

                        w-[145px]

                        flex
                        items-center
                        justify-end

                        px-3

                        border-l
                        border-white/10

                        lg:static
                        lg:col-start-1
                        lg:row-start-1

                        lg:w-auto
                        lg:justify-center
                        lg:px-0

                        lg:border-l-0
                        lg:border-r
                        lg:border-white/10
                    ">

                        <ViewToggle />

                    </div>

                )}

            </div>


            <Navbar />


            <main className="
                flex-1
                w-full
            ">
                <Outlet />
            </main>


            <Footer />

        </div>
    );
};


export default CustomerLayout;