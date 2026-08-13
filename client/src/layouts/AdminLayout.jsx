import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const AdminLayout = () => {

    const [
        sidebarOpen,
        setSidebarOpen
    ] = useState(false);

    return (

        <div className="
            h-screen
            w-full
            overflow-hidden
            flex
            flex-col
            bg-[var(--background)]
            text-[var(--text)]
        ">

            {/* =================================
                Navbar
            ================================= */}

            <div className="
                shrink-0
                w-full
            ">

                <Navbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

            </div>


            {/* =================================
                Admin Body
            ================================= */}

            <div className="
                flex
                flex-1
                min-h-0
                w-full
                overflow-hidden
            ">

                {/* =================================
                    Sidebar
                ================================= */}

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() =>
                        setSidebarOpen(false)
                    }
                />


                {/* =================================
                    Main Content
                ================================= */}

                <main className="
                    flex-1
                    min-w-0
                    min-h-0
                    overflow-y-auto
                    overflow-x-hidden
                    bg-[var(--background)]
                ">

                    <Outlet />

                </main>

            </div>

        </div>
    );
};

export default AdminLayout;