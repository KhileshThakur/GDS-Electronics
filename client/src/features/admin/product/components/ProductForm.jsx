import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
    getCategories
} from "../../../category/services/category.service";

import {
    createProduct,
    updateProduct
} from "../product.service";


const EMPTY_FORM = {
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
};


const ProductForm = ({
    selectedProduct = null,
    onSuccess,
    clearSelection
}) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] =
        useState(EMPTY_FORM);


    /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response =
                    await getCategories();

                setCategories(
                    response.data || []
                );

            }
            catch (error) {

                toast.error(
                    "Failed to load categories"
                );

            }

        };

        fetchCategories();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | Product → Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!selectedProduct) {

            setFormData({
                ...EMPTY_FORM
            });

            return;
        }


        setFormData({

            name:
                selectedProduct.name || "",

            category:
                selectedProduct.category?._id ||
                selectedProduct.category ||
                "",

            brand:
                selectedProduct.brand || "",

            shortDescription:
                selectedProduct.shortDescription || "",

            description:
                selectedProduct.description || "",

            price:
                selectedProduct.price ?? 0,

            discountPrice:
                selectedProduct.discountPrice ?? 0,

            stock:
                selectedProduct.stock ?? 0,

            sku:
                selectedProduct.sku || "",

            variants:
                selectedProduct.variants || [],

            specifications:
                selectedProduct.specifications || [],

            images:
                selectedProduct.images || [],

            isFeatured:
                selectedProduct.isFeatured ?? false,

            status:
                selectedProduct.status || "active"

        });

    }, [selectedProduct]);


    /*
    |--------------------------------------------------------------------------
    | Basic Change
    |--------------------------------------------------------------------------
    */

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;


        setFormData(prev => ({

            ...prev,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    const updateArrayItem = (
        field,
        index,
        value
    ) => {

        setFormData(prev => {

            const items = [
                ...(prev[field] || [])
            ];

            items[index] = value;

            return {
                ...prev,
                [field]: items
            };

        });

    };


    /*
    |--------------------------------------------------------------------------
    | Images
    |--------------------------------------------------------------------------
    */

    const addImage = () => {

        setFormData(prev => ({

            ...prev,

            images: [
                ...(prev.images || []),
                {
                    url: "",
                    publicId: ""
                }
            ]

        }));

    };


    const updateImage = (
        index,
        value
    ) => {

        setFormData(prev => {

            const images = [
                ...(prev.images || [])
            ];

            images[index] = {
                ...images[index],
                url: value
            };

            return {
                ...prev,
                images
            };

        });

    };


    const removeImage = (index) => {

        setFormData(prev => ({

            ...prev,

            images:
                prev.images.filter(
                    (_, i) => i !== index
                )

        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Specifications
    |--------------------------------------------------------------------------
    */

    const addSpecification = () => {

        setFormData(prev => ({

            ...prev,

            specifications: [
                ...(prev.specifications || []),
                {
                    key: "",
                    value: ""
                }
            ]

        }));

    };


    const updateSpecification = (
        index,
        field,
        value
    ) => {

        setFormData(prev => {

            const specifications = [
                ...(prev.specifications || [])
            ];

            specifications[index] = {
                ...specifications[index],
                [field]: value
            };

            return {
                ...prev,
                specifications
            };

        });

    };


    const removeSpecification = (
        index
    ) => {

        setFormData(prev => ({

            ...prev,

            specifications:
                prev.specifications.filter(
                    (_, i) => i !== index
                )

        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Variants
    |--------------------------------------------------------------------------
    */

    const addVariant = () => {

        setFormData(prev => ({

            ...prev,

            variants: [
                ...(prev.variants || []),
                {
                    name: "",
                    sku: "",
                    price: 0,
                    discountPrice: 0,
                    stock: 0,
                    attributes: []
                }
            ]

        }));

    };


    const updateVariant = (
        index,
        field,
        value
    ) => {

        setFormData(prev => {

            const variants = [
                ...(prev.variants || [])
            ];

            variants[index] = {
                ...variants[index],
                [field]: value
            };

            return {
                ...prev,
                variants
            };

        });

    };


    const removeVariant = (
        index
    ) => {

        setFormData(prev => ({

            ...prev,

            variants:
                prev.variants.filter(
                    (_, i) => i !== index
                )

        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Variant Attributes
    |--------------------------------------------------------------------------
    */

    const addAttribute = (
        variantIndex
    ) => {

        setFormData(prev => ({

            ...prev,

            variants:
                prev.variants.map(
                    (variant, index) => {

                        if (
                            index !== variantIndex
                        ) {
                            return variant;
                        }

                        return {

                            ...variant,

                            attributes: [
                                ...(variant.attributes || []),
                                {
                                    key: "",
                                    value: ""
                                }
                            ]

                        };

                    }
                )

        }));

    };


    const updateAttribute = (
        variantIndex,
        attributeIndex,
        field,
        value
    ) => {

        setFormData(prev => ({

            ...prev,

            variants:
                prev.variants.map(
                    (variant, index) => {

                        if (
                            index !== variantIndex
                        ) {
                            return variant;
                        }

                        return {

                            ...variant,

                            attributes:
                                (variant.attributes || [])
                                    .map(
                                        (
                                            attribute,
                                            i
                                        ) => {

                                            if (
                                                i !==
                                                attributeIndex
                                            ) {
                                                return attribute;
                                            }

                                            return {

                                                ...attribute,

                                                [field]:
                                                    value

                                            };

                                        }
                                    )

                        };

                    }
                )

        }));

    };


    const removeAttribute = (
        variantIndex,
        attributeIndex
    ) => {

        setFormData(prev => ({

            ...prev,

            variants:
                prev.variants.map(
                    (variant, index) => {

                        if (
                            index !== variantIndex
                        ) {
                            return variant;
                        }

                        return {

                            ...variant,

                            attributes:
                                (variant.attributes || [])
                                    .filter(
                                        (_, i) =>
                                            i !==
                                            attributeIndex
                                    )

                        };

                    }
                )

        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const resetForm = () => {

        setFormData({
            ...EMPTY_FORM
        });

    };


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        try {

            setLoading(true);


            /*
             * Backend expects hasVariants.
             *
             * We derive it automatically instead
             * of making the admin maintain another
             * checkbox.
             */
            const payload = {

                ...formData,

                hasVariants:
                    formData.variants.length > 0

            };


            let response;


            if (selectedProduct) {

                response =
                    await updateProduct(
                        selectedProduct._id,
                        payload
                    );

            }
            else {

                response =
                    await createProduct(
                        payload
                    );

            }


            toast.success(
                response.message ||
                (
                    selectedProduct
                        ? "Product updated successfully"
                        : "Product created successfully"
                )
            );


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


    /*
    |--------------------------------------------------------------------------
    | Small UI helpers
    |--------------------------------------------------------------------------
    */

    const fieldLabel = (
        text,
        required = false
    ) => (

        <label className="
            block
            mb-1
            text-[13px]
            leading-4
            font-semibold
            text-[var(--text)]
        ">

            {text}

            {required && (
                <span className="
                    ml-1
                    text-[var(--danger)]
                ">
                    *
                </span>
            )}

        </label>

    );


    const inputClass = `
        w-full
        h-10
        px-3
        rounded-[var(--radius-sm)]
        border
        border-[var(--border)]
        bg-white
        text-[14px]
        leading-none
        text-[var(--text)]
        placeholder:text-[var(--text-muted)]
        outline-none
        transition
        duration-150
        hover:border-slate-300
        focus:border-[var(--primary)]
        focus:ring-2
        focus:ring-[var(--primary)]/10
    `;


    const miniButton = `
        inline-flex
        items-center
        justify-center
        h-8
        px-3
        rounded-[var(--radius-sm)]
        text-[12px]
        font-semibold
        whitespace-nowrap
        transition
        duration-150
    `;


    const sectionClass = `
        border
        border-[var(--border)]
        rounded-[var(--radius-md)]
        overflow-hidden
        bg-white
    `;


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <form
            onSubmit={handleSubmit}
            className="
                w-full
                max-w-[1500px]
                mx-auto
                pb-20
                text-[var(--text)]
            "
        >

            {/* =====================================================
                PAGE HEADER
            ===================================================== */}

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
                mb-3
                px-1
            ">

                <div>

                    <div className="
                    mt-0.5
                    ml-3
                        text-[11px]
                        leading-4
                        font-bold
                        uppercase
                        tracking-[0.16em]
                        text-[var(--primary)]
                    ">
                        Products
                    </div>

                    <h1 className="
                        mt-0.5
                        ml-3
                        text-[22px]
                        leading-7
                        font-bold
                        tracking-[-0.02em]
                        text-[var(--text)]
                    ">
                        {selectedProduct
                            ? "Edit Product"
                            : "Add Product"}
                    </h1>

                </div>


                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <label className="
                        inline-flex
                        items-center
                        gap-2
                        text-[13px]
                        font-medium
                        text-[var(--text-light)]
                        cursor-pointer
                        select-none
                    ">

                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={
                                formData.isFeatured
                            }
                            onChange={
                                handleChange
                            }
                            className="
                                w-4
                                h-4
                                accent-[var(--primary)]
                                cursor-pointer
                            "
                        />

                        Featured

                    </label>


                    <select
                        name="status"
                        value={
                            formData.status
                        }
                        onChange={
                            handleChange
                        }
                        className="
                            h-10
                            min-w-[105px]
                            px-3
                            rounded-[var(--radius-sm)]
                            border
                            border-[var(--border)]
                            bg-white
                            text-[13px]
                            font-semibold
                            text-[var(--text)]
                            outline-none
                            cursor-pointer
                            focus:border-[var(--primary)]
                            focus:ring-2
                            focus:ring-[var(--primary)]/10
                        "
                    >

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </select>

                </div>

            </div>


            {/* =====================================================
                MAIN FORM
            ===================================================== */}

            <div className="
                border
                border-[var(--border)]
                rounded-[var(--radius-md)]
                overflow-hidden
                bg-white
                shadow-[0_2px_10px_rgba(15,23,42,0.04)]
            ">


                {/* =================================================
                    BASIC INFORMATION
                ================================================= */}

                <section className={sectionClass}>

                    <div className="
                        px-4
                        py-2.5
                        border-b
                        border-[var(--border)]
                        bg-[var(--primary-soft)]
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">

                            <span className="
                                w-1
                                h-5
                                rounded-full
                                bg-[var(--primary)]"
                            />

                            <div>

                                <h2 className="
                                    text-[14px]
                                    leading-5
                                    font-bold
                                    text-[var(--text)]
                                ">
                                    Product Information
                                </h2>

                                <p className="
                                    text-[11px]
                                    leading-4
                                    text-[var(--text-light)]
                                ">
                                    Identity and classification
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="
                        p-3.5
                        space-y-3
                    ">

                        <div className="
                            grid
                            grid-cols-1
                            lg:grid-cols-[2fr_1fr_1fr_1fr]
                            gap-3
                        ">

                            <div>
                                {fieldLabel(
                                    "Product Name",
                                    true
                                )}

                                <input
                                    name="name"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="e.g. Samsung Galaxy S25"
                                    className={inputClass}
                                />
                            </div>


                            <div>
                                {fieldLabel(
                                    "Category",
                                    true
                                )}

                                <select
                                    name="category"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className={inputClass}
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    {categories.map(
                                        category => (

                                            <option
                                                key={
                                                    category._id
                                                }
                                                value={
                                                    category._id
                                                }
                                            >
                                                {
                                                    category.name
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            <div>
                                {fieldLabel(
                                    "Brand",
                                    true
                                )}

                                <input
                                    name="brand"
                                    value={
                                        formData.brand
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Samsung"
                                    className={inputClass}
                                />
                            </div>


                            <div>
                                {fieldLabel(
                                    "SKU",
                                    true
                                )}

                                <input
                                    name="sku"
                                    value={
                                        formData.sku
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="GAL-S25-256"
                                    className={inputClass}
                                />
                            </div>

                        </div>


                        <div>

                            {fieldLabel(
                                "Short Description",
                                true
                            )}

                            <input
                                name="shortDescription"
                                value={
                                    formData.shortDescription
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="One-line product summary"
                                className={inputClass}
                            />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    PRICING + INVENTORY
                ================================================= */}

                <section className="
                    border-t
                    border-[var(--border)]
                    bg-[var(--surface-hover)]
                ">

                    <div className="
                        px-4
                        py-2.5
                        border-b
                        border-[var(--border)]
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">

                            <span className="
                                w-1
                                h-5
                                rounded-full
                                bg-[var(--secondary)]"
                            />

                            <div>

                                <h2 className="
                                    text-[14px]
                                    leading-5
                                    font-bold
                                ">
                                    Pricing & Inventory
                                </h2>

                                <p className="
                                    text-[11px]
                                    leading-4
                                    text-[var(--text-light)]
                                ">
                                    Price, stock and product code
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="
                        p-3.5
                    ">

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-3
                        ">

                            <div>

                                {fieldLabel(
                                    "Price",
                                    true
                                )}

                                <input
                                    name="price"
                                    type="number"
                                    min="0"
                                    value={
                                        formData.price
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={inputClass}
                                />

                            </div>


                            <div>

                                {fieldLabel(
                                    "Discount Price"
                                )}

                                <input
                                    name="discountPrice"
                                    type="number"
                                    min="0"
                                    value={
                                        formData.discountPrice
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={inputClass}
                                />

                            </div>


                            <div>

                                {fieldLabel(
                                    "Stock",
                                    true
                                )}

                                <input
                                    name="stock"
                                    type="number"
                                    min="0"
                                    value={
                                        formData.stock
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={inputClass}
                                />

                            </div>


                            <div className="
                                flex
                                items-end
                            ">

                                <div className="
                                    h-10
                                    w-full
                                    flex
                                    items-center
                                    px-3
                                    rounded-[var(--radius-sm)]
                                    bg-white
                                    border
                                    border-[var(--border)]
                                    text-[12px]
                                    text-[var(--text-light)]
                                ">

                                    {Number(
                                        formData.discountPrice
                                    ) > 0 &&
                                    Number(
                                        formData.discountPrice
                                    ) <
                                    Number(
                                        formData.price
                                    )
                                        ? `Save ₹${(
                                            Number(
                                                formData.price
                                            ) -
                                            Number(
                                                formData.discountPrice
                                            )
                                        ).toLocaleString()}`
                                        : "No discount"}

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <section className="
                    border-t
                    border-[var(--border)]
                    bg-white
                ">

                    <div className="
                        px-4
                        py-2.5
                        border-b
                        border-[var(--border)]
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">

                            <span className="
                                w-1
                                h-5
                                rounded-full
                                bg-[#8B5CF6]"
                            />

                            <div>

                                <h2 className="
                                    text-[14px]
                                    leading-5
                                    font-bold
                                ">
                                    Description
                                </h2>

                                <p className="
                                    text-[11px]
                                    leading-4
                                    text-[var(--text-light)]
                                ">
                                    Detailed product information
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="
                        p-3.5
                    ">

                        {fieldLabel(
                            "Product Description"
                        )}

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            rows={3}
                            placeholder="Describe the product, features, compatibility, warranty, etc."
                            className="
                                w-full
                                min-h-[88px]
                                px-3
                                py-2.5
                                rounded-[var(--radius-sm)]
                                border
                                border-[var(--border)]
                                bg-white
                                text-[14px]
                                leading-5
                                text-[var(--text)]
                                placeholder:text-[var(--text-muted)]
                                outline-none
                                resize-y
                                transition
                                duration-150
                                hover:border-slate-300
                                focus:border-[var(--primary)]
                                focus:ring-2
                                focus:ring-[var(--primary)]/10
                            "
                        />

                    </div>

                </section>


                {/* =================================================
                    IMAGES + SPECIFICATIONS
                ================================================= */}

                <section className="
                    border-t
                    border-[var(--border)]
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    bg-[var(--background)]
                ">


                    {/* IMAGES */}

                    <div className="
                        bg-white
                        lg:border-r
                        border-[var(--border)]
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-4
                            py-2.5
                            border-b
                            border-[var(--border)]
                        ">

                            <div className="
                                flex
                                items-center
                                gap-2
                            ">

                                <span className="
                                    text-[13px]
                                    font-bold
                                ">
                                    Images
                                </span>

                                <span className="
                                    min-w-[22px]
                                    h-5
                                    px-1.5
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#FCE7F3]
                                    text-[11px]
                                    font-bold
                                    text-[#DB2777]
                                ">
                                    {
                                        formData.images.length
                                    }
                                </span>

                            </div>


                            <button
                                type="button"
                                onClick={addImage}
                                className={`
                                    ${miniButton}
                                    text-[var(--primary)]
                                    hover:bg-[var(--primary-soft)]
                                `}
                            >
                                + Add
                            </button>

                        </div>


                        <div className="
                            p-3.5
                        ">

                            {formData.images.length === 0 ? (

                                <div className="
                                    h-12
                                    flex
                                    items-center
                                    justify-center
                                    rounded-[var(--radius-sm)]
                                    border
                                    border-dashed
                                    border-[var(--border)]
                                    bg-[var(--surface-hover)]
                                    text-[12px]
                                    text-[var(--text-muted)]
                                ">
                                    No images added
                                </div>

                            ) : (

                                <div className="
                                    space-y-2
                                ">

                                    {formData.images.map(
                                        (
                                            image,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="
                                                    flex
                                                    gap-2
                                                "
                                            >

                                                <input
                                                    value={
                                                        image.url ||
                                                        ""
                                                    }
                                                    onChange={
                                                        event =>
                                                            updateImage(
                                                                index,
                                                                event.target.value
                                                            )
                                                    }
                                                    placeholder={`Image ${index + 1} URL`}
                                                    className={
                                                        inputClass
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(
                                                            index
                                                        )
                                                    }
                                                    className="
                                                        h-10
                                                        px-3
                                                        rounded-[var(--radius-sm)]
                                                        border
                                                        border-red-200
                                                        bg-red-50
                                                        text-[12px]
                                                        font-semibold
                                                        text-[var(--danger)]
                                                        hover:bg-red-100
                                                    "
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    </div>


                    {/* SPECIFICATIONS */}

                    <div className="
                        bg-white
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-4
                            py-2.5
                            border-b
                            border-[var(--border)]
                        ">

                            <div className="
                                flex
                                items-center
                                gap-2
                            ">

                                <span className="
                                    text-[13px]
                                    font-bold
                                ">
                                    Specifications
                                </span>

                                <span className="
                                    min-w-[22px]
                                    h-5
                                    px-1.5
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-[#DCFCE7]
                                    text-[11px]
                                    font-bold
                                    text-[#16A34A]
                                ">
                                    {
                                        formData.specifications.length
                                    }
                                </span>

                            </div>


                            <button
                                type="button"
                                onClick={
                                    addSpecification
                                }
                                className={`
                                    ${miniButton}
                                    text-[var(--primary)]
                                    hover:bg-[var(--primary-soft)]
                                `}
                            >
                                + Add
                            </button>

                        </div>


                        <div className="
                            p-3.5
                        ">

                            {formData.specifications.length === 0 ? (

                                <div className="
                                    h-12
                                    flex
                                    items-center
                                    justify-center
                                    rounded-[var(--radius-sm)]
                                    border
                                    border-dashed
                                    border-[var(--border)]
                                    bg-[var(--surface-hover)]
                                    text-[12px]
                                    text-[var(--text-muted)]
                                ">
                                    No specifications added
                                </div>

                            ) : (

                                <div className="
                                    space-y-2
                                ">

                                    {formData.specifications.map(
                                        (
                                            specification,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="
                                                    grid
                                                    grid-cols-[1fr_2fr_auto]
                                                    gap-2
                                                "
                                            >

                                                <input
                                                    value={
                                                        specification.key ||
                                                        ""
                                                    }
                                                    onChange={
                                                        event =>
                                                            updateSpecification(
                                                                index,
                                                                "key",
                                                                event.target.value
                                                            )
                                                    }
                                                    placeholder="Key"
                                                    className={
                                                        inputClass
                                                    }
                                                />

                                                <input
                                                    value={
                                                        specification.value ||
                                                        ""
                                                    }
                                                    onChange={
                                                        event =>
                                                            updateSpecification(
                                                                index,
                                                                "value",
                                                                event.target.value
                                                            )
                                                    }
                                                    placeholder="Value"
                                                    className={
                                                        inputClass
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSpecification(
                                                            index
                                                        )
                                                    }
                                                    className="
                                                        h-10
                                                        px-3
                                                        rounded-[var(--radius-sm)]
                                                        border
                                                        border-red-200
                                                        bg-red-50
                                                        text-[12px]
                                                        font-semibold
                                                        text-[var(--danger)]
                                                        hover:bg-red-100
                                                    "
                                                >
                                                    ×
                                                </button>

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    </div>

                </section>


                {/* =================================================
                    VARIANTS
                ================================================= */}

                <section className="
                    border-t
                    border-[var(--border)]
                    bg-[var(--surface-hover)]
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        px-4
                        py-2.5
                        border-b
                        border-[var(--border)]
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">

                            <span className="
                                w-1
                                h-5
                                rounded-full
                                bg-[var(--primary)]"
                            />

                            <div>

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <h2 className="
                                        text-[14px]
                                        leading-5
                                        font-bold
                                    ">
                                        Variants
                                    </h2>

                                    <span className="
                                        min-w-[22px]
                                        h-5
                                        px-1.5
                                        inline-flex
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[var(--primary-soft)]
                                        text-[11px]
                                        font-bold
                                        text-[var(--primary-dark)]
                                    ">
                                        {
                                            formData.variants.length
                                        }
                                    </span>

                                </div>

                                <p className="
                                    text-[11px]
                                    leading-4
                                    text-[var(--text-light)]
                                ">
                                    Optional configurations such as storage or color
                                </p>

                            </div>

                        </div>


                        <button
                            type="button"
                            onClick={addVariant}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                h-8
                                px-3
                                rounded-[var(--radius-sm)]
                                bg-[var(--primary)]
                                text-[12px]
                                font-bold
                                text-white
                                hover:bg-[var(--primary-dark)]
                                transition
                            "
                        >
                            + Add Variant
                        </button>

                    </div>


                    <div className="
                        p-3.5
                        space-y-2.5
                    ">

                        {formData.variants.length === 0 ? (

                            <div className="
                                h-12
                                flex
                                items-center
                                justify-center
                                rounded-[var(--radius-sm)]
                                border
                                border-dashed
                                border-[var(--border)]
                                bg-white
                                text-[12px]
                                text-[var(--text-muted)]
                            ">
                                No variants. Add only when the product has different configurations.
                            </div>

                        ) : (

                            formData.variants.map(
                                (
                                    variant,
                                    index
                                ) => (

                                    <details
                                        key={index}
                                        open={
                                            index === 0
                                        }
                                        className="
                                            rounded-[var(--radius-sm)]
                                            border
                                            border-[var(--border)]
                                            bg-white
                                            overflow-hidden
                                        "
                                    >

                                        <summary className="
                                            flex
                                            items-center
                                            justify-between
                                            px-3
                                            py-2.5
                                            cursor-pointer
                                            select-none
                                            list-none
                                            hover:bg-[var(--surface-hover)]
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                                min-w-0
                                            ">

                                                <span className="
                                                    w-6
                                                    h-6
                                                    flex
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    bg-[var(--primary-soft)]
                                                    text-[11px]
                                                    font-bold
                                                    text-[var(--primary-dark)]
                                                ">
                                                    {index + 1}
                                                </span>

                                                <span className="
                                                    text-[13px]
                                                    font-semibold
                                                    truncate
                                                ">
                                                    {
                                                        variant.name ||
                                                        "Unnamed Variant"
                                                    }
                                                </span>

                                            </div>


                                            <div className="
                                                flex
                                                items-center
                                                gap-3
                                            ">

                                                <span className="
                                                    text-[11px]
                                                    text-[var(--text-muted)]
                                                ">
                                                    {
                                                        variant.stock || 0
                                                    }{" "}
                                                    stock
                                                </span>

                                                <span className="
                                                    text-[11px]
                                                    text-[var(--text-muted)]
                                                ">
                                                    ▼
                                                </span>

                                            </div>

                                        </summary>


                                        <div className="
                                            border-t
                                            border-[var(--border)]
                                            p-3
                                            space-y-3
                                        ">

                                            <div className="
                                                grid
                                                grid-cols-1
                                                sm:grid-cols-2
                                                lg:grid-cols-5
                                                gap-2.5
                                            ">

                                                <div>

                                                    {fieldLabel(
                                                        "Name"
                                                    )}

                                                    <input
                                                        value={
                                                            variant.name ||
                                                            ""
                                                        }
                                                        onChange={
                                                            event =>
                                                                updateVariant(
                                                                    index,
                                                                    "name",
                                                                    event.target.value
                                                                )
                                                        }
                                                        placeholder="256GB Black"
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                </div>


                                                <div>

                                                    {fieldLabel(
                                                        "SKU"
                                                    )}

                                                    <input
                                                        value={
                                                            variant.sku ||
                                                            ""
                                                        }
                                                        onChange={
                                                            event =>
                                                                updateVariant(
                                                                    index,
                                                                    "sku",
                                                                    event.target.value
                                                                )
                                                        }
                                                        placeholder="S25-256-BLK"
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                </div>


                                                <div>

                                                    {fieldLabel(
                                                        "Price"
                                                    )}

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={
                                                            variant.price ??
                                                            0
                                                        }
                                                        onChange={
                                                            event =>
                                                                updateVariant(
                                                                    index,
                                                                    "price",
                                                                    event.target.value
                                                                )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                </div>


                                                <div>

                                                    {fieldLabel(
                                                        "Discount"
                                                    )}

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={
                                                            variant.discountPrice ??
                                                            0
                                                        }
                                                        onChange={
                                                            event =>
                                                                updateVariant(
                                                                    index,
                                                                    "discountPrice",
                                                                    event.target.value
                                                                )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                </div>


                                                <div>

                                                    {fieldLabel(
                                                        "Stock"
                                                    )}

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={
                                                            variant.stock ??
                                                            0
                                                        }
                                                        onChange={
                                                            event =>
                                                                updateVariant(
                                                                    index,
                                                                    "stock",
                                                                    event.target.value
                                                                )
                                                        }
                                                        className={
                                                            inputClass
                                                        }
                                                    />

                                                </div>

                                            </div>


                                            {/* Attributes */}

                                            <div className="
                                                pt-2
                                                border-t
                                                border-slate-100
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    mb-2
                                                ">

                                                    <span className="
                                                        text-[12px]
                                                        font-bold
                                                        text-[var(--text)]
                                                    ">
                                                        Attributes
                                                    </span>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            addAttribute(
                                                                index
                                                            )
                                                        }
                                                        className="
                                                            text-[11px]
                                                            font-semibold
                                                            text-[var(--primary)]
                                                            hover:underline
                                                        "
                                                    >
                                                        + Add Attribute
                                                    </button>

                                                </div>


                                                {(variant.attributes || []).map(
                                                    (
                                                        attribute,
                                                        attributeIndex
                                                    ) => (

                                                        <div
                                                            key={
                                                                attributeIndex
                                                            }
                                                            className="
                                                                grid
                                                                grid-cols-[1fr_2fr_auto]
                                                                gap-2
                                                                mb-2
                                                            "
                                                        >

                                                            <input
                                                                value={
                                                                    attribute.key ||
                                                                    ""
                                                                }
                                                                onChange={
                                                                    event =>
                                                                        updateAttribute(
                                                                            index,
                                                                            attributeIndex,
                                                                            "key",
                                                                            event.target.value
                                                                        )
                                                                }
                                                                placeholder="Key"
                                                                className={
                                                                    inputClass
                                                                }
                                                            />

                                                            <input
                                                                value={
                                                                    attribute.value ||
                                                                    ""
                                                                }
                                                                onChange={
                                                                    event =>
                                                                        updateAttribute(
                                                                            index,
                                                                            attributeIndex,
                                                                            "value",
                                                                            event.target.value
                                                                        )
                                                                }
                                                                placeholder="Value"
                                                                className={
                                                                    inputClass
                                                                }
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeAttribute(
                                                                        index,
                                                                        attributeIndex
                                                                    )
                                                                }
                                                                className="
                                                                    h-10
                                                                    px-3
                                                                    rounded-[var(--radius-sm)]
                                                                    border
                                                                    border-red-200
                                                                    bg-red-50
                                                                    text-[12px]
                                                                    font-semibold
                                                                    text-[var(--danger)]
                                                                "
                                                            >
                                                                ×
                                                            </button>

                                                        </div>

                                                    )
                                                )}

                                            </div>


                                            <div className="
                                                flex
                                                justify-end
                                                pt-1
                                            ">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeVariant(
                                                            index
                                                        )
                                                    }
                                                    className="
                                                        h-8
                                                        px-3
                                                        rounded-[var(--radius-sm)]
                                                        text-[11px]
                                                        font-semibold
                                                        text-[var(--danger)]
                                                        bg-red-50
                                                        border
                                                        border-red-100
                                                        hover:bg-red-100
                                                    "
                                                >
                                                    Remove Variant
                                                </button>

                                            </div>

                                        </div>

                                    </details>

                                )
                            )

                        )}

                    </div>

                </section>

            </div>


            {/* =====================================================
                ACTION BAR
            ===================================================== */}

            <div className="
                sticky
                bottom-0
                z-20
                mt-3
                flex
                items-center
                justify-end
                gap-2
                px-3
                py-2.5
                rounded-[var(--radius-md)]
                border
                border-[var(--border)]
                bg-white/95
                backdrop-blur
                shadow-[0_-3px_12px_rgba(15,23,42,0.06)]
            ">

                <button
                    type="button"
                    onClick={() =>
                        clearSelection?.()
                    }
                    disabled={loading}
                    className="
                        h-9
                        px-4
                        rounded-[var(--radius-sm)]
                        border
                        border-[var(--border)]
                        bg-white
                        text-[13px]
                        font-semibold
                        text-[var(--text-light)]
                        hover:bg-[var(--surface-hover)]
                        hover:text-[var(--text)]
                        disabled:opacity-50
                    "
                >
                    Cancel
                </button>


                <button
                    type="submit"
                    disabled={loading}
                    className="
                        h-9
                        px-4
                        rounded-[var(--radius-sm)]
                        bg-[var(--primary)]
                        text-[13px]
                        font-bold
                        text-white
                        shadow-sm
                        hover:bg-[var(--primary-dark)]
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                        transition
                    "
                >

                    {loading
                        ? "Saving..."
                        : selectedProduct
                            ? "Update Product"
                            : "Create Product"}

                </button>

            </div>

        </form>

    );

};


export default ProductForm;