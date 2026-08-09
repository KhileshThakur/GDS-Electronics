import {
    useEffect,
    useState
} from "react";
import {
    Link
} from "react-router-dom";
import {
    toast
} from "react-hot-toast";
import Container from "../../../components/ui/Container";
import {
    getOrders
} from "../services/order.service";
import "./OrderCustomer.css";
const OrderListPage = () => {
    const [
        orders,
        setOrders
    ] = useState([]);
    const [
        loading,
        setLoading
    ] = useState(true);
    /* =========================================
       Fetch Orders
    ========================================= */
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response =
                await getOrders();
            setOrders(
                response.data || []
            );
        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load orders"
            );
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    /* =========================================
       Loading
    ========================================= */
    if (loading) {
        return (
            <Container>
                <div className="order-page">
                    <div className="order-loading">
                        <div className="order-loading__spinner" />
                        <p>
                            Loading orders...
                        </p>
                    </div>
                </div>
            </Container>
        );
    }
    return (
        <Container>
            <div className="order-page">
                {/* =================================
                    Page Header
                ================================= */}
                <div className="order-page-header">
                    <div>
                        <span className="order-page-header__eyebrow">
                            ACCOUNT
                        </span>
                        <h1>
                            My Orders
                        </h1>
                        <p>
                            View and track your recent orders.
                        </p>
                    </div>
                    {orders.length > 0 && (
                        <div className="order-count">
                            <strong>
                                {orders.length}
                            </strong>
                            <span>
                                {orders.length === 1
                                    ? "Order"
                                    : "Orders"
                                }
                            </span>
                        </div>
                    )}
                </div>
                {/* =================================
                    Empty State
                ================================= */}
                {orders.length === 0 ? (
                    <div className="order-empty">
                        <div className="order-empty__icon">
                            +
                        </div>
                        <h2>
                            No orders yet
                        </h2>
                        <p>
                            Your placed orders will appear here.
                        </p>
                        <Link
                            to="/products"
                            className="
                                order-button
                                order-button--primary
                            "
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    /* =================================
                       Orders
                    ================================= */
                    <div className="order-list">
                        {orders.map(
                            (order) => (
                                <article
                                    key={
                                        order._id
                                    }
                                    className="order-card"
                                >
                                    {/* =========================
                                        Card Header
                                    ========================== */}
                                    <div className="order-card__header">
                                        <div>
                                            <span className="order-card__label">
                                                ORDER
                                            </span>
                                            <h2>
                                                {
                                                    order.orderNumber
                                                }
                                            </h2>
                                            <p>
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}
                                            </p>
                                        </div>
                                        <span
                                            className={`
                                                order-status
                                                order-status--${(
                                                    order.status ||
                                                    ""
                                                )
                                                    .toLowerCase()
                                                    .replace(
                                                        /\s+/g,
                                                        "-"
                                                    )}
                                            `}
                                        >
                                            {
                                                order.status
                                            }
                                        </span>
                                    </div>
                                    {/* =========================
                                        Card Information
                                    ========================== */}
                                    <div className="order-card__body">
                                        <div className="order-info">
                                            <span>
                                                Items
                                            </span>
                                            <strong>
                                                {
                                                    order.items?.length ||
                                                    0
                                                }
                                            </strong>
                                        </div>
                                        <div className="order-info">
                                            <span>
                                                Payment
                                            </span>
                                            <strong>
                                                {
                                                    order.payment?.method ||
                                                    "-"
                                                }
                                            </strong>
                                        </div>
                                        <div className="order-info">
                                            <span>
                                                Total
                                            </span>
                                            <strong>
                                                ₹
                                                {
                                                    Number(
                                                        order.pricing?.total ||
                                                        0
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )
                                                }
                                            </strong>
                                        </div>
                                        <Link
                                            to={
                                                `/orders/${order._id}`
                                            }
                                            className="order-view-button"
                                        >
                                            View Order
                                            <span>
                                                →
                                            </span>
                                        </Link>
                                    </div>
                                    {/* =========================
                                        Delivery
                                    ========================== */}
                                    {order.estimatedDelivery && (
                                        <div className="order-card__footer">
                                            <span>
                                                Estimated delivery
                                            </span>
                                            <strong>
                                                {new Date(
                                                    order.estimatedDelivery
                                                ).toLocaleDateString(
                                                    "en-IN",
                                                    {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    }
                                                )}
                                            </strong>
                                        </div>
                                    )}
                                </article>
                            )
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};
export default OrderListPage;