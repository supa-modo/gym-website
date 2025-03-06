import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../../hooks/useAuth";

const Layout = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");

  // Set page title based on current route
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/admin/dashboard")) {
      setPageTitle("Dashboard");
    } else if (path.includes("/admin/users")) {
      setPageTitle("User Management");
    } else if (path.includes("/admin/plans")) {
      setPageTitle("Membership Plans");
    } else if (path.includes("/admin/subscriptions")) {
      setPageTitle("Subscriptions");
    } else if (path.includes("/admin/products")) {
      setPageTitle("Products");
    } else if (path.includes("/admin/orders")) {
      setPageTitle("Orders");
    } else if (path.includes("/admin/settings")) {
      setPageTitle("Settings");
    }
  }, [location]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  // If still loading auth state, show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>
          <Sidebar isMobile onClose={() => setIsMobileSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title={pageTitle}
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 overflow-y-auto bg-zinc-900 p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>

        <footer className="bg-zinc-800 border-t border-zinc-700 py-4 px-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Elite Fitness Guru. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
