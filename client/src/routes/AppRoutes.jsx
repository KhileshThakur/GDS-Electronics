import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import AdminRoute from "./AdminRoute";

import ProfilePage from "../features/profile/pages/ProfilePage";
import CustomerLayout from "../layouts/CustomerLayout";
import HomePage from "../features/home/pages/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/Register";
import NotFoundPage from "../features/not-found/pages/NotFoundPage";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../features/admin/dashboard/pages/DashboardPage";
import AdminCategoryPage from "../features/category/pages/AdminCategoryPage";
import ProductListPage from "../features/product/pages/ProductListPage";
import ProductFormPage from "../features/product/pages/ProductFormPage";
import ShopProductListPage from "../features/product/pages/ShopProductListPage";
import ProductDetailsPage from "../features/product/pages/ProductDetailsPage";
import CartPage from "../features/cart/pages/CartPage";
import WishlistPage from "../features/wishlist/pages/WishlistPage";
import AddressPage from "../features/address/pages/AddressPage";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import OrderListPage from "../features/order/pages/OrderListPage";
import OrderDetailsPage from "../features/order/pages/OrderDetailsPage";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

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


                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;