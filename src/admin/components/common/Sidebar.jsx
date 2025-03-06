import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUsers,
  FiCreditCard,
  FiShoppingBag,
  FiShoppingCart,
  FiBarChart2,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Dashboard",
    icon: <FiHome className="w-5 h-5" />,
    path: "/admin/dashboard",
  },
  {
    title: "User Management",
    icon: <FiUsers className="w-5 h-5" />,
    path: "/admin/users",
    submenu: [
      { title: "All Users", path: "/admin/users" },
      { title: "Add New User", path: "/admin/users/new" },
    ],
  },
  {
    title: "Membership Plans",
    icon: <FiCreditCard className="w-5 h-5" />,
    path: "/admin/plans",
    submenu: [
      { title: "All Plans", path: "/admin/plans" },
      { title: "Add New Plan", path: "/admin/plans/new" },
    ],
  },
  {
    title: "Subscriptions",
    icon: <FiBarChart2 className="w-5 h-5" />,
    path: "/admin/subscriptions",
  },
  {
    title: "Products",
    icon: <FiShoppingBag className="w-5 h-5" />,
    path: "/admin/products",
    submenu: [
      { title: "All Products", path: "/admin/products" },
      { title: "Add New Product", path: "/admin/products/new" },
      { title: "Categories", path: "/admin/products/categories" },
    ],
  },
  {
    title: "Orders",
    icon: <FiShoppingCart className="w-5 h-5" />,
    path: "/admin/orders",
  },
  {
    title: "Settings",
    icon: <FiSettings className="w-5 h-5" />,
    path: "/admin/settings",
  },
];

const Sidebar = ({ isMobile, onClose }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (title) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Check if a menu item should be expanded based on current path
  const shouldExpandMenu = (item) => {
    if (!item.submenu) return false;

    return item.submenu.some(
      (subItem) =>
        location.pathname === subItem.path || expandedMenus[item.title]
    );
  };

  return (
    <motion.div
      className={`bg-zinc-800 h-full flex flex-col ${
        isMobile ? "fixed inset-0 z-50" : "relative"
      }`}
      initial={isMobile ? { x: "-100%" } : false}
      animate={isMobile ? { x: 0 } : false}
      transition={{ duration: 0.3 }}
    >
      {isMobile && (
        <div className="flex justify-between items-center p-4 border-b border-zinc-700">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FiX className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className={`p-4 ${!isMobile ? "border-b border-zinc-700" : ""}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold">EF</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Elite Fitness</h2>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div className="mb-1">
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      shouldExpandMenu(item)
                        ? "bg-zinc-700 text-white"
                        : "text-gray-400 hover:text-white hover:bg-zinc-700/50"
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    {shouldExpandMenu(item) ? (
                      <FiChevronDown className="w-4 h-4" />
                    ) : (
                      <FiChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {shouldExpandMenu(item) && (
                    <ul className="mt-1 ml-4 pl-4 border-l border-zinc-700 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.title}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-gray-400 hover:text-white hover:bg-zinc-700/50"
                              }`
                            }
                            onClick={isMobile ? onClose : undefined}
                          >
                            {subItem.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-400 hover:text-white hover:bg-zinc-700/50"
                    }`
                  }
                  onClick={isMobile ? onClose : undefined}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-zinc-700">
        <div className="bg-zinc-700/30 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-2">Logged in as</p>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
