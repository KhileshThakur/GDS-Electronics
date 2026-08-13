import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    toast
} from "react-hot-toast";

import CategoryForm from "../components/CategoryForm";

import {
    getCategories
} from "../services/category.service";


const CategoryFormPage = () => {

    const {
        id
    } = useParams();

    const navigate =
        useNavigate();


    const [category, setCategory] =
        useState(null);

    const [loading, setLoading] =
        useState(Boolean(id));


    /* =================================
       Fetch Category
    ================================= */

    useEffect(() => {

        if (!id) {

            setCategory(null);
            setLoading(false);

            return;

        }


        const fetchCategory = async () => {

            try {

                setLoading(true);


                const response =
                    await getCategories();


                const categories =
                    response?.data || [];


                const foundCategory =
                    categories.find(
                        category =>
                            category._id === id
                    );


                if (!foundCategory) {

                    toast.error(
                        "Category not found"
                    );

                    navigate(
                        "/admin/categories"
                    );

                    return;

                }


                setCategory(
                    foundCategory
                );

            }
            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch category"
                );

                navigate(
                    "/admin/categories"
                );

            }
            finally {

                setLoading(false);

            }

        };


        fetchCategory();

    }, [id, navigate]);


    /* =================================
       Loading
    ================================= */

    if (loading) {

        return (

            <div
                className="
                    flex
                    min-h-[260px]
                    items-center
                    justify-center
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        text-sm
                        font-medium
                        text-[var(--text-light)]
                    "
                >

                    <span
                        className="
                            h-5
                            w-5
                            animate-spin
                            rounded-full
                            border-2
                            border-[var(--border)]
                            border-t-[var(--primary)]
                        "
                    />

                    Loading category...

                </div>

            </div>

        );

    }


    return (

        <div
            className="
                w-full
            "
        >

            <CategoryForm

                selectedCategory={
                    category
                }

                onSuccess={() => {

                    navigate(
                        "/admin/categories"
                    );

                }}

                clearSelection={() => {

                    navigate(
                        "/admin/categories"
                    );

                }}

            />

        </div>

    );

};


export default CategoryFormPage;