import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    toast
} from "react-hot-toast";

import {
    getInventoryProduct,
    updateStock,
    updateVariantStock
} from "./inventory.service";

import {
    StatusBadge,
    StatCard
} from "../../../components/html";

import Button
    from "../../../components/ui/Button";


const AdminInventoryManagePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savingVariant, setSavingVariant] = useState(null);
    const [stock, setStock] = useState(0);
    const [variantStocks, setVariantStocks] = useState({});


    /* =================================
       FETCH PRODUCT
    ================================= */

    const fetchProduct = async () => {

        try {

            setLoading(true);

            const response =
                await getInventoryProduct(id);

            const apiData =
                response?.data?.data ??
                response?.data ??
                {};

            const productData =
                apiData?.product ??
                apiData;

            if (!productData?._id) {
                throw new Error("Product not found");
            }

            setProduct(productData);
            setStock(Number(productData.stock || 0));

            const initialVariantStocks = {};

            if (
                productData.hasVariants &&
                Array.isArray(productData.variants)
            ) {
                productData.variants.forEach(variant => {

                    if (!variant?._id) return;

                    initialVariantStocks[variant._id] =
                        Number(variant.stock || 0);

                });
            }

            setVariantStocks(initialVariantStocks);

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to fetch inventory"
            );

            navigate(
                "/admin/inventory",
                { replace: true }
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (!id) {

            navigate(
                "/admin/inventory",
                { replace: true }
            );

            return;

        }

        fetchProduct();

    }, [id]);


    /* =================================
       PRODUCT DATA
    ================================= */

    const productName =
        product?.name ||
        "Unknown Product";

    const productSku =
        product?.sku ||
        "—";

    const category =
        (
            typeof product?.category === "object"
                ? product.category?.name
                : product?.category
        ) ||
        "Uncategorized";

    const variants =
        Array.isArray(product?.variants)
            ? product.variants
            : [];

    const hasVariants =
        Boolean(
            product?.hasVariants &&
            variants.length
        );

    const productImage =
        product?.images?.[0]?.url ||
        "";


    /* =================================
       STOCK
    ================================= */

    const totalStock = useMemo(() => {

        if (!product) return 0;

        if (hasVariants) {

            return variants.reduce(
                (total, variant) =>
                    total +
                    Number(
                        variantStocks[variant._id] ??
                        variant.stock ??
                        0
                    ),
                0
            );

        }

        return Number(stock || 0);

    }, [
        product,
        hasVariants,
        variants,
        variantStocks,
        stock
    ]);


    const stockStatus = useMemo(() => {

        if (totalStock <= 0) {
            return "Out of Stock";
        }

        if (totalStock <= 5) {
            return "Low Stock";
        }

        return "In Stock";

    }, [totalStock]);


    /* =================================
       STOCK HANDLERS
    ================================= */

    const handleStockChange = value => {

        const parsed = Number(value);

        setStock(
            Number.isNaN(parsed) || parsed < 0
                ? 0
                : Math.floor(parsed)
        );

    };


    const handleVariantStockChange = (
        variantId,
        value
    ) => {

        const parsed = Number(value);

        setVariantStocks(previous => ({
            ...previous,
            [variantId]:
                Number.isNaN(parsed) || parsed < 0
                    ? 0
                    : Math.floor(parsed)
        }));

    };


    /* =================================
       SAVE STOCK
    ================================= */

    const handleSaveStock = async () => {

        try {

            setSaving(true);

            const response =
                await updateStock(
                    id,
                    stock
                );

            toast.success(
                response?.message ||
                response?.data?.message ||
                "Stock updated successfully"
            );

            await fetchProduct();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update stock"
            );

        } finally {

            setSaving(false);

        }

    };


    const handleSaveVariantStock = async variantId => {

        try {

            setSavingVariant(variantId);

            const value =
                Number(
                    variantStocks[variantId] ?? 0
                );

            const response =
                await updateVariantStock(
                    id,
                    variantId,
                    value
                );

            toast.success(
                response?.message ||
                response?.data?.message ||
                "Variant stock updated successfully"
            );

            await fetchProduct();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update variant stock"
            );

        } finally {

            setSavingVariant(null);

        }

    };


    /* =================================
       LOADING
    ================================= */

    if (loading) {

        return (
            <section className="
                flex min-h-[320px]
                items-center justify-center
            ">
                <div className="
                    flex items-center gap-3
                    text-sm font-medium
                    text-[var(--text-light)]
                ">
                    <span className="
                        h-5 w-5 animate-spin
                        rounded-full border-2
                        border-[var(--border)]
                        border-t-[var(--primary)]
                    " />
                    Loading inventory...
                </div>
            </section>
        );

    }


    if (!product) {
        return null;
    }


    /* =================================
       RENDER
    ================================= */

    return (

        <section className="
            w-full space-y-4
            px-1 sm:px-2
        ">


            {/* =================================
                HEADER
            ================================= */}

            <div className="
                flex min-h-[78px]
                items-center justify-between
                gap-4 rounded-[var(--radius-lg)]
                border border-[var(--border)]
                bg-[var(--surface)]
                px-4 py-3 shadow-sm sm:px-5
            ">

                <div className="
                    flex min-w-0 items-center gap-4
                ">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/inventory")
                        }
                        className="
                            inline-flex h-11 shrink-0
                            items-center gap-2
                            rounded-none
                            bg-[var(--primary)]
                            px-4 text-sm font-semibold
                            text-white transition
                            hover:opacity-90
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[var(--primary)]
                            focus:ring-offset-2
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="text-lg leading-none"
                        >
                            ←
                        </span>

                        Back
                    </button>


                    <div className="min-w-0">

                        <p className="
                            text-xs font-semibold
                            uppercase tracking-[0.08em]
                            text-[var(--primary)]
                        ">
                            Inventory
                        </p>

                        <p className="
                            mt-1 text-sm
                            text-[var(--text-light)]
                        ">
                            Manage product stock
                        </p>

                    </div>

                </div>


                <div className="
                    hidden shrink-0
                    items-center gap-2 sm:flex
                ">

                    <span className="
                        text-xs text-[var(--text-muted)]
                    ">
                        Category
                    </span>

                    <span className="
                        text-sm font-semibold
                        text-[var(--text)]
                    ">
                        {category}
                    </span>

                </div>

            </div>


            {/* =================================
                PRODUCT SUMMARY
            ================================= */}

            <div className="
                overflow-hidden
                rounded-[var(--radius-lg)]
                border border-[var(--border)]
                bg-[var(--surface)]
                shadow-sm
            ">

                <div className="
                    flex flex-col gap-4 p-5
                    sm:flex-row sm:items-center
                    sm:justify-between
                ">

                    <div className="
                        flex min-w-0 items-center gap-4
                    ">

                        <div className="
                            flex h-16 w-16 shrink-0
                            items-center justify-center
                            overflow-hidden rounded-lg
                            border border-[var(--border)]
                            bg-[var(--surface-hover)]
                        ">

                            {productImage ? (

                                <img
                                    src={productImage}
                                    alt={productName}
                                    className="
                                        h-full w-full
                                        object-contain
                                    "
                                />

                            ) : (

                                <span className="
                                    text-xs font-semibold
                                    text-[var(--text-light)]
                                ">
                                    IMG
                                </span>

                            )}

                        </div>


                        <div className="min-w-0">

                            <div className="
                                flex flex-wrap
                                items-center gap-2
                            ">

                                <h2 className="
                                    truncate text-xl
                                    font-semibold
                                    text-[var(--text)]
                                ">
                                    {productName}
                                </h2>

                                <StatusBadge
                                    status={
                                        product.status ||
                                        "Unknown"
                                    }
                                />

                            </div>


                            <div className="
                                mt-1 flex flex-wrap
                                items-center gap-x-3
                                gap-y-1
                            ">

                                <span className="
                                    text-sm
                                    text-[var(--text-light)]
                                ">
                                    SKU: {productSku}
                                </span>

                                <span className="
                                    text-[var(--border)]
                                ">
                                    •
                                </span>

                                <span className="
                                    text-sm
                                    text-[var(--text-light)]
                                ">
                                    {category}
                                </span>

                            </div>

                        </div>

                    </div>


                    <Button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/admin/products/${id}/edit`
                            )
                        }
                    >
                        Update Product
                    </Button>

                </div>

            </div>


            {/* =================================
                STOCK SUMMARY
            ================================= */}

            <div className="
                grid grid-cols-1 gap-3
                sm:grid-cols-3
            ">

                <StatCard
                    label="Total Stock"
                    value={totalStock}
                    accent="blue"
                />

                <StatCard
                    label="Inventory Type"
                    value={
                        hasVariants
                            ? "Variants"
                            : "Single Product"
                    }
                    accent="green"
                />

                <StatCard
                    label="Stock Status"
                    value={stockStatus}
                    accent={
                        stockStatus === "Out of Stock"
                            ? "red"
                            : stockStatus === "Low Stock"
                                ? "yellow"
                                : "green"
                    }
                />

            </div>


            {/* =================================
                SINGLE PRODUCT
            ================================= */}

            {!hasVariants && (

                <div className="
                    overflow-hidden
                    rounded-[var(--radius-lg)]
                    border border-[var(--border)]
                    bg-[var(--surface)]
                    shadow-sm
                ">

                    <div className="
                        border-b border-[var(--border)]
                        px-5 py-4
                    ">

                        <h3 className="
                            text-base font-semibold
                            text-[var(--text)]
                        ">
                            Stock Management
                        </h3>

                        <p className="
                            mt-0.5 text-xs
                            text-[var(--text-muted)]
                        ">
                            Update the available quantity.
                        </p>

                    </div>


                    <div className="
                        flex flex-col gap-4 p-5
                        sm:flex-row sm:items-end
                        sm:justify-between
                    ">

                        <div className="
                            w-full sm:max-w-xs
                        ">

                            <label className="
                                block text-xs font-medium
                                text-[var(--text-muted)]
                            ">
                                Available Stock
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="1"
                                value={stock}
                                onChange={event =>
                                    handleStockChange(
                                        event.target.value
                                    )
                                }
                                className="
                                    mt-2 h-11 w-full
                                    rounded-lg
                                    border border-[var(--border)]
                                    bg-[var(--surface)]
                                    px-4 text-sm font-semibold
                                    text-[var(--text)]
                                    outline-none transition
                                    focus:border-[var(--primary)]
                                    focus:ring-2
                                    focus:ring-[var(--primary)]
                                    focus:ring-opacity-10
                                "
                            />

                        </div>


                        <Button
                            type="button"
                            disabled={saving}
                            onClick={handleSaveStock}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Stock"}
                        </Button>

                    </div>

                </div>

            )}


            {/* =================================
                VARIANT INVENTORY
            ================================= */}

            {hasVariants && (

                <div className="
                    overflow-hidden
                    rounded-[var(--radius-lg)]
                    border border-[var(--border)]
                    bg-[var(--surface)]
                    shadow-sm
                ">

                    <div className="
                        flex items-center
                        justify-between gap-4
                        border-b border-[var(--border)]
                        px-5 py-4
                    ">

                        <div>

                            <h3 className="
                                text-base font-semibold
                                text-[var(--text)]
                            ">
                                Variant Inventory
                            </h3>

                            <p className="
                                mt-0.5 text-xs
                                text-[var(--text-muted)]
                            ">
                                Manage stock for each variant.
                            </p>

                        </div>


                        <span className="
                            shrink-0 rounded-full
                            bg-[var(--primary-soft)]
                            px-2.5 py-1
                            text-xs font-semibold
                            text-[var(--primary)]
                        ">
                            {variants.length}{" "}
                            {variants.length === 1
                                ? "variant"
                                : "variants"}
                        </span>

                    </div>


                    <div className="overflow-x-auto">

                        <table className="
                            w-full min-w-[760px]
                            border-collapse
                        ">

                            <thead>

                                <tr className="
                                    border-b
                                    border-[var(--border)]
                                    bg-[var(--surface-hover)]
                                ">

                                    <th className="
                                        px-5 py-3 text-left
                                        text-xs font-semibold
                                        uppercase
                                        tracking-[0.05em]
                                        text-[var(--text-muted)]
                                    ">
                                        Variant
                                    </th>

                                    <th className="
                                        px-5 py-3 text-left
                                        text-xs font-semibold
                                        uppercase
                                        tracking-[0.05em]
                                        text-[var(--text-muted)]
                                    ">
                                        SKU
                                    </th>

                                    <th className="
                                        px-5 py-3 text-left
                                        text-xs font-semibold
                                        uppercase
                                        tracking-[0.05em]
                                        text-[var(--text-muted)]
                                    ">
                                        Stock
                                    </th>

                                    <th className="
                                        px-5 py-3 text-left
                                        text-xs font-semibold
                                        uppercase
                                        tracking-[0.05em]
                                        text-[var(--text-muted)]
                                    ">
                                        Status
                                    </th>

                                    <th className="
                                        px-5 py-3 text-right
                                        text-xs font-semibold
                                        uppercase
                                        tracking-[0.05em]
                                        text-[var(--text-muted)]
                                    ">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {variants.map(variant => {

                                    const currentStock =
                                        Number(
                                            variantStocks[
                                                variant._id
                                            ] ??
                                            variant.stock ??
                                            0
                                        );

                                    const variantStatus =
                                        currentStock <= 0
                                            ? "Out of Stock"
                                            : currentStock <= 5
                                                ? "Low Stock"
                                                : "In Stock";

                                    const isSaving =
                                        savingVariant ===
                                        variant._id;

                                    return (

                                        <tr
                                            key={variant._id}
                                            className="
                                                border-b
                                                border-[var(--border)]
                                                last:border-b-0
                                                hover:bg-[var(--surface-hover)]
                                                transition
                                            "
                                        >

                                            <td className="
                                                px-5 py-3.5
                                            ">

                                                <p className="
                                                    text-sm font-semibold
                                                    text-[var(--text)]
                                                ">
                                                    {variant.name ||
                                                        productName}
                                                </p>


                                                {Array.isArray(
                                                    variant.attributes
                                                ) &&
                                                variant.attributes.length > 0 && (

                                                    <div className="
                                                        mt-1.5 flex
                                                        flex-wrap gap-1.5
                                                    ">

                                                        {variant.attributes.map(
                                                            (
                                                                attribute,
                                                                index
                                                            ) => (

                                                                <span
                                                                    key={
                                                                        `${attribute.key}-${index}`
                                                                    }
                                                                    className="
                                                                        rounded
                                                                        bg-[var(--primary-soft)]
                                                                        px-2 py-0.5
                                                                        text-[11px]
                                                                        font-medium
                                                                        text-[var(--primary)]
                                                                    "
                                                                >
                                                                    {attribute.key}:{" "}
                                                                    {attribute.value}
                                                                </span>

                                                            )
                                                        )}

                                                    </div>

                                                )}

                                            </td>


                                            <td className="
                                                px-5 py-3.5
                                            ">

                                                <span className="
                                                    text-sm
                                                    text-[var(--text-light)]
                                                ">
                                                    {variant.sku || "—"}
                                                </span>

                                            </td>


                                            <td className="
                                                px-5 py-3.5
                                            ">

                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    value={
                                                        variantStocks[
                                                            variant._id
                                                        ] ??
                                                        variant.stock ??
                                                        0
                                                    }
                                                    onChange={event =>
                                                        handleVariantStockChange(
                                                            variant._id,
                                                            event.target.value
                                                        )
                                                    }
                                                    className="
                                                        h-10 w-28
                                                        rounded-lg
                                                        border
                                                        border-[var(--border)]
                                                        bg-[var(--surface)]
                                                        px-3 text-sm
                                                        font-semibold
                                                        text-[var(--text)]
                                                        outline-none transition
                                                        focus:border-[var(--primary)]
                                                        focus:ring-2
                                                        focus:ring-[var(--primary)]
                                                        focus:ring-opacity-10
                                                    "
                                                />

                                            </td>


                                            <td className="
                                                px-5 py-3.5
                                            ">

                                                <StatusBadge
                                                    status={
                                                        variantStatus
                                                    }
                                                />

                                            </td>


                                            <td className="
                                                px-5 py-3.5
                                                text-right
                                            ">

                                                <Button
                                                    type="button"
                                                    disabled={
                                                        saving ||
                                                        isSaving
                                                    }
                                                    onClick={() =>
                                                        handleSaveVariantStock(
                                                            variant._id
                                                        )
                                                    }
                                                >
                                                    {isSaving
                                                        ? "Saving..."
                                                        : "Update"}
                                                </Button>

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </section>

    );

};


export default AdminInventoryManagePage;