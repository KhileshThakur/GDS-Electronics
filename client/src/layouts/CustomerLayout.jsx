import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const CustomerLayout = () => {

    return (

        <div className="
            min-h-screen
            flex
            flex-col

            bg-[var(--background)]
            text-[var(--text)]
        ">

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