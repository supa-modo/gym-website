import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSave,
  FiArrowLeft,
  FiAlertCircle,
  FiCheck,
  FiUser,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";
import subscriptionAPI from "../utils/subscriptionAPI";

const AddSubscription = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    planId: "",
    startDate: new Date().toISOString().split("T")[0],
    paymentMethod: "credit_card",
    status: "active",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userId) newErrors.userId = "User is required";
    if (!formData.planId) newErrors.planId = "Plan is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      const response = await subscriptionAPI.create(formData);
      setSuccess("Subscription created successfully!");
      setTimeout(() => {
        navigate("/admin/subscriptions");
      }, 1500);
    } catch (err) {
      console.error("Error creating subscription:", err);
      setError("Failed to create subscription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/subscriptions")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">
            Add New Subscription
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
            <FiAlertCircle className="text-red-500 flex-shrink-0" />
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
            <FiCheck className="text-green-500 flex-shrink-0" />
            <p className="text-green-500">{success}</p>
          </div>
        )}

        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
          <h2 className="text-lg font-medium text-white mb-4">
            Subscription Details
          </h2>

          <div className="space-y-4">
            {/* User */}
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                User <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-500" />
                </div>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  value={formData.userId}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 bg-zinc-700/50 border ${
                    errors.userId ? "border-red-500" : "border-zinc-600"
                  } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Enter user ID"
                />
              </div>
              {errors.userId && (
                <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
              )}
            </div>

            {/* Plan */}
            <div>
              <label
                htmlFor="planId"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Plan <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCreditCard className="text-gray-500" />
                </div>
                <input
                  id="planId"
                  name="planId"
                  type="text"
                  value={formData.planId}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 bg-zinc-700/50 border ${
                    errors.planId ? "border-red-500" : "border-zinc-600"
                  } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Enter plan ID"
                />
              </div>
              {errors.planId && (
                <p className="text-red-500 text-sm mt-1">{errors.planId}</p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-500" />
                </div>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 bg-zinc-700/50 border ${
                    errors.startDate ? "border-red-500" : "border-zinc-600"
                  } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                />
              </div>
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Payment Method <span className="text-red-500">*</span>
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/admin/subscriptions")}
            className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
          >
            Cancel
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg text-white flex items-center ${
              isLoading ? "bg-primary/70" : "bg-primary hover:bg-red-700"
            } transition-colors shadow-lg shadow-primary/20`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <FiSave className="w-4 h-4 mr-2" />
                Create Subscription
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default AddSubscription;
