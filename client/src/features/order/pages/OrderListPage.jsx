import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import {
    getOrders
} from "../services/order.service";

const OrderListPage = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {

        return (
            <Container>

                <div className="
                    py-16
                    text-center
                ">
                    Loading orders...
                </div>

            </Container>
        );

    }

    return (

        <Container>

            <div className="py-10">

                <h1 className="
                    text-3xl
                    font-bold
                    mb-8
                ">
                    My Orders
                </h1>

                {orders.length === 0 ? (

                    <Card>

                        <div className="
                            py-16
                            text-center
                        ">

                            <h2 className="
                                text-xl
                                font-semibold
                            ">
                                No orders yet
                            </h2>

                            <p className="
                                text-gray-500
                                mt-2
                            ">
                                Your placed orders will appear here.
                            </p>

                            <Link
                                to="/products"
                                className="
                                    inline-block
                                    mt-6
                                    bg-black
                                    text-white
                                    px-6
                                    py-3
                                    rounded-lg
                                "
                            >
                                Start Shopping
                            </Link>

                        </div>

                    </Card>

                ) : (

                    <div className="space-y-4">

                        {orders.map(order => (

                            <Card
                                key={order._id}
                            >

                                <div className="
                                    flex
                                    flex-col
                                    md:flex-row
                                    md:items-center
                                    md:justify-between
                                    gap-4
                                ">

                                    <div>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                        ">
                                            Order
                                        </p>

                                        <h2 className="
                                            font-semibold
                                            text-lg
                                        ">
                                            {order.orderNumber}
                                        </h2>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                        ">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                        ">
                                            Items
                                        </p>

                                        <p>
                                            {order.items?.length || 0}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                        ">
                                            Total
                                        </p>

                                        <p className="
                                            font-semibold
                                        ">
                                            ₹{order.pricing?.total || 0}
                                        </p>

                                    </div>

                                    <div>

                                        <span className="
                                            inline-block
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            bg-gray-100
                                        ">
                                            {order.status}
                                        </span>

                                    </div>

                                    <Link
                                        to={`/orders/${order._id}`}
                                        className="
                                            bg-black
                                            text-white
                                            px-4
                                            py-2
                                            rounded-lg
                                            text-center
                                        "
                                    >
                                        View Order
                                    </Link>

                                </div>

                            </Card>

                        ))}

                    </div>

                )}

            </div>

        </Container>

    );

};

export default OrderListPage;