import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import ProfilePage from "../features/profile/pages/ProfilePage";
import CustomerLayout from "../layouts/CustomerLayout";
import HomePage from "../features/home/pages/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/Register";
import NotFoundPage from "../features/not-found/pages/NotFoundPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminRoute from "./AdminRoute";
import DashboardPage from "../features/admin/dashboard/pages/DashboardPage";
import AdminCategoryPage from "../features/category/pages/AdminCategoryPage";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<CustomerLayout />}>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/profile"
                            element={<ProfilePage />}
                        />
                    </Route>
                </Route>

                <Route element={<GuestRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route
                            path="/login"
                            element={<LoginPage />}
                        />
                        <Route
                            path="/register"
                            element={<RegisterPage />}
                        />
                    </Route>
                </Route>

                <Route element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route
                            path="/admin"
                            element={<DashboardPage />}
                        />
                    </Route>
                    <Route
                        path="/admin/categories"
                        element={<AdminCategoryPage />}
                    />
                </Route>

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;