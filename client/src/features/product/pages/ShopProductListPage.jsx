import {
    useEffect,
    useState
} from "react";
import {
    toast
} from "react-hot-toast";
import {
    Link
} from "react-router-dom";
import Container from "../../../components/ui/Container";
import {
    getProducts
} from "../services/product.service";
import "./ShopProductListPage.css";
const ShopProductListPage = () => {
    const [
        products,
        setProducts
    ] = useState([]);
    const [
        loading,
        setLoading
    ] = useState(true);
    /* =========================================
       Fetch Products
    ========================================= */
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response =
                await getProducts();
            const activeProducts =
                (response.data || [])
                    .filter(
                        product =>
                            product.status === "active"
                    );
            setProducts(
                activeProducts
            );
        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load products"
            );
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    /* =========================================
       Loading
    ========================================= */
    if (loading) {
        return (
            <main className="shop-products">
                <Container>
                    <div className="
                        shop-products__loading
                    ">
                        <div className="
                            shop-products__loader
                        " />
                        <p>
                            Loading products...
                        </p>
                    </div>
                </Container>
            </main>
        );
    }
    /* =========================================
       Render
    ========================================= */
    return (
        <main className="shop-products">
            <Container>
                <div className="
                    shop-products__content
                ">
                    {/* =================================
                        Header
                    ================================= */}
                    <header className="
                        shop-products__header
                    ">
                        <div>
                            <span className="
                                shop-products__eyebrow
                            ">
                                Our Collection
                            </span>
                            <h1>
                                Products
                            </h1>
                            <p>
                                Explore our latest
                                products and find
                                something you'll love.
                            </p>
                        </div>
                        {products.length > 0 && (
                            <span className="
                                shop-products__count
                            ">
                                {products.length}
                                {" "}
                                {products.length === 1
                                    ? "product"
                                    : "products"
                                }
                            </span>
                        )}
                    </header>
                    {/* =================================
                        Empty State
                    ================================= */}
                    {products.length === 0 ? (
                        <div className="
                            shop-products__empty
                        ">
                            <div className="
                                shop-products__empty-icon
                            ">
                                ⚡
                            </div>
                            <h2>
                                No products available
                            </h2>
                            <p>
                                Check back later for
                                new products.
                            </p>
                        </div>
                    ) : (
                        /* =================================
                           Product Grid
                        ================================= */
                        <div className="
                            shop-products__grid
                        ">
                            {products.map(
                                product => {
                                    const hasDiscount =
                                        product.discountPrice > 0;
                                    const finalPrice =
                                        hasDiscount
                                            ? product.discountPrice
                                            : product.price;
                                    return (
                                        <Link
                                            key={
                                                product._id
                                            }
                                            to={`/products/${product.slug}`}
                                            className="
                                                shop-product-card
                                            "
                                        >
                                            {/* =========================
                                                Image
                                            ========================== */}
                                            <div className="
                                                shop-product-card__image
                                            ">
                                                {product.images?.[0]?.url ? (
                                                    <img
                                                        src={
                                                            product
                                                                .images[0]
                                                                .url
                                                        }
                                                        alt={
                                                            product.name
                                                        }
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="
                                                        shop-product-card__no-image
                                                    ">
                                                        No Image
                                                    </div>
                                                )}
                                                {hasDiscount && (
                                                    <span className="
                                                        shop-product-card__discount
                                                    ">
                                                        Sale
                                                    </span>
                                                )}
                                            </div>
                                            {/* =========================
                                                Content
                                            ========================== */}
                                            <div className="
                                                shop-product-card__content
                                            ">
                                                {product.brand && (
                                                    <span className="
                                                        shop-product-card__brand
                                                    ">
                                                        {
                                                            product.brand
                                                        }
                                                    </span>
                                                )}
                                                <h2 className="
                                                    shop-product-card__name
                                                ">
                                                    {
                                                        product.name
                                                    }
                                                </h2>
                                                {product.shortDescription && (
                                                    <p className="
                                                        shop-product-card__description
                                                    ">
                                                        {
                                                            product.shortDescription
                                                        }
                                                    </p>
                                                )}
                                                {/* =====================
                                                    Price
                                                ====================== */}
                                                <div className="
                                                    shop-product-card__footer
                                                ">
                                                    <div className="
                                                        shop-product-card__prices
                                                    ">
                                                        <span className="
                                                            shop-product-card__price
                                                        ">
                                                            ₹
                                                            {
                                                                finalPrice
                                                            }
                                                        </span>
                                                        {hasDiscount && (
                                                            <span className="
                                                                shop-product-card__old-price
                                                            ">
                                                                ₹
                                                                {
                                                                    product.price
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="
                                                        shop-product-card__arrow
                                                    ">
                                                        →
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
            </Container>
        </main>
    );
};
export default ShopProductListPage;