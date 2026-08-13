import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const AuthLayout = () => {
    return (
        <div
            className="
                min-h-screen
                flex
                flex-col
                bg-[var(--background)]
                text-[var(--text)]
            "
        >
            <Navbar />

            <main
                className="
                    flex-1
                    w-full
                    flex
                    items-center
                    justify-center
                    px-3
                    py-6
                    sm:px-6
                    sm:py-8
                    lg:px-8
                    lg:py-12
                "
            >
                <section
                    className="
                        w-full
                        max-w-5xl
                        overflow-hidden
                        rounded-2xl
                        sm:rounded-[var(--radius-lg)]
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        shadow-[var(--shadow)]
                        lg:grid
                        lg:grid-cols-[0.9fr_1.1fr]
                        lg:min-h-[600px]
                    "
                >
                    {/* =================================
                        DESKTOP BRAND PANEL
                    ================================= */}

                    <aside
                        className="
                            relative
                            hidden
                            overflow-hidden
                            bg-[var(--sidebar)]
                            text-white
                            lg:flex
                            lg:flex-col
                            lg:justify-between
                            lg:px-12
                            lg:py-12
                        "
                    >
                        {/* Decorative Circle */}

                        <div
                            className="
                                absolute
                                -right-24
                                -top-24
                                h-72
                                w-72
                                rounded-full
                                bg-[var(--primary)]
                                opacity-20
                            "
                        />

                        <div
                            className="
                                absolute
                                -bottom-28
                                -left-20
                                h-72
                                w-72
                                rounded-full
                                bg-[var(--secondary)]
                                opacity-15
                            "
                        />

                        {/* Decorative Line */}

                        <div
                            className="
                                absolute
                                bottom-0
                                right-0
                                h-1/2
                                w-px
                                bg-gradient-to-b
                                from-transparent
                                via-[var(--primary)]
                                to-transparent
                                opacity-30
                            "
                        />

                        {/* =================================
                            Brand + Hero
                        ================================= */}

                        <div className="relative z-10">

                            {/* Brand */}

                            <div
                                className="
                                    mb-12
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[var(--secondary)]
                                        text-lg
                                        font-black
                                        text-[var(--sidebar)]
                                        shadow-lg
                                    "
                                >
                                    G
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-lg
                                            font-bold
                                            tracking-tight
                                        "
                                    >
                                        GDS Electronics
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-white/55
                                        "
                                    >
                                        Inventory & E-Commerce
                                    </p>
                                </div>
                            </div>

                            {/* Hero */}

                            <p
                                className="
                                    mb-3
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-[var(--secondary)]
                                "
                            >
                                GDS Electronics
                            </p>

                            <h1
                                className="
                                    max-w-md
                                    text-4xl
                                    font-bold
                                    leading-[1.08]
                                    tracking-tight
                                    xl:text-5xl
                                "
                            >
                                Everything you need,

                                <span
                                    className="
                                        block
                                        text-[var(--primary)]
                                    "
                                >
                                    all in one place.
                                </span>
                            </h1>

                            <p
                                className="
                                    mt-6
                                    max-w-md
                                    text-sm
                                    leading-7
                                    text-white/60
                                "
                            >
                                Manage your account, explore
                                products and keep your shopping
                                experience simple, secure and
                                effortless.
                            </p>

                            {/* Features */}

                            <div
                                className="
                                    mt-10
                                    space-y-4
                                "
                            >
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        text-sm
                                        text-white/70
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-white/10
                                            text-[var(--secondary)]
                                        "
                                    >
                                        ✓
                                    </span>

                                    <span>
                                        Secure account access
                                    </span>
                                </div>

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        text-sm
                                        text-white/70
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-white/10
                                            text-[var(--secondary)]
                                        "
                                    >
                                        ✓
                                    </span>

                                    <span>
                                        Manage orders & products
                                    </span>
                                </div>

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        text-sm
                                        text-white/70
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-white/10
                                            text-[var(--secondary)]
                                        "
                                    >
                                        ✓
                                    </span>

                                    <span>
                                        Fast & reliable experience
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* =================================
                            Bottom
                        ================================= */}

                        <div className="relative z-10">

                            <div
                                className="
                                    mb-5
                                    h-px
                                    w-full
                                    bg-white/10
                                "
                            />

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    text-xs
                                    text-white/40
                                "
                            >
                                <span>
                                    GDS Electronics
                                </span>

                                <span>
                                    Shop • Manage • Grow
                                </span>
                            </div>
                        </div>
                    </aside>

                    {/* =================================
                        MOBILE BRAND HEADER
                    ================================= */}

                    <div
                        className="
                            relative
                            overflow-hidden
                            bg-[var(--sidebar)]
                            px-5
                            py-5
                            text-white
                            sm:px-7
                            sm:py-6
                            lg:hidden
                        "
                    >
                        {/* Decorative Shape */}

                        <div
                            className="
                                absolute
                                -right-10
                                -top-16
                                h-32
                                w-32
                                rounded-full
                                bg-[var(--primary)]
                                opacity-20
                            "
                        />

                        <div
                            className="
                                absolute
                                -bottom-14
                                -left-10
                                h-28
                                w-28
                                rounded-full
                                bg-[var(--secondary)]
                                opacity-10
                            "
                        />

                        <div
                            className="
                                relative
                                z-10
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[var(--secondary)]
                                        font-black
                                        text-[var(--sidebar)]
                                    "
                                >
                                    G
                                </div>

                                <div>
                                    <p
                                        className="
                                            text-base
                                            font-bold
                                        "
                                    >
                                        GDS Electronics
                                    </p>

                                    <p
                                        className="
                                            text-[11px]
                                            text-white/55
                                        "
                                    >
                                        Inventory & E-Commerce
                                    </p>
                                </div>
                            </div>

                            <span
                                className="
                                    hidden
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-[0.15em]
                                    text-[var(--secondary)]
                                    sm:block
                                "
                            >
                                Account Access
                            </span>
                        </div>
                    </div>

                    {/* =================================
                        FORM PANEL
                    ================================= */}

                    <div
                        className="
                            flex
                            items-center
                            bg-[var(--surface)]
                            px-5
                            py-7
                            sm:px-8
                            sm:py-9
                            md:px-10
                            lg:px-14
                            lg:py-12
                        "
                    >
                        <div
                            className="
                                mx-auto
                                w-full
                                max-w-lg
                            "
                        >
                            <Outlet />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AuthLayout;