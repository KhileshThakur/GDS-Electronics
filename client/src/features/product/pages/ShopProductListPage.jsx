import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import Container from "../../../components/ui/Container";
import Card from "../../../components/ui/Card";

import {
    getProducts
} from "../services/product.service";

const ShopProductListPage = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const response =
                await getProducts();

            const activeProducts =
                (response.data || []).filter(
                    product =>
                        product.status === "active"
                );
            setProducts(activeProducts);
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

    if (loading) {
        return (
            <Container>
                <div className="py-16 text-center">
                    <p>
                        Loading products...
                    </p>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Products
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Explore our latest products
                    </p>
                </div>

                {products.length === 0 ? (
                    <Card>
                        <div className="py-10 text-center">
                            <h2 className="text-xl font-semibold">
                                No products available
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Check back later.
                            </p>
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

                        {products.map(product => (
                            <Link
                                key={product._id}
                                to={`/products/${product.slug}`}
                            >
                                <Card className="
                                    h-full
                                    overflow-hidden
                                    hover:shadow-md
                                    transition
                                ">
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

                                    <div className="p-4">
                                        <p className="
                                            text-sm
                                            text-gray-500
                                        ">
                                            {product.brand}
                                        </p>

                                        <h2 className="
                                            font-semibold
                                            text-lg
                                            mt-1
                                        ">
                                            {product.name}
                                        </h2>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                            mt-2
                                        ">
                                            {product.shortDescription}
                                        </p>

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                            mt-4
                                        ">
                                            <span className="
                                                font-bold
                                                text-lg
                                            ">
                                                ₹
                                                {
                                                    product.discountPrice > 0
                                                        ? product.discountPrice
                                                        : product.price
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
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default ShopProductListPage;