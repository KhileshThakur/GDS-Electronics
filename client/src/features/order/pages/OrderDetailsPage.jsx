import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import {
    getOrder,
    cancelOrder
} from "../services/order.service";

const OrderDetailsPage = () => {

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);

    const fetchOrder = async () => {

        try {

            setLoading(true);

            const response = await getOrder(id);

            setOrder(response.data);

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

    const handleCancel = async () => {

        try {

            setCancelling(true);

            const response = await cancelOrder(id);

            toast.success(
                response.message ||
                "Order cancelled successfully"
            );

            setOrder(response.data);

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

    if (loading) {

        return (
            <Container>

                <div className="py-16 text-center">
                    Loading order...
                </div>

            </Container>
        );

    }

    if (!order) {

        return (
            <Container>

                <div className="py-16 text-center">

                    <h1 className="text-2xl font-bold">
                        Order not found
                    </h1>

                    <Link
                        to="/orders"
                        className="
                            inline-block
                            mt-6
                            underline
                        "
                    >
                        Back to Orders
                    </Link>

                </div>

            </Container>
        );

    }

    const canCancel =
        ["Pending", "Confirmed"].includes(
            order.status
        );

    return (

        <Container>

            <div className="py-10">

                {/* Header */}

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                    mb-8
                ">

                    <div>

                        <Link
                            to="/orders"
                            className="
                                text-sm
                                text-gray-500
                            "
                        >
                            ← Back to Orders
                        </Link>

                        <h1 className="
                            text-3xl
                            font-bold
                            mt-2
                        ">
                            {order.orderNumber}
                        </h1>

                    </div>

                    <span className="
                        inline-block
                        bg-gray-100
                        px-4
                        py-2
                        rounded-full
                    ">
                        {order.status}
                    </span>

                </div>


                {/* Order Items */}

                <Card>

                    <h2 className="
                        text-xl
                        font-semibold
                        mb-6
                    ">
                        Order Items
                    </h2>

                    <div className="space-y-5">

                        {order.items?.map(
                            (item, index) => (

                                <div
                                    key={
                                        item._id ||
                                        index
                                    }
                                    className="
                                        flex
                                        gap-4
                                        border-b
                                        pb-5
                                        last:border-b-0
                                        last:pb-0
                                    "
                                >

                                    {/* Image */}

                                    <div className="
                                        w-20
                                        h-20
                                        bg-gray-100
                                        rounded
                                        overflow-hidden
                                        shrink-0
                                    ">

                                        {item.image ? (

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                "
                                            />

                                        ) : (

                                            <div className="
                                                w-full
                                                h-full
                                                flex
                                                items-center
                                                justify-center
                                                text-xs
                                                text-gray-400
                                            ">
                                                No Image
                                            </div>

                                        )}

                                    </div>


                                    {/* Product Info */}

                                    <div className="flex-1">

                                        <h3 className="
                                            font-semibold
                                        ">
                                            {item.name}
                                        </h3>

                                        {item.variantSku && (

                                            <p className="
                                                text-sm
                                                text-gray-500
                                                mt-1
                                            ">
                                                SKU:{" "}
                                                {item.variantSku}
                                            </p>

                                        )}

                                        <p className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                        ">
                                            Quantity:{" "}
                                            {item.quantity}
                                        </p>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                        ">
                                            Price: ₹{item.price}
                                        </p>

                                    </div>


                                    {/* Item Total */}

                                    <div className="
                                        font-semibold
                                        whitespace-nowrap
                                    ">
                                        ₹{item.subtotal}
                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </Card>


                {/* Address + Summary */}

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-6
                    mt-6
                ">

                    {/* Delivery Address */}

                    <Card>

                        <h2 className="
                            text-xl
                            font-semibold
                            mb-4
                        ">
                            Delivery Address
                        </h2>

                        <p className="font-medium">
                            {order.shippingAddress?.fullName}
                        </p>

                        <p className="
                            text-gray-600
                            mt-2
                        ">
                            {order.shippingAddress?.mobile}
                        </p>

                        <p className="
                            text-gray-600
                            mt-2
                        ">
                            {order.shippingAddress?.addressLine1}
                        </p>

                        {order.shippingAddress?.addressLine2 && (

                            <p className="text-gray-600">
                                {
                                    order.shippingAddress
                                        .addressLine2
                                }
                            </p>

                        )}

                        {order.shippingAddress?.landmark && (

                            <p className="text-gray-600">
                                Landmark:{" "}
                                {
                                    order.shippingAddress
                                        .landmark
                                }
                            </p>

                        )}

                        <p className="text-gray-600">

                            {order.shippingAddress?.city}
                            {", "}
                            {order.shippingAddress?.state}
                            {" - "}
                            {order.shippingAddress?.pincode}

                        </p>

                        <p className="text-gray-600">

                            {order.shippingAddress?.country}

                        </p>

                    </Card>


                    {/* Payment + Summary */}

                    <Card>

                        <h2 className="
                            text-xl
                            font-semibold
                            mb-4
                        ">
                            Payment & Summary
                        </h2>

                        <div className="space-y-3">

                            <div className="
                                flex
                                justify-between
                                gap-4
                            ">

                                <span>
                                    Payment
                                </span>

                                <span>
                                    {order.payment?.method}
                                </span>

                            </div>

                            <div className="
                                flex
                                justify-between
                                gap-4
                            ">

                                <span>
                                    Payment Status
                                </span>

                                <span>
                                    {order.payment?.status}
                                </span>

                            </div>

                            <div className="
                                flex
                                justify-between
                                gap-4
                            ">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ₹{order.pricing?.subtotal}
                                </span>

                            </div>

                            <div className="
                                flex
                                justify-between
                                gap-4
                            ">

                                <span>
                                    Shipping
                                </span>

                                <span>
                                    ₹{order.pricing?.shipping}
                                </span>

                            </div>

                            <div className="
                                flex
                                justify-between
                                gap-4
                                border-t
                                pt-3
                                font-bold
                            ">

                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹{order.pricing?.total}
                                </span>

                            </div>

                        </div>

                    </Card>

                </div>


                {/* Order Timeline */}

                <Card className="mt-6">

                    <h2 className="
                        text-xl
                        font-semibold
                        mb-6
                    ">
                        Order Timeline
                    </h2>

                    {order.timeline?.length > 0 ? (

                        <div className="space-y-5">

                            {order.timeline.map(
                                (event, index) => (

                                    <div
                                        key={
                                            event._id ||
                                            index
                                        }
                                        className="
                                            flex
                                            gap-4
                                        "
                                    >

                                        <div className="
                                            w-3
                                            h-3
                                            bg-black
                                            rounded-full
                                            mt-1.5
                                            shrink-0"
                                        />

                                        <div>

                                            <p className="
                                                font-medium
                                            ">
                                                {event.status}
                                            </p>

                                            {event.note && (

                                                <p className="
                                                    text-sm
                                                    text-gray-500
                                                ">
                                                    {event.note}
                                                </p>

                                            )}

                                            {event.updatedAt && (

                                                <p className="
                                                    text-xs
                                                    text-gray-400
                                                    mt-1
                                                ">
                                                    {new Date(
                                                        event.updatedAt
                                                    ).toLocaleString()}
                                                </p>

                                            )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <p className="
                            text-gray-500
                        ">
                            No timeline information available.
                        </p>

                    )}

                </Card>


                {/* Actions */}

                {canCancel && (

                    <div className="
                        mt-6
                        flex
                        justify-end
                    ">

                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={cancelling}
                            className="
                                border
                                border-red-300
                                text-red-600
                                px-6
                                py-3
                                rounded-lg
                                disabled:opacity-50
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