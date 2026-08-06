import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { getCategories } from "../services/category.service";

const CategoryTable = ({ refresh, onEdit, onDelete }) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchCategories = async () => {

        try {
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <table border="1" cellPadding="10">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Status</th>
                    <th>Sort Order</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {categories.map((category) => (
                    <tr key={category._id}>
                        <td>{category.name}</td>
                        <td>{category.slug}</td>
                        <td>{category.status}</td>
                        <td>{category.sortOrder}</td>
                        <td>
                            <button
                                onClick={() => onEdit(category)}
                            >
                                Edit
                            </button>
                            {" "}
                            <button
                                onClick={() => onDelete(category)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CategoryTable;