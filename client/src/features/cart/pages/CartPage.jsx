import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import {
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../services/cart.service";

const CartPage = () => {

    const [cart, setCart] = useState({
        items: []
    });

    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {

        try {

            setLoading(true);

            const response =
                await getCart();

            setCart(
                response.data || {
                    items: []
                }
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load cart"
            );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCart();

    }, []);

    const handleQuantityChange = async (
        itemId,
        quantity
    ) => {

        try {

            const response =
                await updateCartItem(
                    itemId,
                    quantity
                );

            setCart(
                response.data
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update cart"
            );

        }

    };

    const handleRemove = async (
        itemId
    ) => {

        try {

            const response =
                await removeCartItem(
                    itemId
                );

            setCart(
                response.data
            );

            toast.success(
                "Item removed"
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to remove item"
            );

        }

    };

    const handleClear = async () => {

        try {

            const response =
                await clearCart();

            setCart(
                response.data || {
                    items: []
                }
            );

            toast.success(
                "Cart cleared"
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to clear cart"
            );

        }

    };

    const subtotal =
        cart.items.reduce(
            (
                total,
                item
            ) => {

                const product =
                    item.product;

                const price =
                    product.discountPrice ||
                    product.price ||
                    0;

                return total +
                    price *
                    item.quantity;

            },
            0
        );

    if (loading) {

        return (
            <Container>

                <div className="py-16 text-center">
                    Loading cart...
                </div>

            </Container>
        );

    }

    return (

        <Container>

            <div className="py-10">

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-8
                ">

                    <div>

                        <h1 className="
                            text-3xl
                            font-bold
                        ">
                            Your Cart
                        </h1>

                        <p className="
                            text-gray-500
                            mt-2
                        ">
                            Review your items
                        </p>

                    </div>

                    {cart.items.length > 0 && (

                        <button
                            type="button"
                            onClick={handleClear}
                            className="
                                text-red-600
                                text-sm
                            "
                        >
                            Clear Cart
                        </button>

                    )}

                </div>

                {cart.items.length === 0 ? (

                    <Card>

                        <div className="
                            py-16
                            text-center
                        ">

                            <h2 className="
                                text-xl
                                font-semibold
                            ">
                                Your cart is empty
                            </h2>

                            <p className="
                                text-gray-500
                                mt-2
                            ">
                                Add some products to get started.
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
                                Continue Shopping
                            </Link>

                        </div>

                    </Card>

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        lg:grid-cols-3
                        gap-6
                    ">

                        <div className="
                            lg:col-span-2
                            space-y-4
                        ">

                            {cart.items.map(item => {

                                const product =
                                    item.product;

                                const price =
                                    product.discountPrice ||
                                    product.price ||
                                    0;

                                return (

                                    <Card
                                        key={item._id}
                                    >

                                        <div className="
                                            flex
                                            gap-4
                                        ">

                                            <div className="
                                                w-24
                                                h-24
                                                bg-gray-100
                                                rounded
                                                overflow-hidden
                                                shrink-0
                                            ">

                                                {product.images?.[0]?.url ? (

                                                    <img
                                                        src={
                                                            product.images[0].url
                                                        }
                                                        alt={
                                                            product.name
                                                        }
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

                                            <div className="
                                                flex-1
                                            ">

                                                <Link
                                                    to={`/products/${product.slug}`}
                                                    className="
                                                        font-semibold
                                                        hover:underline
                                                    "
                                                >
                                                    {product.name}
                                                </Link>

                                                {item.variantSku && (

                                                    <p className="
                                                        text-sm
                                                        text-gray-500
                                                        mt-1
                                                    ">
                                                        SKU: {
                                                            item.variantSku
                                                        }
                                                    </p>

                                                )}

                                                <p className="
                                                    font-semibold
                                                    mt-2
                                                ">
                                                    ₹{price}
                                                </p>

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                    mt-3
                                                ">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item._id,
                                                                item.quantity - 1
                                                            )
                                                        }
                                                        className="
                                                            border
                                                            px-3
                                                            py-1
                                                            rounded
                                                        "
                                                    >
                                                        -
                                                    </button>

                                                    <span>
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item._id,
                                                                item.quantity + 1
                                                            )
                                                        }
                                                        className="
                                                            border
                                                            px-3
                                                            py-1
                                                            rounded
                                                        "
                                                    >
                                                        +
                                                    </button>

                                                </div>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemove(
                                                        item._id
                                                    )
                                                }
                                                className="
                                                    text-red-600
                                                    text-sm
                                                "
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </Card>

                                );

                            })}

                        </div>

                        <Card>

                            <h2 className="
                                text-xl
                                font-semibold
                            ">
                                Order Summary
                            </h2>

                            <div className="
                                flex
                                justify-between
                                mt-6
                            ">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    ₹{subtotal}
                                </span>

                            </div>

                            <div className="
                                flex
                                justify-between
                                mt-3
                            ">

                                <span>
                                    Shipping
                                </span>

                                <span>
                                    Free
                                </span>

                            </div>

                            <div className="
                                border-t
                                mt-4
                                pt-4
                                flex
                                justify-between
                                font-bold
                            ">

                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹{subtotal}
                                </span>

                            </div>

                            <Link
                                to="/checkout"
                                className="
                                    block
                                    text-center
                                    bg-black
                                    text-white
                                    py-3
                                    rounded-lg
                                    mt-6
                                "
                            >
                                Checkout
                            </Link>

                        </Card>

                    </div>

                )}

            </div>

        </Container>

    );

};

export default CartPage;