import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import {
    getProduct
} from "../services/product.service";
import {
    addToCart
} from "../../cart/services/cart.service";
import {
    addToWishlist,
    removeFromWishlist
} from "../../wishlist/services/wishlist.service";



const ProductDetailsPage = () => {

    const { slug } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const fetchProduct = async () => {

        try {

            setLoading(true);

            const response =
                await getProduct(slug);

            const data =
                response.data;

            setProduct(data);

            if (data.variants?.length) {

                setSelectedVariant(
                    data.variants[0]
                );

            }

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load product"
            );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProduct();

    }, [slug]);

    if (loading) {

        return (
            <Container>

                <div className="py-16 text-center">
                    Loading product...
                </div>

            </Container>
        );

    }

    if (!product) {

        return (
            <Container>

                <div className="py-16 text-center">
                    Product not found
                </div>

            </Container>
        );

    }

    const price =
        selectedVariant
            ? (
                selectedVariant.discountPrice ||
                selectedVariant.price
            )
            : (
                product.discountPrice ||
                product.price
            );

    const originalPrice =
        selectedVariant
            ? selectedVariant.price
            : product.price;

    const stock =
        selectedVariant
            ? selectedVariant.stock
            : product.stock;


    const handleAddToCart = async () => {

        try {

            const response =
                await addToCart({

                    product:
                        product._id,

                    variantSku:
                        selectedVariant?.sku || undefined,

                    quantity

                });

            toast.success(
                response.message ||
                "Added to cart"
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add to cart"
            );

        }

    };

    const handleWishlist = async () => {

        try {

            const response =
                await addToWishlist(
                    product._id
                );

            toast.success(
                response.message ||
                "Added to wishlist"
            );

        }
        catch (error) {

            if (
                error.response?.status === 409
            ) {

                toast.error(
                    "Already in wishlist"
                );

                return;

            }

            toast.error(
                error.response?.data?.message ||
                "Failed to update wishlist"
            );

        }

    };


    return (

        <Container>

            <div className="py-10">

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-10
                ">

                    {/* Images */}

                    <div>

                        <div className="
                            aspect-square
                            bg-gray-100
                            rounded-lg
                            overflow-hidden
                        ">

                            {product.images?.[0]?.url ? (

                                <img
                                    src={
                                        product.images[0].url
                                    }
                                    alt={product.name}
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

                    </div>


                    {/* Product Information */}

                    <div>

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            {product.brand}
                        </p>

                        <h1 className="
                            text-3xl
                            font-bold
                            mt-2
                        ">
                            {product.name}
                        </h1>

                        <p className="
                            text-gray-500
                            mt-4
                        ">
                            {product.shortDescription}
                        </p>


                        {/* Price */}

                        <div className="
                            flex
                            items-center
                            gap-4
                            mt-6
                        ">

                            <span className="
                                text-3xl
                                font-bold
                            ">
                                ₹{price}
                            </span>

                            {price !== originalPrice && (
                                <span className="
                                    text-lg
                                    text-gray-400
                                    line-through
                                ">
                                    ₹{originalPrice}
                                </span>
                            )}
                        </div>


                        {/* Variants */}

                        {product.variants?.length > 0 && (
                            <div className="mt-8">
                                <h2 className="
                                    font-semibold
                                    mb-3
                                ">
                                    Variants
                                </h2>

                                <div className="
                                    flex
                                    flex-wrap
                                    gap-3
                                ">

                                    {product.variants.map(
                                        variant => (

                                            <button
                                                key={
                                                    variant.sku
                                                }
                                                type="button"
                                                onClick={() =>
                                                    setSelectedVariant(
                                                        variant
                                                    )
                                                }
                                                disabled={
                                                    variant.stock <= 0
                                                }
                                                className={`
                                                    border
                                                    rounded-lg
                                                    px-4
                                                    py-2
                                                    ${selectedVariant?.sku ===
                                                        variant.sku
                                                        ? "border-black bg-black text-white"
                                                        : "border-gray-300"
                                                    }
                                                    ${variant.stock <= 0
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                    }
                                                `}
                                            >
                                                {variant.name ||
                                                    variant.sku}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        )}


                        {/* Stock */}

                        <div className="mt-6">
                            {stock > 0 ? (

                                <p className="text-green-600">
                                    In Stock
                                </p>

                            ) : (
                                <p className="text-red-600">
                                    Out of Stock
                                </p>

                            )}
                        </div>


                        {/* Quantity */}

                        {stock > 0 && (

                            <div className="
                                flex
                                items-center
                                gap-4
                                mt-6
                            ">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity(
                                            previous =>
                                                Math.max(
                                                    1,
                                                    previous - 1
                                                )
                                        )
                                    }
                                    className="
                                        border
                                        px-4
                                        py-2
                                        rounded
                                    "
                                >
                                    -
                                </button>

                                <span>
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity(
                                            previous =>
                                                Math.min(
                                                    stock,
                                                    previous + 1
                                                )
                                        )
                                    }
                                    className="
                                        border
                                        px-4
                                        py-2
                                        rounded
                                    "
                                >
                                    +
                                </button>
                            </div>
                        )}


                        {/* Actions */}

                        <div className="
                            flex
                            gap-4
                            mt-8
                        ">

                            <button
                                type="button"
                                disabled={stock <= 0}
                                onClick={handleAddToCart}
                                className="
                                    flex-1
                                    bg-black
                                    text-white
                                    py-3
                                    rounded-lg
                                    disabled:opacity-50
                                "
                            >
                                Add to Cart
                            </button>

                            <button
                                type="button"
                                onClick={handleWishlist}
                                className="
                                    border
                                    px-6
                                    py-3
                                    rounded-lg
                                "
                            >
                                ♡
                            </button>
                        </div>
                    </div>
                </div>


                {/* Description */}

                <Card className="mt-10">
                    <h2 className="
                        text-xl
                        font-semibold
                    ">
                        Description
                    </h2>

                    <p className="
                        mt-4
                        text-gray-600
                        whitespace-pre-line
                    ">
                        {product.description}
                    </p>
                </Card>


                {/* Specifications */}

                {product.specifications?.length > 0 && (
                    <Card className="mt-6">
                        <h2 className="
                            text-xl
                            font-semibold
                        ">
                            Specifications
                        </h2>

                        <div className="mt-4 space-y-3">
                            {product.specifications.map(
                                specification => (
                                    <div
                                        key={
                                            specification._id ||
                                            specification.name
                                        }
                                        className="
                                            flex
                                            justify-between
                                            border-b
                                            pb-3
                                        "
                                    >
                                        <span className="
                                            font-medium
                                        ">
                                            {specification.name}
                                        </span>

                                        <span className="
                                            text-gray-600
                                        ">
                                            {specification.value}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </Card>
                )}
            </div>
        </Container>
    );
};

export default ProductDetailsPage;