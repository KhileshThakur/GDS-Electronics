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
import CategoryListPage from "../features/category/pages/CategoryListPage";
import CategoryFormPage from "../features/category/pages/CategoryFormPage";
import ProductListPage from "../features/admin/product/ProductListPage";
import ProductFormPage from "../features/admin/product/ProductFormPage";
import AdminOrderListPage from "../features/order/pages/AdminOrderListPage";
import AdminOrderDetailPage from "../features/order/pages/AdminOrderDetailPage";
import AdminCustomerListPage from "../features/admin/customer/AdminCustomerListPage";
import AdminCustomerDetailPage from "../features/admin/customer/AdminCustomerDetailPage";
import AdminInventoryListPage from "../features/admin/inventory/AdminInventoryListPage";
import AdminInventoryManagePage from "../features/admin/inventory/AdminInventoryManagePage";
import AdminSettingsPage from "../features/admin/pages/AdminSettingsPage";

// Other
import NotFoundPage from "../features/not-found/pages/NotFoundPage";
import ScrollToTop from "../components/common/ScrollToTop";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
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
                            element={<CategoryListPage />}
                        />

                        <Route
                            path="/admin/categories/new"
                            element={<CategoryFormPage />}
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

                        <Route
                            path="/admin/orders"
                            element={<AdminOrderListPage />}
                        />

                        <Route
                            path="/admin/orders/:id"
                            element={<AdminOrderDetailPage />}
                        />

                        <Route
                            path="/admin/customers"
                            element={<AdminCustomerListPage />}
                        />

                        <Route
                            path="/admin/customers/:id"
                            element={<AdminCustomerDetailPage />}
                        />

                        <Route
                            path="/admin/inventory"
                            element={
                                <AdminInventoryListPage />
                            }
                        />

                        <Route
                            path="/admin/inventory/:id"
                            element={
                                <AdminInventoryManagePage />
                            }
                        />

                        <Route
                            path="/admin/settings"
                            element={
                                <AdminSettingsPage />
                            }
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