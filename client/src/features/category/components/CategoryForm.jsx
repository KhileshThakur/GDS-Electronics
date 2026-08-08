import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { createCategory, updateCategory } from "../services/category.service";
import {
    FormCard,
    FormSection,
    FormActions
} from "../../../components/admin/form";

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
        >
            <FormCard
                title={
                    selectedCategory
                        ? "Update Category"
                        : "Add Category"
                }
            >
                <FormSection>
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
                </FormSection>
            </FormCard>

            <FormActions
                loading={loading}
                submitText={
                    selectedCategory
                        ? "Update Category"
                        : "Add Category"
                }

                onCancel={() => {
                    clearSelection();
                    setFormData({
                        name: "",
                        description: "",
                        sortOrder: 0
                    });
                }}
            />
        </form>
    );
};

export default CategoryForm;