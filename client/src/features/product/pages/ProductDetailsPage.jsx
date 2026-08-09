import {
    useEffect,
    useState
} from "react";
import {
    useParams
} from "react-router-dom";
import {
    toast
} from "react-hot-toast";
import Container from "../../../components/ui/Container";
import {
    getProduct
} from "../services/product.service";
import {
    addToCart
} from "../../cart/services/cart.service";
import {
    addToWishlist
} from "../../wishlist/services/wishlist.service";
import "./ProductDetailsPage.css";
const ProductDetailsPage = () => {
    const { slug } = useParams();
    const [product, setProduct] =
        useState(null);
    const [loading, setLoading] =
        useState(true);
    const [quantity, setQuantity] =
        useState(1);
    const [selectedVariant, setSelectedVariant] =
        useState(null);
    const [selectedImage, setSelectedImage] =
        useState(0);
    /* =========================================
       Fetch Product
    ========================================= */
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
    /* =========================================
       Loading
    ========================================= */
    if (loading) {
        return (
            <main className="
                product-details
            ">
                <Container>
                    <div className="
                        product-details__loading
                    ">
                        <div className="
                            product-details__loader
                        " />
                        <p>
                            Loading product...
                        </p>
                    </div>
                </Container>
            </main>
        );
    }
    /* =========================================
       Not Found
    ========================================= */
    if (!product) {
        return (
            <main className="
                product-details
            ">
                <Container>
                    <div className="
                        product-details__empty
                    ">
                        <div className="
                            product-details__empty-icon
                        ">
                            ⚡
                        </div>
                        <h1>
                            Product not found
                        </h1>
                        <p>
                            The product you're looking
                            for is no longer available.
                        </p>
                    </div>
                </Container>
            </main>
        );
    }
    /* =========================================
       Current Product Values
    ========================================= */
    const hasVariants =
        product.variants?.length > 0;
    const price = selectedVariant
        ? (
            selectedVariant.discountPrice > 0
                ? selectedVariant.discountPrice
                : selectedVariant.price
        )
        : (
            product.discountPrice > 0
                ? product.discountPrice
                : product.price
        );
    const originalPrice =
        selectedVariant
            ? selectedVariant.price
            : product.price;
    const hasDiscount =
        price < originalPrice;
    const stock =
        selectedVariant
            ? selectedVariant.stock
            : product.stock;
    const images =
        product.images?.filter(
            image => image?.url
        ) || [];
    const currentImage =
        images[selectedImage]?.url ||
        images[0]?.url;
    /* =========================================
       Variant Selection
    ========================================= */
    const handleVariantSelect = (
        variant
    ) => {
        setSelectedVariant(
            variant
        );
        setQuantity(1);
    };
    /* =========================================
       Quantity
    ========================================= */
    const decreaseQuantity = () => {
        setQuantity(
            previous =>
                Math.max(
                    1,
                    previous - 1
                )
        );
    };
    const increaseQuantity = () => {
        setQuantity(
            previous =>
                Math.min(
                    stock,
                    previous + 1
                )
        );
    };
    /* =========================================
       Add To Cart
    ========================================= */
    const handleAddToCart = async () => {
        if (stock <= 0) {
            toast.error("Product is out of stock");
            return;
        }
        try {
            const payload = {
                product: product._id,
                quantity
            };
            // Only send variant when a variant is actually selected
            if (selectedVariant) {
                payload.variantSku = selectedVariant.sku;
            }
            console.log("ADD TO CART PAYLOAD:", payload);
            console.log("SELECTED VARIANT:", selectedVariant);
            const response =
                await addToCart(payload);
            toast.success(
                response.message ||
                "Added to cart"
            );
        }
        catch (error) {
            console.error(
                "ADD TO CART ERROR:",
                error
            );
            toast.error(
                error.response?.data?.message ||
                "Failed to add to cart"
            );
        }
    };
    /* =========================================
       Wishlist
    ========================================= */
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
    /* =========================================
       Render
    ========================================= */
    return (
        <main className="
            product-details
        ">
            <Container>
                <div className="
                    product-details__content
                ">
                    {/* =================================
                        Main Product Section
                    ================================= */}
                    <div className="
                        product-details__main
                    ">
                        {/* =============================
                            Product Gallery
                        ============================== */}
                        <section className="
                            product-details__gallery
                        ">
                            {/* Main Image */}
                            <div className="
                                product-details__main-image
                            ">
                                {currentImage ? (
                                    <img
                                        src={
                                            currentImage
                                        }
                                        alt={
                                            product.name
                                        }
                                    />
                                ) : (
                                    <div className="
                                        product-details__no-image
                                    ">
                                        <span>
                                            ⚡
                                        </span>
                                        <p>
                                            No image available
                                        </p>
                                    </div>
                                )}
                                {hasDiscount && (
                                    <span className="
                                        product-details__sale
                                    ">
                                        Sale
                                    </span>
                                )}
                            </div>
                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="
                                    product-details__thumbnails
                                ">
                                    {images.map(
                                        (
                                            image,
                                            index
                                        ) => (
                                            <button
                                                key={`
                                                    image-${index}
                                                `}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedImage(
                                                        index
                                                    )
                                                }
                                                className={`
                                                    product-details__thumbnail
                                                    ${selectedImage === index
                                                        ? "is-active"
                                                        : ""
                                                    }
                                                `}
                                            >
                                                <img
                                                    src={
                                                        image.url
                                                    }
                                                    alt={`
                                                        ${product.name}
                                                        ${index + 1}
                                                    `}
                                                />
                                            </button>
                                        )
                                    )}
                                </div>
                            )}
                        </section>
                        {/* =============================
                            Product Information
                        ============================== */}
                        <section className="
                            product-details__info
                        ">
                            {/* Brand */}
                            {product.brand && (
                                <span className="
                                    product-details__brand
                                ">
                                    {product.brand}
                                </span>
                            )}
                            {/* Name */}
                            <h1 className="
                                product-details__title
                            ">
                                {product.name}
                            </h1>
                            {/* Short Description */}
                            {product.shortDescription && (
                                <p className="
                                    product-details__short-description
                                ">
                                    {
                                        product.shortDescription
                                    }
                                </p>
                            )}
                            {/* Price */}
                            <div className="
                                product-details__price-row
                            ">
                                <span className="
                                    product-details__price
                                ">
                                    ₹{price}
                                </span>
                                {hasDiscount && (
                                    <span className="
                                        product-details__original-price
                                    ">
                                        ₹{originalPrice}
                                    </span>
                                )}
                                {hasDiscount && (
                                    <span className="
                                        product-details__discount
                                    ">
                                        Save{" "}
                                        {Math.round(
                                            (
                                                (
                                                    originalPrice -
                                                    price
                                                ) /
                                                originalPrice
                                            ) * 100
                                        )}
                                        %
                                    </span>
                                )}
                            </div>
                            {/* =========================
                                Variants
                            ========================== */}
                            {hasVariants && (
                                <section className="
                                    product-details__variants
                                ">
                                    <div className="
                                        product-details__section-heading
                                    ">
                                        <div>
                                            <span>
                                                Options
                                            </span>
                                            <h2>
                                                Choose a variant
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="
                                        product-details__variant-grid
                                    ">
                                        {product.variants.map(
                                            (
                                                variant,
                                                index
                                            ) => {
                                                const isSelected =
                                                    selectedVariant?.sku ===
                                                    variant.sku;
                                                const isOutOfStock =
                                                    variant.stock <= 0;
                                                return (
                                                    <button
                                                        key={
                                                            variant._id ||
                                                            variant.sku ||
                                                            `${variant.name}-${index}`
                                                        }
                                                        type="button"
                                                        disabled={
                                                            isOutOfStock
                                                        }
                                                        onClick={() =>
                                                            handleVariantSelect(
                                                                variant
                                                            )
                                                        }
                                                        className={`
                                                            product-details__variant
                                                            ${isSelected
                                                                ? "is-selected"
                                                                : ""
                                                            }
                                                            ${isOutOfStock
                                                                ? "is-disabled"
                                                                : ""
                                                            }
                                                        `}
                                                    >
                                                        <div className="
                                                            product-details__variant-header
                                                        ">
                                                            <strong>
                                                                {
                                                                    variant.name ||
                                                                    variant.sku ||
                                                                    "Variant"
                                                                }
                                                            </strong>
                                                            {isSelected && (
                                                                <span className="
                                                                    product-details__variant-check
                                                                ">
                                                                    ✓
                                                                </span>
                                                            )}
                                                        </div>
                                                        {/* Variant Attributes */}
                                                        {variant.attributes?.length > 0 && (
                                                            <div className="
                                                                product-details__variant-attributes
                                                            ">
                                                                {variant.attributes.map(
                                                                    (
                                                                        attribute,
                                                                        attributeIndex
                                                                    ) => (
                                                                        <div
                                                                            key={`
                                                                                ${attribute.key}
                                                                                -
                                                                                ${attributeIndex}
                                                                            `}
                                                                            className="
                                                                                product-details__variant-attribute
                                                                            "
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    attribute.key
                                                                                }
                                                                            </span>
                                                                            <strong>
                                                                                {
                                                                                    attribute.value
                                                                                }
                                                                            </strong>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        )}
                                                        <div className="
                                                            product-details__variant-stock
                                                        ">
                                                            {isOutOfStock
                                                                ? "Out of stock"
                                                                : `${variant.stock} available`
                                                            }
                                                        </div>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                </section>
                            )}
                            {/* Stock */}
                            <div className={`
                                product-details__stock
                                ${stock > 0
                                    ? "is-available"
                                    : "is-unavailable"
                                }
                            `}>
                                <span className="
                                    product-details__stock-dot
                                " />
                                {stock > 0
                                    ? `${stock} in stock`
                                    : "Out of stock"
                                }
                            </div>
                            {/* Quantity */}
                            {stock > 0 && (
                                <div className="
                                    product-details__purchase
                                ">
                                    <div className="
                                        product-details__quantity
                                    ">
                                        <button
                                            type="button"
                                            onClick={
                                                decreaseQuantity
                                            }
                                            disabled={
                                                quantity <= 1
                                            }
                                            aria-label="
                                                Decrease quantity
                                            "
                                        >
                                            −
                                        </button>
                                        <span>
                                            {quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={
                                                increaseQuantity
                                            }
                                            disabled={
                                                quantity >= stock
                                            }
                                            aria-label="
                                                Increase quantity
                                            "
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="
                                        product-details__quantity-label
                                    ">
                                        Quantity
                                    </span>
                                </div>
                            )}
                            {/* Actions */}
                            <div className="
                                product-details__actions
                            ">
                                <button
                                    type="button"
                                    disabled={
                                        stock <= 0
                                    }
                                    onClick={
                                        handleAddToCart
                                    }
                                    className="
                                        product-details__cart
                                    "
                                >
                                    {stock > 0
                                        ? "Add to Cart"
                                        : "Out of Stock"
                                    }
                                </button>
                                <button
                                    type="button"
                                    onClick={
                                        handleWishlist
                                    }
                                    className="
                                        product-details__wishlist
                                    "
                                    title="
                                        Add to wishlist
                                    "
                                    aria-label="
                                        Add to wishlist
                                    "
                                >
                                    ♡
                                </button>
                            </div>
                            {/* Trust Information */}
                            <div className="
                                product-details__trust
                            ">
                                <div>
                                    <span>
                                        ✓
                                    </span>
                                    <p>
                                        Secure checkout
                                    </p>
                                </div>
                                <div>
                                    <span>
                                        ⚡
                                    </span>
                                    <p>
                                        Fast delivery
                                    </p>
                                </div>
                                <div>
                                    <span>
                                        ✓
                                    </span>
                                    <p>
                                        Quality products
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* =================================
                        Description
                    ================================= */}
                    {product.description && (
                        <section className="
                            product-details__content-card
                        ">
                            <div className="
                                product-details__section-heading
                            ">
                                <div>
                                    <span>
                                        Product Details
                                    </span>
                                    <h2>
                                        Description
                                    </h2>
                                </div>
                            </div>
                            <p className="
                                product-details__description
                            ">
                                {
                                    product.description
                                }
                            </p>
                        </section>
                    )}
                    {/* =================================
                        Specifications
                    ================================= */}
                    {product.specifications?.length > 0 && (
                        <section className="
                            product-details__content-card
                        ">
                            <div className="
                                product-details__section-heading
                            ">
                                <div>
                                    <span>
                                        Product Information
                                    </span>
                                    <h2>
                                        Specifications
                                    </h2>
                                </div>
                            </div>
                            <div className="
                                product-details__specifications
                            ">
                                {product.specifications.map(
                                    (
                                        specification,
                                        index
                                    ) => (
                                        <div
                                            key={`
                                                ${specification.key}
                                                -
                                                ${index}
                                            `}
                                            className="
                                                product-details__specification-row
                                            "
                                        >
                                            <span>
                                                {
                                                    specification.key
                                                }
                                            </span>
                                            <strong>
                                                {
                                                    specification.value
                                                }
                                            </strong>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </Container>
        </main>
    );
};
export default ProductDetailsPage;