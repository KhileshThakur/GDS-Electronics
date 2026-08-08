import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import { getCart } from "../../cart/services/cart.service";
import { getAddresses } from "../../address/services/address.service";
import { createOrder } from "../services/checkout.service";

import "./CheckoutPage.css";


/* =========================================
   Icons
========================================= */

const LocationIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        width="20"
        height="20"
        stroke="currentColor"
        strokeWidth="1.8"
    >
        <path
            d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
            strokeLinejoin="round"
        />
        <circle
            cx="12"
            cy="10"
            r="2.5"
        />
    </svg>
);


const PaymentIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        width="20"
        height="20"
        stroke="currentColor"
        strokeWidth="1.8"
    >
        <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
        />
        <path
            d="M3 10h18"
        />
        <path
            d="M7 15h4"
            strokeLinecap="round"
        />
    </svg>
);


const ShieldIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.8"
    >
        <path
            d="
                M12 3
                20 6
                v6
                c0 4.5-3.2 7.5-8 9
                -4.8-1.5-8-4.5-8-9V6l8-3Z
            "
            strokeLinejoin="round"
        />
        <path
            d="m9 12 2 2 4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);


/* =========================================
   Checkout Page
========================================= */

const CheckoutPage = () => {

    const navigate = useNavigate();

    const [cart, setCart] = useState({
        items: []
    });

    const [addresses, setAddresses] =
        useState([]);

    const [selectedAddress, setSelectedAddress] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [placingOrder, setPlacingOrder] =
        useState(false);


    /* =========================================
       Fetch Data
    ========================================= */

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


    /* =========================================
       Price
    ========================================= */

    const getItemPrice = (item) => {

        const product = item.product;

        if (
            item.variantSku &&
            product.variants
        ) {

            const variant =
                product.variants.find(
                    variant =>
                        variant.sku ===
                        item.variantSku
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
            (total, item) =>
                total +
                getItemPrice(item) *
                item.quantity,
            0
        );


    /* =========================================
       Place Order
    ========================================= */

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


    /* =========================================
       Loading
    ========================================= */

    if (loading) {

        return (

            <Container>

                <div className="
                    checkout-loading
                ">

                    <div className="
                        checkout-spinner
                    " />

                    <p>
                        Preparing your checkout...
                    </p>

                </div>

            </Container>

        );

    }


    /* =========================================
       Empty Cart
    ========================================= */

    if (cart.items.length === 0) {

        return (

            <Container>

                <div className="
                    checkout-empty-wrapper
                ">

                    <Card>

                        <div className="
                            checkout-empty
                        ">

                            <div className="
                                checkout-empty-icon
                            ">
                                🛒
                            </div>

                            <h1>
                                Your cart is empty
                            </h1>

                            <p>
                                Add some products before
                                proceeding to checkout.
                            </p>

                            <Link
                                to="/products"
                                className="
                                    checkout-primary-btn
                                "
                            >
                                Continue Shopping
                                <span>→</span>
                            </Link>

                        </div>

                    </Card>

                </div>

            </Container>

        );

    }


    return (

        <Container>

            <div className="
                checkout-page
            ">


                {/* =================================
                    Header
                ================================= */}

                <div className="
                    checkout-header
                ">

                    <div>

                        <span className="
                            checkout-eyebrow
                        ">
                            SECURE CHECKOUT
                        </span>

                        <h1>
                            Checkout
                        </h1>

                        <p>
                            Review your order and
                            choose where you'd like it delivered.
                        </p>

                    </div>

                </div>


                {/* =================================
                    Main Grid
                ================================= */}

                <div className="
                    checkout-grid
                ">


                    {/* =================================
                        Left
                    ================================= */}

                    <div className="
                        checkout-main
                    ">


                        {/* =================================
                            Address
                        ================================= */}

                        <Card>

                            <div className="
                                checkout-section-header
                            ">

                                <div className="
                                    checkout-section-title
                                ">

                                    <div className="
                                        checkout-section-icon
                                    ">
                                        <LocationIcon />
                                    </div>

                                    <div>

                                        <h2>
                                            Delivery Address
                                        </h2>

                                        <p>
                                            Where should we
                                            deliver your order?
                                        </p>

                                    </div>

                                </div>


                                <Link
                                    to="/addresses"
                                    className="
                                        checkout-manage-link
                                    "
                                >
                                    Manage Addresses
                                </Link>

                            </div>


                            {addresses.length === 0 ? (

                                <div className="
                                    checkout-no-address
                                ">

                                    <p>
                                        You don't have an
                                        address yet.
                                    </p>

                                    <Link
                                        to="/addresses"
                                        className="
                                            checkout-secondary-btn
                                        "
                                    >
                                        Add Address
                                    </Link>

                                </div>

                            ) : (

                                <div className="
                                    checkout-address-list
                                ">

                                    {addresses.map(
                                        address => (

                                            <label
                                                key={
                                                    address._id
                                                }

                                                className={`
                                                    checkout-address-card
                                                    ${
                                                        selectedAddress ===
                                                        address._id
                                                            ? "selected"
                                                            : ""
                                                    }
                                                `}
                                            >

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


                                                <span className="
                                                    checkout-radio
                                                " />


                                                <div className="
                                                    checkout-address-content
                                                ">

                                                    <div className="
                                                        checkout-address-top
                                                    ">

                                                        <strong>
                                                            {
                                                                address.fullName
                                                            }
                                                        </strong>

                                                        {address.isDefault && (

                                                            <span className="
                                                                checkout-default
                                                            ">
                                                                Default
                                                            </span>

                                                        )}

                                                    </div>


                                                    <p className="
                                                        checkout-mobile
                                                    ">
                                                        {
                                                            address.mobile
                                                        }
                                                    </p>


                                                    <p>
                                                        {
                                                            address.addressLine1
                                                        }
                                                    </p>


                                                    {address.addressLine2 && (

                                                        <p>
                                                            {
                                                                address.addressLine2
                                                            }
                                                        </p>

                                                    )}


                                                    <p>
                                                        {
                                                            address.city
                                                        }
                                                        ,{" "}
                                                        {
                                                            address.state
                                                        }
                                                        {" - "}
                                                        {
                                                            address.pincode
                                                        }
                                                    </p>

                                                </div>

                                            </label>

                                        )
                                    )}

                                </div>

                            )}

                        </Card>


                        {/* =================================
                            Payment
                        ================================= */}

                        <Card className="
                            checkout-payment-card
                        ">

                            <div className="
                                checkout-section-title
                            ">

                                <div className="
                                    checkout-section-icon
                                ">
                                    <PaymentIcon />
                                </div>

                                <div>

                                    <h2>
                                        Payment Method
                                    </h2>

                                    <p>
                                        Choose how you'd like
                                        to pay.
                                    </p>

                                </div>

                            </div>


                            <div className="
                                checkout-payment-option
                            ">

                                <input
                                    type="radio"
                                    checked
                                    readOnly
                                />

                                <div className="
                                    checkout-payment-content
                                ">

                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <span>
                                        Pay when your order
                                        arrives.
                                    </span>

                                </div>

                                <span className="
                                    checkout-payment-badge
                                ">
                                    COD
                                </span>

                            </div>


                            <div className="
                                checkout-payment-note
                            ">

                                Online payment will be
                                available once Razorpay
                                is integrated.

                            </div>

                        </Card>

                    </div>


                    {/* =================================
                        Summary
                    ================================= */}

                    <Card className="
                        checkout-summary
                    ">

                        <div className="
                            checkout-summary-header
                        ">

                            <div>

                                <span>
                                    YOUR ORDER
                                </span>

                                <h2>
                                    Order Summary
                                </h2>

                            </div>

                            <div className="
                                checkout-item-count
                            ">
                                {cart.items.length}
                            </div>

                        </div>


                        <div className="
                            checkout-items
                        ">

                            {cart.items.map(
                                item => (

                                    <div
                                        key={item._id}
                                        className="
                                            checkout-item
                                        "
                                    >

                                        <div className="
                                            checkout-item-image
                                        ">

                                            {item.product.images?.[0]?.url ? (

                                                <img
                                                    src={
                                                        item.product
                                                            .images[0]
                                                            .url
                                                    }
                                                    alt={
                                                        item.product.name
                                                    }
                                                />

                                            ) : (

                                                <span>
                                                    No Image
                                                </span>

                                            )}

                                        </div>


                                        <div className="
                                            checkout-item-info
                                        ">

                                            <strong>
                                                {
                                                    item.product.name
                                                }
                                            </strong>

                                            {item.variantSku && (

                                                <span className="
                                                    checkout-variant
                                                ">
                                                    {item.variantSku}
                                                </span>

                                            )}

                                            <span>
                                                Qty: {
                                                    item.quantity
                                                }
                                            </span>

                                        </div>


                                        <strong className="
                                            checkout-item-price
                                        ">
                                            ₹
                                            {
                                                (
                                                    getItemPrice(
                                                        item
                                                    ) *
                                                    item.quantity
                                                ).toLocaleString(
                                                    "en-IN"
                                                )
                                            }
                                        </strong>

                                    </div>

                                )
                            )}

                        </div>


                        {/* =================================
                            Totals
                        ================================= */}

                        <div className="
                            checkout-totals
                        ">

                            <div>

                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    ₹
                                    {subtotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Shipping
                                </span>

                                <strong className="
                                    checkout-free
                                ">
                                    Free
                                </strong>

                            </div>


                            <div className="
                                checkout-total
                            ">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹
                                    {subtotal.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>

                        </div>


                        {/* =================================
                            Place Order
                        ================================= */}

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
                                checkout-place-btn
                            "
                        >

                            {placingOrder
                                ? "Placing Order..."
                                : "Place Order"
                            }

                            {!placingOrder && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>


                        <div className="
                            checkout-secure
                        ">

                            <ShieldIcon />

                            <span>
                                Secure checkout
                            </span>

                        </div>

                    </Card>

                </div>

            </div>

        </Container>

    );

};

export default CheckoutPage;