import { useState } from "react";

import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import { deleteCategory } from "../services/category.service";
import { toast } from "react-hot-toast";

const AdminCategoryPage = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (category) => {
        setSelectedCategory(category);
    };
    const handleDelete = async (category) => {

        const confirmed = window.confirm(
            `Delete "${category.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await deleteCategory(category._id);
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
    const handleRefresh = () => {
        setRefresh(prev => !prev);
    };

    return (

        <div>
            <h1>Categories</h1>
            <CategoryForm
                selectedCategory={selectedCategory}
                onSuccess={handleRefresh}
                clearSelection={() => setSelectedCategory(null)}
            />
            <hr />
            <CategoryTable
                refresh={refresh}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default AdminCategoryPage;