import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSave,
  FiArrowLeft,
  FiAlertCircle,
  FiDollarSign,
  FiClock,
  FiCheck,
} from "react-icons/fi";
import planAPI from "../utils/planAPI";

// Sample plan data
const samplePlan = {
  id: 2,
  name: "Premium Monthly",
  price: 49.99,
  duration: 1,
  description:
    "Full access to all gym facilities, classes, and premium equipment.",
  activeSubscriptions: 378,
  createdAt: "2023-01-15T11:45:00Z",
};

const PlanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "1",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch plan data if in edit mode
  useEffect(() => {
    const fetchPlan = async () => {
      if (!isEditMode) return;

      try {
        setIsFetching(true);
        setError(null);
        const response = await planAPI.getById(id);
        const plan = response;
        setFormData({
          name: plan.name,
          price: plan.price.toString(),
          duration: plan.duration.toString(),
          description: plan.description,
        });
      } catch (err) {
        console.error("Error fetching plan:", err);
        setError("Failed to fetch plan data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchPlan();
  }, [id, isEditMode]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Plan name is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      const planData = {
        name: formData.name,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        description: formData.description,
      };

      if (isEditMode) {
        await planAPI.update(id, planData);
        setSuccess("Plan updated successfully!");
      } else {
        await planAPI.create(planData);
        setSuccess("Plan created successfully!");
      }

      setTimeout(() => {
        navigate("/admin/plans");
      }, 1500);
    } catch (err) {
      console.error("Error saving plan:", err);
      setError(
        isEditMode
          ? "Failed to update plan. Please try again."
          : "Failed to create plan. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Format currency for preview
  const formatCurrency = (amount) => {
    if (!amount || isNaN(parseFloat(amount))) return "$0.00";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/plans")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">
            {isEditMode ? "Edit Membership Plan" : "Add New Membership Plan"}
          </h1>
        </div>
      </div>

      {/* Loading State */}
      {isFetching ? (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-400">Loading plan data...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-800 rounded-xl border border-zinc-700 p-6"
            >
              <h2 className="text-lg font-medium text-white mb-4">
                Plan Details
              </h2>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 mb-6">
                  <FiAlertCircle className="text-red-500 flex-shrink-0" />
                  <p className="text-red-500">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3 mb-6">
                  <FiCheck className="text-green-500 flex-shrink-0" />
                  <p className="text-green-500">{success}</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Plan Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Plan Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-zinc-700/50 border ${
                      errors.name ? "border-red-500" : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="e.g. Basic Monthly, Premium Annual"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Price and Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiDollarSign className="text-gray-500" />
                      </div>
                      <input
                        id="price"
                        name="price"
                        type="text"
                        value={formData.price}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 bg-zinc-700/50 border ${
                          errors.price ? "border-red-500" : "border-zinc-600"
                        } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  {/* Duration */}
                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Duration <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiClock className="text-gray-500" />
                      </div>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 bg-zinc-700/50 border ${
                          errors.duration ? "border-red-500" : "border-zinc-600"
                        } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                      >
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="12">12 Months (1 Year)</option>
                      </select>
                    </div>
                    {errors.duration && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.duration}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full bg-zinc-700/50 border ${
                      errors.description ? "border-red-500" : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Describe what's included in this membership plan"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Link to="/admin/plans">
                    <button
                      type="button"
                      className="px-8 py-2 font-semibold bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`px-6 py-2 rounded-lg font-semibold text-white flex items-center ${
                      isLoading
                        ? "bg-primary/70"
                        : "bg-primary hover:bg-red-700"
                    } transition-colors shadow-lg shadow-primary/20`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <FiSave className="w-5 h-5 mr-2" />
                        {isEditMode ? "Update Plan" : "Create Plan"}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </div>

          {/* Plan Preview */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
              <h2 className="text-lg font-medium text-white mb-4">
                Plan Preview
              </h2>

              <div className="bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-xl p-6 border border-zinc-700">
                <h3 className="text-xl font-bold text-white mb-2">
                  {formData.name || "Plan Name"}
                </h3>

                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-white">
                    {formatCurrency(formData.price)}
                  </span>
                  <span className="text-gray-400 ml-1">
                    /{" "}
                    {formData.duration === "1"
                      ? "month"
                      : `${formData.duration} months`}
                  </span>
                </div>

                <div className="border-t border-zinc-700 my-4 pt-4">
                  <p className="text-gray-400 text-sm">
                    {formData.description ||
                      "Plan description will appear here..."}
                  </p>
                </div>

                <div className="flex items-center text-sm text-gray-400 mt-4">
                  <FiClock className="mr-2" />
                  <span>
                    Duration: {formData.duration} month
                    {parseInt(formData.duration) > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-400">
                <p>
                  This is how your membership plan will appear to customers.
                  Make sure all details are accurate before saving.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanForm;
