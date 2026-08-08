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

const WishlistPage = () => {

    const [wishlist, setWishlist] = useState({
        products: []
    });

    const [loading, setLoading] = useState(true);

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

    if (loading) {

        return (
            <Container>

                <div className="py-16 text-center">
                    Loading wishlist...
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
                            Wishlist
                        </h1>

                        <p className="
                            text-gray-500
                            mt-2
                        ">
                            Products you saved
                        </p>

                    </div>

                    {wishlist.products.length > 0 && (

                        <button
                            type="button"
                            onClick={handleClear}
                            className="
                                text-red-600
                                text-sm
                            "
                        >
                            Clear Wishlist
                        </button>

                    )}

                </div>

                {wishlist.products.length === 0 ? (

                    <Card>

                        <div className="
                            py-16
                            text-center
                        ">

                            <h2 className="
                                text-xl
                                font-semibold
                            ">
                                Your wishlist is empty
                            </h2>

                            <p className="
                                text-gray-500
                                mt-2
                            ">
                                Save products you like here.
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
                                Browse Products
                            </Link>

                        </div>

                    </Card>

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                        gap-6
                    ">

                        {wishlist.products.map(
                            product => (

                                <Card
                                    key={product._id}
                                    className="
                                        overflow-hidden
                                    "
                                >

                                    <Link
                                        to={`/products/${product.slug}`}
                                    >

                                        <div className="
                                            aspect-square
                                            bg-gray-100
                                            overflow-hidden
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
                                                    text-gray-400
                                                ">
                                                    No Image
                                                </div>

                                            )}

                                        </div>

                                    </Link>

                                    <div className="p-4">

                                        <p className="
                                            text-sm
                                            text-gray-500
                                        ">
                                            {product.brand}
                                        </p>

                                        <Link
                                            to={`/products/${product.slug}`}
                                        >

                                            <h2 className="
                                                font-semibold
                                                text-lg
                                                mt-1
                                            ">
                                                {product.name}
                                            </h2>

                                        </Link>

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                            mt-3
                                        ">

                                            <span className="
                                                font-bold
                                            ">
                                                ₹
                                                {
                                                    product.discountPrice ||
                                                    product.price
                                                }
                                            </span>

                                            {product.discountPrice > 0 && (

                                                <span className="
                                                    text-sm
                                                    text-gray-400
                                                    line-through
                                                ">
                                                    ₹{product.price}
                                                </span>

                                            )}

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemove(
                                                    product._id
                                                )
                                            }
                                            className="
                                                w-full
                                                mt-4
                                                border
                                                border-red-300
                                                text-red-600
                                                py-2
                                                rounded-lg
                                            "
                                        >
                                            Remove
                                        </button>

                                    </div>

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