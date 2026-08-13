import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import Textarea from "../../../components/ui/TextArea";
import {
    FormCard,
    FormSection,
    FormActions
} from "../../../components/html";

import {
    getCategories
} from "../../category/services/category.service";

import {
    createProduct,
    updateProduct
} from "../services/product.service";
import VariantSection from "./VariantSection";
import SpecificationSection from "./SpecificationSection";
import ImageSection from "./ImageSection";

const ProductForm = ({
    selectedProduct = null,
    onSuccess,
    clearSelection
}) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        brand: "",
        shortDescription: "",
        description: "",
        price: 0,
        discountPrice: 0,
        stock: 0,
        sku: "",
        variants: [],
        specifications: [],
        images: [],
        isFeatured: false,
        status: "active"
    });

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        }
        catch (error) {
            toast.error(
                "Failed to load categories"
            );
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    useEffect(() => {
        if (!selectedProduct) {
            setFormData({
                name: "",
                category: "",
                brand: "",
                shortDescription: "",
                description: "",
                price: 0,
                discountPrice: 0,
                stock: 0,
                sku: "",
                variants: [],
                specifications: [],
                images: [],
                isFeatured: false,
                status: "active"
            });
            return;
        }

        setFormData({
            name: selectedProduct.name,
            category: selectedProduct.category?._id,
            brand: selectedProduct.brand,
            shortDescription: selectedProduct.shortDescription,
            description: selectedProduct.description,
            price: selectedProduct.price,
            discountPrice: selectedProduct.discountPrice,
            stock: selectedProduct.stock,
            sku: selectedProduct.sku,
            variants: selectedProduct.variants || [],
            specifications: selectedProduct.specifications || [],
            images: selectedProduct.images || [],
            isFeatured: selectedProduct.isFeatured,
            status: selectedProduct.status || "active"
        });

    }, [selectedProduct]);

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));

    };

    const resetForm = () => {

        setFormData({
            name: "",
            category: "",
            brand: "",
            shortDescription: "",
            description: "",
            price: 0,
            discountPrice: 0,
            stock: 0,
            sku: "",
            variants: [],
            images: [],
            specifications: [],
            isFeatured: false,
            status: "active"
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            let response;

            if (selectedProduct) {
                response = await updateProduct(
                    selectedProduct._id,
                    formData
                );
            }
            else {
                response = await createProduct(
                    formData
                );
            }
            toast.success(response.message);
            if (!selectedProduct) {
                resetForm();
            }

            clearSelection?.();
            onSuccess?.();
        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Operation failed"
            );
        }

        finally {
            setLoading(false);
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            {/* Basic Information */}

            <FormCard
                title="Basic Information"
            >
                <FormSection>
                    <Input
                        label="Product Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <Select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Category
                        </option>

                        {categories.map(category => (
                            <option
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </Select>

                    <Input
                        label="Brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />

                    <Input
                        label="Short Description"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                    />
                </FormSection>
            </FormCard>

            {/* Pricing */}

            <FormCard
                title="Pricing"
            >

                <FormSection>
                    <Input
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <Input
                        label="Discount Price"
                        name="discountPrice"
                        type="number"
                        value={formData.discountPrice}
                        onChange={handleChange}
                    />
                </FormSection>
            </FormCard>

            {/* Inventory */}

            <FormCard
                title="Inventory"
            >

                <FormSection>
                    <Input
                        label="Stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                    />
                    <Input
                        label="SKU"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                    />
                </FormSection>
            </FormCard>

            {/* Variants */}

            <VariantSection
                variants={formData.variants}
                setFormData={setFormData}
            />

            <SpecificationSection
                specifications={formData.specifications}
                setFormData={setFormData}
            />

            <ImageSection
                images={formData.images}
                setFormData={setFormData}
            />

            {/* Description */}

            <FormCard
                title="Description"
            >
                <Textarea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                />
            </FormCard>

            {/* Featured */}

            <FormCard title="Settings">

                <FormSection>

                    <Select
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </Select>

                    <label className="flex items-center gap-3 mt-8">

                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                        />

                        Featured Product

                    </label>

                </FormSection>

            </FormCard>

            <FormActions
                loading={loading}

                submitText={
                    selectedProduct
                        ? "Update Product"
                        : "Create Product"
                }

                onCancel={() => {
                    clearSelection?.();
                }}
            />
        </form>
    );

};

export default ProductForm;