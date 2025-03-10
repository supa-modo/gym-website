import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCreditCard,
  FiShoppingBag,
  FiShoppingCart,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { MdAddCard, MdSpaceDashboard } from "react-icons/md";
import { PiUserCheckDuotone, PiUsersDuotone } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";
import { HiCreditCard } from "react-icons/hi";
import { IoBagAdd } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { TbOctahedron, TbOctahedronPlus } from "react-icons/tb";

const menuItems = [
  {
    category: "Dashboard",
    items: [
      {
        title: "Admin Dashboard",
        icon: <MdSpaceDashboard className="w-5 h-5" />,
        path: "/admin/dashboard",
      },
    ],
  },
  {
    category: "User Management",
    items: [
      {
        title: "All Users",
        icon: <PiUsersDuotone className="w-5 h-5" />,
        path: "/admin/users",
      },
      {
        title: "Add New User",
        icon: <PiUserCheckDuotone className="w-5 h-5" />,
        path: "/admin/users/new",
      },
    ],
  },
  {
    category: "Subscriptions",
    items: [
      {
        title: "All Subscriptions",
        icon: <HiCreditCard className="w-6 h-6" />,
        path: "/admin/subscriptions",
      },
      {
        title: "Add New Subscritption",
        icon: <MdAddCard className="w-6 h-6" />,
        path: "/admin/subscriptions/news/s",
      },
    ],
  },
  {
    category: "Membership Plans",
    items: [
      {
        title: "All Plans",
        icon: <TbOctahedron className="w-5 h-5" />,
        path: "/admin/plans",
      },
      {
        title: "Add New Plan",
        icon: <TbOctahedronPlus className="w-5 h-5" />,
        path: "/admin/plans/new",
      },
    ],
  },

  {
    category: "Store Products",
    items: [
      {
        title: "All Products",
        icon: <FiShoppingBag className="w-5 h-5" />,
        path: "/admin/products",
      },
      {
        title: "Add New Product",
        icon: <IoBagAdd className="w-5 h-5" />,
        path: "/admin/products/new",
      },
      {
        title: "Categories",
        icon: <BiSolidCategory className="w-5 h-5" />,
        path: "/admin/products/categories",
      },
    ],
  },
  {
    category: "Store Orders",
    items: [
      {
        title: "Orders",
        icon: <FiShoppingCart className="w-5 h-5" />,
        path: "/admin/orders",
      },
    ],
  },
  {
    category: "Settings",
    items: [
      {
        title: "Settings",
        icon: <FiSettings className="w-5 h-5" />,
        path: "/admin/settings",
      },
    ],
  },
];

const Sidebar = ({ isMobile, onClose }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  // Initialize with all categories expanded
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (category) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
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
          <h2 className="text-xl font-bold text-white">
            Admin Management Console
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FiX className="w-6 h-6" />
          </button>
        </div>
      )}

      <div
        className={`px-4 py-2 ${
          !isMobile ? "border-b border-zinc-900/40 bg-secondary/40" : ""
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className=" ">
            <img
              src="/images/logo-gym.png"
              alt="gym-logo"
              className="w-12 h-12"
            />
          </div>
          <div>
            <h2 className="text-lg font-extrabold font-nunito text-white">
              Elite Fitness
            </h2>
            <p className="text-xs text-gray-400">Admin Management Console</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-1">
        <ul className="space-y-1 px-3">
          {menuItems.map((category) => (
            <div key={category.category} className="mb-6">
              <div
                className="flex justify-between items-center text-gray-500 text-[0.65rem] font-sans uppercase mb-1 mt-6 px-4 cursor-pointer group"
                onClick={() => toggleCategory(category.category)}
              >
                <span>{category.category}</span>
                <button className="text-gray-500 hover:text-white">
                  {collapsedCategories[category.category] ? (
                    <FiChevronRight className="w-4 h-4" />
                  ) : (
                    <FiChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {!collapsedCategories[category.category] && (
                <div className="">
                  {category.items.map((item) => (
                    <li key={item.title}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold font-geist transition-colors ${
                            isActive
                              ? "bg-primary/30 text-amber-500"
                              : "text-gray-300 hover:text-white hover:bg-zinc-700/50"
                          }`
                        }
                        end
                        onClick={isMobile ? onClose : undefined}
                      >
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ul>
      </nav>

      <div className="p-2 border-t border-zinc-700">
        <div className="bg-zinc-700/30 rounded-lg p-3">
          <p className="text-[0.65rem] text-gray-400 mb-2">Logged in as</p>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">E.O</span>
            </div>
            <div>
              <p className="text-sm font-bold font-geist  text-white">
                {currentUser?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-400">
                {currentUser?.email || "admin@elitefitness.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
