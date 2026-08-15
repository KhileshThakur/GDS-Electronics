import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    toast
} from "react-hot-toast";

import {
    getAdminCustomer,
    updateAdminCustomerStatus
} from "./customer.service";

import {
    StatusBadge,
    StatCard
} from "../../../components/html";

import Button
    from "../../../components/ui/Button";


const AdminCustomerDetailPage = () => {

    const {
        id
    } = useParams();


    const navigate =
        useNavigate();


    const [customer, setCustomer] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [updating, setUpdating] =
        useState(false);


    /* =================================
       FETCH CUSTOMER
    ================================= */

    const fetchCustomer = async () => {

        try {

            setLoading(true);


            const response =
                await getAdminCustomer(id);


            /*
             * API:
             *
             * {
             *   success: true,
             *   data: {
             *      customer: {...},
             *      stats: {...},
             *      recentOrders: [...]
             *   }
             * }
             */

            const apiData =
                response?.data?.data ??
                response?.data ??
                {};


            const customerData =
                apiData?.customer ??
                apiData;


            if (!customerData?._id) {

                throw new Error(
                    "Customer not found"
                );

            }


            const stats =
                apiData?.stats ??
                {};


            const recentOrders =
                Array.isArray(
                    apiData?.recentOrders
                )
                    ? apiData.recentOrders
                    : [];


            setCustomer({

                ...customerData,

                ...stats,

                orders:
                    recentOrders

            });

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch customer"
            );


            navigate(
                "/admin/customers",
                {
                    replace: true
                }
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (!id) {

            navigate(
                "/admin/customers",
                {
                    replace: true
                }
            );

            return;

        }


        fetchCustomer();

    }, [id]);


    /* =================================
       CUSTOMER NAME
    ================================= */

    const customerName =
        useMemo(() => {

            if (!customer) {
                return "Unknown Customer";
            }


            const fullName =
                `${customer.firstName || ""} ${
                    customer.lastName || ""
                }`.trim();


            return (
                customer.name ||
                fullName ||
                "Unknown Customer"
            );

        }, [customer]);


    /* =================================
       MOBILE
    ================================= */

    const mobile =
        customer?.mobile ||
        (
            customer?.phone?.countryCode &&
            customer?.phone?.number
                ? `${customer.phone.countryCode} ${customer.phone.number}`
                : customer?.phone?.number
        ) ||
        "—";


    /* =================================
       INITIALS
    ================================= */

    const initials =
        useMemo(() => {

            if (
                !customerName ||
                customerName === "Unknown Customer"
            ) {

                return "UN";

            }


            const parts =
                customerName
                    .trim()
                    .split(/\s+/);


            if (parts.length === 1) {

                return parts[0]
                    .slice(0, 2)
                    .toUpperCase();

            }


            return (
                `${parts[0][0]}${
                    parts[parts.length - 1][0]
                }`
            ).toUpperCase();

        }, [customerName]);


    /* =================================
       STATUS
    ================================= */

    const isBlocked =
        customer?.status?.toLowerCase() ===
        "blocked";


    /* =================================
       DATE FORMAT
    ================================= */

    const formatDate = (
        value
    ) => {

        if (!value) {
            return "—";
        }


        return new Date(
            value
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    /* =================================
       UPDATE STATUS
    ================================= */

    const handleStatusChange = async (
        status
    ) => {

        try {

            setUpdating(true);


            const response =
                await updateAdminCustomerStatus(
                    id,
                    status
                );


            toast.success(
                response?.message ||
                response?.data?.message ||
                "Customer status updated"
            );


            /*
             * Re-fetch instead of assuming
             * the update response shape.
             *
             * This keeps customer + stats
             * + recent orders consistent.
             */

            await fetchCustomer();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update customer status"
            );

        }
        finally {

            setUpdating(false);

        }

    };


    /* =================================
       LOADING
    ================================= */

    if (loading) {

        return (

            <section className="
                flex
                min-h-[320px]
                items-center
                justify-center
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    font-medium
                    text-[var(--text-light)]
                ">

                    <span className="
                        h-5
                        w-5
                        animate-spin
                        rounded-full
                        border-2
                        border-[var(--border)]
                        border-t-[var(--primary)]
                    " />

                    Loading customer...

                </div>

            </section>

        );

    }


    if (!customer) {
        return null;
    }


    /* =================================
       CUSTOMER DATA
    ================================= */

    const orders =
        Array.isArray(customer.orders)
            ? customer.orders
            : [];


    const orderCount =
        customer.totalOrders ??
        customer.orderCount ??
        orders.length;


    const totalSpent =
        Number(
            customer.totalSpent || 0
        );


    const deliveredOrders =
        customer.deliveredOrders ??
        0;


    const cancelledOrders =
        customer.cancelledOrders ??
        0;


    const pendingOrders =
        customer.pendingOrders ??
        0;


    /* =================================
       RENDER
    ================================= */

    return (

        <section className="
            w-full
            space-y-4
            px-1
            sm:px-2
        ">


            {/* =================================
                PAGE HEADER

                INTENTIONALLY MATCHES
                ORDER DETAIL HEADER STYLE
            ================================= */}

            <div className="
                flex
                min-h-[84px]
                items-center
                justify-between
                gap-4
                rounded-[var(--radius-lg)]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-4
                py-3
                shadow-sm
                sm:px-5
            ">


                {/* LEFT */}

                <div className="
                    flex
                    min-w-0
                    items-center
                    gap-4
                ">


                    {/* BACK BUTTON */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/customers"
                            )
                        }
                        className="
                            inline-flex
                            h-12
                            shrink-0
                            items-center
                            gap-2
                            rounded-none
                            bg-[var(--primary)]
                            px-4
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[var(--primary)]
                            focus:ring-offset-2
                        "
                    >

                        <span
                            aria-hidden="true"
                            className="
                                text-lg
                                leading-none
                            "
                        >
                            ←
                        </span>

                        <span>
                            Back
                        </span>

                    </button>


                    {/* HEADER CONTENT */}

                    <div className="
                        min-w-0
                    ">

                        <p className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.08em]
                            text-[var(--primary)]
                        ">

                            Customer Profile

                        </p>


                        <p className="
                            mt-1
                            truncate
                            text-xs
                            text-[var(--text-light)]
                        ">

                            Customer ID:
                            <span className="
                                ml-1
                                font-medium
                                text-[var(--text)]
                            ">

                                {customer._id}

                            </span>

                        </p>

                    </div>

                </div>


                {/* JOINED */}

                <div className="
                    hidden
                    shrink-0
                    items-center
                    gap-3
                    sm:flex
                ">

                    <span className="
                        text-sm
                        text-[var(--text-light)]
                    ">

                        Joined

                    </span>


                    <span className="
                        text-sm
                        font-semibold
                        text-[var(--text)]
                    ">

                        {formatDate(
                            customer.createdAt
                        )}

                    </span>

                </div>

            </div>


            {/* =================================
                PROFILE HERO
            ================================= */}

            <div className="
                overflow-hidden
                rounded-[var(--radius-lg)]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                shadow-sm
            ">

                <div className="
                    flex
                    flex-col
                    gap-5
                    p-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">


                    {/* PROFILE */}

                    <div className="
                        flex
                        min-w-0
                        items-center
                        gap-4
                    ">


                        {/* AVATAR */}

                        <div className="
                            flex
                            h-16
                            w-16
                            shrink-0
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-full
                            bg-[var(--primary-soft)]
                            text-base
                            font-bold
                            uppercase
                            text-[var(--primary)]
                        ">

                            {customer.avatar?.url ? (

                                <img
                                    src={
                                        customer.avatar.url
                                    }
                                    alt={
                                        customerName
                                    }
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />

                            ) : (

                                initials

                            )}

                        </div>


                        {/* DETAILS */}

                        <div className="
                            min-w-0
                        ">

                            <div className="
                                flex
                                flex-wrap
                                items-center
                                gap-2
                            ">

                                <h2 className="
                                    truncate
                                    text-xl
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {customerName}

                                </h2>


                                <StatusBadge
                                    status={
                                        customer.status ||
                                        "Unknown"
                                    }
                                />

                            </div>


                            <div className="
                                mt-1
                                flex
                                flex-wrap
                                items-center
                                gap-x-4
                                gap-y-1
                            ">

                                <span className="
                                    text-sm
                                    text-[var(--text-light)]
                                ">

                                    {customer.email ||
                                        "No email"}

                                </span>


                                <span className="
                                    hidden
                                    text-[var(--border)]
                                    sm:inline
                                ">
                                    •
                                </span>


                                <span className="
                                    text-sm
                                    text-[var(--text-light)]
                                ">

                                    {mobile}

                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ACTION */}

                    <div className="
                        shrink-0
                    ">

                        <Button
                            type="button"
                            disabled={updating}
                            onClick={() =>
                                handleStatusChange(
                                    isBlocked
                                        ? "active"
                                        : "blocked"
                                )
                            }
                        >

                            {updating

                                ? "Updating..."

                                : isBlocked

                                    ? "Activate Customer"

                                    : "Block Customer"

                            }

                        </Button>

                    </div>

                </div>

            </div>


            {/* =================================
                STATS
            ================================= */}

            <div className="
                grid
                grid-cols-2
                gap-3
                lg:grid-cols-4
            ">

                <StatCard
                    label="Orders"
                    value={orderCount}
                    accent="blue"
                />


                <StatCard
                    label="Total Spent"
                    value={
                        `₹${totalSpent.toLocaleString(
                            "en-IN"
                        )}`
                    }
                    accent="green"
                />


                <StatCard
                    label="Delivered"
                    value={deliveredOrders}
                    accent="green"
                />


                <StatCard
                    label="Cancelled"
                    value={cancelledOrders}
                    accent="red"
                />

            </div>


            {/* =================================
                MAIN INFORMATION
            ================================= */}

            <div className="
                grid
                gap-4
                lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.9fr)]
            ">


                {/* =================================
                    ACCOUNT INFORMATION
                ================================= */}

                <div className="
                    overflow-hidden
                    rounded-[var(--radius-lg)]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    shadow-sm
                ">

                    <div className="
                        border-b
                        border-[var(--border)]
                        px-5
                        py-4
                    ">

                        <h3 className="
                            text-base
                            font-semibold
                            text-[var(--text)]
                        ">

                            Account Information

                        </h3>


                        <p className="
                            mt-0.5
                            text-xs
                            text-[var(--text-muted)]
                        ">

                            Customer account details

                        </p>

                    </div>


                    <div className="
                        grid
                        gap-x-10
                        gap-y-6
                        p-5
                        sm:grid-cols-2
                    ">


                        {/* FIRST NAME */}

                        <div>

                            <p className="
                                text-xs
                                font-medium
                                text-[var(--text-muted)]
                            ">

                                First Name

                            </p>


                            <p className="
                                mt-1
                                text-sm
                                font-semibold
                                text-[var(--text)]
                            ">

                                {customer.firstName ||
                                    "—"}

                            </p>

                        </div>


                        {/* LAST NAME */}

                        <div>

                            <p className="
                                text-xs
                                font-medium
                                text-[var(--text-muted)]
                            ">

                                Last Name

                            </p>


                            <p className="
                                mt-1
                                text-sm
                                font-semibold
                                text-[var(--text)]
                            ">

                                {customer.lastName ||
                                    "—"}

                            </p>

                        </div>


                        {/* EMAIL */}

                        <div>

                            <p className="
                                text-xs
                                font-medium
                                text-[var(--text-muted)]
                            ">

                                Email Address

                            </p>


                            <p className="
                                mt-1
                                break-all
                                text-sm
                                font-semibold
                                text-[var(--text)]
                            ">

                                {customer.email ||
                                    "—"}

                            </p>

                        </div>


                        {/* PHONE */}

                        <div>

                            <p className="
                                text-xs
                                font-medium
                                text-[var(--text-muted)]
                            ">

                                Phone

                            </p>


                            <p className="
                                mt-1
                                text-sm
                                font-semibold
                                text-[var(--text)]
                            ">

                                {mobile}

                            </p>

                        </div>


                        {/* VERIFICATION */}

                        <div>

                            <p className="
                                text-xs
                                font-medium
                                text-[var(--text-muted)]
                            ">

                                Verification

                            </p>


                            <div className="mt-1">

                                <StatusBadge
                                    status={
                                        customer.isVerified
                                            ? "Verified"
                                            : "Unverified"
                                    }
                                />

                            </div>

                        </div>


                        {/* ACCOUNT TYPE */}

                        <div>

                            <p className="
                                text-xs
                                font-medium
                                text-[var(--text-muted)]
                            ">

                                Account Type

                            </p>


                            <p className="
                                mt-1
                                text-sm
                                font-semibold
                                capitalize
                                text-[var(--text)]
                            ">

                                {customer.role ||
                                    "User"}

                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================
                    CUSTOMER ACTIVITY
                ================================= */}

                <div className="
                    overflow-hidden
                    rounded-[var(--radius-lg)]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    shadow-sm
                ">

                    <div className="
                        border-b
                        border-[var(--border)]
                        px-5
                        py-4
                    ">

                        <h3 className="
                            text-base
                            font-semibold
                            text-[var(--text)]
                        ">

                            Customer Activity

                        </h3>


                        <p className="
                            mt-0.5
                            text-xs
                            text-[var(--text-muted)]
                        ">

                            Account activity overview

                        </p>

                    </div>


                    <div>


                        {/* JOINED */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            border-b
                            border-[var(--border)]
                            px-5
                            py-4
                        ">

                            <div>

                                <p className="
                                    text-xs
                                    text-[var(--text-muted)]
                                ">

                                    Joined

                                </p>


                                <p className="
                                    mt-1
                                    text-sm
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {formatDate(
                                        customer.createdAt
                                    )}

                                </p>

                            </div>


                            <span className="
                                text-xs
                                text-[var(--text-muted)]
                            ">

                                Account created

                            </span>

                        </div>


                        {/* UPDATED */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            border-b
                            border-[var(--border)]
                            px-5
                            py-4
                        ">

                            <div>

                                <p className="
                                    text-xs
                                    text-[var(--text-muted)]
                                ">

                                    Last Updated

                                </p>


                                <p className="
                                    mt-1
                                    text-sm
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {formatDate(
                                        customer.updatedAt
                                    )}

                                </p>

                            </div>


                            <span className="
                                text-xs
                                text-[var(--text-muted)]
                            ">

                                Profile activity

                            </span>

                        </div>


                        {/* PENDING */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            px-5
                            py-4
                        ">

                            <div>

                                <p className="
                                    text-xs
                                    text-[var(--text-muted)]
                                ">

                                    Pending Orders

                                </p>


                                <p className="
                                    mt-1
                                    text-sm
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {pendingOrders}

                                </p>

                            </div>


                            <StatusBadge
                                status={
                                    pendingOrders > 0
                                        ? "Pending"
                                        : "Clear"
                                }
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================
                RECENT ORDERS
            ================================= */}

            <div className="
                overflow-hidden
                rounded-[var(--radius-lg)]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                shadow-sm
            ">


                {/* HEADER */}

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-[var(--border)]
                    px-5
                    py-4
                ">

                    <div>

                        <h3 className="
                            text-base
                            font-semibold
                            text-[var(--text)]
                        ">

                            Recent Orders

                        </h3>


                        <p className="
                            mt-0.5
                            text-xs
                            text-[var(--text-muted)]
                        ">

                            Latest orders placed by this customer.

                        </p>

                    </div>


                    <span className="
                        shrink-0
                        text-xs
                        font-medium
                        text-[var(--text-muted)]
                    ">

                        {orders.length}{" "}
                        {orders.length === 1
                            ? "order"
                            : "orders"}

                    </span>

                </div>


                {/* ORDERS */}

                {orders.length === 0 ? (

                    <div className="
                        flex
                        min-h-[150px]
                        items-center
                        justify-center
                        px-5
                        py-10
                        text-center
                    ">

                        <div>

                            <p className="
                                text-sm
                                font-medium
                                text-[var(--text)]
                            ">

                                No orders yet

                            </p>


                            <p className="
                                mt-1
                                text-xs
                                text-[var(--text-muted)]
                            ">

                                This customer hasn't placed
                                any orders yet.

                            </p>

                        </div>

                    </div>

                ) : (

                    <div>

                        {orders
                            .slice(0, 5)
                            .map(
                                (
                                    order,
                                    index
                                ) => (

                                    <button
                                        key={
                                            order._id ||
                                            index
                                        }
                                        type="button"
                                        onClick={() =>
                                            order._id &&
                                            navigate(
                                                `/admin/orders/${order._id}`
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            gap-4
                                            border-b
                                            border-[var(--border)]
                                            px-5
                                            py-4
                                            text-left
                                            transition
                                            last:border-b-0
                                            hover:bg-[var(--surface-hover)]
                                        "
                                    >


                                        {/* LEFT */}

                                        <div className="
                                            min-w-0
                                        ">

                                            <p className="
                                                truncate
                                                text-sm
                                                font-semibold
                                                text-[var(--text)]
                                            ">

                                                {order.orderNumber ||
                                                    order._id ||
                                                    "Order"}

                                            </p>


                                            <p className="
                                                mt-1
                                                text-xs
                                                text-[var(--text-muted)]
                                            ">

                                                {formatDate(
                                                    order.createdAt
                                                )}

                                            </p>

                                        </div>


                                        {/* RIGHT */}

                                        <div className="
                                            flex
                                            shrink-0
                                            items-center
                                            gap-3
                                        ">

                                            <span className="
                                                text-sm
                                                font-semibold
                                                text-[var(--text)]
                                            ">

                                                ₹
                                                {Number(
                                                    order.pricing?.total ||
                                                    order.totalAmount ||
                                                    0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </span>


                                            <StatusBadge
                                                status={
                                                    order.status ||
                                                    "Unknown"
                                                }
                                            />

                                        </div>

                                    </button>

                                )
                            )}

                    </div>

                )}

            </div>

        </section>

    );

};


export default AdminCustomerDetailPage;