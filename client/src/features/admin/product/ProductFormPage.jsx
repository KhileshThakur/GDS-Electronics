import {
    useEffect,
    useState
} from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    toast
} from "react-hot-toast";

import ProductForm from "./components/ProductForm";

import {
    getProductById
} from "./product.service";


const ProductFormPage = () => {

    const {
        id
    } = useParams();

    const navigate =
        useNavigate();


    const [
        product,
        setProduct
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(Boolean(id));


    const fetchProduct = async () => {

        if (!id) {

            setProduct(null);
            setLoading(false);

            return;
        }


        try {

            setLoading(true);


            const response =
                await getProductById(id);


            setProduct(
                response.data
            );

        }
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch product"
            );


            navigate(
                "/admin/products"
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchProduct();

    }, [id]);


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div className="
                min-h-[240px]
                flex
                items-center
                justify-center
            ">

                <div className="
                    flex
                    items-center
                    gap-2.5
                    text-[13px]
                    font-medium
                    text-[var(--text-light)]
                ">

                    <span className="
                        w-4
                        h-4
                        rounded-full
                        border-2
                        border-[var(--border)]
                        border-t-[var(--primary)]
                        animate-spin"
                    />

                    Loading product...

                </div>

            </div>

        );

    }


    return (

        <ProductForm
            selectedProduct={
                product
            }

            onSuccess={() => {

                /*
                 * Keep the user on the form/list flow.
                 * Your existing parent can refresh the
                 * product list through onSuccess.
                 */

            }}

            clearSelection={() => {

                if (id) {

                    navigate(
                        "/admin/products"
                    );

                    return;
                }

                navigate(-1);

            }}

        />

    );

};


export default ProductFormPage;