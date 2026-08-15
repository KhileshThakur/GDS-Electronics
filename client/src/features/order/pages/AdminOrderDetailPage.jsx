import {
    useEffect,
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
    getAdminOrder,
    updateAdminOrderStatus
} from "../services/order.service";

import {
    PageHeader,
    StatusBadge
} from "../../../components/html";

import Button
    from "../../../components/ui/Button";

import Select
    from "../../../components/ui/Select";

import Textarea
    from "../../../components/ui/Textarea";


const AdminOrderDetailPage = () => {

    const {
        id
    } = useParams();

    const navigate =
        useNavigate();


    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [updating, setUpdating] =
        useState(false);


    const [status, setStatus] =
        useState("");

    const [note, setNote] =
        useState("");


    /* =================================
       FETCH ORDER
    ================================= */

    const fetchOrder = async () => {

        try {

            setLoading(true);

            const response =
                await getAdminOrder(id);

            const orderData =
                response?.data;

            setOrder(orderData);

            setStatus(
                orderData?.status || ""
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch order"
            );

            navigate("/admin/orders");

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (id) {
            fetchOrder();
        }

    }, [id]);


    /* =================================
       UPDATE STATUS
    ================================= */

    const handleStatusUpdate =
        async () => {

            if (!order || !status) {
                return;
            }


            if (status === order.status) {

                toast.error(
                    "Order is already in this status"
                );

                return;

            }


            try {

                setUpdating(true);

                const response =
                    await updateAdminOrderStatus(
                        order._id,
                        {
                            status,
                            note
                        }
                    );


                toast.success(
                    response?.message ||
                    "Order status updated"
                );


                setNote("");

                setOrder(
                    response?.data ||
                    order
                );

            }
            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to update order status"
                );

                setStatus(
                    order.status
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

            <div className="
                flex
                min-h-[420px]
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

                    Loading order...

                </div>

            </div>

        );

    }


    if (!order) {
        return null;
    }


    /* =================================
       CUSTOMER
    ================================= */

    const customerName = [
        order.user?.firstName,
        order.user?.lastName
    ]
        .filter(Boolean)
        .join(" ");


    const customerPhone =
        order.user?.phone?.number ||
        order.shippingAddress?.mobile ||
        "—";


    /* =================================
       ITEMS
    ================================= */

    const totalItems =
        order.items?.reduce(
            (total, item) =>
                total + item.quantity,
            0
        ) || 0;


    /* =================================
       STATUS OPTIONS
    ================================= */

    const statusOptions = [

        {
            value: "Pending",
            label: "Pending"
        },

        {
            value: "Confirmed",
            label: "Confirmed"
        },

        {
            value: "Processing",
            label: "Processing"
        },

        {
            value: "Shipped",
            label: "Shipped"
        },

        {
            value: "Delivered",
            label: "Delivered"
        }

    ];


    /* =================================
       HELPERS
    ================================= */

    const formatDate = (
        date,
        withTime = false
    ) => {

        if (!date) {
            return "—";
        }


        return new Date(
            date
        ).toLocaleString(
            "en-IN",
            withTime
                ? {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
                : {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
        );

    };


    const formatCurrency = (
        value
    ) => {

        return `₹${(
            Number(value) || 0
        ).toLocaleString("en-IN")}`;

    };


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
                HEADER
            ================================= */}

            <div className="
                flex
                flex-col
                gap-3
                rounded-[var(--radius-md)]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-4
                py-3
                shadow-[var(--shadow)]
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <Button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/orders"
                            )
                        }
                        className="
                            !h-9
                            !px-3
                            !text-sm
                        "
                    >
                        ← Back
                    </Button>


                    <div>

                        <div className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                        ">

                            <h1 className="
                                text-lg
                                font-bold
                                text-[var(--text)]
                                sm:text-xl
                            ">

                                #{order.orderNumber}

                            </h1>

                            <StatusBadge
                                status={
                                    order.status
                                }
                            />

                        </div>


                        <p className="
                            mt-0.5
                            text-xs
                            text-[var(--text-light)]
                        ">

                            Placed on{" "}

                            {formatDate(
                                order.createdAt,
                                true
                            )}

                        </p>

                    </div>

                </div>


                <div className="
                    flex
                    items-center
                    gap-2
                    text-sm
                ">

                    <span className="
                        text-[var(--text-light)]
                    ">

                        {totalItems}{" "}
                        {totalItems === 1
                            ? "item"
                            : "items"}

                    </span>

                    <span className="
                        font-bold
                        text-[var(--text)]
                    ">

                        {formatCurrency(
                            order.pricing?.total
                        )}

                    </span>

                </div>

            </div>


            {/* =================================
                STATUS PROGRESS
            ================================= */}

            <div className="
                overflow-x-auto
                rounded-[var(--radius-md)]
                border
                border-[var(--border)]
                bg-[var(--surface)]
                px-4
                py-3
            ">

                <div className="
                    flex
                    min-w-[620px]
                    items-center
                ">

                    {statusOptions.map(
                        (item, index) => {

                            const currentIndex =
                                statusOptions.findIndex(
                                    option =>
                                        option.value ===
                                        order.status
                                );

                            const completed =
                                index <= currentIndex;


                            return (

                                <div
                                    key={
                                        item.value
                                    }
                                    className="
                                        flex
                                        flex-1
                                        items-center
                                    "
                                >

                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                    ">

                                        <div
                                            className={`
                                                flex
                                                h-7
                                                w-7
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                border
                                                text-xs
                                                font-bold

                                                ${
                                                    completed
                                                        ? `
                                                            border-[var(--primary)]
                                                            bg-[var(--primary)]
                                                            text-white
                                                        `
                                                        : `
                                                            border-[var(--border)]
                                                            bg-[var(--background)]
                                                            text-[var(--text-muted)]
                                                        `
                                                }
                                            `}
                                        >

                                            {index < currentIndex
                                                ? "✓"
                                                : index + 1}

                                        </div>


                                        <span
                                            className={`
                                                whitespace-nowrap
                                                text-xs
                                                font-semibold

                                                ${
                                                    completed
                                                        ? "text-[var(--text)]"
                                                        : "text-[var(--text-muted)]"
                                                }
                                            `}
                                        >

                                            {item.label}

                                        </span>

                                    </div>


                                    {index <
                                        statusOptions.length - 1 && (

                                        <div
                                            className={`
                                                mx-3
                                                h-px
                                                flex-1

                                                ${
                                                    index <
                                                    currentIndex
                                                        ? "bg-[var(--primary)]"
                                                        : "bg-[var(--border)]"
                                                }
                                            `}
                                        />

                                    )}

                                </div>

                            );

                        }
                    )}

                </div>

            </div>


            {/* =================================
                MAIN GRID
            ================================= */}

            <div className="
                grid
                gap-4
                xl:grid-cols-[minmax(0,1fr)_340px]
            ">


                {/* =================================
                    LEFT
                ================================= */}

                <div className="
                    space-y-4
                ">


                    {/* ITEMS */}

                    <div className="
                        overflow-hidden
                        rounded-[var(--radius-md)]
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-[var(--border)]
                            px-4
                            py-3
                        ">

                            <div>

                                <h2 className="
                                    text-sm
                                    font-bold
                                    text-[var(--text)]
                                ">

                                    Order Items

                                </h2>

                                <p className="
                                    mt-0.5
                                    text-xs
                                    text-[var(--text-light)]
                                ">

                                    {totalItems}{" "}
                                    items in this order

                                </p>

                            </div>


                            <span className="
                                text-sm
                                font-bold
                                text-[var(--text)]
                            ">

                                {formatCurrency(
                                    order.pricing?.subtotal
                                )}

                            </span>

                        </div>


                        <div className="
                            divide-y
                            divide-[var(--border)]
                        ">

                            {(order.items || [])
                                .map(
                                    (item, index) => (

                                        <div
                                            key={
                                                item._id ||
                                                item.product ||
                                                index
                                            }
                                            className="
                                                flex
                                                gap-3
                                                px-4
                                                py-3
                                            "
                                        >

                                            {/* IMAGE */}

                                            <div className="
                                                h-16
                                                w-16
                                                shrink-0
                                                overflow-hidden
                                                rounded-[var(--radius-sm)]
                                                border
                                                border-[var(--border)]
                                                bg-[var(--background)]
                                            ">

                                                {item.image ? (

                                                    <img
                                                        src={
                                                            item.image
                                                        }
                                                        alt={
                                                            item.name
                                                        }
                                                        className="
                                                            h-full
                                                            w-full
                                                            object-contain
                                                        "
                                                    />

                                                ) : (

                                                    <div className="
                                                        flex
                                                        h-full
                                                        items-center
                                                        justify-center
                                                        text-[10px]
                                                        text-[var(--text-muted)]
                                                    ">

                                                        No image

                                                    </div>

                                                )}

                                            </div>


                                            {/* INFO */}

                                            <div className="
                                                min-w-0
                                                flex-1
                                            ">

                                                <p className="
                                                    text-sm
                                                    font-semibold
                                                    text-[var(--text)]
                                                ">

                                                    {item.name}

                                                </p>


                                                <div className="
                                                    mt-1
                                                    flex
                                                    flex-wrap
                                                    gap-x-3
                                                    gap-y-1
                                                    text-xs
                                                    text-[var(--text-light)]
                                                ">

                                                    <span>
                                                        SKU:{" "}
                                                        {item.sku ||
                                                            "—"}
                                                    </span>

                                                    {item.variantSku && (

                                                        <span>
                                                            Variant:{" "}
                                                            {
                                                                item.variantSku
                                                            }
                                                        </span>

                                                    )}

                                                    <span>
                                                        Qty:{" "}
                                                        {
                                                            item.quantity
                                                        }
                                                    </span>

                                                </div>

                                            </div>


                                            {/* PRICE */}

                                            <div className="
                                                shrink-0
                                                text-right
                                            ">

                                                <p className="
                                                    text-sm
                                                    font-bold
                                                    text-[var(--text)]
                                                ">

                                                    {formatCurrency(
                                                        item.subtotal
                                                    )}

                                                </p>


                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    text-[var(--text-light)]
                                                ">

                                                    {formatCurrency(
                                                        item.discountPrice
                                                    )}{" "}
                                                    ×{" "}
                                                    {
                                                        item.quantity
                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    )
                                )}

                        </div>

                    </div>


                    {/* CUSTOMER + SHIPPING */}

                    <div className="
                        grid
                        gap-4
                        md:grid-cols-2
                    ">


                        {/* CUSTOMER */}

                        <div className="
                            rounded-[var(--radius-md)]
                            border
                            border-[var(--border)]
                            bg-[var(--surface)]
                            p-4
                        ">

                            <h2 className="
                                mb-3
                                text-sm
                                font-bold
                                text-[var(--text)]
                            ">

                                Customer

                            </h2>


                            <div className="
                                space-y-2
                                text-sm
                            ">

                                <div>

                                    <p className="
                                        font-semibold
                                        text-[var(--text)]
                                    ">

                                        {customerName || "—"}

                                    </p>

                                    <p className="
                                        text-xs
                                        text-[var(--text-light)]
                                    ">

                                        {order.user?.email ||
                                            "—"}

                                    </p>

                                </div>


                                <div className="
                                    border-t
                                    border-[var(--border)]
                                    pt-2
                                    text-xs
                                    text-[var(--text-light)]
                                ">

                                    <p>
                                        Phone:{" "}
                                        <span className="
                                            font-medium
                                            text-[var(--text)]
                                        ">
                                            {customerPhone}
                                        </span>
                                    </p>

                                    <p className="mt-1">

                                        Customer ID:{" "}

                                        <span className="
                                            font-mono
                                            text-[10px]
                                        ">

                                            {order.user?._id ||
                                                "—"}

                                        </span>

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* SHIPPING */}

                        <div className="
                            rounded-[var(--radius-md)]
                            border
                            border-[var(--border)]
                            bg-[var(--surface)]
                            p-4
                        ">

                            <h2 className="
                                mb-3
                                text-sm
                                font-bold
                                text-[var(--text)]
                            ">

                                Shipping Address

                            </h2>


                            <div className="
                                text-sm
                                leading-6
                                text-[var(--text-light)]
                            ">

                                <p className="
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {
                                        order.shippingAddress
                                            ?.fullName ||
                                        "—"
                                    }

                                </p>

                                <p>
                                    {
                                        order.shippingAddress
                                            ?.addressLine1
                                    }
                                </p>

                                {order.shippingAddress
                                    ?.addressLine2 && (

                                    <p>
                                        {
                                            order.shippingAddress
                                                .addressLine2
                                        }
                                    </p>

                                )}

                                {order.shippingAddress
                                    ?.landmark && (

                                    <p>
                                        Landmark:{" "}
                                        {
                                            order.shippingAddress
                                                .landmark
                                        }
                                    </p>

                                )}

                                <p>

                                    {
                                        order.shippingAddress
                                            ?.city
                                    }
                                    ,{" "}
                                    {
                                        order.shippingAddress
                                            ?.state
                                    }

                                </p>

                                <p>

                                    {
                                        order.shippingAddress
                                            ?.country ||
                                        "India"
                                    }{" "}

                                    -{" "}

                                    {
                                        order.shippingAddress
                                            ?.pincode
                                    }

                                </p>

                                <p className="
                                    mt-1
                                    font-medium
                                    text-[var(--text)]
                                ">

                                    Mobile:{" "}
                                    {
                                        order.shippingAddress
                                            ?.mobile ||
                                        "—"
                                    }

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* TIMELINE */}

                    <div className="
                        rounded-[var(--radius-md)]
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        p-4
                    ">

                        <div className="
                            mb-4
                            flex
                            items-center
                            justify-between
                        ">

                            <h2 className="
                                text-sm
                                font-bold
                                text-[var(--text)]
                            ">

                                Order Timeline

                            </h2>


                            <span className="
                                text-xs
                                text-[var(--text-muted)]
                            ">

                                {
                                    order.timeline?.length ||
                                    0
                                }{" "}
                                updates

                            </span>

                        </div>


                        {order.timeline?.length ? (

                            <div className="
                                relative
                                space-y-4
                            ">

                                {[
                                    ...order.timeline
                                ]
                                    .reverse()
                                    .map(
                                        (
                                            event,
                                            index
                                        ) => (

                                            <div
                                                key={
                                                    `${event.status}-${event.updatedAt}-${index}`
                                                }
                                                className="
                                                    relative
                                                    flex
                                                    gap-3
                                                "
                                            >

                                                <div className="
                                                    relative
                                                    flex
                                                    w-5
                                                    shrink-0
                                                    justify-center
                                                ">

                                                    <span className="
                                                        mt-1.5
                                                        h-2.5
                                                        w-2.5
                                                        rounded-full
                                                        bg-[var(--primary)]
                                                        ring-4
                                                        ring-[var(--primary-soft)]"
                                                    />

                                                </div>


                                                <div className="
                                                    min-w-0
                                                    flex-1
                                                ">

                                                    <div className="
                                                        flex
                                                        flex-wrap
                                                        items-center
                                                        justify-between
                                                        gap-2
                                                    ">

                                                        <StatusBadge
                                                            status={
                                                                event.status
                                                            }
                                                        />

                                                        <span className="
                                                            text-xs
                                                            text-[var(--text-muted)]
                                                        ">

                                                            {formatDate(
                                                                event.updatedAt,
                                                                true
                                                            )}

                                                        </span>

                                                    </div>


                                                    {event.note && (

                                                        <p className="
                                                            mt-2
                                                            rounded
                                                            bg-[var(--background)]
                                                            px-3
                                                            py-2
                                                            text-xs
                                                            leading-5
                                                            text-[var(--text-light)]
                                                        ">

                                                            {
                                                                event.note
                                                            }

                                                        </p>

                                                    )}

                                                </div>

                                            </div>

                                        )
                                    )}

                            </div>

                        ) : (

                            <p className="
                                text-sm
                                text-[var(--text-muted)]
                            ">

                                No timeline updates yet.

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================
                    RIGHT
                ================================= */}

                <div className="
                    space-y-4
                ">


                    {/* UPDATE STATUS */}

                    <div className="
                        rounded-[var(--radius-md)]
                        border
                        border-[var(--primary)]/20
                        bg-[var(--primary-soft)]
                        p-4
                    ">

                        <div className="
                            mb-3
                        ">

                            <h2 className="
                                text-sm
                                font-bold
                                text-[var(--text)]
                            ">

                                Update Order

                            </h2>

                            <p className="
                                mt-0.5
                                text-xs
                                text-[var(--text-light)]
                            ">

                                Move the order to its next stage.

                            </p>

                        </div>


                        <div className="
                            space-y-3
                        ">

                            <Select
                                label="Status"
                                value={status}
                                onChange={e =>
                                    setStatus(
                                        e.target.value
                                    )
                                }
                            >

                                {statusOptions.map(
                                    option => (

                                        <option
                                            key={
                                                option.value
                                            }
                                            value={
                                                option.value
                                            }
                                        >

                                            {
                                                option.label
                                            }

                                        </option>

                                    )
                                )}

                            </Select>


                            <Textarea
                                label="Note"
                                placeholder="Optional note..."
                                value={note}
                                onChange={e =>
                                    setNote(
                                        e.target.value
                                    )
                                }
                                className="
                                    min-h-[80px]
                                "
                            />


                            <Button
                                type="button"
                                disabled={
                                    updating ||
                                    status ===
                                    order.status
                                }
                                onClick={
                                    handleStatusUpdate
                                }
                                className="
                                    w-full
                                "
                            >

                                {updating
                                    ? "Updating..."
                                    : "Update Status"}

                            </Button>

                        </div>

                    </div>


                    {/* PAYMENT */}

                    <div className="
                        rounded-[var(--radius-md)]
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        p-4
                    ">

                        <h2 className="
                            mb-3
                            text-sm
                            font-bold
                            text-[var(--text)]
                        ">

                            Payment

                        </h2>


                        <div className="
                            space-y-3
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">

                                <span className="
                                    text-xs
                                    text-[var(--text-light)]
                                ">
                                    Method
                                </span>

                                <span className="
                                    text-sm
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {
                                        order.payment
                                            ?.method ||
                                        "—"
                                    }

                                </span>

                            </div>


                            <div className="
                                flex
                                items-center
                                justify-between
                            ">

                                <span className="
                                    text-xs
                                    text-[var(--text-light)]
                                ">
                                    Status
                                </span>

                                <StatusBadge
                                    status={
                                        order.payment
                                            ?.status ||
                                        "Pending"
                                    }
                                />

                            </div>


                            {order.payment
                                ?.transactionId && (

                                <div className="
                                    border-t
                                    border-[var(--border)]
                                    pt-3
                                ">

                                    <p className="
                                        text-[10px]
                                        uppercase
                                        tracking-wide
                                        text-[var(--text-muted)]
                                    ">

                                        Transaction ID

                                    </p>

                                    <p className="
                                        mt-1
                                        break-all
                                        font-mono
                                        text-xs
                                        text-[var(--text)]
                                    ">

                                        {
                                            order.payment
                                                .transactionId
                                        }

                                    </p>

                                </div>

                            )}


                            {order.payment
                                ?.razorpayPaymentId && (

                                <div>

                                    <p className="
                                        text-[10px]
                                        uppercase
                                        tracking-wide
                                        text-[var(--text-muted)]
                                    ">

                                        Razorpay Payment

                                    </p>

                                    <p className="
                                        mt-1
                                        break-all
                                        font-mono
                                        text-xs
                                        text-[var(--text)]
                                    ">

                                        {
                                            order.payment
                                                .razorpayPaymentId
                                        }

                                    </p>

                                </div>

                            )}

                        </div>

                    </div>


                    {/* PRICE SUMMARY */}

                    <div className="
                        rounded-[var(--radius-md)]
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        p-4
                    ">

                        <h2 className="
                            mb-3
                            text-sm
                            font-bold
                            text-[var(--text)]
                        ">

                            Price Summary

                        </h2>


                        <div className="
                            space-y-2.5
                            text-sm
                        ">

                            <div className="
                                flex
                                justify-between
                            ">

                                <span className="
                                    text-[var(--text-light)]
                                ">
                                    Subtotal
                                </span>

                                <span className="
                                    font-medium
                                    text-[var(--text)]
                                ">

                                    {formatCurrency(
                                        order.pricing
                                            ?.subtotal
                                    )}

                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                            ">

                                <span className="
                                    text-[var(--text-light)]
                                ">
                                    Shipping
                                </span>

                                <span className="
                                    font-medium
                                    text-[var(--text)]
                                ">

                                    {formatCurrency(
                                        order.pricing
                                            ?.shipping
                                    )}

                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                            ">

                                <span className="
                                    text-[var(--text-light)]
                                ">
                                    Tax
                                </span>

                                <span className="
                                    font-medium
                                    text-[var(--text)]
                                ">

                                    {formatCurrency(
                                        order.pricing
                                            ?.tax
                                    )}

                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                            ">

                                <span className="
                                    text-[var(--text-light)]
                                ">
                                    Discount
                                </span>

                                <span className="
                                    font-medium
                                    text-[var(--success)]
                                ">

                                    -{" "}
                                    {formatCurrency(
                                        order.pricing
                                            ?.discount
                                    )}

                                </span>

                            </div>


                            <div className="
                                mt-3
                                flex
                                items-center
                                justify-between
                                border-t
                                border-[var(--border)]
                                pt-3
                            ">

                                <span className="
                                    font-bold
                                    text-[var(--text)]
                                ">
                                    Total
                                </span>

                                <span className="
                                    text-lg
                                    font-bold
                                    text-[var(--primary)]
                                ">

                                    {formatCurrency(
                                        order.pricing
                                            ?.total
                                    )}

                                </span>

                            </div>

                        </div>

                    </div>


                    {/* DELIVERY */}

                    <div className="
                        rounded-[var(--radius-md)]
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        p-4
                    ">

                        <h2 className="
                            mb-3
                            text-sm
                            font-bold
                            text-[var(--text)]
                        ">

                            Delivery

                        </h2>


                        <div className="
                            space-y-2
                            text-sm
                        ">

                            <div className="
                                flex
                                justify-between
                                gap-3
                            ">

                                <span className="
                                    text-xs
                                    text-[var(--text-light)]
                                ">

                                    Estimated delivery

                                </span>

                                <span className="
                                    text-right
                                    text-xs
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {
                                        order.estimatedDelivery
                                            ? formatDate(
                                                order.estimatedDelivery
                                            )
                                            : "Not set"
                                    }

                                </span>

                            </div>


                            <div className="
                                flex
                                justify-between
                                gap-3
                            ">

                                <span className="
                                    text-xs
                                    text-[var(--text-light)]
                                ">

                                    Last updated

                                </span>

                                <span className="
                                    text-right
                                    text-xs
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {formatDate(
                                        order.updatedAt,
                                        true
                                    )}

                                </span>

                            </div>

                        </div>

                    </div>


                    {/* NOTES */}

                    {order.notes && (

                        <div className="
                            rounded-[var(--radius-md)]
                            border
                            border-[var(--warning)]/30
                            bg-[var(--warning)]/5
                            p-4
                        ">

                            <h2 className="
                                mb-2
                                text-sm
                                font-bold
                                text-[var(--text)]
                            ">

                                Order Notes

                            </h2>

                            <p className="
                                text-xs
                                leading-5
                                text-[var(--text-light)]
                            ">

                                {order.notes}

                            </p>

                        </div>

                    )}

                </div>

            </div>

        </section>

    );

};


export default AdminOrderDetailPage;