import { useEffect, useMemo, useState } from "react";
import { getAdminDashboard } from "../services/admin.service";

const PERIODS = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "7days", label: "7 Days" },
    { value: "1month", label: "1 Month" },
    { value: "3month", label: "3 Months" },
    { value: "9month", label: "9 Months" },
    { value: "1year", label: "1 Year" }
];

const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);

const formatNumber = (value = 0) =>
    new Intl.NumberFormat("en-IN").format(value);

const StatusBadge = ({ status }) => {
    const styles = {
        Critical: "bg-red-500/10 text-red-500 border-red-500/20",
        Low: "bg-amber-500/10 text-amber-500 border-amber-500/20"
    };

    return (
        <span className={`inline-flex border px-2 py-1 text-[11px] font-semibold ${styles[status] || "bg-white/5 text-[var(--text-muted)] border-[var(--border)]"}`}>
            {status}
        </span>
    );
};

const StatCard = ({ label, value, accent }) => (
    <div className={`relative overflow-hidden border border-[var(--border)] bg-[var(--surface)] px-5 py-4 ${accent}`}>
        <div className="absolute left-0 top-0 h-full w-[3px] bg-current" />
        <p className="text-xs font-medium text-[var(--text-muted)]">{label}</p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--text)]">{value}</p>
    </div>
);

