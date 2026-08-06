import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { createCategory, updateCategory } from "../services/category.service";


const CategoryForm = ({ onSuccess, selectedCategory, clearSelection }) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        sortOrder: 0
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            setLoading(true);
            let response;

            if (selectedCategory) {
                response = await updateCategory(
                    selectedCategory._id,
                    formData
                );
            }
            else {
                response = await createCategory(formData);
            }
            toast.success(response.message);
            clearSelection();
            onSuccess();
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

    useEffect(() => {
        if (selectedCategory) {
            setFormData({
                name: selectedCategory.name,
                description: selectedCategory.description,
                sortOrder: selectedCategory.sortOrder
            });
        }
        else {
            setFormData({
                name: "",
                description: "",
                sortOrder: 0
            });
        }
    }, [selectedCategory])

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />

            <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />

            <Input
                label="Sort Order"
                name="sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={handleChange}
            />

            <Button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Saving..."
                    : selectedCategory
                        ? "Update Category"
                        : "Add Category"}
            </Button>
        </form>
    );
};

export default CategoryForm;