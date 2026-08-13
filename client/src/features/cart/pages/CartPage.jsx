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
import "./CartPage.css";
import { FaCartShopping } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { BiRupee } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const CartPage = () => {
    const [cart, setCart] = useState({
        items: []
    });
    const [loading, setLoading] = useState(true);
    /* =========================================
       Fetch Cart
    ========================================= */
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
    /* =========================================
       Quantity
    ========================================= */
    const handleQuantityChange = async (
        itemId,
        quantity
    ) => {
        if (quantity < 1) {
            handleRemove(itemId);
            return;
        }
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
    /* =========================================
       Remove
    ========================================= */
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
    /* =========================================
       Clear Cart
    ========================================= */
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
    /* =========================================
       Item Price
    ========================================= */
    const getItemPrice = (item) => {
        const product =
            item.product;
        if (!product) {
            return 0;
        }
        /* Variant */
        if (
            item.variantSku &&
            product.variants?.length
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
                    variant.price ||
                    0
                );
            }
        }
        /* Normal Product */
        return (
            product.discountPrice ||
            product.price ||
            0
        );
    };
    /* =========================================
       Subtotal
    ========================================= */
    const subtotal =
        cart.items.reduce(
            (total, item) =>
                total +
                getItemPrice(item) *
                item.quantity,
            0
        );
    /* =========================================
       Loading
    ========================================= */
    if (loading) {
        return (
            <Container>
                <div className="
                    cart-loading
                ">
                    <div className="
                        cart-loading-spinner
                    " />
                    <p>
                        Loading your cart...
                    </p>
                </div>
            </Container>
        );
    }
    /* =========================================
       Page
    ========================================= */
    return (
        <Container>
            <div className="
                cart-page
            ">
                {/* =================================
                    Header
                ================================= */}
                <div className="
                    cart-header
                ">
                    <div>
                        <span className="
                            cart-eyebrow
                        ">
                            SHOPPING CART
                        </span>
                        <h1>
                            Your Cart
                        </h1>
                        <p>
                            Review your items before
                            heading to checkout.
                        </p>
                    </div>
                    {cart.items.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="
                                cart-clear-btn
                            "
                        >
                            Clear Cart
                        </button>
                    )}
                </div>
                {/* =================================
                    Empty
                ================================= */}
                {cart.items.length === 0 ? (
                    <Card>
                        <div className="
                            cart-empty
                        ">
                            <div className="
                                cart-empty-icon
                            ">
                                <FaCartShopping />
                            </div>
                            <h2>
                                Your cart is empty
                            </h2>
                            <p>
                                Looks like you haven't
                                added anything yet.
                            </p>
                            <Link
                                to="/products"
                                className="
                                    cart-primary-btn
                                "
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </Card>
                ) : (
                    <div className="
                        cart-layout
                    ">
                        {/* =================================
                            Items
                        ================================= */}
                        <div className="
                            cart-items
                        ">
                            {cart.items.map(
                                item => {
                                    const product =
                                        item.product;
                                    const price =
                                        getItemPrice(
                                            item
                                        );
                                    const variant =
                                        item.variantSku &&
                                        product?.variants?.find(
                                            variant =>
                                                variant.sku ===
                                                item.variantSku
                                        );
                                    const itemTotal =
                                        price *
                                        item.quantity;
                                    return (
                                        <Card
                                            key={item._id}
                                        >
                                            <div className="
                                                cart-item
                                            ">
                                                {/* Image */}
                                                <Link
                                                    to={`/products/${product.slug}`}
                                                    className="
                                                        cart-item-image
                                                    "
                                                >
                                                    {product.images?.[0]?.url ? (
                                                        <img
                                                            src={
                                                                product.images[0].url
                                                            }
                                                            alt={
                                                                product.name
                                                            }
                                                        />
                                                    ) : (
                                                        <div className="
                                                            cart-no-image
                                                        ">
                                                            No Image
                                                        </div>
                                                    )}
                                                </Link>
                                                {/* Details */}
                                                <div className="
                                                    cart-item-details
                                                ">
                                                    <div>
                                                        <span className="
                                                            cart-item-brand
                                                        ">
                                                            {product.brand}
                                                        </span>
                                                        <Link
                                                            to={`/products/${product.slug}`}
                                                            className="
                                                                cart-item-name
                                                            "
                                                        >
                                                            {product.name}
                                                        </Link>
                                                        {/* Variant */}
                                                        {variant && (
                                                            <div className="
                                                                cart-variant
                                                            ">
                                                                <span>
                                                                    {variant.name}
                                                                </span>
                                                                <small>
                                                                    SKU: {
                                                                        item.variantSku
                                                                    }
                                                                </small>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* Price */}
                                                    <div className="
                                                        cart-item-price
                                                    ">
                                                        ₹
                                                        {price.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </div>
                                                    {/* Controls */}
                                                    <div className="
                                                        cart-item-bottom
                                                    ">
                                                        <div className="
                                                            quantity-control
                                                        ">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        item._id,
                                                                        item.quantity - 1
                                                                    )
                                                                }
                                                            >
                                                                <FaMinus />
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
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="
                                                            cart-item-total
                                                        ">
                                                            <BiRupee />
                                                            {itemTotal.toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* Remove */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemove(
                                                            item._id
                                                        )
                                                    }
                                                    className="
                                                        cart-remove-btn
                                                    "
                                                    title="Remove item"
                                                >
                                                    <RxCross2 />
                                                </button>
                                            </div>
                                        </Card>
                                    );
                                }
                            )}
                        </div>
                        {/* =================================
                            Summary
                        ================================= */}
                        <Card>
                            <div className="
                                cart-summary
                            ">
                                <div className="
                                    cart-summary-heading
                                ">
                                    <span>
                                        ORDER SUMMARY
                                    </span>
                                    <h2>
                                        Your Order
                                    </h2>
                                </div>
                                <div className="
                                    cart-summary-row
                                ">
                                    <span>
                                        Items
                                    </span>
                                    <span>
                                        {cart.items.reduce(
                                            (
                                                total,
                                                item
                                            ) =>
                                                total +
                                                item.quantity,
                                            0
                                        )}
                                    </span>
                                </div>
                                <div className="
                                    cart-summary-row
                                ">
                                    <span>
                                        Subtotal
                                    </span>
                                    <span>
                                        ₹
                                        {subtotal.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                </div>
                                <div className="
                                    cart-summary-row
                                ">
                                    <span>
                                        Shipping
                                    </span>
                                    <span className="
                                        cart-free
                                    ">
                                        FREE
                                    </span>
                                </div>
                                <div className="
                                    cart-summary-total
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
                                <Link
                                    to="/checkout"
                                    className="
                                        cart-checkout-btn
                                    "
                                >
                                    Proceed to Checkout
                                    <span>
                                        <FaArrowRight />
                                    </span>
                                </Link>
                                <Link
                                    to="/products"
                                    className="
                                        cart-shopping-link
                                    "
                                >
                                    <FaArrowLeft />
                                    Continue Shopping
                                </Link>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </Container>
    );
};
export default CartPage;