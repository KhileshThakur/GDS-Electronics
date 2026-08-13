import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { getProducts, deleteProduct } from "./product.service";

import { PageHeader, StatusBadge, FilterBar, StatCard } from "../../../components/html";
import ActionButtons from "../../../components/html/ActionButtons";
import Table from "../../../components/ui/Table";

const formatINR = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const ProductListPage = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [category, setCategory] = useState("all");
    const [stock, setStock] = useState("all");
    const [matchingCount, setMatchingCount] = useState(0);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts();
            setProducts(response?.data || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const stats = useMemo(() => {
        const total = products.length;
        const active = products.filter((p) => p.status?.toLowerCase() === "active").length;
        const low = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
        const out = products.filter((p) => (p.stock ?? 0) <= 0).length;
        return { total, active, low, out };
    }, [products]);

    const categoryOptions = useMemo(
        () =>
            [...new Set(products.map((p) => p.category?.name).filter(Boolean))].map((name) => ({
                value: name,
                label: name
            })),
        [products]
    );

    // Structural filters only (dropdown-driven, not free text) — the text search
    // itself now runs inside Table, scoped to whichever columns are visible.
    const structFilteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesStatus = status === "all" || product.status?.toLowerCase() === status;
            const matchesCategory = category === "all" || product.category?.name === category;

            const matchesStock =
                stock === "all" ||
                (stock === "out" && product.stock <= 0) ||
                (stock === "low" && product.stock > 0 && product.stock <= 10) ||
                (stock === "healthy" && product.stock > 10);

            return matchesStatus && matchesCategory && matchesStock;
        });
    }, [products, status, category, stock]);

    const handleDelete = async (product) => {
        if (!window.confirm(`Delete "${product.name}"?`)) return;

        try {
            const response = await deleteProduct(product._id);
            toast.success(response?.message || "Product deleted");
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    const hasActiveFilters = search || status !== "all" || category !== "all" || stock !== "all";

    const columns = [
        {
            id: "product",
            key: "name",
            label: "Product",
            minWidth: 260,
            searchValue: (p) => `${p.name} ${p.brand} ${p.sku}`,
            render: (p) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--background)]">
                        {p.images?.[0]?.url ? (
                            <img src={p.images[0].url} alt={p.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] font-bold uppercase text-[var(--muted)]">
                                {p.name?.slice(0, 2)}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-semibold text-[var(--text)]">{p.name}</p>
                        <p className="truncate text-xs text-[var(--muted)]">
                            {p.brand}
                            {p.sku ? ` · ${p.sku}` : ""}
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: "category",
            key: "category.name",
            label: "Category",
            hideBelow: "md",
            searchValue: (p) => p.category?.name
        },
        {
            id: "price",
            key: "price",
            label: "Price",
            align: "right",
            render: (p) =>
                p.discountPrice > 0 ? (
                    <div className="leading-tight">
                        <p className="font-semibold text-[var(--text)]">{formatINR(p.discountPrice)}</p>
                        <p className="text-[11px] text-[var(--muted)] line-through">{formatINR(p.price)}</p>
                    </div>
                ) : (
                    formatINR(p.price)
                )
        },
        {
            id: "stock",
            key: "stock",
            label: "Stock",
            align: "right",
            render: (p) => {
                const value = p.stock ?? 0;
                return (
                    <span
                        className={
                            value <= 0
                                ? "font-semibold text-red-600"
                                : value <= 10
                                    ? "font-semibold text-amber-600"
                                    : "font-medium"
                        }
                    >
                        {value}
                    </span>
                );
            }
        },
        {
            id: "status",
            key: "status",
            label: "Status",
            render: (p) => <StatusBadge status={p.status} />
        },
        {
            id: "featured",
            key: "isFeatured",
            label: "Featured",
            align: "center",
            hideBelow: "lg",
            render: (p) => (
                <span className={p.isFeatured ? "font-semibold text-[var(--primary)]" : "text-[var(--muted)]"}>
                    {p.isFeatured ? "Yes" : "No"}
                </span>
            )
        }
    ];

    return (
        <section className="space-y-3 px-1 sm:px-2">
            <PageHeader
                eyebrow="ADMIN"
                title="Products"
                subtitle="Manage your product catalog."
                buttonText="Add Product"
                buttonLink="/admin/products/new"
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard label="Total Products" value={stats.total} accent="blue" />
                <StatCard label="Active" value={stats.active} accent="green" />
                <StatCard label="Low Stock" value={stats.low} accent="amber" />
                <StatCard label="Out of Stock" value={stats.out} accent="red" />
            </div>

            <div className="border border-[var(--border)] bg-[var(--surface)]">
                <FilterBar
                    search={{
                        value: search,
                        onChange: setSearch,
                        placeholder: "Search visible columns..."
                    }}
                    filters={[
                        {
                            key: "category",
                            value: category,
                            onChange: setCategory,
                            placeholder: "All Categories",
                            options: categoryOptions
                        },
                        {
                            key: "status",
                            value: status,
                            onChange: setStatus,
                            placeholder: "All Status",
                            options: [
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                                { value: "draft", label: "Draft" },
                                { value: "blocked", label: "Blocked" }
                            ]
                        },
                        {
                            key: "stock",
                            value: stock,
                            onChange: setStock,
                            placeholder: "All Stock",
                            options: [
                                { value: "healthy", label: "Healthy" },
                                { value: "low", label: "Low Stock" },
                                { value: "out", label: "Out of Stock" }
                            ]
                        }
                    ]}
                    showClear={hasActiveFilters}
                    onClear={() => {
                        setSearch("");
                        setStatus("all");
                        setCategory("all");
                        setStock("all");
                    }}
                    className="p-3"
                />

                <Table
                    columns={columns}
                    data={structFilteredProducts}
                    loading={loading}
                    serialNumber
                    rowKey="_id"
                    pageSize={10}
                    persistKey="products"
                    dense
                    searchable
                    searchValue={search}
                    onFilteredCountChange={setMatchingCount}
                    toolbar={{
                        title: "Product Catalog",
                        description: (count) => `${count} matching products`
                    }}
                    emptyTitle="No Products Found"
                    emptyDescription="Add your first product to get started."
                    renderActions={(product) => (
                        <ActionButtons
                            onEdit={() => navigate(`/admin/products/${product._id}/edit`)}
                            onDelete={() => handleDelete(product)}
                        />
                    )}
                />
            </div>
        </section>
    );
};

export default ProductListPage;