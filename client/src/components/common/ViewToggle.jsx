import {
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    useSelector
} from "react-redux";

import {
    useState
} from "react";

import {
    createPortal
} from "react-dom";


const ViewToggle = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const {
        user,
        isAuthenticated
    } = useSelector(
        state => state.auth
    );

    const [
        switching,
        setSwitching
    ] = useState(false);

    const [
        targetView,
        setTargetView
    ] = useState(null);


    const isAdmin =
        user?.role === "admin";

    const isAdminView =
        location.pathname.startsWith(
            "/admin"
        );


    if (!isAuthenticated || !isAdmin) {
        return null;
    }


    const switchView = (view) => {

        // Don't do anything if already here
        if (
            (view === "admin" && isAdminView) ||
            (view === "customer" && !isAdminView)
        ) {
            return;
        }


        setTargetView(view);
        setSwitching(true);


        /*
            Give the overlay time to appear,
            then switch the actual route.
        */

        setTimeout(() => {

            navigate(
                view === "admin"
                    ? "/admin"
                    : "/"
            );

        }, 1000);


        /*
            Remove transition after
            the new view has appeared.
        */

        setTimeout(() => {

            setSwitching(false);
            setTargetView(null);

        }, 4000);

    };


    return (

        <>

            {/* =================================
                TOGGLE
            ================================= */}

            <div className="
                inline-flex
                items-center

                rounded-full

                p-0.5

                bg-[var(--sidebar)]

                border
                border-white/20

                shadow-sm
            ">

                <button
                    type="button"
                    onClick={() =>
                        switchView("customer")
                    }
                    className={`
                        h-7
                        sm:h-8

                        min-w-[62px]
                        sm:min-w-[76px]

                        px-2
                        sm:px-3

                        rounded-full

                        text-[9px]
                        sm:text-[11px]

                        font-semibold

                        transition-all
                        duration-200

                        ${!isAdminView
                            ? `
                                    bg-white
                                    text-[var(--sidebar)]
                                    shadow-sm
                                `
                            : `
                                    text-white/65
                                    hover:text-white
                                    hover:bg-white/10
                                `
                        }
                    `}
                >
                    Customer
                </button>


                <button
                    type="button"
                    onClick={() =>
                        switchView("admin")
                    }
                    className={`
                        h-7
                        sm:h-8

                        min-w-[62px]
                        sm:min-w-[76px]

                        px-2
                        sm:px-3

                        rounded-full

                        text-[9px]
                        sm:text-[11px]

                        font-semibold

                        transition-all
                        duration-200

                        ${isAdminView
                            ? `
                                    bg-white
                                    text-[var(--sidebar)]
                                    shadow-sm
                                `
                            : `
                                    text-white/65
                                    hover:text-white
                                    hover:bg-white/10
                                `
                        }
                    `}
                >
                    Admin
                </button>

            </div>


            {/* =================================
                VIEW SWITCH OVERLAY
            ================================= */}

            {switching &&
                createPortal(

                    <div className="
            fixed
            inset-0

            z-[99999]

            flex
            items-center
            justify-center

            bg-black/30

            backdrop-blur-xl

            transition-opacity
            duration-500
        ">

                        <div className="
                flex
                flex-col
                items-center
                justify-center

                text-center

                animate-[fadeIn_200ms_ease-out]
            ">

                            <div className="
                    h-10
                    w-10

                    mb-5

                    rounded-full

                    border-[3px]
                    border-white/20
                    border-t-white

                    animate-spin
                " />

                            <h2 className="
                    text-2xl
                    sm:text-4xl

                    font-bold
                    tracking-tight

                    text-white

                    drop-shadow-lg
                ">
                                {targetView === "admin"
                                    ? "Switching to Admin"
                                    : "Switching to Customer"
                                }
                            </h2>

                            <p className="
                    mt-2

                    text-xs
                    sm:text-sm

                    text-white/60
                ">
                                Please wait...
                            </p>

                        </div>

                    </div>,

                    document.body

                )
            }

        </>

    );
};


export default ViewToggle;