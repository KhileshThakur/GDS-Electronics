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
    getCategories,
    deleteCategory
} from "../services/category.service";

import {
    PageHeader,
    StatusBadge,
    FilterBar,
    StatCard
} from "../../../components/html";

import ActionButtons from "../../../components/html/ActionButtons";

import Table from "../../../components/ui/Table";


const CategoryListPage = () => {

    const navigate = useNavigate();


    const [categories, setCategories] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("all");

    const [matchingCount, setMatchingCount] =
        useState(0);


    /* =================================
       Fetch Categories
    ================================= */

    const fetchCategories = async () => {

        try {

            setLoading(true);

            const response =
                await getCategories();

            setCategories(
                response?.data || []
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch categories"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchCategories();

    }, []);


    /* =================================
       Stats
    ================================= */

    const stats = useMemo(() => {

        const total =
            categories.length;

        const active =
            categories.filter(
                category =>
                    category.status?.toLowerCase() ===
                    "active"
            ).length;

        const inactive =
            categories.filter(
                category =>
                    category.status?.toLowerCase() !==
                    "active"
            ).length;


        return {
            total,
            active,
            inactive
        };

    }, [categories]);


    /* =================================
       Structural Filters
    ================================= */

    const filteredCategories =
        useMemo(() => {

            return categories.filter(
                category => {

                    return (
                        status === "all" ||
                        category.status?.toLowerCase() ===
                        status
                    );

                }
            );

        }, [categories, status]);


    /* =================================
       Delete
    ================================= */

    const handleDelete = async (
        category
    ) => {

        if (
            !window.confirm(
                `Delete "${category.name}"?`
            )
        ) {
            return;
        }


        try {

            const response =
                await deleteCategory(
                    category._id
                );

            toast.success(
                response?.message ||
                "Category deleted"
            );

            fetchCategories();

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );

        }

    };


    /* =================================
       Columns
    ================================= */

    const columns = [

        {
            id: "category",

            key: "name",

            label: "Category",

            minWidth: 240,

            searchValue: category =>
                `${category.name || ""} ${
                    category.slug || ""
                } ${
                    category.description || ""
                }`,

            render: category => (

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        h-9
                        w-9
                        shrink-0
                        overflow-hidden
                        rounded
                        border
                        border-[var(--border)]
                        bg-[var(--background)]
                    ">

                        {category.image?.url ? (

                            <img
                                src={category.image.url}
                                alt={category.name}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                "
                            />

                        ) : (

                            <div className="
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
                            ">

                                {category.name?.slice(
                                    0,
                                    2
                                )}

                            </div>

                        )}

                    </div>


                    <div className="
                        min-w-0
                    ">

                        <p className="
                            truncate
                            font-semibold
                            text-[var(--text)]
                        ">

                            {category.name}

                        </p>


                        <p className="
                            truncate
                            text-xs
                            text-[var(--text-muted)]
                        ">

                            {category.slug}

                        </p>

                    </div>

                </div>

            )
        },


        {
            id: "description",

            key: "description",

            label: "Description",

            hideBelow: "md",

            render: category => (

                <span className="
                    block
                    max-w-[360px]
                    truncate
                    text-sm
                    text-[var(--text-light)]
                ">

                    {category.description ||
                        "—"}

                </span>

            )
        },


        {
            id: "sortOrder",

            key: "sortOrder",

            label: "Order",

            align: "center",

            hideBelow: "md",

            render: category => (

                <span className="
                    font-medium
                    text-[var(--text)]
                ">

                    {category.sortOrder ?? 0}

                </span>

            )
        },


        {
            id: "status",

            key: "status",

            label: "Status",

            render: category => (

                <StatusBadge
                    status={category.status}
                />

            )
        }

    ];


    const hasActiveFilters =
        search ||
        status !== "all";


    return (

        <section className="
            space-y-3
            px-1
            sm:px-2
        ">


            {/* =================================
                HEADER
            ================================= */}

            <PageHeader
                eyebrow="ADMIN"
                title="Categories"
                subtitle="Manage your product categories."
                buttonText="Add Category"
                buttonLink="/admin/categories/new"
            />


            {/* =================================
                STATS
            ================================= */}

            <div className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
            ">

                <StatCard
                    label="Total Categories"
                    value={stats.total}
                    accent="blue"
                />

                <StatCard
                    label="Active"
                    value={stats.active}
                    accent="green"
                />

                <StatCard
                    label="Inactive"
                    value={stats.inactive}
                    accent="red"
                />

            </div>


            {/* =================================
                TABLE
            ================================= */}

            <div className="
                border
                border-[var(--border)]
                bg-[var(--surface)]
            ">


                <FilterBar

                    search={{
                        value: search,

                        onChange: setSearch,

                        placeholder:
                            "Search categories..."
                    }}

                    filters={[
                        {
                            key: "status",

                            value: status,

                            onChange: setStatus,

                            placeholder:
                                "All Status",

                            options: [
                                {
                                    value: "active",
                                    label: "Active"
                                },
                                {
                                    value: "inactive",
                                    label: "Inactive"
                                }
                            ]
                        }
                    ]}

                    showClear={
                        hasActiveFilters
                    }

                    onClear={() => {

                        setSearch("");

                        setStatus("all");

                    }}

                    className="p-3"

                />


                <Table

                    columns={columns}

                    data={filteredCategories}

                    loading={loading}

                    serialNumber

                    rowKey="_id"

                    pageSize={10}

                    persistKey="categories"

                    dense

                    searchable

                    searchValue={search}

                    onFilteredCountChange={
                        setMatchingCount
                    }

                    toolbar={{

                        title:
                            "Category Catalog",

                        description:
                            count =>
                                `${count} ${
                                    count === 1
                                        ? "category"
                                        : "categories"
                                }`

                    }}

                    emptyTitle="No Categories Found"

                    emptyDescription={
                        "Add your first category to get started."
                    }

                    renderActions={
                        category => (

                            <ActionButtons

                                onEdit={() =>
                                    navigate(
                                        `/admin/categories/${category._id}/edit`
                                    )
                                }

                                onDelete={() =>
                                    handleDelete(
                                        category
                                    )
                                }

                            />

                        )
                    }

                />

            </div>

        </section>

    );

};


export default CategoryListPage;