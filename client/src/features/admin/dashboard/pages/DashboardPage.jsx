import {
    ArrowDown,
    ArrowUp,
    AlertTriangle,
    Boxes,
    CheckCircle2,
    ChevronRight,
    CircleDollarSign,
    Clock3,
    Package,
    ShoppingCart,
    Users,
    XCircle
} from "lucide-react";

import { Link } from "react-router-dom";

import { adminDashboardContent } from "../../../../utils/admin/dashboard.content";

import "./DashboardPage.css";

const {
    overview,
    salesOverview,
    orderSummary,
    inventory,
    lowStockProducts,
    topProducts,
    recentOrders,
    activity
} = adminDashboardContent;

const iconMap = {
    revenue: CircleDollarSign,
    orders: ShoppingCart,
    customers: Users,
    products: Package
};

const statusIconMap = {
    Delivered: CheckCircle2,
    Processing: Clock3,
    Shipped: Package,
    Cancelled: XCircle
};

const DashboardPage = () => {
    return (
        <div className="admin-dashboard">

            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <p className="dashboard-eyebrow">
                        Store Overview
                    </p>

                    <h1 className="dashboard-title">
                        Welcome back, Admin
                    </h1>

                    <p className="dashboard-subtitle">
                        Monitor your store performance,
                        inventory and orders from one place.
                    </p>
                </div>

                <div className="dashboard-actions">
                    <Link
                        to="/admin/products/new"
                        className="dashboard-primary-btn"
                    >
                        <Package size={17} />
                        Add Product
                    </Link>

                    <Link
                        to="/admin/categories"
                        className="dashboard-secondary-btn"
                    >
                        Manage Categories
                    </Link>
                </div>
            </div>

            {/* Overview Cards */}
            <section className="dashboard-stat-grid">
                {Object.entries(overview).map(
                    ([key, item]) => {
                        const Icon = iconMap[key];

                        return (
                            <div
                                key={key}
                                className="dashboard-stat-card"
                            >
                                <div className="stat-card-top">
                                    <div className="stat-icon">
                                        <Icon size={19} />
                                    </div>

                                    <span
                                        className={
                                            item.trend === "up"
                                                ? "stat-change positive"
                                                : "stat-change negative"
                                        }
                                    >
                                        {item.trend === "up"
                                            ? <ArrowUp size={13} />
                                            : <ArrowDown size={13} />
                                        }

                                        {item.change}
                                    </span>
                                </div>

                                <p className="stat-label">
                                    {key === "revenue"
                                        ? "Total Revenue"
                                        : key === "orders"
                                            ? "Total Orders"
                                            : key === "customers"
                                                ? "Total Customers"
                                                : "Total Products"
                                    }
                                </p>

                                <h2 className="stat-value">
                                    {item.value}
                                </h2>

                                <p className="stat-footer">
                                    {item.label}
                                </p>
                            </div>
                        );
                    }
                )}
            </section>

            {/* Sales + Orders */}
            <section className="dashboard-main-grid">

                <div className="dashboard-panel sales-panel">

                    <div className="panel-header">
                        <div>
                            <h2>Sales Overview</h2>
                            <p>{salesOverview.subtitle}</p>
                        </div>

                        <div className="sales-total">
                            <strong>
                                {salesOverview.total}
                            </strong>

                            <span>
                                <ArrowUp size={12} />
                                {salesOverview.change}
                            </span>
                        </div>
                    </div>

                    <SalesChart />
                </div>

                <div className="dashboard-panel">

                    <div className="panel-header">
                        <div>
                            <h2>Order Summary</h2>
                            <p>Current order distribution</p>
                        </div>

                        <span className="panel-number">
                            {orderSummary.total}
                        </span>
                    </div>

                    <div className="order-summary">
                        {orderSummary.statuses.map(
                            status => (
                                <div
                                    key={status.label}
                                    className="order-status"
                                >
                                    <div className="order-status-info">

                                        <div className={
                                            `order-status-icon ${status.type}`
                                        }>
                                            {status.label === "Delivered" &&
                                                <CheckCircle2 size={16} />
                                            }

                                            {status.label === "Processing" &&
                                                <Clock3 size={16} />
                                            }

                                            {status.label === "Shipped" &&
                                                <Package size={16} />
                                            }

                                            {status.label === "Cancelled" &&
                                                <XCircle size={16} />
                                            }
                                        </div>

                                        <div>
                                            <strong>
                                                {status.label}
                                            </strong>

                                            <span>
                                                {status.value} orders
                                            </span>
                                        </div>
                                    </div>

                                    <strong>
                                        {status.percentage}%
                                    </strong>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Inventory */}
            <section className="dashboard-main-grid">

                <div className="dashboard-panel">

                    <div className="panel-header">
                        <div>
                            <h2>Inventory Health</h2>
                            <p>
                                Current stock condition
                            </p>
                        </div>

                        <Link
                            to="/admin/products"
                            className="panel-link"
                        >
                            View Products
                            <ChevronRight size={15} />
                        </Link>
                    </div>

                    <div className="inventory-overview">

                        <div className="inventory-total">
                            <Boxes size={22} />

                            <div>
                                <strong>
                                    {inventory.totalProducts}
                                </strong>

                                <span>
                                    Total Products
                                </span>
                            </div>
                        </div>

                        <div className="inventory-value">
                            <span>
                                Stock Value
                            </span>

                            <strong>
                                {inventory.stockValue}
                            </strong>
                        </div>
                    </div>

                    <div className="inventory-health-grid">

                        <InventoryMetric
                            label="Healthy Stock"
                            value={inventory.healthyStock}
                            type="healthy"
                        />

                        <InventoryMetric
                            label="Low Stock"
                            value={inventory.lowStock}
                            type="low"
                        />

                        <InventoryMetric
                            label="Out of Stock"
                            value={inventory.outOfStock}
                            type="danger"
                        />

                    </div>

                    <div className="category-stock-list">

                        {inventory.categories.map(
                            category => (
                                <div
                                    key={category.name}
                                    className="category-stock"
                                >
                                    <div className="category-stock-header">
                                        <div>
                                            <strong>
                                                {category.name}
                                            </strong>

                                            <span>
                                                {category.products} products
                                            </span>
                                        </div>

                                        <strong>
                                            {category.stock}
                                        </strong>
                                    </div>

                                    <div className="stock-progress">
                                        <span
                                            style={{
                                                width: `${category.percentage}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        )}

                    </div>
                </div>

                {/* Low Stock */}
                <div className="dashboard-panel">

                    <div className="panel-header">
                        <div>
                            <h2>Low Stock Alerts</h2>
                            <p>
                                Products requiring attention
                            </p>
                        </div>

                        <div className="alert-header-icon">
                            <AlertTriangle size={17} />
                        </div>
                    </div>

                    <div className="low-stock-list">

                        {lowStockProducts.map(
                            product => (
                                <div
                                    key={product.id}
                                    className="low-stock-item"
                                >
                                    <div className="product-placeholder">
                                        <Package size={18} />
                                    </div>

                                    <div className="low-stock-product">
                                        <strong>
                                            {product.name}
                                        </strong>

                                        <span>
                                            {product.sku}
                                            {" · "}
                                            {product.category}
                                        </span>
                                    </div>

                                    <div className="stock-alert">
                                        <strong>
                                            {product.stock}
                                        </strong>

                                        <span>
                                            units
                                        </span>

                                        <small
                                            className={
                                                product.status === "Critical"
                                                    ? "critical"
                                                    : "warning"
                                            }
                                        >
                                            {product.status}
                                        </small>
                                    </div>
                                </div>
                            )
                        )}

                    </div>
                </div>

            </section>

            {/* Tables */}
            <section className="dashboard-main-grid">

                {/* Recent Orders */}
                <div className="dashboard-panel table-panel">

                    <div className="panel-header">
                        <div>
                            <h2>Recent Orders</h2>
                            <p>
                                Latest customer transactions
                            </p>
                        </div>

                        <Link
                            to="/admin/orders"
                            className="panel-link"
                        >
                            View All
                            <ChevronRight size={15} />
                        </Link>
                    </div>

                    <div className="dashboard-table-wrapper">
                        <table className="dashboard-table">

                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Customer</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentOrders.map(
                                    order => {
                                        const StatusIcon =
                                            statusIconMap[
                                                order.status
                                            ];

                                        return (
                                            <tr key={order.id}>
                                                <td>
                                                    <strong>
                                                        {order.id}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {order.customer}
                                                </td>

                                                <td>
                                                    <strong>
                                                        {order.amount}
                                                    </strong>
                                                </td>

                                                <td>
                                                    <span
                                                        className={
                                                            `table-status ${order.status.toLowerCase()}`
                                                        }
                                                    >
                                                        <StatusIcon
                                                            size={13}
                                                        />
                                                        {order.status}
                                                    </span>
                                                </td>

                                                <td className="muted-cell">
                                                    {order.time}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className="dashboard-panel table-panel">

                    <div className="panel-header">
                        <div>
                            <h2>Top Products</h2>
                            <p>
                                Best performing products
                            </p>
                        </div>

                        <Link
                            to="/admin/products"
                            className="panel-link"
                        >
                            Products
                            <ChevronRight size={15} />
                        </Link>
                    </div>

                    <div className="top-products-list">

                        {topProducts.map(
                            product => (
                                <div
                                    key={product.rank}
                                    className="top-product"
                                >
                                    <span className="product-rank">
                                        #{product.rank}
                                    </span>

                                    <div className="product-placeholder">
                                        <Package size={18} />
                                    </div>

                                    <div className="top-product-info">
                                        <strong>
                                            {product.name}
                                        </strong>

                                        <span>
                                            {product.category}
                                            {" · "}
                                            {product.units} sold
                                        </span>
                                    </div>

                                    <strong>
                                        {product.revenue}
                                    </strong>
                                </div>
                            )
                        )}

                    </div>
                </div>

            </section>

            {/* Activity */}
            <section className="dashboard-panel activity-panel">

                <div className="panel-header">
                    <div>
                        <h2>Recent Activity</h2>
                        <p>
                            Latest store events
                        </p>
                    </div>
                </div>

                <div className="activity-list">

                    {activity.map(
                        (item, index) => (
                            <div
                                key={index}
                                className="activity-item"
                            >
                                <div
                                    className={
                                        `activity-dot ${item.type}`
                                    }
                                />

                                <div className="activity-content">
                                    <strong>
                                        {item.title}
                                    </strong>

                                    <span>
                                        {item.description}
                                    </span>
                                </div>

                                <time>
                                    {item.time}
                                </time>
                            </div>
                        )
                    )}

                </div>

            </section>

        </div>
    );
};

const InventoryMetric = ({
    label,
    value,
    type
}) => {
    return (
        <div className={`inventory-metric ${type}`}>
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
};

const SalesChart = () => {
    const values = salesOverview.values;
    const max = Math.max(...values);
    const width = 700;
    const height = 240;
    const padding = 24;

    const points = values.map(
        (value, index) => {
            const x =
                padding +
                (index *
                    (width - padding * 2)) /
                (values.length - 1);

            const y =
                height -
                padding -
                ((value / max) *
                    (height - padding * 2));

            return `${x},${y}`;
        }
    ).join(" ");

    const areaPoints =
        `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

    return (
        <div className="sales-chart">

            <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
                className="sales-svg"
            >
                <defs>
                    <linearGradient
                        id="salesGradient"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--primary)"
                            stopOpacity=".22"
                        />

                        <stop
                            offset="100%"
                            stopColor="var(--primary)"
                            stopOpacity="0"
                        />
                    </linearGradient>
                </defs>

                <line
                    x1="24"
                    y1="50"
                    x2="676"
                    y2="50"
                    className="chart-grid-line"
                />

                <line
                    x1="24"
                    y1="110"
                    x2="676"
                    y2="110"
                    className="chart-grid-line"
                />

                <line
                    x1="24"
                    y1="170"
                    x2="676"
                    y2="170"
                    className="chart-grid-line"
                />

                <polygon
                    points={areaPoints}
                    fill="url(#salesGradient)"
                />

                <polyline
                    points={points}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {values.map(
                    (value, index) => {
                        const [x, y] =
                            points
                                .split(" ")[index]
                                .split(",");

                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="4"
                                fill="var(--surface)"
                                stroke="var(--primary)"
                                strokeWidth="2"
                            />
                        );
                    }
                )}
            </svg>

            <div className="chart-labels">
                {salesOverview.labels.map(
                    label => (
                        <span key={label}>
                            {label}
                        </span>
                    )
                )}
            </div>

        </div>
    );
};

export default DashboardPage;