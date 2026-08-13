import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import CategoryForm from "../components/CategoryForm";
import {
    getCategories,
    deleteCategory
} from "../services/category.service";

import {
    PageHeader,
    DataTable,
    StatusBadge,
    ActionButtons
} from "../../../components/html";

const AdminCategoryPage = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const fetchCategories = async () => {

        try {
            setLoading(true);
            const response = await getCategories();
            setCategories(response.data);
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
    }, [refresh]);

    const handleRefresh = () => {
        setRefresh(prev => !prev);
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
    };

    const handleDelete = async (category) => {

        const confirmed = window.confirm(
            `Delete "${category.name}"?`
        );

        if (!confirmed) return;

        try {
            const response = await deleteCategory(
                category._id
            );
            toast.success(response.message);
            handleRefresh();
        }

        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    const columns = [
        {
            key: "name",
            label: "Name"
        },
        {
            key: "slug",
            label: "Slug"
        },
        {
            key: "status",
            label: "Status",
            render: (category) => (
                <StatusBadge
                    status={category.status}
                />
            )
        },

        {
            key: "sortOrder",
            label: "Sort Order"
        }
    ];

    return (
        <div className="space-y-8">

            <PageHeader
                title="Categories"
                subtitle="Manage product categories"
            />

            <CategoryForm
                selectedCategory={selectedCategory}
                onSuccess={handleRefresh}
                clearSelection={() =>
                    setSelectedCategory(null)
                }
            />

            <DataTable
                columns={columns}
                data={categories}
                loading={loading}
                emptyTitle="No Categories Found"

                renderActions={(category) => (
                    <ActionButtons
                        onEdit={() =>
                            handleEdit(category)
                        }
                        onDelete={() =>
                            handleDelete(category)
                        }
                    />
                )}
            />
        </div>
    );
};

export default AdminCategoryPage;