import {
    useEffect,
    useState
} from "react";

import {
    toast
} from "react-hot-toast";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";

import {
    createCategory,
    updateCategory
} from "../services/category.service";


const EMPTY_FORM = {
    name: "",
    slug: "",
    description: "",
    sortOrder: 0,
    status: "active",
    image: {
        url: "",
        publicId: ""
    }
};


const CategoryForm = ({
    selectedCategory,
    onSuccess,
    clearSelection
}) => {

    const [formData, setFormData] =
        useState(EMPTY_FORM);

    const [loading, setLoading] =
        useState(false);


    const isEdit =
        Boolean(selectedCategory);


    /* =================================
       Populate Form
    ================================= */

    useEffect(() => {

        if (!selectedCategory) {

            setFormData({
                ...EMPTY_FORM,
                image: {
                    url: "",
                    publicId: ""
                }
            });

            return;
        }


        setFormData({

            name:
                selectedCategory.name || "",

            slug:
                selectedCategory.slug || "",

            description:
                selectedCategory.description || "",

            sortOrder:
                selectedCategory.sortOrder ?? 0,

            status:
                selectedCategory.status || "active",

            image: {
                url:
                    selectedCategory.image?.url || "",

                publicId:
                    selectedCategory.image?.publicId || ""
            }

        });

    }, [selectedCategory]);


    /* =================================
       Change Handler
    ================================= */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };


    const handleImageChange = (e) => {

        const {
            value
        } = e.target;


        setFormData(prev => ({

            ...prev,

            image: {

                ...prev.image,

                url: value

            }

        }));

    };


    /* =================================
       Submit
    ================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!formData.name.trim()) {

            toast.error(
                "Category name is required"
            );

            return;
        }


        if (!formData.slug.trim()) {

            toast.error(
                "Category slug is required"
            );

            return;
        }


        try {

            setLoading(true);


            const payload = {

                name:
                    formData.name.trim(),

                slug:
                    formData.slug.trim(),

                description:
                    formData.description.trim(),

                sortOrder:
                    Number(formData.sortOrder) || 0,

                status:
                    formData.status,

                image: {

                    url:
                        formData.image?.url?.trim() || "",

                    publicId:
                        formData.image?.publicId || ""

                }

            };


            let response;


            if (isEdit) {

                response =
                    await updateCategory(
                        selectedCategory._id,
                        payload
                    );

            }
            else {

                response =
                    await createCategory(
                        payload
                    );

            }


            toast.success(

                response?.message ||

                (
                    isEdit
                        ? "Category updated successfully"
                        : "Category created successfully"
                )

            );


            onSuccess?.();

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


    /* =================================
       Cancel
    ================================= */

    const handleCancel = () => {

        setFormData({

            ...EMPTY_FORM,

            image: {
                url: "",
                publicId: ""
            }

        });

        clearSelection?.();

    };


    return (

        <form
            onSubmit={handleSubmit}
            className="w-full"
        >

            {/* =================================
                PAGE HEADER
            ================================= */}

            <div
                className="
                    mb-3
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <div
                        className="
                            mt-0.5
                            ml-3
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-[var(--primary)]
                        "
                    >
                        Categories
                    </div>


                    <h1
                        className="
                            mt-0.5
                            ml-3
                            text-2xl
                            font-semibold
                            leading-tight
                            text-[var(--text)]
                        "
                    >
                        {isEdit
                            ? "Edit Category"
                            : "Add Category"}
                    </h1>

                </div>


                <div
                    className="
                        flex
                        items-center
                        gap-4
                    "
                >
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="
                            !h-10
                            !w-32
                        "
                    >

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </Select>

                </div>

            </div>


            {/* =================================
                MAIN CARD
            ================================= */}

            <div
                className="
                    overflow-hidden
                    rounded-[var(--radius-lg)]
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    shadow-[var(--shadow)]
                "
            >

                {/* =================================
                    CATEGORY INFORMATION
                ================================= */}

                <section>

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            border-b
                            border-[var(--border)]
                            bg-[var(--primary-soft)]
                            px-4
                            py-3
                        "
                    >

                        <span
                            className="
                                h-6
                                w-1
                                rounded-full
                                bg-[var(--primary)]
                            "
                        />

                        <div>

                            <h2
                                className="
                                    text-base
                                    font-semibold
                                    leading-tight
                                    text-[var(--text)]
                                "
                            >
                                Category Information
                            </h2>

                            <p
                                className="
                                    text-xs
                                    text-[var(--text-light)]
                                "
                            >
                                Identity and classification
                            </p>

                        </div>

                    </div>


                    <div
                        className="
                            px-4
                            py-4
                        "
                    >

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-4
                                md:grid-cols-[2fr_2fr_1fr_1fr]
                            "
                        >

                            <Input
                                label="Category Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Smartphones"
                                required
                            />


                            <Input
                                label="Slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="smartphones"
                                required
                            />


                            <Select
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >

                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                            </Select>


                            <Input
                                label="Sort Order"
                                name="sortOrder"
                                type="number"
                                min="0"
                                value={formData.sortOrder}
                                onChange={handleChange}
                                placeholder="0"
                            />

                        </div>


                        <div className="mt-4">

                            <Textarea
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe this category..."
                                className="
                                    !min-h-[85px]
                                "
                            />

                        </div>

                    </div>

                </section>


                {/* =================================
                    IMAGE
                ================================= */}

                <section
                    className="
                        border-t
                        border-[var(--border)]
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            border-b
                            border-[var(--border)]
                            bg-[var(--surface-hover)]
                            px-4
                            py-3
                        "
                    >

                        <span
                            className="
                                h-6
                                w-1
                                rounded-full
                                bg-purple-500
                            "
                        />

                        <div>

                            <h2
                                className="
                                    text-base
                                    font-semibold
                                    leading-tight
                                    text-[var(--text)]
                                "
                            >
                                Category Image
                            </h2>

                            <p
                                className="
                                    text-xs
                                    text-[var(--text-light)]
                                "
                            >
                                Optional category image
                            </p>

                        </div>

                    </div>


                    <div
                        className="
                            px-4
                            py-4
                        "
                    >

                        <Input
                            label="Image URL"
                            value={
                                formData.image?.url || ""
                            }
                            onChange={
                                handleImageChange
                            }
                            placeholder="https://example.com/category.jpg"
                        />


                        {formData.image?.url && (

                            <div
                                className="
                                    mt-3
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <img
                                    src={
                                        formData.image.url
                                    }
                                    alt="Category preview"
                                    className="
                                        h-14
                                        w-14
                                        rounded-md
                                        border
                                        border-[var(--border)]
                                        object-cover
                                    "
                                    onError={(e) => {

                                        e.currentTarget.style.display =
                                            "none";

                                    }}
                                />

                                <span
                                    className="
                                        text-xs
                                        text-[var(--text-light)]
                                    "
                                >
                                    Image preview
                                </span>

                            </div>

                        )}

                    </div>

                </section>


                {/* =================================
                    ACTIONS
                ================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-end
                        gap-3
                        border-t
                        border-[var(--border)]
                        bg-[var(--background)]
                        px-4
                        py-3
                    "
                >

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="
                            h-9
                            rounded-[var(--radius-sm)]
                            border
                            border-[var(--border)]
                            bg-[var(--surface)]
                            px-4
                            text-sm
                            font-medium
                            text-[var(--text-light)]
                            transition
                            hover:bg-[var(--surface-hover)]
                            hover:text-[var(--text)]
                        "
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            h-9
                            rounded-[var(--radius-sm)]
                            bg-[var(--primary)]
                            px-5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-[var(--primary-dark)]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        {loading
                            ? "Saving..."
                            : isEdit
                                ? "Save Changes"
                                : "Add Category"}

                    </button>

                </div>

            </div>

        </form>

    );

};


export default CategoryForm;