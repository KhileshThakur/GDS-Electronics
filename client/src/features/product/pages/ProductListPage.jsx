import {
    useEffect,
    useState
} from "react";

import {
    toast
} from "react-hot-toast";

import {
    useNavigate
} from "react-router-dom";

import {
    getProducts,
    deleteProduct
} from "../services/product.service";

import {
    PageHeader,
    DataTable,
    StatusBadge,
    ActionButtons
} from "../../../components/html";

import "./ProductListPage.css";


const ProductListPage = () => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    /* =========================================
       Fetch Products
    ========================================= */

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const response =
                await getProducts();

            setProducts(
                response.data
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch products"
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
       Delete
    ========================================= */

    const handleDelete = async (
        product
    ) => {

        const confirmed =
            window.confirm(
                `Delete "${product.name}"?`
            );

        if (!confirmed) return;


        try {

            const response =
                await deleteProduct(
                    product._id
                );

            toast.success(
                response.message
            );

            fetchProducts();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );

        }

    };


    /* =========================================
       Edit
    ========================================= */

    const handleEdit = (
        product
    ) => {

        navigate(
            `/admin/products/${product._id}/edit`
        );

    };


    /* =========================================
       Table Columns
    ========================================= */

    const columns = [
        {
            key: "name",
            label: "Name"
        },
        {
            key: "category.name",
            label: "Category"
        },
        {
            key: "price",
            label: "Price",
            render: (product) =>
                `₹${product.price}`
        },
        {
            key: "stock",
            label: "Stock"
        },
        {
            key: "status",
            label: "Status",
            render: (product) => (
                <StatusBadge
                    status={
                        product.status
                    }
                />
            )
        },

        {
            key: "isFeatured",
            label: "Featured",

            render: (product) => (
                <span
                    className={`
                        product-featured-badge
                        ${
                            product.isFeatured
                                ? "is-featured"
                                : ""
                        }
                    `}
                >
                    <span>
                        {product.isFeatured
                            ? "Featured"
                            : "No"
                        }
                    </span>
                </span>
            )
        }
    ];


    /* =========================================
       Render
    ========================================= */

    return (
        <section className="
            product-list-page
        ">

            {/* =================================
                Page Header
            ================================= */}

            <div className="
                product-list-page__header
            ">
                <PageHeader
                    title="Products"
                    subtitle="Manage products"
                    buttonText="Add Product"
                    buttonLink="/admin/products/new"
                />
            </div>


            {/* =================================
                Product Overview
            ================================= */}

            <div className="
                product-list-page__overview
            ">
                <div className="
                    product-list-page__overview-accent
                " />

                <div>
                    <span className="
                        product-list-page__eyebrow
                    ">
                        Product Catalog
                    </span>

                    <h2>
                        Your Products
                    </h2>

                    <p>
                        Manage your inventory,
                        pricing and product
                        visibility from here.
                    </p>
                </div>

                <div className="
                    product-list-page__count
                ">
                    <span>
                        Total
                    </span>
                    <strong>
                        {products.length}
                    </strong>
                </div>
            </div>

            {/* =================================
                Product Table
            ================================= */}

            <div className="
                product-list-page__table
            ">
                <DataTable
                    columns={columns}
                    data={products}
                    loading={loading}
                    emptyTitle="No Products Found"
                    renderActions={(
                        product
                    ) => (
                        <ActionButtons
                            onEdit={() =>
                                handleEdit(
                                    product
                                )
                            }
                            onDelete={() =>
                                handleDelete(
                                    product
                                )
                            }
                        />
                    )}
                />
            </div>
        </section>
    );

};


export default ProductListPage;