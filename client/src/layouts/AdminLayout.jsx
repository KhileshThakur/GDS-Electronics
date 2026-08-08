import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";


const AdminLayout = () => {

    const [sidebarOpen, setSidebarOpen] =
        useState(false);


    return (

        <div className="
            min-h-screen
            flex
            flex-col

            bg-[var(--background)]
        ">

            {/* =========================
                Navbar
            ========================== */}

            <Navbar
                onMenuClick={() =>
                    setSidebarOpen(true)
                }
            />


            {/* =========================
                Admin Body
            ========================== */}

            <div className="
                flex
                flex-1
                min-h-0
            ">

                {/* Sidebar */}

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() =>
                        setSidebarOpen(false)
                    }
                />


                {/* Main Content */}

                <main className="
                    flex-1
                    min-w-0
                    min-h-0
                ">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};


export default AdminLayout;