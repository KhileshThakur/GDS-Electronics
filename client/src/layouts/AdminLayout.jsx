import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import ViewToggle from "../components/common/ViewToggle";
import { MenuIcon } from "../assets/icons/Icons";


const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="
            h-screen
            w-full
            overflow-hidden
            flex
            bg-[var(--background)]
            text-[var(--text)]
        ">

            {/* MOBILE HEADER ONLY */}
            <header className="
                fixed
                top-0
                left-0
                right-0
                z-[60]

                h-12

                lg:hidden

                flex
                items-center
                justify-between

                px-3

                bg-[var(--sidebar)]
                border-b
                border-white/10
            ">

                <button
                    type="button"
                    onClick={() =>
                        setSidebarOpen(prev => !prev)
                    }
                    aria-label="Open admin menu"
                    className="
                        h-8
                        w-8

                        inline-flex
                        items-center
                        justify-center

                        rounded-lg

                        text-white/80
                        hover:bg-white/10
                        hover:text-white

                        transition
                    "
                >
                    <MenuIcon />
                </button>

                <ViewToggle />

            </header>


            {/* SIDEBAR */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />


            {/* MAIN CONTENT */}
            <main className="
                flex-1
                min-w-0
                min-h-0

                overflow-y-auto
                overflow-x-hidden

                bg-[var(--background)]

                pt-12
                lg:pt-0
            ">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;