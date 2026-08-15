import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getAdminDashboard
} from "../services/admin.service";

import {
    PageHeader,
    StatusBadge,
    StatCard
} from "../../../components/html";


// =====================================================
// Constants
// =====================================================

const PERIODS = [
    {
        value: "today",
        label: "Today"
    },
    {
        value: "yesterday",
        label: "Yesterday"
    },
    {
        value: "7days",
        label: "7 Days"
    },
    {
        value: "1month",
        label: "1 Month"
    },
    {
        value: "3month",
        label: "3 Months"
    },
    {
        value: "9month",
        label: "9 Months"
    },
    {
        value: "1year",
        label: "1 Year"
    }
];


// =====================================================
// Helpers
// =====================================================

const formatCurrency = (
    value = 0
) =>
    new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(value);


const formatNumber = (
    value = 0
) =>
    new Intl.NumberFormat(
        "en-IN"
    ).format(value);


const getOrderStatus = (
    status
) => {

    if (!status) {
        return "Unknown";
    }

    return status;

};


// =====================================================
// Mini Section Header
// =====================================================

const SectionHeader = ({
    title,
    description,
    action,
    onAction
}) => (

    <div className="
        flex
        items-center
        justify-between
        gap-4
        border-b
        border-[var(--border)]
        px-4
        py-3
        sm:px-5
    ">

        <div className="
            min-w-0
        ">

            <h2 className="
                text-sm
                font-semibold
                text-[var(--text)]
            ">

                {title}

            </h2>

            {description && (

                <p className="
                    mt-0.5
                    text-[11px]
                    text-[var(--text-muted)]
                ">

                    {description}

                </p>

            )}

        </div>

        {action && (

            <button
                type="button"
                onClick={onAction}
                className="
                    shrink-0
                    text-xs
                    font-semibold
                    text-[var(--primary)]
                    hover:underline
                "
            >

                {action}

            </button>

        )}

    </div>

);


// =====================================================
// Sales Chart
// =====================================================

const SalesChart = ({
    sales
}) => {

    const values =
        sales?.values || [];

    const labels =
        sales?.labels || [];

    const maxSale =
        Math.max(
            ...values,
            1
        );


    if (!values.length) {

        return (

            <div className="
                flex
                h-[230px]
                items-center
                justify-center
                text-xs
                text-[var(--text-muted)]
            ">

                No sales data available

            </div>

        );

    }


    return (

        <div className="
            flex
            h-[230px]
            items-end
            gap-2
            border-b
            border-[var(--border)]
            px-2
            pt-6
            sm:gap-4
        ">

            {values.map(
                (
                    value,
                    index
                ) => {

                    const height =
                        Math.max(
                            (
                                value /
                                maxSale
                            ) * 100,
                            5
                        );


                    return (

                        <div
                            key={
                                `${labels[index]}-${index}`
                            }
                            className="
                                group
                                flex
                                h-full
                                min-w-0
                                flex-1
                                flex-col
                                justify-end
                            "
                        >

                            <div className="
                                relative
                                flex
                                h-full
                                items-end
                                justify-center
                            ">

                                <div
                                    className="
                                        w-full
                                        max-w-12
                                        bg-[var(--primary)]
                                        transition
                                        group-hover:bg-[var(--secondary)]
                                    "
                                    style={{
                                        height:
                                            `${height}%`
                                    }}
                                >

                                    <span className="
                                        absolute
                                        -top-5
                                        left-1/2
                                        hidden
                                        -translate-x-1/2
                                        whitespace-nowrap
                                        text-[10px]
                                        font-semibold
                                        text-[var(--text)]
                                        group-hover:block
                                    ">

                                        {formatCurrency(
                                            value
                                        )}

                                    </span>

                                </div>

                            </div>

                            <p className="
                                mt-2
                                truncate
                                text-center
                                text-[10px]
                                text-[var(--text-muted)]
                            ">

                                {labels[index]}

                            </p>

                        </div>

                    );

                }
            )}

        </div>

    );

};


// =====================================================
// Order Summary
// =====================================================

