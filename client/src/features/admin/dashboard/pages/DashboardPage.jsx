import { Link } from "react-router-dom";
import { getProducts } from "../../../product/services/product.service";

const DashboardPage = () => {

    return (
        <div>

            <h1>Welcome Admin</h1>

            <Link to="/admin/categories">
                Categories
            </Link>
            <Link to="/admin/products">
                Products
            </Link>

        </div>
    );
};

export default DashboardPage;