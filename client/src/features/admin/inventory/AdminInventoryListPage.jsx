import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    toast
} from "react-hot-toast";

import {
    useNavigate
} from "react-router-dom";

import {
    getInventory,
    getInventorySummary
} from "./inventory.service";

import {
    PageHeader,
    StatusBadge,
    FilterBar,
    StatCard
} from "../../../components/html";

import Table from "../../../components/ui/Table";


// =====================================================
// Helpers
// =====================================================

const getStockClass = (stock) => {

    if (stock <= 0) {
        return "font-semibold text-red-600";
    }

    if (stock <= 5) {
        return "font-semibold text-amber-600";
    }

    return "font-medium text-[var(--text)]";
};


const getStockLabel = (status) => {

    switch (status) {

        case "OUT_OF_STOCK":
            return "OUT_OF_STOCK";

        case "LOW_STOCK":
            return "LOW_STOCK";

        default:
            return "IN_STOCK";

    }

};


// =====================================================
// Component
// =====================================================

const AdminInventoryListPage = () => {

    const navigate = useNavigate();


    // =================================================
    // State
    // =================================================

    const [
        inventory,
        setInventory
    ] = useState([]);

    const [
        summary,
        setSummary
    ] = useState({
        totalProducts: 0,
        totalUnits: 0,
        inStock: 0,
        lowStock: 0,
        outOfStock: 0
    });

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        search,
        setSearch
    ] = useState("");

    const [
        category,
        setCategory
    ] = useState("all");

    const [
        stockStatus,
        setStockStatus
    ] = useState("all");

    const [
        matchingCount,
        setMatchingCount
    ] = useState(0);


    // =================================================
    // Fetch Inventory
    // =================================================

    const fetchInventory = async () => {

        try {

            setLoading(true);

            const response =
                await getInventory();

            setInventory(
                response?.data || []
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch inventory"
            );

        }
        finally {

            setLoading(false);

        }

    };


    // =================================================
    // Fetch Summary
    // =================================================

    const fetchSummary = async () => {

        try {

            const response =
                await getInventorySummary();

            setSummary(
                response?.data || {}
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch inventory summary"
            );

        }

    };


    // =================================================
    // Initial Load
    // =================================================

    useEffect(() => {

        fetchInventory();
        fetchSummary();

    }, []);


    // =================================================
    // Category Options
    // =================================================

    const categoryOptions =
        useMemo(
            () => {

                const categories = [
                    ...new Set(
                        inventory
                            .map(
                                item =>
                                    item.category?.name
                            )
                            .filter(Boolean)
                    )
                ];

                return categories.map(
                    name => ({
                        value: name,
                        label: name
                    })
                );

            },
            [inventory]
        );


    // =================================================
    // Structural Filters
    // =================================================

    const filteredInventory =
        useMemo(
            () => {

                return inventory.filter(
                    item => {

                        const matchesCategory =
                            category === "all" ||
                            item.category?.name === category;

                        const matchesStock =
                            stockStatus === "all" ||
                            item.status === stockStatus;

                        return (
                            matchesCategory &&
                            matchesStock
                        );

                    }
                );

            },
            [
                inventory,
                category,
                stockStatus
            ]
        );


    // =================================================
    // Active Filters
    // =================================================

    const hasActiveFilters =
        Boolean(search) ||
        category !== "all" ||
        stockStatus !== "all";


    // =================================================
    // Columns
    // =================================================

    const columns = [

        // ---------------------------------------------
        // Product
        // ---------------------------------------------

        {
            id: "product",

            key: "name",

            label: "Product",

            minWidth: 280,

            searchValue: item =>
                `${item.name || ""} ${
                    item.brand || ""
                } ${
                    item.sku || ""
                }`,

            render: item => {

                const image =
                    item.images?.[0]?.url;

                return (
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            min-w-0
                        "
                    >

                        <div
                            className="
                                h-10
                                w-10
                                shrink-0
                                overflow-hidden
                                rounded
                                border
                                border-[var(--border)]
                                bg-[var(--background)]
                            "
                        >

                            {image ? (

                                <img
                                    src={image}
                                    alt={item.name}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />

                            ) : (

                                <div
                                    className="
                                        flex
                                        h-full
                                        w-full
                                        items-center
                                        justify-center
                                        text-xs
                                        font-bold
                                        uppercase
                                        text-[var(--primary)]
                                        bg-[var(--primary-soft)]
                                    "
                                >
                                    {item.name?.slice(
                                        0,
                                        2
                                    )}
                                </div>

                            )}

                        </div>


                        <div
                            className="
                                min-w-0
                            "
                        >

                            <p
                                className="
                                    truncate
                                    font-semibold
                                    text-[var(--text)]
                                "
                            >
                                {item.name}
                            </p>

                            <p
                                className="
                                    truncate
                                    text-xs
                                    text-[var(--text-muted)]
                                "
                            >
                                {item.hasVariants
                                    ? `${item.variants?.length || 0} variants`
                                    : `SKU: ${item.sku || "—"}`
                                }
                            </p>

                        </div>

                    </div>
                );

            }

        },


        // ---------------------------------------------
        // Category
        // ---------------------------------------------

        {
            id: "category",

            key: "category",

            label: "Category",

            hideBelow: "md",

            render: item => (

                <span
                    className="
                        text-sm
                        text-[var(--text-light)]
                    "
                >
                    {item.category?.name || "—"}
                </span>

            )

        },


        // ---------------------------------------------
        // SKU
        // ---------------------------------------------

        {
            id: "sku",

            key: "sku",

            label: "SKU",

            hideBelow: "lg",

            render: item => (

                item.hasVariants ? (

                    <span
                        className="
                            text-xs
                            text-[var(--text-muted)]
                        "
                    >
                        Multiple
                    </span>

                ) : (

                    <span
                        className="
                            font-mono
                            text-xs
                            text-[var(--text-light)]
                        "
                    >
                        {item.sku || "—"}
                    </span>

                )

            )

        },


        // ---------------------------------------------
        // Stock
        // ---------------------------------------------

        {
            id: "stock",

            key: "totalStock",

            label: "Stock",

            align: "right",

            render: item => (

                <div
                    className="
                        text-right
                    "
                >

                    <p
                        className={getStockClass(
                            item.totalStock
                        )}
                    >
                        {item.totalStock}
                    </p>

                    {item.hasVariants && (

                        <p
                            className="
                                text-[11px]
                                text-[var(--text-muted)]
                            "
                        >
                            total
                        </p>

                    )}

                </div>

            )

        },


        // ---------------------------------------------
        // Status
        // ---------------------------------------------

        {
            id: "status",

            key: "status",

            label: "Stock Status",

            render: item => (

                <StatusBadge
                    status={getStockLabel(
                        item.status
                    )}
                />

            )

        },


        // ---------------------------------------------
        // Product Status
        // ---------------------------------------------

        {
            id: "productStatus",

            key: "productStatus",

            label: "Product",

            hideBelow: "xl",

            render: item => (

                <StatusBadge
                    status={item.productStatus}
                />

            )

        }

    ];


    // =================================================
    // Render
    // =================================================

    return (

        <section
            className="
                space-y-3
                px-1
                sm:px-2
            "
        >

            {/* =========================================
                HEADER
            ========================================= */}

            <PageHeader
                eyebrow="ADMIN"
                title="Inventory"
                subtitle="Manage product stock and availability."
            />


            {/* =========================================
                STATS
            ========================================= */}

            <div
                className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:grid-cols-4
                "
            >

                <StatCard
                    label="Total Units"
                    value={
                        summary.totalUnits
                    }
                    accent="blue"
                />

                <StatCard
                    label="In Stock"
                    value={
                        summary.inStock
                    }
                    accent="green"
                />

                <StatCard
                    label="Low Stock"
                    value={
                        summary.lowStock
                    }
                    accent="amber"
                />

                <StatCard
                    label="Out of Stock"
                    value={
                        summary.outOfStock
                    }
                    accent="red"
                />

            </div>


            {/* =========================================
                INVENTORY TABLE
            ========================================= */}

            <div
                className="
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                "
            >

                <FilterBar

                    search={{
                        value: search,

                        onChange: setSearch,

                        placeholder:
                            "Search products or SKU..."
                    }}

                    filters={[

                        {
                            key: "category",

                            value: category,

                            onChange: setCategory,

                            placeholder:
                                "All Categories",

                            options:
                                categoryOptions
                        },

                        {
                            key: "stockStatus",

                            value: stockStatus,

                            onChange:
                                setStockStatus,

                            placeholder:
                                "All Stock",

                            options: [

                                {
                                    value:
                                        "IN_STOCK",

                                    label:
                                        "In Stock"
                                },

                                {
                                    value:
                                        "LOW_STOCK",

                                    label:
                                        "Low Stock"
                                },

                                {
                                    value:
                                        "OUT_OF_STOCK",

                                    label:
                                        "Out of Stock"
                                }

                            ]
                        }

                    ]}

                    showClear={
                        hasActiveFilters
                    }

                    onClear={() => {

                        setSearch("");

                        setCategory("all");

                        setStockStatus("all");

                    }}

                    className="p-3"

                />


                <Table

                    columns={columns}

                    data={
                        filteredInventory
                    }

                    loading={loading}

                    serialNumber

                    rowKey="_id"

                    pageSize={10}

                    persistKey="inventory"

                    dense

                    searchable

                    searchValue={search}

                    onFilteredCountChange={
                        setMatchingCount
                    }

                    toolbar={{

                        title:
                            "Inventory",

                        description:
                            count =>
                                `${count} ${
                                    count === 1
                                        ? "product"
                                        : "products"
                                }`

                    }}

                    emptyTitle={
                        "No Inventory Found"
                    }

                    emptyDescription={
                        "No products match the selected filters."
                    }

                    renderActions={
                        item => (

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/admin/inventory/${item._id}`
                                    )
                                }
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    border
                                    border-[var(--border)]
                                    bg-[var(--surface)]
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    text-[var(--text)]
                                    transition
                                    hover:border-[var(--primary)]
                                    hover:text-[var(--primary)]
                                "
                            >
                                Manage
                            </button>

                        )
                    }

                />

            </div>

        </section>

    );

};


export default AdminInventoryListPage;