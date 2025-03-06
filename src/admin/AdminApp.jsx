import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layout
import Layout from "./components/common/Layout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserForm from "./pages/UserForm";
import MembershipPlans from "./pages/MembershipPlans";
import PlanForm from "./pages/PlanForm";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionDetails from "./pages/SubscriptionDetails";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import ProductCategories from "./pages/ProductCategories";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Settings from "./pages/Settings";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";

const AdminApp = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* User Management */}
            <Route path="users" element={<Users />} />
            <Route path="users/new" element={<UserForm />} />
            <Route path="users/:id" element={<UserForm />} />

            {/* Membership Plans */}
            <Route path="plans" element={<MembershipPlans />} />
            <Route path="plans/new" element={<PlanForm />} />
            <Route path="plans/:id" element={<PlanForm />} />

            {/* Subscriptions */}
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="subscriptions/:id" element={<SubscriptionDetails />} />

            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductForm />} />
            <Route path="products/categories" element={<ProductCategories />} />

            {/* Orders */}
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetails />} />

            {/* Settings */}
            <Route path="settings" element={<Settings />} />
            <Route path="settings/profile" element={<ProfileSettings />} />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Redirect from /admin to /admin/dashboard */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          {/* Catch all other admin routes */}
          <Route path="/admin/*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AdminApp;
