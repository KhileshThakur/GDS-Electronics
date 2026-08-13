import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import ProductForm from "./components/ProductForm";

import {
    getProductById
} from "./product.service";

const ProductFormPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        if (!id) return;

        try {
            const response =
                await getProductById(id);
            setProduct(response.data);
        }

        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch product"
            );
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <ProductForm
            selectedProduct={product}
        />
    );
};

export default ProductFormPage;