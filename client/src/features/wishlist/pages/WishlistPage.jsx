import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import {
    getWishlist,
    removeFromWishlist,
    clearWishlist
} from "../services/wishlist.service";

import "./WishlistPage.css";


/* =========================================
   Heart Icon
========================================= */

const HeartIcon = () => (

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
                M20.8 8.8
                c0 5.5-8.8 10.2-8.8 10.2
                S3.2 14.3 3.2 8.8
                C3.2 6.1 5.1 4 7.7 4
                c1.7 0 3.3.9 4.3 2.3
                C13 4.9 14.6 4 16.3 4
                c2.6 0 4.5 2.1 4.5 4.8Z
            "
            strokeLinecap="round"
            strokeLinejoin="round"
        />

    </svg>

);


/* =========================================
   Trash Icon
========================================= */

const TrashIcon = () => (

    <svg
        viewBox="0 0 24 24"
        fill="none"
        width="16"
        height="16"
        stroke="currentColor"
        strokeWidth="1.8"
    >

        <path
            d="M4 7h16"
            strokeLinecap="round"
        />

        <path
            d="M10 11v6"
            strokeLinecap="round"
        />

        <path
            d="M14 11v6"
            strokeLinecap="round"
        />

        <path
            d="
                M6 7l1 13h10l1-13
            "
            strokeLinejoin="round"
        />

        <path
            d="
                M9 7V4h6v3
            "
            strokeLinejoin="round"
        />

    </svg>

);


/* =========================================
   Wishlist Page
========================================= */

const WishlistPage = () => {

    const [wishlist, setWishlist] = useState({
        products: []
    });

    const [loading, setLoading] = useState(true);


    /* =========================================
       Fetch Wishlist
    ========================================= */

    const fetchWishlist = async () => {

        try {

            setLoading(true);

            const response =
                await getWishlist();

            setWishlist(
                response.data || {
                    products: []
                }
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load wishlist"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchWishlist();

    }, []);


    /* =========================================
       Remove
    ========================================= */

    const handleRemove = async (
        productId
    ) => {

        try {

            const response =
                await removeFromWishlist(
                    productId
                );

            setWishlist(
                response.data
            );

            toast.success(
                "Removed from wishlist"
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to remove product"
            );

        }

    };


    /* =========================================
       Clear
    ========================================= */

    const handleClear = async () => {

        try {

            await clearWishlist();

            setWishlist({
                products: []
            });

            toast.success(
                "Wishlist cleared"
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to clear wishlist"
            );

        }

    };


    /* =========================================
       Loading
    ========================================= */

    if (loading) {

        return (

            <Container>

                <div className="
                    wishlist-loading
                ">

                    <div className="
                        wishlist-spinner
                    " />

                    <p>
                        Loading your wishlist...
                    </p>

                </div>

            </Container>

        );

    }


    return (

        <Container>

            <div className="
                wishlist-page
            ">


                {/* =================================
                    Header
                ================================= */}

                <div className="
                    wishlist-header
                ">

                    <div>

                        <span className="
                            wishlist-eyebrow
                        ">
                            SAVED FOR LATER
                        </span>

                        <div className="
                            wishlist-title-row
                        ">
                            <div>

                                <h1>
                                    Wishlist
                                </h1>

                                <p>
                                    Products you don't want
                                    to lose track of.
                                </p>

                            </div>

                        </div>

                    </div>


                    {wishlist.products.length > 0 && (

                        <button
                            type="button"
                            onClick={handleClear}
                            className="
                                wishlist-clear-btn
                            "
                        >
                            Clear Wishlist
                        </button>

                    )}

                </div>


                {/* =================================
                    Empty State
                ================================= */}

                {wishlist.products.length === 0 ? (

                    <Card>

                        <div className="
                            wishlist-empty
                        ">

                            <div className="
                                wishlist-empty-icon
                            ">
                                <HeartIcon />
                            </div>

                            <h2>
                                Your wishlist is empty
                            </h2>

                            <p>
                                Save products you love
                                and find them here later.
                            </p>

                            <Link
                                to="/products"
                                className="
                                    wishlist-primary-btn
                                "
                            >
                                Browse Products
                                <span>
                                    →
                                </span>
                            </Link>

                        </div>

                    </Card>

                ) : (

                    <div className="
                        wishlist-grid
                    ">

                        {wishlist.products.map(
                            product => (

                                <Card
                                    key={product._id}
                                    className="
                                        wishlist-card-wrapper
                                    "
                                >

                                    <article className="
                                        wishlist-card
                                    ">


                                        {/* =================================
                                            Image
                                        ================================= */}

                                        <Link
                                            to={`/products/${product.slug}`}
                                            className="
                                                wishlist-image-link
                                            "
                                        >

                                            <div className="
                                                wishlist-image
                                            ">

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
                                                        wishlist-no-image
                                                    ">
                                                        No Image
                                                    </div>

                                                )}


                                                {/* Heart */}

                                                <span className="
                                                    wishlist-heart
                                                ">
                                                    <HeartIcon />
                                                </span>


                                                {/* Featured */}

                                                {product.isFeatured && (

                                                    <span className="
                                                        wishlist-featured
                                                    ">
                                                        Featured
                                                    </span>

                                                )}

                                            </div>

                                        </Link>


                                        {/* =================================
                                            Details
                                        ================================= */}

                                        <div className="
                                            wishlist-details
                                        ">

                                            <span className="
                                                wishlist-brand
                                            ">
                                                {product.brand}
                                            </span>


                                            <Link
                                                to={`/products/${product.slug}`}
                                                className="
                                                    wishlist-product-link
                                                "
                                            >

                                                <h2>
                                                    {product.name}
                                                </h2>

                                            </Link>


                                            {product.shortDescription && (

                                                <p className="
                                                    wishlist-description
                                                ">
                                                    {
                                                        product.shortDescription
                                                    }
                                                </p>

                                            )}


                                            {/* Price */}

                                            <div className="
                                                wishlist-price-row
                                            ">

                                                <span className="
                                                    wishlist-price
                                                ">
                                                    ₹
                                                    {
                                                        (
                                                            product.discountPrice ||
                                                            product.price ||
                                                            0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )
                                                    }
                                                </span>


                                                {product.discountPrice > 0 && (

                                                    <span className="
                                                        wishlist-old-price
                                                    ">
                                                        ₹
                                                        {
                                                            product.price.toLocaleString(
                                                                "en-IN"
                                                            )
                                                        }
                                                    </span>

                                                )}

                                            </div>


                                            {/* Actions */}

                                            <div className="
                                                wishlist-actions
                                            ">

                                                <Link
                                                    to={`/products/${product.slug}`}
                                                    className="
                                                        wishlist-view-btn
                                                    "
                                                >
                                                    View Product
                                                </Link>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemove(
                                                            product._id
                                                        )
                                                    }
                                                    className="
                                                        wishlist-remove-btn
                                                    "
                                                    title="Remove from wishlist"
                                                >
                                                    <TrashIcon />
                                                </button>

                                            </div>

                                        </div>

                                    </article>

                                </Card>

                            )
                        )}

                    </div>

                )}

            </div>

        </Container>

    );

};


export default WishlistPage;