import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
    getProducts,
    deleteProduct
} from "../services/product.service";

import {
    PageHeader,
    DataTable,
    StatusBadge,
    ActionButtons
} from "../../../components/admin";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {

        try {
            setLoading(true);
            const response = await getProducts();
            setProducts(response.data);
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

    const handleDelete = async (product) => {

        const confirmed = window.confirm(
            `Delete "${product.name}"?`
        );

        if (!confirmed) return;

        try {
            const response = await deleteProduct(product._id);
            toast.success(response.message);
            fetchProducts();
        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    const handleEdit = (product) => {
        navigate(
            `/admin/products/${product._id}/edit`
        );
    };

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
                    status={product.status}
                />
            )
        },
        {
            key: "isFeatured",
            label: "Featured",
            render: (product) =>
                product.isFeatured
                    ? "Yes"
                    : "No"
        }
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Products"
                subtitle="Manage products"
                buttonText="Add Product"
                buttonLink="/admin/products/new"
            />

            <DataTable
                columns={columns}
                data={products}
                loading={loading}
                emptyTitle="No Products Found"
                renderActions={(product) => (
                    <ActionButtons
                        onEdit={() =>
                            handleEdit(product)
                        }
                        onDelete={() =>
                            handleDelete(product)
                        }
                    />
                )}
            />
        </div>
    );
};

export default ProductListPage;