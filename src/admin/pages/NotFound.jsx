import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/10 p-5 rounded-full">
            <FiAlertTriangle className="text-red-500 w-16 h-16" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link to="/admin/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 mx-auto transition-colors"
          >
            <FiHome className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
