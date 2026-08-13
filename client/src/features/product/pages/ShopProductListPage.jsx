import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";

import Container from "../../../components/ui/Container";
import { getProducts } from "../services/product.service";
import { GoDotFill } from "react-icons/go";
import { MdElectricBolt } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";

import "./ShopProductListPage.css";

const ShopProductListPage = () => {

    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState("all");
    const [availability, setAvailability] = useState("all");
    const [featured, setFeatured] = useState(false);
    const [sort, setSort] = useState("default");

    /*
    --------------------------------
    SEARCH FROM NAVBAR
    --------------------------------
    */

    const search =
        searchParams.get("search")?.trim() || "";

    /*
    --------------------------------
    HELPERS
    --------------------------------
    */

    const getPrice = (product) => {

        if (product.hasVariants && product.variants?.length) {

            const prices = product.variants
                .map(variant =>
                    Number(
                        variant.discountPrice > 0
                            ? variant.discountPrice
                            : variant.price
                    )
                )
                .filter(price => !Number.isNaN(price));

            if (prices.length) {
                return Math.min(...prices);
            }
        }

        return Number(
            product.discountPrice > 0
                ? product.discountPrice
                : product.price
        );
    };

    const getOldPrice = (product) => {

        if (product.hasVariants && product.variants?.length) {

            const prices = product.variants
                .filter(variant =>
                    Number(variant.discountPrice) > 0
                )
                .map(variant =>
                    Number(variant.price)
                );

            if (prices.length) {
                return Math.min(...prices);
            }
        }

        return Number(product.price || 0);
    };

    /*
    --------------------------------
    FETCH PRODUCTS
    --------------------------------
    */

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const response = await getProducts({
                search
            });

            setProducts(
                response?.data || []
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load products"
            );

            setProducts([]);

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProducts();

    }, [search]);

    /*
    --------------------------------
    CATEGORIES
    --------------------------------
    */

    const categories = useMemo(() => {

        const map = new Map();

        products.forEach(product => {

            const id =
                product.category?._id ||
                product.category;

            const name =
                product.category?.name ||
                "Uncategorized";

            if (id) {
                map.set(id, name);
            }

        });

        return Array.from(map.entries());

    }, [products]);

    /*
    --------------------------------
    FILTER + SORT
    --------------------------------
    */

    const filteredProducts = useMemo(() => {

        let result = [...products];

        /*
        Category
        */

        if (category !== "all") {

            result = result.filter(product => {

                const productCategory =
                    product.category?._id ||
                    product.category;

                return productCategory === category;

            });

        }

        /*
        Availability
        */

        if (availability === "in-stock") {

            result = result.filter(product => {

                if (
                    product.hasVariants &&
                    product.variants?.length
                ) {

                    return product.variants.some(
                        variant =>
                            Number(variant.stock) > 0
                    );

                }

                return Number(product.stock) > 0;

            });

        }

        if (availability === "out-of-stock") {

            result = result.filter(product => {

                if (
                    product.hasVariants &&
                    product.variants?.length
                ) {

                    return !product.variants.some(
                        variant =>
                            Number(variant.stock) > 0
                    );

                }

                return Number(product.stock) <= 0;

            });

        }

        /*
        Featured
        */

        if (featured) {

            result = result.filter(
                product => product.isFeatured
            );

        }

        /*
        Sorting
        */

        if (sort === "price-low") {

            result.sort(
                (a, b) =>
                    getPrice(a) - getPrice(b)
            );

        }

        if (sort === "price-high") {

            result.sort(
                (a, b) =>
                    getPrice(b) - getPrice(a)
            );

        }

        if (sort === "name") {

            result.sort(
                (a, b) =>
                    (a.name || "").localeCompare(
                        b.name || ""
                    )
            );

        }

        if (sort === "newest") {

            result.sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );

        }

        return result;

    }, [
        products,
        category,
        availability,
        featured,
        sort
    ]);

    /*
    --------------------------------
    ACTIVE FILTERS
    --------------------------------
    */

    const hasFilters =
        Boolean(search) ||
        category !== "all" ||
        availability !== "all" ||
        featured ||
        sort !== "default";

    /*
    --------------------------------
    CLEAR SHOP FILTERS
    --------------------------------

    Important:
    We intentionally DO NOT clear
    the navbar search here.
    */

    const clearFilters = () => {

        setCategory("all");
        setAvailability("all");
        setFeatured(false);
        setSort("default");

    };

    /*
    --------------------------------
    LOADING
    --------------------------------
    */

    if (loading) {

        return (

            <main className="shop-products">

                <Container>

                    <div className="shop-products__loading">

                        <div className="shop-products__loader" />

                        <p>
                            Loading products...
                        </p>

                    </div>

                </Container>

            </main>

        );

    }

    /*
    --------------------------------
    PAGE
    --------------------------------
    */

    return (

        <main className="shop-products">

            <Container>

                <div className="shop-products__content">

                    {/* TOOLBAR */}

                    <section className="products-toolbar">

                        {/* LEFT */}

                        <div className="products-intro">

                            <span className="products-eyebrow">

                                <GoDotFill />

                                Our Collection

                            </span>

                            <h1>
                                Products
                            </h1>

                            <p>
                                Explore our latest products
                                and find something you'll love.
                            </p>

                            <span className="products-count">

                                {filteredProducts.length}{" "}

                                {
                                    filteredProducts.length === 1
                                        ? "product"
                                        : "products"
                                }

                            </span>

                        </div>

                        {/* RIGHT */}

                        <div className="products-controls">

                            {search && (

                                <div className="products-search-result">

                                    <span>
                                        Search:
                                    </span>

                                    <strong>
                                        "{search}"
                                    </strong>

                                </div>

                            )}

                            <div className="product-filters">

                                {/* CATEGORY */}

                                <select
                                    value={category}
                                    onChange={e =>
                                        setCategory(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="all">
                                        All Categories
                                    </option>

                                    {categories.map(
                                        ([id, name]) => (

                                            <option
                                                key={id}
                                                value={id}
                                            >
                                                {name}
                                            </option>

                                        )
                                    )}

                                </select>

                                {/* AVAILABILITY */}

                                <select
                                    value={availability}
                                    onChange={e =>
                                        setAvailability(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="all">
                                        All Products
                                    </option>

                                    <option value="in-stock">
                                        In Stock
                                    </option>

                                    <option value="out-of-stock">
                                        Out of Stock
                                    </option>

                                </select>

                                {/* FEATURED */}

                                <label className="featured-filter">

                                    <input
                                        type="checkbox"
                                        checked={featured}
                                        onChange={e =>
                                            setFeatured(
                                                e.target.checked
                                            )
                                        }
                                    />

                                    <span>
                                        Featured
                                    </span>

                                </label>

                                {/* SORT */}

                                <select
                                    value={sort}
                                    onChange={e =>
                                        setSort(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="default">
                                        Sort: Default
                                    </option>

                                    <option value="newest">
                                        Newest
                                    </option>

                                    <option value="name">
                                        Name
                                    </option>

                                    <option value="price-low">
                                        Price: Low to High
                                    </option>

                                    <option value="price-high">
                                        Price: High to Low
                                    </option>

                                </select>

                                {/* CLEAR */}

                                {hasFilters && (

                                    <button
                                        type="button"
                                        className="products-clear"
                                        onClick={
                                            clearFilters
                                        }
                                    >
                                        Clear
                                    </button>

                                )}

                            </div>

                        </div>

                    </section>

                    {/* EMPTY */}

                    {filteredProducts.length === 0 ? (

                        <div className="shop-products__empty">

                            <div className="shop-products__empty-icon">
                                <MdElectricBolt />
                            </div>

                            <h2>
                                No products found
                            </h2>

                            <p>
                                Try changing your search
                                or filters.
                            </p>

                            {hasFilters && (

                                <button
                                    type="button"
                                    onClick={
                                        clearFilters
                                    }
                                    className="
                                        shop-products__empty-button
                                    "
                                >
                                    Clear Filters
                                </button>

                            )}

                        </div>

                    ) : (

                        /* PRODUCT GRID */

                        <div className="shop-products__grid">

                            {filteredProducts.map(product => {

                                const hasDiscount =
                                    product.hasVariants
                                        ? product.variants?.some(
                                            variant =>
                                                Number(
                                                    variant.discountPrice
                                                ) > 0
                                        )
                                        : Number(
                                            product.discountPrice
                                        ) > 0;

                                const finalPrice =
                                    getPrice(product);

                                const isOutOfStock =
                                    product.hasVariants
                                        ? !product.variants?.some(
                                            variant =>
                                                Number(
                                                    variant.stock
                                                ) > 0
                                        )
                                        : Number(
                                            product.stock
                                        ) <= 0;

                                return (

                                    <Link
                                        key={product._id}
                                        to={`/products/${product.slug}`}
                                        className="shop-product-card"
                                    >

                                        {/* IMAGE */}

                                        <div className="shop-product-card__image">

                                            {product.images?.[0]?.url ? (

                                                <img
                                                    src={
                                                        product.images[0].url
                                                    }
                                                    alt={
                                                        product.name
                                                    }
                                                    loading="lazy"
                                                />

                                            ) : (

                                                <div className="shop-product-card__no-image">
                                                    No Image
                                                </div>

                                            )}

                                            {hasDiscount && (

                                                <span className="shop-product-card__discount">
                                                    Sale
                                                </span>

                                            )}

                                            {product.isFeatured && (

                                                <span className="shop-product-card__featured">
                                                    Featured
                                                </span>

                                            )}

                                        </div>

                                        {/* CONTENT */}

                                        <div className="shop-product-card__content">

                                            {product.brand && (

                                                <span className="shop-product-card__brand">
                                                    {product.brand}
                                                </span>

                                            )}

                                            <h2 className="shop-product-card__name">
                                                {product.name}
                                            </h2>

                                            {product.shortDescription && (

                                                <p className="shop-product-card__description">
                                                    {
                                                        product.shortDescription
                                                    }
                                                </p>

                                            )}

                                            <div className="shop-product-card__footer">

                                                <div className="shop-product-card__prices">

                                                    <span className="shop-product-card__price">
                                                    <span><BiRupee /></span>{finalPrice}
                                                    </span>

                                                    {hasDiscount && (

                                                        <span className="shop-product-card__old-price">
                                                            <span><BiRupee /></span>            
                                                            {getOldPrice(
                                                                product
                                                            )}
                                                        </span>

                                                    )}

                                                </div>

                                                {isOutOfStock ? (

                                                    <span className="shop-product-card__stock">
                                                        Out of stock
                                                    </span>

                                                ) : (

                                                    <span className="shop-product-card__arrow">
                                                        <FaArrowRight />
                                                    </span>

                                                )}

                                            </div>

                                        </div>

                                    </Link>

                                );

                            })}

                        </div>

                    )}

                </div>

            </Container>

        </main>

    );

};

export default ShopProductListPage;