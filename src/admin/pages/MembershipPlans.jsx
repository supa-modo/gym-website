import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiAlertCircle,
  FiClock,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";
import { planAPI } from "../utils/api";

// Sample membership plans data
const samplePlans = [
  {
    id: 1,
    name: "Basic Monthly",
    price: 29.99,
    duration: 1,
    description:
      "Access to gym facilities and basic equipment. Perfect for beginners.",
    activeSubscriptions: 245,
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Premium Monthly",
    price: 49.99,
    duration: 1,
    description:
      "Full access to all gym facilities, classes, and premium equipment.",
    activeSubscriptions: 378,
    createdAt: "2023-01-15T11:45:00Z",
  },
  {
    id: 3,
    name: "Basic Quarterly",
    price: 79.99,
    duration: 3,
    description:
      "Access to gym facilities and basic equipment for 3 months. Save 10%.",
    activeSubscriptions: 156,
    createdAt: "2023-02-20T09:15:00Z",
  },
  {
    id: 4,
    name: "Premium Quarterly",
    price: 129.99,
    duration: 3,
    description:
      "Full access to all gym facilities, classes, and premium equipment for 3 months. Save 15%.",
    activeSubscriptions: 203,
    createdAt: "2023-02-20T10:30:00Z",
  },
  {
    id: 5,
    name: "Basic Annual",
    price: 299.99,
    duration: 12,
    description:
      "Access to gym facilities and basic equipment for a full year. Save 20%.",
    activeSubscriptions: 89,
    createdAt: "2023-03-10T14:20:00Z",
  },
  {
    id: 6,
    name: "Premium Annual",
    price: 499.99,
    duration: 12,
    description:
      "Full access to all gym facilities, classes, and premium equipment for a full year. Save 25%.",
    activeSubscriptions: 124,
    createdAt: "2023-03-10T15:45:00Z",
  },
];

const MembershipPlans = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState(samplePlans);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  // Fetch plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, you would fetch data from your API
        // const response = await planAPI.getAll();
        // setPlans(response.data);

        // Simulate API call
        setTimeout(() => {
          setPlans(samplePlans);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to fetch membership plans. Please try again.");
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Handle delete plan
  const handleDeletePlan = async () => {
    if (!planToDelete) return;

    try {
      setIsLoading(true);

      // In a real app, you would call your API
      // await planAPI.delete(planToDelete.id);

      // Simulate API call
      const updatedPlans = plans.filter((plan) => plan.id !== planToDelete.id);

      setTimeout(() => {
        setPlans(updatedPlans);
        setIsDeleteModalOpen(false);
        setPlanToDelete(null);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error deleting plan:", err);
      setError("Failed to delete plan. Please try again.");
      setIsLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Format duration
  const formatDuration = (months) => {
    if (months === 1) return "1 Month";
    if (months === 3) return "3 Months";
    if (months === 6) return "6 Months";
    if (months === 12) return "1 Year";
    return `${months} Months`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Membership Plans</h1>
        <Link to="/admin/plans/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors shadow-lg shadow-primary/20"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add New Plan</span>
          </motion.button>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <FiAlertCircle className="text-red-500 flex-shrink-0" />
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden animate-pulse"
            >
              <div className="h-32 bg-zinc-700"></div>
              <div className="p-5 space-y-3">
                <div className="h-5 bg-zinc-700 rounded w-2/3"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/3"></div>
                <div className="h-4 bg-zinc-700 rounded w-full"></div>
                <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
              </div>
            </div>
          ))
        ) : plans.length > 0 ? (
          plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-zinc-700 to-zinc-800 p-5">
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-gray-400 ml-1">
                    /{" "}
                    {plan.duration === 1 ? "month" : `${plan.duration} months`}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1">
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <FiClock className="text-gray-400 mr-2" />
                    <span className="text-gray-300">
                      Duration: {formatDuration(plan.duration)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <FiUsers className="text-gray-400 mr-2" />
                    <span className="text-gray-300">
                      Active Subscribers: {plan.activeSubscriptions}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <FiDollarSign className="text-gray-400 mr-2" />
                    <span className="text-gray-300">
                      Monthly Revenue:{" "}
                      {formatCurrency(plan.price * plan.activeSubscriptions)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-zinc-700 p-4 flex justify-between">
                <span className="text-xs text-gray-400">
                  Created: {formatDate(plan.createdAt)}
                </span>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/admin/plans/${plan.id}`)}
                    className="text-yellow-500 hover:text-yellow-400 transition-colors"
                    title="Edit Plan"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setPlanToDelete(plan);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-400 transition-colors"
                    title="Delete Plan"
                    disabled={plan.activeSubscriptions > 0}
                  >
                    <FiTrash2
                      className={`w-4 h-4 ${
                        plan.activeSubscriptions > 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full bg-zinc-800 rounded-xl border border-zinc-700 p-8 text-center">
            <p className="text-gray-400 mb-4">No membership plans found</p>
            <Link to="/admin/plans/new">
              <button className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Create Your First Plan
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete the{" "}
              <span className="text-white font-medium">
                {planToDelete?.name}
              </span>{" "}
              plan? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setPlanToDelete(null);
                }}
                className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlan}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MembershipPlans;