const OrderSummary = ({
    orders
}) => {

    const total =
        Number(
            orders?.total || 0
        );


    const statuses = [

        {
            label: "Delivered",
            value:
                orders?.statuses?.delivered || 0,
            className:
                "bg-emerald-500"
        },

        {
            label: "Processing",
            value:
                orders?.statuses?.processing || 0,
            className:
                "bg-amber-500"
        },

        {
            label: "Shipped",
            value:
                orders?.statuses?.shipped || 0,
            className:
                "bg-[var(--primary)]"
        },

        {
            label: "Cancelled",
            value:
                orders?.statuses?.cancelled || 0,
            className:
                "bg-red-500"
        }

    ];


    return (

        <div className="
            space-y-4
            p-4
            sm:p-5
        ">

            {statuses.map(
                status => {

                    const percentage =
                        total
                            ? Math.round(
                                (
                                    status.value /
                                    total
                                ) * 100
                            )
                            : 0;


                    return (

                        <div
                            key={
                                status.label
                            }
                        >

                            <div className="
                                mb-1.5
                                flex
                                items-center
                                justify-between
                            ">

                                <span className="
                                    text-[11px]
                                    text-[var(--text-muted)]
                                ">

                                    {status.label}

                                </span>

                                <span className="
                                    text-xs
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {formatNumber(
                                        status.value
                                    )}

                                </span>

                            </div>


                            <div className="
                                h-1.5
                                overflow-hidden
                                bg-[var(--background)]
                            ">

                                <div
                                    className={`
                                        h-full
                                        ${status.className}
                                    `}
                                    style={{
                                        width:
                                            `${percentage}%`
                                    }}
                                />

                            </div>

                        </div>

                    );

                }
            )}

        </div>

    );

};


// =====================================================
// E-commerce Dashboard
// =====================================================

