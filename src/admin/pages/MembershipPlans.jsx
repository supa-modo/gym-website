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
import planAPI from "../utils/planAPI";
import formatDate from "../utils/dateFormatter";
import { PiClockCountdownDuotone, PiMoneyWavyDuotone, PiUsersDuotone } from "react-icons/pi";
import { TbEdit } from "react-icons/tb";

const MembershipPlans = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState(null);
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
        const response = await planAPI.getAll();
        setPlans(response);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Failed to fetch membership plans. Please try again.");
      } finally {
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
      await planAPI.delete(planToDelete.id);
      setPlans((prev) => prev.filter((plan) => plan.id !== planToDelete.id));
      setIsDeleteModalOpen(false);
      setPlanToDelete(null);
    } catch (err) {
      console.error("Error deleting plan:", err);
      setError("Failed to delete plan. Please try again.");
    } finally {
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
            className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 text-sm font-semibold transition-colors shadow-lg shadow-primary/20"
          >
            <FiPlus className="w-4 h-4" />
            <span >Add New Plan</span>
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
                    <PiClockCountdownDuotone className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-300">
                      Duration: {formatDuration(plan.duration)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <PiUsersDuotone className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-300">
                      Active Subscribers: {plan.activeSubscriptions}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <PiMoneyWavyDuotone className="w-5 h-5 text-gray-400 mr-2" />
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

                <div className="flex space-x-5">
                  <button
                    onClick={() => navigate(`/admin/plans/${plan.id}`)}
                    className="text-yellow-500 hover:text-yellow-400 transition-colors flex items-center space-x-1"
                    title="Edit Plan"
                  >
                    <TbEdit className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      setPlanToDelete(plan);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-400 transition-colors flex items-center space-x-1"
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
                    <span
                      className={` text-sm ${
                        plan.activeSubscriptions > 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Delete
                    </span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 max-w-lg w-full"
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
                className="px-6 py-2 bg-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlan}
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
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
