import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiBell,
  FiUser,
  FiLogOut,
  FiSettings,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { PiUserDuotone } from "react-icons/pi";

const Header = ({ title, onMenuClick }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "New user registered",
      message: "John Doe just created an account",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "New order placed",
      message: "Order #1234 has been placed",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Subscription cancelled",
      message: "Jane Smith cancelled her subscription",
      time: "3 hours ago",
      read: true,
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-zinc-800 border-b border-zinc-700 py-3.5 px-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="mr-4 text-gray-400 hover:text-white md:hidden"
          >
            <FiMenu className="w-6 h-6" />
          </button>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-4 py-1.5 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-primary w-52 lg:w-[30rem]"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-6 pr-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-gray-400 hover:text-white rounded-full hover:bg-zinc-700/50"
            >
              <FiBell className="w-5 h-5" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10"
                >
                  <div className="p-3 border-b border-zinc-700 flex justify-between items-center">
                    <h3 className="font-medium text-white">Notifications</h3>
                    <button className="text-xs text-primary hover:text-red-400">
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-zinc-700 hover:bg-zinc-700/30 cursor-pointer ${
                            !notification.read ? "bg-zinc-700/10" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-white text-sm">
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block"></span>
                              )}
                            </h4>
                            <span className="text-xs text-gray-400">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">
                            {notification.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400">
                        No notifications
                      </div>
                    )}
                  </div>

                  <div className="p-2 border-t border-zinc-700 text-center">
                    <button className="text-sm text-primary hover:text-red-400">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                <PiUserDuotone className="w-4 h-4" />
              </div>
              <span className="hidden md:block text-sm font-medium text-white">
                {currentUser?.name || "Admin User"}
              </span>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10"
                >
                  <div className="p-3 border-b border-zinc-700">
                    <p className="font-medium text-white">
                      {currentUser?.name || "Admin User"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {currentUser?.email || "admin@example.com"}
                    </p>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/admin/settings/profile");
                      }}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700/50 rounded-lg"
                    >
                      <FiSettings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-700/50 rounded-lg"
                    >
                      <FiLogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