const EcommerceDashboard = ({
    data
}) => {

    const navigate =
        useNavigate();


    const summary =
        data?.summary || {};

    const sales =
        data?.sales || {};

    const orders =
        data?.orders || {};

    const topProducts =
        data?.topProducts || [];

    const recentOrders =
        data?.recentOrders || [];


    return (

        <div className="
            space-y-3
        ">


            {/* =========================================
                SUMMARY
            ========================================= */}

            <div className="
                grid
                grid-cols-2
                gap-3
                xl:grid-cols-4
            ">

                <StatCard
                    label="Revenue"
                    value={
                        formatCurrency(
                            summary.revenue
                        )
                    }
                    accent="blue"
                />

                <StatCard
                    label="Orders"
                    value={
                        formatNumber(
                            summary.orders
                        )
                    }
                    accent="purple"
                />

                <StatCard
                    label="Customers"
                    value={
                        formatNumber(
                            summary.customers
                        )
                    }
                    accent="green"
                />

                <StatCard
                    label="Average Order"
                    value={
                        formatCurrency(
                            summary.averageOrderValue
                        )
                    }
                    accent="amber"
                />

            </div>


            {/* =========================================
                SALES + ORDER SUMMARY
            ========================================= */}

            <div className="
                grid
                gap-3
                xl:grid-cols-[1.65fr_0.8fr]
            ">


                {/* SALES */}

                <section className="
                    overflow-hidden
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                ">

                    <SectionHeader
                        title="Sales Overview"
                        description="Revenue performance for the selected period."
                    />

                    <div className="
                        px-4
                        pt-4
                        sm:px-5
                    ">

                        <div className="
                            flex
                            items-end
                            justify-between
                            gap-4
                        ">

                            <div>

                                <p className="
                                    text-[10px]
                                    text-[var(--text-muted)]
                                ">

                                    Total Revenue

                                </p>

                                <p className="
                                    mt-1
                                    text-xl
                                    font-bold
                                    tracking-tight
                                    text-[var(--text)]
                                ">

                                    {formatCurrency(
                                        summary.revenue
                                    )}

                                </p>

                            </div>

                        </div>

                        <SalesChart
                            sales={sales}
                        />

                    </div>

                </section>


                {/* ORDERS */}

                <section className="
                    overflow-hidden
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                ">

                    <SectionHeader
                        title="Order Summary"
                        description={
                            `${formatNumber(
                                orders.total
                            )} total orders`
                        }
                    />

                    <OrderSummary
                        orders={orders}
                    />

                </section>

            </div>


            {/* =========================================
                TOP PRODUCTS + RECENT ORDERS
            ========================================= */}

            <div className="
                grid
                gap-3
                xl:grid-cols-2
            ">


                {/* TOP PRODUCTS */}

                <section className="
                    overflow-hidden
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                ">

                    <SectionHeader
                        title="Top Products"
                        description="Best performing products by revenue."
                        action="View Products"
                        onAction={() =>
                            navigate(
                                "/admin/products"
                            )
                        }
                    />


                    {topProducts.length ? (

                        <div>

                            {topProducts
                                .slice(0, 5)
                                .map(
                                    (
                                        product,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                product.name ||
                                                index
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                border-b
                                                border-[var(--border)]
                                                px-4
                                                py-3
                                                last:border-0
                                                sm:px-5
                                            "
                                        >

                                            <span className="
                                                w-6
                                                shrink-0
                                                text-xs
                                                font-bold
                                                text-[var(--text-muted)]
                                            ">

                                                #{index + 1}

                                            </span>


                                            <div className="
                                                min-w-0
                                                flex-1
                                            ">

                                                <p className="
                                                    truncate
                                                    text-xs
                                                    font-semibold
                                                    text-[var(--text)]
                                                ">

                                                    {
                                                        product.name
                                                    }

                                                </p>

                                                <p className="
                                                    mt-0.5
                                                    text-[10px]
                                                    text-[var(--text-muted)]
                                                ">

                                                    {
                                                        formatNumber(
                                                            product.units
                                                        )
                                                    }{" "}
                                                    units sold

                                                </p>

                                            </div>


                                            <p className="
                                                shrink-0
                                                text-xs
                                                font-semibold
                                                text-[var(--text)]
                                            ">

                                                {formatCurrency(
                                                    product.revenue
                                                )}

                                            </p>

                                        </div>

                                    )
                                )}

                        </div>

                    ) : (

                        <div className="
                            px-5
                            py-10
                            text-center
                            text-xs
                            text-[var(--text-muted)]
                        ">

                            No product data available

                        </div>

                    )}

                </section>


                {/* RECENT ORDERS */}

                <section className="
                    overflow-hidden
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                ">

                    <SectionHeader
                        title="Recent Orders"
                        description="Latest customer orders."
                        action="View Orders"
                        onAction={() =>
                            navigate(
                                "/admin/orders"
                            )
                        }
                    />


                    {recentOrders.length ? (

                        <div className="
                            divide-y
                            divide-[var(--border)]
                        ">

                            {recentOrders
                                .slice(0, 5)
                                .map(
                                    order => (

                                        <button
                                            key={
                                                order.id
                                            }
                                            type="button"
                                            onClick={() =>
                                                order.id &&
                                                navigate(
                                                    `/admin/orders/${order.id}`
                                                )
                                            }
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                gap-3
                                                px-4
                                                py-3
                                                text-left
                                                transition
                                                hover:bg-[var(--background)]
                                                sm:px-5
                                            "
                                        >

                                            <div className="
                                                min-w-0
                                                flex-1
                                            ">

                                                <p className="
                                                    truncate
                                                    text-xs
                                                    font-semibold
                                                    text-[var(--text)]
                                                ">

                                                    {order.id}

                                                </p>

                                                <p className="
                                                    mt-0.5
                                                    truncate
                                                    text-[10px]
                                                    text-[var(--text-muted)]
                                                ">

                                                    {order.customer}

                                                </p>

                                            </div>


                                            <p className="
                                                shrink-0
                                                text-xs
                                                font-semibold
                                                text-[var(--text)]
                                            ">

                                                {formatCurrency(
                                                    order.amount
                                                )}

                                            </p>


                                            <StatusBadge
                                                status={
                                                    getOrderStatus(
                                                        order.status
                                                    )
                                                }
                                            />

                                        </button>

                                    )
                                )}

                        </div>

                    ) : (

                        <div className="
                            px-5
                            py-10
                            text-center
                            text-xs
                            text-[var(--text-muted)]
                        ">

                            No recent orders

                        </div>

                    )}

                </section>

            </div>

        </div>

    );

};


// =====================================================
// Inventory Dashboard
// =====================================================

