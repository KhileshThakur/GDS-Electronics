import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    toast
} from "react-hot-toast";

import {
    getAdminOrders
} from "../services/order.service";

import {
    PageHeader,
    StatusBadge,
    FilterBar,
    StatCard
} from "../../../components/html";

import ActionButtons
    from "../../../components/html/ActionButtons";

import Table
    from "../../../components/ui/Table";
import { IoMdInformationCircle } from "react-icons/io";


const AdminOrderListPage = () => {

    const navigate = useNavigate();


    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("all");

    const [paymentStatus, setPaymentStatus] =
        useState("all");


    /* =================================
       FETCH ORDERS
    ================================= */

    const fetchOrders = async () => {

        try {

            setLoading(true);

            const response =
                await getAdminOrders();

            setOrders(
                response?.data?.orders || []
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch orders"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchOrders();

    }, []);


    /* =================================
       STATS
    ================================= */

    const stats = useMemo(() => {

        return {

            total: orders.length,

            pending:
                orders.filter(
                    order =>
                        order.status === "Pending"
                ).length,

            processing:
                orders.filter(
                    order =>
                        order.status === "Processing"
                ).length,

            delivered:
                orders.filter(
                    order =>
                        order.status === "Delivered"
                ).length

        };

    }, [orders]);


    /* =================================
       COLUMNS
    ================================= */

    const columns = [

        {
            id: "order",
            key: "orderNumber",
            label: "Order",
            minWidth: 180,

            searchValue: order => {

                const customerName = [
                    order.user?.firstName,
                    order.user?.lastName
                ]
                    .filter(Boolean)
                    .join(" ");

                return `
                    ${order.orderNumber || ""}
                    ${customerName}
                    ${order.user?.email || ""}
                `;

            },

            render: order => (

                <div>

                    <p className="
                        font-semibold
                        text-[var(--text)]
                    ">

                        #{order.orderNumber}

                    </p>

                    <p className="
                        mt-0.5
                        text-xs
                        text-[var(--text-muted)]
                    ">

                        {new Date(
                            order.createdAt
                        ).toLocaleDateString(
                            "en-IN"
                        )}

                    </p>

                </div>

            )

        },


        /* ==============================
           CUSTOMER
        ============================== */

        {

            id: "customer",

            key: "user",

            label: "Customer",

            minWidth: 200,

            hideBelow: "md",

            render: order => {

                const customerName = [
                    order.user?.firstName,
                    order.user?.lastName
                ]
                    .filter(Boolean)
                    .join(" ");


                return (

                    <div>

                        <p className="
                            font-medium
                            text-[var(--text)]
                        ">

                            {customerName || "—"}

                        </p>

                        <p className="
                            mt-0.5
                            text-xs
                            text-[var(--text-light)]
                        ">

                            {order.user?.email || "—"}

                        </p>

                    </div>

                );

            }

        },


        /* ==============================
           ITEMS
        ============================== */

        {

            id: "items",

            key: "items",

            label: "Items",

            align: "center",

            hideBelow: "md",

            render: order => (

                <span className="
                    font-medium
                    text-[var(--text)]
                ">

                    {
                        order.items?.reduce(
                            (total, item) =>
                                total +
                                item.quantity,
                            0
                        ) || 0
                    }

                </span>

            )

        },


        /* ==============================
           TOTAL
        ============================== */

        {

            id: "total",

            key: "pricing",

            label: "Total",

            render: order => (

                <span className="
                    font-semibold
                    text-[var(--text)]
                ">

                    ₹
                    {(
                        order.pricing?.total ||
                        0
                    ).toLocaleString("en-IN")}

                </span>

            )

        },


        /* ==============================
           PAYMENT
        ============================== */

        {

            id: "payment",

            key: "payment",

            label: "Payment",

            hideBelow: "lg",

            render: order => (

                <div className="
                    space-y-1
                ">

                    <p className="
                        text-xs
                        font-semibold
                        text-[var(--text)]
                    ">

                        {order.payment?.method || "—"}

                    </p>

                    <StatusBadge
                        status={
                            order.payment?.status ||
                            "Pending"
                        }
                    />

                </div>

            )

        },


        /* ==============================
           STATUS
        ============================== */

        {

            id: "status",

            key: "status",

            label: "Status",

            render: order => (

                <StatusBadge
                    status={
                        order.status ||
                        "Pending"
                    }
                />

            )

        },


        /* ==============================
           DATE
        ============================== */

        {

            id: "date",

            key: "createdAt",

            label: "Date",

            hideBelow: "lg",

            render: order => (

                <span className="
                    text-sm
                    text-[var(--text-light)]
                ">

                    {new Date(
                        order.createdAt
                    ).toLocaleDateString(
                        "en-IN"
                    )}

                </span>

            )

        }

    ];


    /* =================================
       FILTERS
    ================================= */

    const hasActiveFilters =
        search ||
        status !== "all" ||
        paymentStatus !== "all";


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


            {/* HEADER */}

            <PageHeader
                eyebrow="ADMIN"
                title="Orders"
                subtitle="Manage customer orders."
            />


            {/* STATS */}

            <div className="
                grid
                grid-cols-2
                gap-3
                lg:grid-cols-4
            ">

                <StatCard
                    label="Total Orders"
                    value={stats.total}
                    accent="blue"
                />

                <StatCard
                    label="Pending"
                    value={stats.pending}
                    accent="yellow"
                />

                <StatCard
                    label="Processing"
                    value={stats.processing}
                    accent="blue"
                />

                <StatCard
                    label="Delivered"
                    value={stats.delivered}
                    accent="green"
                />

            </div>


            {/* TABLE */}

            <div className="
                overflow-hidden
                rounded-[var(--radius-md)]
                border
                border-[var(--border)]
                bg-[var(--surface)]
            ">


                <FilterBar

                    search={{
                        value: search,

                        onChange: setSearch,

                        placeholder:
                            "Search orders or customers..."
                    }}


                    filters={[

                        {
                            key: "status",

                            value: status,

                            onChange: setStatus,

                            placeholder:
                                "All Status",

                            options: [

                                {
                                    value: "pending",
                                    label: "Pending"
                                },

                                {
                                    value: "confirmed",
                                    label: "Confirmed"
                                },

                                {
                                    value: "processing",
                                    label: "Processing"
                                },

                                {
                                    value: "shipped",
                                    label: "Shipped"
                                },

                                {
                                    value: "delivered",
                                    label: "Delivered"
                                },

                                {
                                    value: "cancelled",
                                    label: "Cancelled"
                                },

                                {
                                    value: "returned",
                                    label: "Returned"
                                }

                            ]

                        },


                        {

                            key: "paymentStatus",

                            value: paymentStatus,

                            onChange:
                                setPaymentStatus,

                            placeholder:
                                "All Payments",

                            options: [

                                {
                                    value: "pending",
                                    label:
                                        "Payment Pending"
                                },

                                {
                                    value: "paid",
                                    label: "Paid"
                                },

                                {
                                    value: "failed",
                                    label: "Failed"
                                },

                                {
                                    value: "refunded",
                                    label: "Refunded"
                                }

                            ]

                        }

                    ]}


                    showClear={
                        hasActiveFilters
                    }


                    onClear={() => {

                        setSearch("");

                        setStatus("all");

                        setPaymentStatus("all");

                    }}

                />


                <Table

                    columns={columns}

                    data={orders}

                    loading={loading}

                    serialNumber

                    rowKey="_id"

                    pageSize={10}

                    persistKey="admin-orders"

                    dense

                    searchable

                    searchValue={search}

                    toolbar={{

                        title:
                            "Order Catalog",

                        description:
                            count =>
                                `${count} ${count === 1
                                    ? "order"
                                    : "orders"
                                }`

                    }}

                    emptyTitle="No Orders Found"

                    emptyDescription={
                        "Customer orders will appear here."
                    }


                    renderActions={
                        order => (

                            <ActionButtons

                                onEdit={() =>
                                    navigate(
                                        `/admin/orders/${order._id}`
                                    )
                                }
                                onDelete={() => {
                                    toast("You Cannot Delete Order.", {
                                        icon: <IoMdInformationCircle />
                                    });
                                }}

                            />

                        )
                    }

                />

            </div>

        </section>

    );

};


export default AdminOrderListPage;