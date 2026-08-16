import { useEffect, useState } from "react";

const ViewTransition = () => {
    const [visible, setVisible] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const transition =
            sessionStorage.getItem("view-transition");

        if (!transition) {
            return;
        }

        sessionStorage.removeItem("view-transition");

        const target =
            sessionStorage.getItem(
                "view-transition-target"
            );

        sessionStorage.removeItem(
            "view-transition-target"
        );

        setMessage(
            target === "admin"
                ? "Switching to Admin"
                : "Switching to Customer"
        );

        setVisible(true);

        // Start fade-out
        const fadeTimer = setTimeout(() => {
            setLeaving(true);
        }, 2000);

        // Completely remove
        const removeTimer = setTimeout(() => {
            setVisible(false);
        }, 2400);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div
            className={`
                fixed
                inset-0
                z-[9999]

                flex
                items-center
                justify-center

                bg-[var(--background)]/75
                backdrop-blur-xl

                transition-opacity
                duration-500

                ${
                    leaving
                        ? "opacity-0"
                        : "opacity-100"
                }
            `}
        >

            <div className="
                flex
                flex-col
                items-center
                justify-center

                text-center
            ">

                {/* Loading spinner */}

                <div className="
                    mb-5

                    h-10
                    w-10

                    rounded-full

                    border-[3px]
                    border-[var(--border)]
                    border-t-[var(--primary)]

                    animate-spin
                " />

                {/* Main text */}

                <h2 className="
                    text-2xl
                    sm:text-3xl

                    font-bold

                    text-[var(--text)]

                    tracking-tight
                ">
                    {message}
                </h2>

                {/* Sub text */}

                <p className="
                    mt-2

                    text-sm

                    text-[var(--text-light)]
                ">
                    Please wait...
                </p>

            </div>

        </div>
    );
};

export default ViewTransition;