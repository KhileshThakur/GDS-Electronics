import { Link } from "react-router-dom";

const DashboardPage = () => {

    return (
        <div>

            <h1>Welcome Admin</h1>

            <Link to="/admin/categories">
                Categories
            </Link>

        </div>
    );
};

export default DashboardPage;