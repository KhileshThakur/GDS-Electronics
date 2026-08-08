import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import { getCart } from "../../cart/services/cart.service";
import { getAddresses } from "../../address/services/address.service";
import { createOrder } from "../services/checkout.service";

const CheckoutPage = () => {

    const navigate = useNavigate();

    const [cart, setCart] = useState({
        items: []
    });

    const [addresses, setAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [placingOrder, setPlacingOrder] =
        useState(false);

    const fetchCheckoutData = async () => {

        try {

            setLoading(true);

            const [
                cartResponse,
                addressResponse
            ] = await Promise.all([
                getCart(),
                getAddresses()
            ]);

            const cartData =
                cartResponse.data || {
                    items: []
                };

            const addressData =
                addressResponse.data || [];

            setCart(cartData);

            setAddresses(addressData);

            const defaultAddress =
                addressData.find(
                    address => address.isDefault
                );

            if (defaultAddress) {

                setSelectedAddress(
                    defaultAddress._id
                );

            }
        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load checkout"
            );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCheckoutData();

    }, []);

    const getItemPrice = (item) => {

        const product =
            item.product;

        if (
            item.variantSku &&
            product.variants
        ) {

            const variant =
                product.variants.find(
                    variant =>
                        variant.sku === item.variantSku
                );

            if (variant) {

                return (
                    variant.discountPrice ||
                    variant.price
                );

            }

        }

        return (
            product.discountPrice ||
            product.price ||
            0
        );

    };

    const subtotal =
        cart.items.reduce(
            (
                total,
                item
            ) => {

                return total +
                    getItemPrice(item) *
                    item.quantity;

            },
            0
        );

    const handlePlaceOrder = async () => {

        if (!selectedAddress) {

            toast.error(
                "Please select an address"
            );

            return;

        }

        if (cart.items.length === 0) {

            toast.error(
                "Your cart is empty"
            );

            return;

        }

        try {

            setPlacingOrder(true);

            const response =
                await createOrder({

                    addressId:
                        selectedAddress,

                    paymentMethod:
                        "COD"

                });

            toast.success(
                response.message ||
                "Order placed successfully"
            );

            const order =
                response.data;

            navigate(
                `/orders/${order._id}`
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to place order"
            );

        }
        finally {

            setPlacingOrder(false);

        }

    };

    if (loading) {

        return (
            <Container>

                <div className="
                    py-16
                    text-center
                ">
                    Loading checkout...
                </div>

            </Container>
        );

    }

    if (cart.items.length === 0) {

        return (
            <Container>

                <div className="py-16">

                    <Card>

                        <div className="
                            text-center
                            py-10
                        ">

                            <h1 className="
                                text-2xl
                                font-bold
                            ">
                                Your cart is empty
                            </h1>

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
                    Checkout
                </h1>

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-3
                    gap-6
                ">

                    {/* Address */}

                    <div className="
                        lg:col-span-2
                    ">

                        <Card>

                            <div className="
                                flex
                                items-center
                                justify-between
                                mb-6
                            ">

                                <h2 className="
                                    text-xl
                                    font-semibold
                                ">
                                    Delivery Address
                                </h2>

                                <Link
                                    to="/addresses"
                                    className="
                                        text-sm
                                        underline
                                    "
                                >
                                    Manage Addresses
                                </Link>

                            </div>

                            {addresses.length === 0 ? (

                                <div>

                                    <p className="
                                        text-gray-500
                                    ">
                                        You don't have an
                                        address yet.
                                    </p>

                                    <Link
                                        to="/addresses"
                                        className="
                                            inline-block
                                            mt-4
                                            bg-black
                                            text-white
                                            px-5
                                            py-2
                                            rounded-lg
                                        "
                                    >
                                        Add Address
                                    </Link>

                                </div>

                            ) : (

                                <div className="
                                    space-y-4
                                ">

                                    {addresses.map(
                                        address => (

                                            <label
                                                key={
                                                    address._id
                                                }
                                                className={`
                                                    block
                                                    border
                                                    rounded-lg
                                                    p-4
                                                    cursor-pointer
                                                    ${
                                                        selectedAddress ===
                                                        address._id
                                                            ? "border-black"
                                                            : "border-gray-200"
                                                    }
                                                `}
                                            >

                                                <div className="
                                                    flex
                                                    gap-3
                                                ">

                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        value={
                                                            address._id
                                                        }
                                                        checked={
                                                            selectedAddress ===
                                                            address._id
                                                        }
                                                        onChange={() =>
                                                            setSelectedAddress(
                                                                address._id
                                                            )
                                                        }
                                                    />

                                                    <div>

                                                        <div className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                        ">

                                                            <p className="
                                                                font-semibold
                                                            ">
                                                                {
                                                                    address.fullName
                                                                }
                                                            </p>

                                                            {address.isDefault && (

                                                                <span className="
                                                                    text-xs
                                                                    text-green-600
                                                                ">
                                                                    Default
                                                                </span>

                                                            )}

                                                        </div>

                                                        <p className="
                                                            text-sm
                                                            text-gray-600
                                                            mt-1
                                                        ">
                                                            {
                                                                address.mobile
                                                            }
                                                        </p>

                                                        <p className="
                                                            text-sm
                                                            text-gray-600
                                                            mt-1
                                                        ">
                                                            {
                                                                address.addressLine1
                                                            }
                                                        </p>

                                                        {address.addressLine2 && (

                                                            <p className="
                                                                text-sm
                                                                text-gray-600
                                                            ">
                                                                {
                                                                    address.addressLine2
                                                                }
                                                            </p>

                                                        )}

                                                        <p className="
                                                            text-sm
                                                            text-gray-600
                                                        ">
                                                            {
                                                                address.city
                                                            },{" "}
                                                            {
                                                                address.state
                                                            } -{" "}
                                                            {
                                                                address.pincode
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                            </label>

                                        )
                                    )}

                                </div>

                            )}

                        </Card>


                        {/* Payment */}

                        <Card className="mt-6">

                            <h2 className="
                                text-xl
                                font-semibold
                                mb-4
                            ">
                                Payment Method
                            </h2>

                            <div className="
                                border
                                rounded-lg
                                p-4
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <input
                                        type="radio"
                                        checked
                                        readOnly
                                    />

                                    <div>

                                        <p className="
                                            font-semibold
                                        ">
                                            Cash on Delivery
                                        </p>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                        ">
                                            Pay when your order
                                            arrives.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-3
                            ">
                                Online payment will be
                                available once Razorpay is
                                integrated.
                            </p>

                        </Card>

                    </div>


                    {/* Summary */}

                    <Card className="
                        h-fit
                    ">

                        <h2 className="
                            text-xl
                            font-semibold
                        ">
                            Order Summary
                        </h2>

                        <div className="
                            mt-6
                            space-y-4
                        ">

                            {cart.items.map(
                                item => (

                                    <div
                                        key={item._id}
                                        className="
                                            flex
                                            justify-between
                                            gap-4
                                        "
                                    >

                                        <div>

                                            <p className="
                                                font-medium
                                            ">
                                                {
                                                    item.product.name
                                                }
                                            </p>

                                            <p className="
                                                text-sm
                                                text-gray-500
                                            ">
                                                Qty: {
                                                    item.quantity
                                                }
                                            </p>

                                        </div>

                                        <span>
                                            ₹{
                                                getItemPrice(
                                                    item
                                                ) *
                                                item.quantity
                                            }
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                        <div className="
                            border-t
                            mt-6
                            pt-4
                            space-y-3
                        ">

                            <div className="
                                flex
                                justify-between
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
                                pt-3
                                flex
                                justify-between
                                font-bold
                                text-lg
                            ">

                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹{subtotal}
                                </span>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={
                                handlePlaceOrder
                            }
                            disabled={
                                placingOrder ||
                                !selectedAddress
                            }
                            className="
                                w-full
                                mt-6
                                bg-black
                                text-white
                                py-3
                                rounded-lg
                                disabled:opacity-50
                            "
                        >
                            {placingOrder
                                ? "Placing Order..."
                                : "Place Order"
                            }
                        </button>

                    </Card>

                </div>

            </div>

        </Container>

    );

};

export default CheckoutPage;