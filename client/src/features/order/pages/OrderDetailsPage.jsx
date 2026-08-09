import {
    useEffect,
    useState
} from "react";
import {
    Link,
    useParams
} from "react-router-dom";
import {
    toast
} from "react-hot-toast";
import Container from "../../../components/ui/Container";
import {
    getOrder,
    cancelOrder
} from "../services/order.service";
import "./OrderCustomer.css";
const OrderDetailsPage = () => {
    const {
        id
    } = useParams();
    const [
        order,
        setOrder
    ] = useState(null);
    const [
        loading,
        setLoading
    ] = useState(true);
    const [
        cancelling,
        setCancelling
    ] = useState(false);
    /* =========================================
       Fetch Order
    ========================================= */
    const fetchOrder = async () => {
        try {
            setLoading(true);
            const response =
                await getOrder(id);
            setOrder(
                response.data
            );
        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load order"
            );
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOrder();
    }, [id]);
    /* =========================================
       Cancel Order
    ========================================= */
    const handleCancel = async () => {
        const confirmed =
            window.confirm(
                "Are you sure you want to cancel this order?"
            );
        if (!confirmed) {
            return;
        }
        try {
            setCancelling(true);
            const response =
                await cancelOrder(id);
            toast.success(
                response.message ||
                "Order cancelled successfully"
            );
            setOrder(
                response.data
            );
        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to cancel order"
            );
        }
        finally {
            setCancelling(false);
        }
    };
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
                            Loading order...
                        </p>
                    </div>
                </div>
            </Container>
        );
    }
    /* =========================================
       Not Found
    ========================================= */
    if (!order) {
        return (
            <Container>
                <div className="order-page">
                    <div className="order-empty">
                        <div className="order-empty__icon">
                            !
                        </div>
                        <h2>
                            Order not found
                        </h2>
                        <p>
                            We couldn't find this order.
                        </p>
                        <Link
                            to="/orders"
                            className="
                                order-button
                                order-button--primary
                            "
                        >
                            Back to Orders
                        </Link>
                    </div>
                </div>
            </Container>
        );
    }
    /* =========================================
       Helpers
    ========================================= */
    const formatDate = (
        date
    ) => {
        if (!date) {
            return "-";
        }
        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };
    const formatDateTime = (
        date
    ) => {
        if (!date) {
            return "-";
        }
        return new Date(
            date
        ).toLocaleString(
            "en-IN"
        );
    };
    const formatCurrency = (
        value
    ) => {
        return `₹${Number(
            value || 0
        ).toLocaleString(
            "en-IN"
        )}`;
    };
    const statusClass =
        (
            order.status ||
            ""
        )
            .toLowerCase()
            .replace(
                /\s+/g,
                "-"
            );
    const canCancel =
        [
            "Pending",
            "Confirmed"
        ].includes(
            order.status
        );
    return (
        <Container>
            <div className="
                order-page
                order-details-page
            ">
                {/* =================================
                    Header
                ================================= */}
                <div className="
                    order-details-header
                ">
                    <div>
                        <span className="
                            order-page-header__eyebrow
                        ">
                            ORDER DETAILS
                        </span>
                        <h1>
                            {order.orderNumber}
                        </h1>
                        <p>
                            Placed on{" "}
                            {formatDate(
                                order.createdAt
                            )}
                        </p>
                    </div>
                    <span
                        className={`
                            order-status
                            order-status--${statusClass}
                        `}
                    >
                        {order.status}
                    </span>
                </div>
                {/* =================================
                    Estimated Delivery
                ================================= */}
                {order.estimatedDelivery && (
                    <div className="
                        order-delivery-banner
                    ">
                        <div className="
                            order-delivery-banner__icon
                        ">
                            ✓
                        </div>
                        <div>
                            <span>
                                Estimated Delivery
                            </span>
                            <strong>
                                {formatDate(
                                    order.estimatedDelivery
                                )}
                            </strong>
                        </div>
                    </div>
                )}
                {/* =================================
                    Items
                ================================= */}
                <section className="
                    order-section
                ">
                    <div className="
                        order-section__header
                    ">
                        <div>
                            <span>
                                PURCHASE
                            </span>
                            <h2>
                                Order Items
                            </h2>
                        </div>
                        <span>
                            {order.items?.length || 0} items
                        </span>
                    </div>
                    <div className="
                        order-items
                    ">
                        {order.items?.map(
                            (
                                item,
                                index
                            ) => (
                                <div
                                    key={
                                        item._id ||
                                        index
                                    }
                                    className="
                                        order-item
                                    "
                                >
                                    {/* Image */}
                                    <div className="
                                        order-item__image
                                    ">
                                        {item.image ? (
                                            <img
                                                src={
                                                    item.image
                                                }
                                                alt={
                                                    item.name
                                                }
                                            />
                                        ) : (
                                            <span>
                                                No Image
                                            </span>
                                        )}
                                    </div>
                                    {/* Product Information */}
                                    <div className="
                                        order-item__info
                                    ">
                                        <h3>
                                            {item.name}
                                        </h3>
                                        <div className="
                                            order-item__codes
                                        ">
                                            {item.sku && (
                                                <span>
                                                    SKU:{" "}
                                                    {item.sku}
                                                </span>
                                            )}
                                            {item.variantSku && (
                                                <span>
                                                    Variant:{" "}
                                                    {item.variantSku}
                                                </span>
                                            )}
                                        </div>
                                        <div className="
                                            order-item__meta
                                        ">
                                            <span>
                                                Qty:{" "}
                                                {item.quantity}
                                            </span>
                                            <span>
                                                Unit:{" "}
                                                {formatCurrency(
                                                    item.discountPrice ||
                                                    item.price
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Subtotal */}
                                    <div className="
                                        order-item__total
                                    ">
                                        {formatCurrency(
                                            item.subtotal
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
                {/* =================================
                    Address + Payment
                ================================= */}
                <div className="
                    order-two-column
                ">
                    {/* =================================
                        Delivery Address
                    ================================= */}
                    <section className="
                        order-section
                    ">
                        <div className="
                            order-section__header
                        ">
                            <div>
                                <span>
                                    DELIVERY
                                </span>
                                <h2>
                                    Delivery Address
                                </h2>
                            </div>
                        </div>
                        <div className="
                            delivery-address
                        ">
                            <div className="
                                delivery-address__name
                            ">
                                <strong>
                                    {
                                        order.shippingAddress
                                            ?.fullName
                                    }
                                </strong>
                                <span>
                                    {
                                        order.shippingAddress
                                            ?.mobile
                                    }
                                </span>
                            </div>
                            <div className="
                                delivery-address__lines
                            ">
                                <p>
                                    {
                                        order.shippingAddress
                                            ?.addressLine1
                                    }
                                </p>
                                {order.shippingAddress?.addressLine2 && (
                                    <p>
                                        {
                                            order.shippingAddress
                                                .addressLine2
                                        }
                                    </p>
                                )}
                                {order.shippingAddress?.landmark && (
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
                                    {" - "}
                                    {
                                        order.shippingAddress
                                            ?.pincode
                                    }
                                </p>
                                <p>
                                    {
                                        order.shippingAddress
                                            ?.country
                                    }
                                </p>
                            </div>
                        </div>
                    </section>
                    {/* =================================
                        Payment & Pricing
                    ================================= */}
                    <section className="
                        order-section
                    ">
                        <div className="
                            order-section__header
                        ">
                            <div>
                                <span>
                                    PAYMENT
                                </span>
                                <h2>
                                    Payment Summary
                                </h2>
                            </div>
                        </div>
                        <div className="
                            payment-summary
                        ">
                            {/* Payment Method */}
                            <div>
                                <span>
                                    Payment Method
                                </span>
                                <strong>
                                    {
                                        order.payment
                                            ?.method ||
                                        "-"
                                    }
                                </strong>
                            </div>
                            {/* Payment Status */}
                            <div>
                                <span>
                                    Payment Status
                                </span>
                                <strong>
                                    {
                                        order.payment
                                            ?.status ||
                                        "-"
                                    }
                                </strong>
                            </div>
                            {/* Transaction */}
                            {order.payment?.transactionId && (
                                <div>
                                    <span>
                                        Transaction ID
                                    </span>
                                    <strong>
                                        {
                                            order.payment
                                                .transactionId
                                        }
                                    </strong>
                                </div>
                            )}
                            {/* Paid At */}
                            {order.payment?.paidAt && (
                                <div>
                                    <span>
                                        Paid On
                                    </span>
                                    <strong>
                                        {formatDateTime(
                                            order.payment
                                                .paidAt
                                        )}
                                    </strong>
                                </div>
                            )}
                            <div className="
                                payment-summary__divider
                            " />
                            {/* Subtotal */}
                            <div>
                                <span>
                                    Subtotal
                                </span>
                                <strong>
                                    {formatCurrency(
                                        order.pricing
                                            ?.subtotal
                                    )}
                                </strong>
                            </div>
                            {/* Discount */}
                            {order.pricing?.discount > 0 && (
                                <div>
                                    <span>
                                        Discount
                                    </span>
                                    <strong>
                                        -
                                        {formatCurrency(
                                            order.pricing
                                                .discount
                                        )}
                                    </strong>
                                </div>
                            )}
                            {/* Tax */}
                            {order.pricing?.tax > 0 && (
                                <div>
                                    <span>
                                        Tax
                                    </span>
                                    <strong>
                                        {formatCurrency(
                                            order.pricing
                                                .tax
                                        )}
                                    </strong>
                                </div>
                            )}
                            {/* Shipping */}
                            <div>
                                <span>
                                    Shipping
                                </span>
                                <strong>
                                    {order.pricing?.shipping > 0
                                        ? formatCurrency(
                                            order.pricing
                                                .shipping
                                        )
                                        : "FREE"
                                    }
                                </strong>
                            </div>
                            {/* Total */}
                            <div className="
                                payment-summary__total
                            ">
                                <span>
                                    Total
                                </span>
                                <strong>
                                    {formatCurrency(
                                        order.pricing
                                            ?.total
                                    )}
                                </strong>
                            </div>
                        </div>
                    </section>
                </div>
                {/* =================================
                    Timeline
                ================================= */}
                <section className="
                    order-section
                ">
                    <div className="
                        order-section__header
                    ">
                        <div>
                            <span>
                                PROGRESS
                            </span>
                            <h2>
                                Order Timeline
                            </h2>
                        </div>
                    </div>
                    {order.timeline?.length > 0 ? (
                        <div className="
                            order-timeline
                        ">
                            {order.timeline.map(
                                (
                                    event,
                                    index
                                ) => (
                                    <div
                                        key={
                                            event._id ||
                                            index
                                        }
                                        className="
                                            timeline-item
                                        "
                                    >
                                        <div className="
                                            timeline-item__marker
                                        ">
                                            <span />
                                        </div>
                                        <div className="
                                            timeline-item__content
                                        ">
                                            <div className="
                                                timeline-item__top
                                            ">
                                                <strong>
                                                    {
                                                        event.status
                                                    }
                                                </strong>
                                                <time>
                                                    {formatDateTime(
                                                        event.updatedAt
                                                    )}
                                                </time>
                                            </div>
                                            {event.note && (
                                                <p>
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
                            order-no-timeline
                        ">
                            No timeline information available.
                        </p>
                    )}
                </section>
                {/* =================================
                    Notes
                ================================= */}
                {order.notes && (
                    <section className="
                        order-notes
                    ">
                        <span>
                            ORDER NOTE
                        </span>
                        <p>
                            {order.notes}
                        </p>
                    </section>
                )}
                {/* =================================
                    Cancel
                ================================= */}
                {canCancel && (
                    <div className="
                        order-details-actions
                    ">
                        <button
                            type="button"
                            onClick={
                                handleCancel
                            }
                            disabled={
                                cancelling
                            }
                            className="
                                order-cancel-button
                            "
                        >
                            {cancelling
                                ? "Cancelling..."
                                : "Cancel Order"
                            }
                        </button>
                    </div>
                )}
            </div>
        </Container>
    );
};
export default OrderDetailsPage;