const InventoryDashboard = ({
    data
}) => {

    const navigate =
        useNavigate();


    const summary =
        data?.summary || {};

    const distribution =
        data?.stockDistribution || {};

    const categories =
        data?.categories || [];

    const lowStockProducts =
        data?.lowStockProducts || [];


    const totalStock =
        (
            distribution.healthy || 0
        ) +
        (
            distribution.low || 0
        ) +
        (
            distribution.outOfStock || 0
        );


    const healthPercentage =
        totalStock
            ? Math.round(
                (
                    distribution.healthy /
                    totalStock
                ) * 100
            )
            : 0;


    const maxStock =
        Math.max(
            ...categories.map(
                item =>
                    Number(
                        item.stock || 0
                    )
            ),
            1
        );


    return (

        <div className="
            space-y-3
        ">


            {/* SUMMARY */}

            <div className="
                grid
                grid-cols-2
                gap-3
                xl:grid-cols-4
            ">

                <StatCard
                    label="Total Products"
                    value={
                        formatNumber(
                            summary.totalProducts
                        )
                    }
                    accent="blue"
                />

                <StatCard
                    label="Healthy Stock"
                    value={
                        formatNumber(
                            summary.healthyStock
                        )
                    }
                    accent="green"
                />

                <StatCard
                    label="Low Stock"
                    value={
                        formatNumber(
                            summary.lowStock
                        )
                    }
                    accent="amber"
                />

                <StatCard
                    label="Out of Stock"
                    value={
                        formatNumber(
                            summary.outOfStock
                        )
                    }
                    accent="red"
                />

            </div>


            {/* CATEGORY + HEALTH */}

            <div className="
                grid
                gap-3
                xl:grid-cols-[1.65fr_0.8fr]
            ">


                {/* CATEGORY STOCK */}

                <section className="
                    overflow-hidden
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                ">

                    <SectionHeader
                        title="Stock by Category"
                        description="Current inventory distribution."
                        action="Manage Inventory"
                        onAction={() =>
                            navigate(
                                "/admin/inventory"
                            )
                        }
                    />


                    <div className="
                        px-4
                        pt-5
                        sm:px-5
                    ">

                        <div className="
                            flex
                            items-end
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-[10px]
                                    text-[var(--text-muted)]
                                ">

                                    Stock Value

                                </p>

                                <p className="
                                    mt-1
                                    text-xl
                                    font-bold
                                    text-[var(--text)]
                                ">

                                    {formatCurrency(
                                        summary.stockValue
                                    )}

                                </p>

                            </div>

                            <p className="
                                text-xs
                                text-[var(--text-muted)]
                            ">

                                {formatNumber(
                                    totalStock
                                )} units

                            </p>

                        </div>


                        {categories.length ? (

                            <div className="
                                mt-5
                                flex
                                h-[220px]
                                items-end
                                gap-2
                                border-b
                                border-[var(--border)]
                                px-1
                                sm:gap-4
                            ">

                                {categories.map(
                                    (
                                        item,
                                        index
                                    ) => {

                                        const stock =
                                            Number(
                                                item.stock || 0
                                            );

                                        const height =
                                            Math.max(
                                                (
                                                    stock /
                                                    maxStock
                                                ) * 100,
                                                5
                                            );


                                        return (

                                            <div
                                                key={
                                                    item.name ||
                                                    index
                                                }
                                                className="
                                                    group
                                                    flex
                                                    h-full
                                                    min-w-0
                                                    flex-1
                                                    flex-col
                                                    justify-end
                                                "
                                            >

                                                <div className="
                                                    relative
                                                    flex
                                                    h-full
                                                    items-end
                                                    justify-center
                                                ">

                                                    <div
                                                        className="
                                                            w-full
                                                            max-w-12
                                                            bg-[var(--primary)]
                                                            transition
                                                            group-hover:bg-[var(--secondary)]
                                                        "
                                                        style={{
                                                            height:
                                                                `${height}%`
                                                        }}
                                                    >

                                                        <span className="
                                                            absolute
                                                            -top-5
                                                            left-1/2
                                                            hidden
                                                            -translate-x-1/2
                                                            whitespace-nowrap
                                                            text-[10px]
                                                            font-semibold
                                                            text-[var(--text)]
                                                            group-hover:block
                                                        ">

                                                            {formatNumber(
                                                                stock
                                                            )}

                                                        </span>

                                                    </div>

                                                </div>

                                                <p className="
                                                    mt-2
                                                    truncate
                                                    text-center
                                                    text-[10px]
                                                    text-[var(--text-muted)]
                                                ">

                                                    {
                                                        item.name
                                                    }

                                                </p>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        ) : (

                            <div className="
                                flex
                                h-[220px]
                                items-center
                                justify-center
                                text-xs
                                text-[var(--text-muted)]
                            ">

                                No category data available

                            </div>

                        )}

                    </div>

                </section>


                {/* STOCK HEALTH */}

                <section className="
                    overflow-hidden
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                ">

                    <SectionHeader
                        title="Stock Health"
                        description="Overall inventory condition."
                    />


                    <div className="
                        flex
                        items-center
                        gap-6
                        p-4
                        sm:p-5
                    ">

                        <div
                            className="
                                relative
                                grid
                                h-28
                                w-28
                                shrink-0
                                place-items-center
                                rounded-full
                            "
                            style={{
                                background:
                                    `conic-gradient(
                                        #22c55e ${healthPercentage}%,
                                        #f59e0b ${healthPercentage}% ${
                                            healthPercentage +
                                            (
                                                (
                                                    distribution.low ||
                                                    0
                                                ) /
                                                Math.max(
                                                    totalStock,
                                                    1
                                                )
                                            ) * 100
                                        }%,
                                        #ef4444 0
                                    )`
                            }}
                        >

                            <div className="
                                grid
                                h-20
                                w-20
                                place-items-center
                                rounded-full
                                bg-[var(--surface)]
                            ">

                                <div className="
                                    text-center
                                ">

                                    <p className="
                                        text-xl
                                        font-bold
                                        text-[var(--text)]
                                    ">

                                        {healthPercentage}%

                                    </p>

                                    <p className="
                                        text-[9px]
                                        text-[var(--text-muted)]
                                    ">

                                        Healthy

                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="
                            min-w-0
                            space-y-3
                        ">

                            <div>

                                <p className="
                                    text-[10px]
                                    text-[var(--text-muted)]
                                ">

                                    Healthy

                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {formatNumber(
                                        distribution.healthy
                                    )}

                                </p>

                            </div>


                            <div>

                                <p className="
                                    text-[10px]
                                    text-[var(--text-muted)]
                                ">

                                    Low Stock

                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {formatNumber(
                                        distribution.low
                                    )}

                                </p>

                            </div>


                            <div>

                                <p className="
                                    text-[10px]
                                    text-[var(--text-muted)]
                                ">

                                    Out of Stock

                                </p>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-[var(--text)]
                                ">

                                    {formatNumber(
                                        distribution.outOfStock
                                    )}

                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="
                        border-t
                        border-[var(--border)]
                        px-4
                        py-4
                        sm:px-5
                    ">

                        <p className="
                            text-[10px]
                            text-[var(--text-muted)]
                        ">

                            Total Stock Units

                        </p>

                        <p className="
                            mt-1
                            text-lg
                            font-bold
                            text-[var(--text)]
                        ">

                            {formatNumber(
                                totalStock
                            )}

                        </p>

                    </div>

                </section>

            </div>


            {/* LOW STOCK */}

            <section className="
                overflow-hidden
                border
                border-[var(--border)]
                bg-[var(--surface)]
            ">

                <SectionHeader
                    title="Low Stock Alerts"
                    description="Products requiring inventory attention."
                    action="View Inventory"
                    onAction={() =>
                        navigate(
                            "/admin/inventory"
                        )
                    }
                />


                {lowStockProducts.length ? (

                    <div className="
                        overflow-x-auto
                    ">

                        <table className="
                            w-full
                            min-w-[600px]
                            text-left
                        ">

                            <thead>

                                <tr className="
                                    border-b
                                    border-[var(--border)]
                                    text-[10px]
                                    uppercase
                                    tracking-wider
                                    text-[var(--text-muted)]
                                ">

                                    <th className="
                                        px-4
                                        py-2.5
                                        font-semibold
                                        sm:px-5
                                    ">

                                        Product

                                    </th>

                                    <th className="
                                        px-4
                                        py-2.5
                                        font-semibold
                                        sm:px-5
                                    ">

                                        SKU

                                    </th>

                                    <th className="
                                        px-4
                                        py-2.5
                                        font-semibold
                                        sm:px-5
                                    ">

                                        Stock

                                    </th>

                                    <th className="
                                        px-4
                                        py-2.5
                                        font-semibold
                                        sm:px-5
                                    ">

                                        Threshold

                                    </th>

                                    <th className="
                                        px-4
                                        py-2.5
                                        font-semibold
                                        sm:px-5
                                    ">

                                        Status

                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {lowStockProducts
                                    .slice(0, 8)
                                    .map(
                                        (
                                            product,
                                            index
                                        ) => (

                                            <tr
                                                key={
                                                    product.sku ||
                                                    product._id ||
                                                    index
                                                }
                                                className="
                                                    border-b
                                                    border-[var(--border)]
                                                    last:border-0
                                                    hover:bg-[var(--background)]
                                                "
                                            >

                                                <td className="
                                                    px-4
                                                    py-3
                                                    sm:px-5
                                                ">

                                                    <p className="
                                                        max-w-[260px]
                                                        truncate
                                                        text-xs
                                                        font-semibold
                                                        text-[var(--text)]
                                                    ">

                                                        {
                                                            product.name
                                                        }

                                                    </p>

                                                </td>


                                                <td className="
                                                    px-4
                                                    py-3
                                                    font-mono
                                                    text-[10px]
                                                    text-[var(--text-muted)]
                                                    sm:px-5
                                                ">

                                                    {
                                                        product.sku ||
                                                        "—"
                                                    }

                                                </td>


                                                <td className="
                                                    px-4
                                                    py-3
                                                    text-xs
                                                    font-bold
                                                    text-[var(--text)]
                                                    sm:px-5
                                                ">

                                                    {
                                                        product.stock ??
                                                        0
                                                    }

                                                </td>


                                                <td className="
                                                    px-4
                                                    py-3
                                                    text-[10px]
                                                    text-[var(--text-muted)]
                                                    sm:px-5
                                                ">

                                                    {
                                                        product.threshold ??
                                                        0
                                                    }

                                                </td>


                                                <td className="
                                                    px-4
                                                    py-3
                                                    sm:px-5
                                                ">

                                                    <StatusBadge
                                                        status={
                                                            product.status
                                                        }
                                                    />

                                                </td>

                                            </tr>

                                        )
                                    )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="
                        px-5
                        py-10
                        text-center
                        text-xs
                        text-[var(--text-muted)]
                    ">

                        No low stock products

                    </div>

                )}

            </section>

        </div>

    );

};


// =====================================================
// Dashboard
// =====================================================

const Dashboard = () => {

    const [
        mode,
        setMode
    ] = useState(
        "ecommerce"
    );


    const [
        period,
        setPeriod
    ] = useState(
        "7days"
    );


    const [
        dashboard,
        setDashboard
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    const fetchDashboard =
        async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getAdminDashboard(
                        mode,
                        period
                    );


                setDashboard(
                    response?.data ||
                    null
                );

            }
            catch (err) {

                setError(
                    err?.response?.data?.message ||
                    "Unable to load dashboard data."
                );

            }
            finally {

                setLoading(false);

            }

        };


    useEffect(() => {

        let mounted =
            true;


        const load =
            async () => {

                try {

                    setLoading(true);
                    setError("");

                    const response =
                        await getAdminDashboard(
                            mode,
                            period
                        );


                    if (mounted) {

                        setDashboard(
                            response?.data ||
                            null
                        );

                    }

                }
                catch (err) {

                    if (mounted) {

                        setError(
                            err?.response?.data?.message ||
                            "Unable to load dashboard data."
                        );

                    }

                }
                finally {

                    if (mounted) {

                        setLoading(false);

                    }

                }

            };


        load();


        return () => {

            mounted = false;

        };

    }, [
        mode,
        period
    ]);


    const periodLabel =
        useMemo(
            () =>
                PERIODS.find(
                    item =>
                        item.value ===
                        period
                )?.label ||
                "7 Days",
            [period]
        );


    return (

        <section className="
            w-full
            space-y-3
            px-1
            sm:px-2
        ">


            {/* =========================================
                PAGE HEADER
            ========================================= */}

            <PageHeader
                eyebrow="ADMIN"
                title="Dashboard"
                subtitle={
                    mode === "ecommerce"
                        ? "Monitor sales, orders and customer activity."
                        : "Monitor product stock and inventory health."
                }
            >

                <div className="
                    flex
                    flex-wrap
                    items-center
                    justify-end
                    gap-2
                ">


                    {/* MODE */}

                    <div className="
                        flex
                        border
                        border-[var(--border)]
                        bg-[var(--surface)]
                        p-0.5
                    ">

                        <button
                            type="button"
                            onClick={() =>
                                setMode(
                                    "ecommerce"
                                )
                            }
                            className={`
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                transition
                                ${
                                    mode ===
                                    "ecommerce"
                                        ? "bg-[var(--primary)] text-white"
                                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                                }
                            `}
                        >

                            E-commerce

                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                setMode(
                                    "inventory"
                                )
                            }
                            className={`
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                transition
                                ${
                                    mode ===
                                    "inventory"
                                        ? "bg-[var(--primary)] text-white"
                                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                                }
                            `}
                        >

                            Inventory

                        </button>

                    </div>


                    {/* PERIOD */}

                    <select
                        value={
                            period
                        }
                        onChange={
                            event =>
                                setPeriod(
                                    event.target.value
                                )
                        }
                        className="
                            h-8
                            border
                            border-[var(--border)]
                            bg-[var(--surface)]
                            px-2.5
                            text-xs
                            font-medium
                            text-[var(--text)]
                            outline-none
                            focus:border-[var(--primary)]
                        "
                    >

                        {PERIODS.map(
                            item => (

                                <option
                                    key={
                                        item.value
                                    }
                                    value={
                                        item.value
                                    }
                                >

                                    {item.label}

                                </option>

                            )
                        )}

                    </select>

                </div>

            </PageHeader>


            {/* =========================================
                DATA CONTEXT
            ========================================= */}

            <div className="
                flex
                min-h-10
                items-center
                justify-between
                gap-4
                border-l-2
                border-[var(--primary)]
                bg-[var(--surface)]
                px-3
                py-2
            ">

                <div>

                    <p className="
                        text-xs
                        font-semibold
                        text-[var(--text)]
                    ">

                        {mode === "ecommerce"
                            ? "E-commerce Overview"
                            : "Inventory Overview"}

                    </p>

                    <p className="
                        mt-0.5
                        text-[10px]
                        text-[var(--text-muted)]
                    ">

                        Data for {
                            periodLabel.toLowerCase()
                        }

                    </p>

                </div>


                {loading && (

                    <div className="
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        font-medium
                        text-[var(--secondary)]
                    ">

                        <span className="
                            h-3
                            w-3
                            animate-spin
                            rounded-full
                            border
                            border-[var(--border)]
                            border-t-[var(--primary)]"
                        />

                        Updating...

                    </div>

                )}

            </div>


            {/* =========================================
                ERROR
            ========================================= */}

            {error ? (

                <div className="
                    border
                    border-red-500/20
                    bg-red-500/5
                    px-5
                    py-10
                    text-center
                ">

                    <p className="
                        text-sm
                        font-semibold
                        text-red-500
                    ">

                        {error}

                    </p>


                    <button
                        type="button"
                        onClick={
                            fetchDashboard
                        }
                        className="
                            mt-3
                            text-xs
                            font-semibold
                            text-[var(--primary)]
                            hover:underline
                        "
                    >

                        Try Again

                    </button>

                </div>

            ) : loading && !dashboard ? (

                <div className="
                    grid
                    grid-cols-2
                    gap-3
                    xl:grid-cols-4
                ">

                    {[1, 2, 3, 4].map(
                        item => (

                            <div
                                key={
                                    item
                                }
                                className="
                                    h-24
                                    animate-pulse
                                    border
                                    border-[var(--border)]
                                    bg-[var(--surface)]
                                "
                            />

                        )
                    )}

                </div>

            ) : mode === "inventory" ? (

                <InventoryDashboard
                    data={
                        dashboard
                    }
                />

            ) : (

                <EcommerceDashboard
                    data={
                        dashboard
                    }
                />

            )}

        </section>

    );

};


export default Dashboard;