const BarChart = ({ categories }) => {
    const maxStock = Math.max(...categories.map(item => item.stock), 1);

    return (
        <div className="flex h-[280px] w-full items-end gap-3 border-b border-[var(--border)] px-2 pb-0 pt-8 sm:gap-5">
            {categories.map((item) => {
                const height = Math.max((item.stock / maxStock) * 100, 5);

                return (
                    <div key={item.name} className="group flex h-full flex-1 flex-col justify-end">
                        <div className="relative flex h-full items-end justify-center">
                            <div
                                className="relative w-full max-w-14 bg-[var(--primary)] transition-all duration-300 group-hover:bg-[var(--secondary)]"
                                style={{ height: `${height}%` }}
                            >
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-[var(--text)]">
                                    {formatNumber(item.stock)}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 h-8 text-center">
                            <p className="truncate text-[10px] font-medium text-[var(--text-muted)] sm:text-xs">
                                {item.name}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const InventoryDashboard = ({ data, period }) => {
    const summary = data?.summary || {};
    const distribution = data?.stockDistribution || {};
    const categories = data?.categories || [];
    const lowStockProducts = data?.lowStockProducts || [];

    const totalStock =
        (distribution.healthy || 0) +
        (distribution.low || 0) +
        (distribution.outOfStock || 0);

    const healthPercentage = totalStock
        ? Math.round((distribution.healthy / totalStock) * 100)
        : 0;

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                <StatCard
                    label="Total Products"
                    value={formatNumber(summary.totalProducts)}
                    accent="text-[var(--primary)]"
                />
                <StatCard
                    label="Healthy Stock"
                    value={formatNumber(summary.healthyStock)}
                    accent="text-emerald-500"
                />
                <StatCard
                    label="Low Stock"
                    value={formatNumber(summary.lowStock)}
                    accent="text-amber-500"
                />
                <StatCard
                    label="Out of Stock"
                    value={formatNumber(summary.outOfStock)}
                    accent="text-red-500"
                />
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.6fr_0.8fr]">
                <section className="border border-[var(--border)] bg-[var(--surface)] p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-base font-semibold text-[var(--text)]">
                                Stock by Category
                            </h2>
                            <p className="mt-1 text-xs text-[var(--text-muted)]">
                                Current inventory distribution
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-[var(--text-muted)]">Stock Value</p>
                            <p className="mt-1 text-lg font-bold text-[var(--text)]">
                                {formatCurrency(summary.stockValue)}
                            </p>
                        </div>
                    </div>

                    {categories.length ? (
                        <BarChart categories={categories} />
                    ) : (
                        <div className="flex h-[280px] items-center justify-center text-sm text-[var(--text-muted)]">
                            No category data available
                        </div>
                    )}
                </section>

                <section className="border border-[var(--border)] bg-[var(--surface)] p-5">
                    <div>
                        <h2 className="text-base font-semibold text-[var(--text)]">
                            Stock Health
                        </h2>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                            Overall inventory condition
                        </p>
                    </div>

                    <div className="mt-7 flex items-center gap-6">
                        <div
                            className="relative grid h-32 w-32 shrink-0 place-items-center rounded-full"
                            style={{
                                background: `conic-gradient(
                                    #22c55e ${healthPercentage}%,
                                    #f59e0b ${healthPercentage}% ${healthPercentage + ((distribution.low || 0) / Math.max(totalStock, 1)) * 100}%,
                                    #ef4444 0
                                )`
                            }}
                        >
                            <div className="grid h-24 w-24 place-items-center rounded-full bg-[var(--surface)]">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-[var(--text)]">
                                        {healthPercentage}%
                                    </p>
                                    <p className="text-[10px] text-[var(--text-muted)]">
                                        Healthy
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 bg-emerald-500" />
                                    <span className="text-xs text-[var(--text-muted)]">
                                        Healthy
                                    </span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                                    {formatNumber(distribution.healthy)}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 bg-amber-500" />
                                    <span className="text-xs text-[var(--text-muted)]">
                                        Low Stock
                                    </span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                                    {formatNumber(distribution.low)}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 bg-red-500" />
                                    <span className="text-xs text-[var(--text-muted)]">
                                        Out of Stock
                                    </span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                                    {formatNumber(distribution.outOfStock)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 border-t border-[var(--border)] pt-5">
                        <p className="text-xs text-[var(--text-muted)]">Total Stock Units</p>
                        <p className="mt-1 text-xl font-bold text-[var(--text)]">
                            {formatNumber(totalStock)}
                        </p>
                    </div>
                </section>
            </div>

            <section className="border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                    <div>
                        <h2 className="text-base font-semibold text-[var(--text)]">
                            Low Stock Products
                        </h2>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                            Products that need inventory attention
                        </p>
                    </div>

                    <span className="border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500">
                        {lowStockProducts.length} Alerts
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left">
                        <thead>
                            <tr className="border-b border-[var(--border)] text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                                <th className="px-5 py-3 font-semibold">Product</th>
                                <th className="px-5 py-3 font-semibold">SKU</th>
                                <th className="px-5 py-3 font-semibold">Stock</th>
                                <th className="px-5 py-3 font-semibold">Threshold</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {lowStockProducts.map((product) => (
                                <tr
                                    key={product.sku}
                                    className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--background)]"
                                >
                                    <td className="px-5 py-4">
                                        <p className="text-sm font-medium text-[var(--text)]">
                                            {product.name}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                                        {product.sku}
                                    </td>

                                    <td className="px-5 py-4 text-sm font-bold text-[var(--text)]">
                                        {product.stock}
                                    </td>

                                    <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                                        {product.threshold}
                                    </td>

                                    <td className="px-5 py-4">
                                        <StatusBadge status={product.status} />
                                    </td>
                                </tr>
                            ))}

                            {!lowStockProducts.length && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-5 py-10 text-center text-sm text-[var(--text-muted)]"
                                    >
                                        No low stock products
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

const EcommerceDashboard = ({ data }) => {
    const summary = data?.summary || {};
    const sales = data?.sales || {};
    const orders = data?.orders || {};
    const topProducts = data?.topProducts || [];
    const recentOrders = data?.recentOrders || [];

    const maxSale = Math.max(...(sales.values || []), 1);

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                <StatCard
                    label="Revenue"
                    value={formatCurrency(summary.revenue)}
                    accent="text-[var(--primary)]"
                />
                <StatCard
                    label="Orders"
                    value={formatNumber(summary.orders)}
                    accent="text-[var(--secondary)]"
                />
                <StatCard
                    label="Customers"
                    value={formatNumber(summary.customers)}
                    accent="text-emerald-500"
                />
                <StatCard
                    label="Average Order Value"
                    value={formatCurrency(summary.averageOrderValue)}
                    accent="text-violet-500"
                />
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.6fr_0.8fr]">
                <section className="border border-[var(--border)] bg-[var(--surface)] p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-[var(--text)]">
                                Sales Overview
                            </h2>
                            <p className="mt-1 text-xs text-[var(--text-muted)]">
                                Revenue performance
                            </p>
                        </div>

                        <p className="text-lg font-bold text-[var(--text)]">
                            {formatCurrency(summary.revenue)}
                        </p>
                    </div>

                    <div className="mt-8 flex h-[250px] items-end gap-3 border-b border-[var(--border)] px-2 sm:gap-5">
                        {(sales.values || []).map((value, index) => {
                            const height = Math.max((value / maxSale) * 100, 5);

                            return (
                                <div key={sales.labels?.[index]} className="group flex h-full flex-1 flex-col justify-end">
                                    <div className="flex h-full items-end justify-center">
                                        <div
                                            className="w-full max-w-14 bg-[var(--primary)] transition-all group-hover:bg-[var(--secondary)]"
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>

                                    <p className="mt-3 text-center text-[10px] text-[var(--text-muted)]">
                                        {sales.labels?.[index]}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="border border-[var(--border)] bg-[var(--surface)] p-5">
                    <h2 className="text-base font-semibold text-[var(--text)]">
                        Order Summary
                    </h2>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {formatNumber(orders.total)} total orders
                    </p>

                    <div className="mt-6 space-y-5">
                        {[
                            ["Delivered", orders.statuses?.delivered, "bg-emerald-500"],
                            ["Processing", orders.statuses?.processing, "bg-amber-500"],
                            ["Shipped", orders.statuses?.shipped, "bg-[var(--primary)]"],
                            ["Cancelled", orders.statuses?.cancelled, "bg-red-500"]
                        ].map(([label, value, color]) => {
                            const percentage = orders.total
                                ? Math.round((value / orders.total) * 100)
                                : 0;

                            return (
                                <div key={label}>
                                    <div className="mb-2 flex justify-between text-xs">
                                        <span className="text-[var(--text-muted)]">{label}</span>
                                        <span className="font-semibold text-[var(--text)]">
                                            {value || 0}
                                        </span>
                                    </div>

                                    <div className="h-1.5 bg-[var(--background)]">
                                        <div
                                            className={`h-full ${color}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
                <section className="border border-[var(--border)] bg-[var(--surface)]">
                    <div className="border-b border-[var(--border)] px-5 py-4">
                        <h2 className="text-base font-semibold text-[var(--text)]">
                            Top Products
                        </h2>
                    </div>

                    <div>
                        {topProducts.map((product, index) => (
                            <div
                                key={product.name}
                                className="flex items-center gap-4 border-b border-[var(--border)] px-5 py-4 last:border-0"
                            >
                                <span className="w-6 text-sm font-bold text-[var(--text-muted)]">
                                    #{index + 1}
                                </span>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-[var(--text)]">
                                        {product.name}
                                    </p>
                                    <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                                        {product.units} units
                                    </p>
                                </div>

                                <p className="text-sm font-semibold text-[var(--text)]">
                                    {formatCurrency(product.revenue)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="border border-[var(--border)] bg-[var(--surface)]">
                    <div className="border-b border-[var(--border)] px-5 py-4">
                        <h2 className="text-base font-semibold text-[var(--text)]">
                            Recent Orders
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[500px] text-left">
                            <thead>
                                <tr className="border-b border-[var(--border)] text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                                    <th className="px-5 py-3">Order</th>
                                    <th className="px-5 py-3">Customer</th>
                                    <th className="px-5 py-3">Amount</th>
                                    <th className="px-5 py-3">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id} className="border-b border-[var(--border)] last:border-0">
                                        <td className="px-5 py-4 text-xs font-semibold text-[var(--text)]">
                                            {order.id}
                                        </td>
                                        <td className="px-5 py-4 text-xs text-[var(--text-muted)]">
                                            {order.customer}
                                        </td>
                                        <td className="px-5 py-4 text-xs font-semibold text-[var(--text)]">
                                            {formatCurrency(order.amount)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={order.status === "Cancelled" ? "Critical" : order.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [mode, setMode] = useState("ecommerce");
    const [period, setPeriod] = useState("7days");
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getAdminDashboard(mode, period);

                if (mounted) {
                    setDashboard(response?.data || null);
                }
            } catch (err) {
                if (mounted) {
                    setError(
                        err?.response?.data?.message ||
                        "Unable to load dashboard data."
                    );
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchDashboard();

        return () => {
            mounted = false;
        };
    }, [mode, period]);

    const periodLabel = useMemo(
        () => PERIODS.find(item => item.value === period)?.label || "7 Days",
        [period]
    );

    return (
        <div className="min-h-full bg-[var(--background)] px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px]">
                <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">
                            Admin
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--text)]">
                            Dashboard
                        </h1>

                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                            {mode === "ecommerce"
                                ? "Monitor your e-commerce performance."
                                : "Monitor your inventory and stock health."}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex border border-[var(--border)] bg-[var(--surface)] p-1">
                            <button
                                type="button"
                                onClick={() => setMode("ecommerce")}
                                className={`px-3 py-2 text-xs font-semibold transition ${
                                    mode === "ecommerce"
                                        ? "bg-[var(--primary)] text-white"
                                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                                }`}
                            >
                                E-commerce
                            </button>

                            <button
                                type="button"
                                onClick={() => setMode("inventory")}
                                className={`px-3 py-2 text-xs font-semibold transition ${
                                    mode === "inventory"
                                        ? "bg-[var(--primary)] text-white"
                                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                                }`}
                            >
                                Inventory
                            </button>
                        </div>

                        <select
                            value={period}
                            onChange={e => setPeriod(e.target.value)}
                            className="border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-medium text-[var(--text)] outline-none"
                        >
                            {PERIODS.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </header>

                <div className="mb-5 flex items-center justify-between border-l-2 border-[var(--primary)] bg-[var(--surface)] px-4 py-3">
                    <div>
                        <p className="text-xs font-semibold text-[var(--text)]">
                            {mode === "ecommerce" ? "E-commerce Overview" : "Inventory Overview"}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">
                            Data for {periodLabel.toLowerCase()}
                        </p>
                    </div>

                    {loading && (
                        <span className="text-[10px] font-medium text-[var(--secondary)]">
                            Updating...
                        </span>
                    )}
                </div>

                {error ? (
                    <div className="border border-red-500/20 bg-red-500/5 px-5 py-8 text-center">
                        <p className="text-sm font-semibold text-red-500">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => setPeriod(current => current)}
                            className="mt-3 text-xs font-semibold text-[var(--primary)] hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                ) : loading && !dashboard ? (
                    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                        {[1, 2, 3, 4].map(item => (
                            <div
                                key={item}
                                className="h-28 animate-pulse border border-[var(--border)] bg-[var(--surface)]"
                            />
                        ))}
                    </div>
                ) : mode === "inventory" ? (
                    <InventoryDashboard
                        data={dashboard}
                        period={period}
                    />
                ) : (
                    <EcommerceDashboard
                        data={dashboard}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard;