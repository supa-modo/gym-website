import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import StoreSection from "./pages/Store";
import AuthProvider from "./admin/context/AuthContext";

// Admin Pages
import Layout from "./admin/components/common/Layout";
import Login from "./admin/pages/Login";
import Register from "./admin/pages/Register";
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import UserForm from "./admin/pages/UserForm";
import MembershipPlans from "./admin/pages/MembershipPlans";
import PlanForm from "./admin/pages/PlanForm";
import Subscriptions from "./admin/pages/Subscriptions";
import SubscriptionDetails from "./admin/pages/SubscriptionDetails";
import Products from "./admin/pages/Products";
import ProductForm from "./admin/pages/ProductForm";
import ProductCategories from "./admin/pages/ProductCategories";
import Orders from "./admin/pages/Orders";
import OrderDetails from "./admin/pages/OrderDetails";
import Settings from "./admin/pages/Settings";
import ProfileSettings from "./admin/pages/ProfileSettings";
import NotFound from "./admin/pages/NotFound";
import AddSubscription from "./admin/pages/AddSubscription";

// Public Layout component
const PublicLayout = () => (
  <div className="bg-secondary min-h-screen">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<StoreSection />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
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
            <Route path="subscriptions/new" element={<AddSubscription />} />

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

          {/* Public Routes */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
