import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import {
    getProduct,
    getRelatedProducts
} from "../services/product.service";

const ProductDetailsPage = () => {

    const { slug } = useParams();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const fetchProduct = async () => {

        try {

            setLoading(true);

            const response =
                await getProduct(slug);

            const productData =
                response.data;

            setProduct(productData);

            if (
                productData?.variants?.length
            ) {
                setSelectedVariant(
                    productData.variants[0]
                );
            }

            if (productData?._id) {

                const relatedResponse =
                    await getRelatedProducts(
                        productData._id
                    );

                setRelatedProducts(
                    relatedResponse.data || []
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

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, [slug]);

    const images = useMemo(() => {

        if (!product?.images?.length) {
            return [];
        }

        return product.images.filter(
            image => image?.url
        );

    }, [product]);

    const currentPrice =
        selectedVariant
            ? selectedVariant.discountPrice ||
              selectedVariant.price
            : product?.discountPrice ||
              product?.price ||
              0;

    const originalPrice =
        selectedVariant
            ? selectedVariant.price
            : product?.price || 0;

    const hasDiscount =
        originalPrice > currentPrice;

    const currentStock =
        selectedVariant
            ? selectedVariant.stock
            : product?.stock || 0;

    if (loading) {

        return (

            <Container>

                <div className="
                    py-20
                    text-center
                    text-base
                    text-[var(--muted)]
                ">
                    Loading product...
                </div>

            </Container>

        );

    }

    if (!product) {

        return (

            <Container>

                <div className="
                    py-20
                    text-center
                ">

                    <h1 className="
                        text-2xl
                        font-bold
                    ">
                        Product not found
                    </h1>

                    <Link
                        to="/products"
                        className="
                            inline-flex
                            mt-6
                            px-5
                            py-3
                            rounded-[var(--radius-md)]
                            bg-[var(--primary)]
                            text-white
                            font-semibold
                        "
                    >
                        Back to Products
                    </Link>

                </div>

            </Container>

        );

    }

    return (

        <Container>

            <div className="py-8 sm:py-10">

                {/* Breadcrumb */}

                <div className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    mb-6
                    text-sm
                    text-[var(--muted)]
                ">

                    <Link
                        to="/products"
                        className="
                            hover:text-[var(--primary)]
                            transition
                        "
                    >
                        Products
                    </Link>

                    <span>/</span>

                    <span className="
                        text-[var(--text)]
                    ">
                        {product.name}
                    </span>

                </div>


                {/* Main Product */}

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-[1.05fr_0.95fr]
                    gap-8
                    lg:gap-10
                ">

                    {/* Images */}

                    <Card className="
                        p-4
                        sm:p-5
                    ">

                        <div className="
                            aspect-square
                            rounded-[var(--radius-lg)]
                            bg-[var(--surface)]
                            overflow-hidden
                            flex
                            items-center
                            justify-center
                        ">

                            {images.length ? (

                                <img
                                    src={
                                        images[
                                            selectedImage
                                        ]?.url
                                    }
                                    alt={product.name}
                                    className="
                                        w-full
                                        h-full
                                        object-contain
                                        p-5
                                        sm:p-8
                                    "
                                />

                            ) : (

                                <div className="
                                    text-[var(--muted)]
                                    text-sm
                                ">
                                    No image available
                                </div>

                            )}

                        </div>


                        {images.length > 1 && (

                            <div className="
                                flex
                                gap-3
                                mt-4
                                overflow-x-auto
                            ">

                                {images.map(
                                    (image, index) => (

                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() =>
                                                setSelectedImage(
                                                    index
                                                )
                                            }
                                            className={`
                                                w-16
                                                h-16
                                                sm:w-20
                                                sm:h-20
                                                shrink-0
                                                rounded-[var(--radius-md)]
                                                overflow-hidden
                                                border-2
                                                transition
                                                ${
                                                    selectedImage === index
                                                        ? "border-[var(--primary)]"
                                                        : "border-transparent"
                                                }
                                            `}
                                        >

                                            <img
                                                src={image.url}
                                                alt=""
                                                className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                "
                                            />

                                        </button>

                                    )
                                )}

                            </div>

                        )}

                    </Card>


                    {/* Product Information */}

                    <div className="
                        flex
                        flex-col
                    ">

                        {/* Category */}

                        {product.category?.name && (

                            <p className="
                                text-sm
                                font-semibold
                                uppercase
                                tracking-wide
                                text-[var(--primary)]
                                mb-2
                            ">
                                {product.category.name}
                            </p>

                        )}


                        <div className="
                            flex
                            flex-wrap
                            items-start
                            gap-3
                        ">

                            <h1 className="
                                text-2xl
                                sm:text-3xl
                                lg:text-4xl
                                font-bold
                                leading-tight
                            ">
                                {product.name}
                            </h1>

                            {product.isFeatured && (

                                <span className="
                                    mt-1
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-semibold
                                    bg-[var(--primary)]
                                    text-white
                                ">
                                    Featured
                                </span>

                            )}

                        </div>


                        {product.brand && (

                            <p className="
                                mt-3
                                text-base
                                text-[var(--muted)]
                            ">
                                by{" "}
                                <span className="
                                    font-semibold
                                    text-[var(--text)]
                                ">
                                    {product.brand}
                                </span>
                            </p>

                        )}


                        {/* Description */}

                        <p className="
                            mt-5
                            text-base
                            sm:text-lg
                            leading-7
                            text-[var(--muted)]
                        ">
                            {product.shortDescription}
                        </p>


                        {/* Price */}

                        <div className="
                            flex
                            items-center
                            flex-wrap
                            gap-3
                            mt-6
                        ">

                            <span className="
                                text-3xl
                                sm:text-4xl
                                font-bold
                            ">
                                ₹{currentPrice}
                            </span>

                            {hasDiscount && (

                                <>

                                    <span className="
                                        text-lg
                                        text-[var(--muted)]
                                        line-through
                                    ">
                                        ₹{originalPrice}
                                    </span>

                                    <span className="
                                        px-2.5
                                        py-1
                                        rounded-full
                                        bg-green-100
                                        text-green-700
                                        text-sm
                                        font-semibold
                                    ">
                                        {Math.round(
                                            (
                                                (
                                                    originalPrice -
                                                    currentPrice
                                                ) /
                                                originalPrice
                                            ) * 100
                                        )}% OFF
                                    </span>

                                </>

                            )}

                        </div>


                        {/* Stock */}

                        <div className="
                            mt-4
                            text-sm
                            font-semibold
                        ">

                            {currentStock > 0 ? (

                                <span className="
                                    text-green-600
                                ">
                                    ✓ In Stock
                                    {currentStock <= 5 &&
                                        ` • Only ${currentStock} left`
                                    }
                                </span>

                            ) : (

                                <span className="
                                    text-red-600
                                ">
                                    Out of Stock
                                </span>

                            )}

                        </div>


                        {/* Variants */}

                        {product.hasVariants &&
                            product.variants?.length > 0 && (

                            <div className="
                                mt-7
                            ">

                                <h3 className="
                                    text-base
                                    font-semibold
                                    mb-3
                                ">
                                    Select Variant
                                </h3>

                                <div className="
                                    flex
                                    flex-wrap
                                    gap-2
                                ">

                                    {product.variants.map(
                                        variant => (

                                            <button
                                                key={variant._id}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedVariant(
                                                        variant
                                                    )
                                                }
                                                className={`
                                                    px-4
                                                    py-2.5
                                                    rounded-[var(--radius-md)]
                                                    border
                                                    text-sm
                                                    font-medium
                                                    transition
                                                    ${
                                                        selectedVariant?._id ===
                                                        variant._id
                                                            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                                                            : "border-[var(--border)] hover:border-[var(--primary)]"
                                                    }
                                                `}
                                            >
                                                {variant.name}
                                            </button>

                                        )
                                    )}

                                </div>


                                {/* Variant Attributes */}

                                {selectedVariant?.attributes?.length >
                                    0 && (

                                    <div className="
                                        mt-4
                                        flex
                                        flex-wrap
                                        gap-2
                                    ">

                                        {selectedVariant.attributes.map(
                                            (attribute, index) => (

                                                <span
                                                    key={index}
                                                    className="
                                                        px-3
                                                        py-1.5
                                                        rounded-full
                                                        bg-[var(--surface)]
                                                        border
                                                        border-[var(--border)]
                                                        text-sm
                                                    "
                                                >
                                                    <span className="
                                                        text-[var(--muted)]
                                                    ">
                                                        {attribute.key}:
                                                    </span>{" "}
                                                    {attribute.value}
                                                </span>

                                            )
                                        )}

                                    </div>

                                )}

                            </div>

                        )}


                        {/* Actions */}

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                            mt-8
                        ">

                            <button
                                type="button"
                                disabled={currentStock <= 0}
                                className="
                                    flex-1
                                    h-12
                                    px-6
                                    rounded-[var(--radius-md)]
                                    bg-[var(--primary)]
                                    text-white
                                    font-semibold
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    hover:bg-[var(--primary-dark)]
                                    transition
                                "
                            >
                                Add to Cart
                            </button>

                            <button
                                type="button"
                                className="
                                    h-12
                                    px-6
                                    rounded-[var(--radius-md)]
                                    border
                                    border-[var(--border)]
                                    font-semibold
                                    hover:border-[var(--primary)]
                                    hover:text-[var(--primary)]
                                    transition
                                "
                            >
                                ♡ Wishlist
                            </button>

                        </div>


                        {/* SKU */}

                        <div className="
                            mt-6
                            pt-5
                            border-t
                            border-[var(--border)]
                            text-sm
                            text-[var(--muted)]
                        ">

                            SKU:{" "}

                            <span className="
                                font-medium
                                text-[var(--text)]
                            ">
                                {selectedVariant?.sku ||
                                    product.sku ||
                                    "N/A"}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Product Description */}

                {product.description && (

                    <section className="
                        mt-10
                    ">

                        <Card>

                            <h2 className="
                                text-xl
                                sm:text-2xl
                                font-bold
                                mb-4
                            ">
                                Product Description
                            </h2>

                            <p className="
                                text-base
                                sm:text-lg
                                leading-8
                                text-[var(--muted)]
                                whitespace-pre-line
                            ">
                                {product.description}
                            </p>

                        </Card>

                    </section>

                )}


                {/* Specifications */}

                {product.specifications?.length > 0 && (

                    <section className="
                        mt-6
                    ">

                        <Card>

                            <h2 className="
                                text-xl
                                sm:text-2xl
                                font-bold
                                mb-5
                            ">
                                Specifications
                            </h2>

                            <div className="
                                divide-y
                                divide-[var(--border)]
                            ">

                                {product.specifications.map(
                                    (specification, index) => (

                                        <div
                                            key={index}
                                            className="
                                                grid
                                                grid-cols-1
                                                sm:grid-cols-[180px_1fr]
                                                gap-2
                                                py-3.5
                                                text-base
                                            "
                                        >

                                            <span className="
                                                font-semibold
                                            ">
                                                {specification.key}
                                            </span>

                                            <span className="
                                                text-[var(--muted)]
                                            ">
                                                {specification.value}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </Card>

                    </section>

                )}


                {/* Related Products */}

                {relatedProducts.length > 0 && (

                    <section className="
                        mt-10
                    ">

                        <div className="
                            flex
                            items-end
                            justify-between
                            gap-4
                            mb-5
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-[var(--primary)]
                                    uppercase
                                    tracking-wide
                                ">
                                    You may also like
                                </p>

                                <h2 className="
                                    text-2xl
                                    sm:text-3xl
                                    font-bold
                                    mt-1
                                ">
                                    Related Products
                                </h2>

                            </div>

                            <Link
                                to="/products"
                                className="
                                    hidden
                                    sm:block
                                    text-sm
                                    font-semibold
                                    text-[var(--primary)]
                                    hover:underline
                                "
                            >
                                View All
                            </Link>

                        </div>


                        <div className="
                            grid
                            grid-cols-2
                            lg:grid-cols-4
                            gap-4
                            sm:gap-5
                        ">

                            {relatedProducts.map(
                                related => (

                                    <Link
                                        key={related._id}
                                        to={`/products/${related.slug}`}
                                        className="
                                            group
                                        "
                                    >

                                        <Card className="
                                            h-full
                                            p-0
                                            overflow-hidden
                                            transition
                                            hover:-translate-y-1
                                        ">

                                            <div className="
                                                aspect-square
                                                bg-[var(--surface)]
                                                overflow-hidden
                                            ">

                                                {related.images?.[0]?.url ? (

                                                    <img
                                                        src={
                                                            related.images[0].url
                                                        }
                                                        alt={
                                                            related.name
                                                        }
                                                        className="
                                                            w-full
                                                            h-full
                                                            object-contain
                                                            p-4
                                                            group-hover:scale-105
                                                            transition
                                                            duration-300
                                                        "
                                                    />

                                                ) : (

                                                    <div className="
                                                        w-full
                                                        h-full
                                                        flex
                                                        items-center
                                                        justify-center
                                                        text-sm
                                                        text-[var(--muted)]
                                                    ">
                                                        No image
                                                    </div>

                                                )}

                                            </div>


                                            <div className="
                                                p-4
                                            ">

                                                <p className="
                                                    text-xs
                                                    text-[var(--muted)]
                                                    mb-1
                                                ">
                                                    {related.brand}
                                                </p>

                                                <h3 className="
                                                    font-semibold
                                                    text-base
                                                    line-clamp-2
                                                ">
                                                    {related.name}
                                                </h3>

                                                <p className="
                                                    mt-2
                                                    font-bold
                                                    text-lg
                                                ">
                                                    ₹
                                                    {related.discountPrice ||
                                                        related.price ||
                                                        0}
                                                </p>

                                            </div>

                                        </Card>

                                    </Link>

                                )
                            )}

                        </div>

                    </section>

                )}

            </div>

        </Container>

    );

};

export default ProductDetailsPage;