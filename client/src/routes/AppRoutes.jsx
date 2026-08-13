import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import AdminRoute from "./AdminRoute";

// Layouts
import CustomerLayout from "../layouts/CustomerLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// Customer
import HomePage from "../features/home/pages/HomePage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import ShopProductListPage from "../features/product/pages/ShopProductListPage";
import ProductDetailsPage from "../features/product/pages/ProductDetailsPage";
import CartPage from "../features/cart/pages/CartPage";
import WishlistPage from "../features/wishlist/pages/WishlistPage";
import AddressPage from "../features/address/pages/AddressPage";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import OrderListPage from "../features/order/pages/OrderListPage";
import OrderDetailsPage from "../features/order/pages/OrderDetailsPage";

// Authentication
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import VerifyRegistrationOtpPage from "../features/auth/pages/VerifyRegistrationOtpPage";
import ForgotPasswordPage from "../features/auth/pages/ForgotPasswordPage";
import VerifyForgotPasswordOtpPage from "../features/auth/pages/VerifyForgotPasswordOtpPage";
import ResetPasswordPage from "../features/auth/pages/ResetPasswordPage";

// Admin
import DashboardPage from "../features/admin/pages/DashboardPage";
import AdminCategoryPage from "../features/category/pages/AdminCategoryPage";
import ProductListPage from "../features/admin/product/ProductListPage";
import ProductFormPage from "../features/admin/product/ProductFormPage";

// Other
import NotFoundPage from "../features/not-found/pages/NotFoundPage";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* ================================
                    Customer
                ================================= */}

                <Route element={<CustomerLayout />}>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />

                    <Route
                        path="/products"
                        element={<ShopProductListPage />}
                    />

                    <Route
                        path="/products/:slug"
                        element={<ProductDetailsPage />}
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/cart"
                            element={<CartPage />}
                        />

                        <Route
                            path="/wishlist"
                            element={<WishlistPage />}
                        />

                        <Route
                            path="/addresses"
                            element={<AddressPage />}
                        />

                        <Route
                            path="/checkout"
                            element={<CheckoutPage />}
                        />

                        <Route
                            path="/profile"
                            element={<ProfilePage />}
                        />

                        <Route
                            path="/orders"
                            element={<OrderListPage />}
                        />

                        <Route
                            path="/orders/:id"
                            element={<OrderDetailsPage />}
                        />
                    </Route>
                </Route>

                {/* ================================
                    Authentication
                ================================= */}

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

                        <Route
                            path="/verify-email"
                            element={
                                <VerifyRegistrationOtpPage />
                            }
                        />
                    </Route>
                </Route>

                {/* ================================
                    Password Recovery
                ================================= */}

                <Route element={<AuthLayout />}>
                    <Route
                        path="/forgot-password"
                        element={<ForgotPasswordPage />}
                    />

                    <Route
                        path="/verify-forgot-password"
                        element={
                            <VerifyForgotPasswordOtpPage />
                        }
                    />

                    <Route
                        path="/reset-password"
                        element={<ResetPasswordPage />}
                    />
                </Route>

                {/* ================================
                    Admin
                ================================= */}

                <Route element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route
                            path="/admin"
                            element={<DashboardPage />}
                        />

                        <Route
                            path="/admin/categories"
                            element={<AdminCategoryPage />}
                        />

                        <Route
                            path="/admin/products"
                            element={<ProductListPage />}
                        />

                        <Route
                            path="/admin/products/new"
                            element={<ProductFormPage />}
                        />

                        <Route
                            path="/admin/products/:id/edit"
                            element={<ProductFormPage />}
                        />
                    </Route>
                </Route>

                {/* ================================
                    404
                ================================= */}

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;