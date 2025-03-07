import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiEye,
  FiX,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiUser,
  FiCreditCard,
} from "react-icons/fi";
import subscriptionAPI from "../utils//subscriptionAPI";

const Subscriptions = () => {
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [error, setError] = useState(null);

  // Status options
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "expired", label: "Expired" },
    { value: "canceled", label: "Canceled" },
    { value: "pending", label: "Pending" },
  ];

  // Plan options (derived from subscriptions)
  const planOptions = [
    { value: "all", label: "All Plans" },
    ...Array.from(
      new Set(
        subscriptions
          .filter((sub) => sub?.plan && sub.plan.id)
          .map((sub) => sub.plan.id)
      )
    ).map((planId) => {
      const plan = subscriptions.find((sub) => sub?.plan?.id === planId)?.plan;
      return {
        value: planId.toString(),
        label: plan?.name || "Unknown Plan",
      };
    }),
  ];

  // Fetch subscriptions on component mount
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await subscriptionAPI.getAll();

        // Use the data directly from the API response
        setSubscriptions(response);
        setFilteredSubscriptions(response);
        setTotalSubscriptions(response.length);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setError("Failed to fetch subscriptions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(totalSubscriptions / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalSubscriptions);
  const currentSubscriptions = filteredSubscriptions.slice(
    startIndex,
    endIndex
  );

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "expired":
        return "bg-red-500/10 text-red-500";
      case "canceled":
        return "bg-yellow-500/10 text-yellow-500";
      case "pending":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  // Calculate days remaining for active subscriptions
  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {/* Active Subscriptions */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Subscriptions</p>
              <h3 className="text-xl font-bold text-white mt-1">
                {
                  filteredSubscriptions.filter((sub) => sub.status === "active")
                    .length
                }
              </h3>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <FiCreditCard className="text-green-500 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Expired Subscriptions */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Expired Subscriptions</p>
              <h3 className="text-xl font-bold text-white mt-1">
                {
                  filteredSubscriptions.filter(
                    (sub) => sub.status === "expired"
                  ).length
                }
              </h3>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg">
              <FiClock className="text-red-500 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Canceled Subscriptions */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Canceled Subscriptions</p>
              <h3 className="text-xl font-bold text-white mt-1">
                {
                  filteredSubscriptions.filter(
                    (sub) => sub.status === "canceled"
                  ).length
                }
              </h3>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <FiX className="text-yellow-500 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Pending Subscriptions */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Subscriptions</p>
              <h3 className="text-xl font-bold text-white mt-1">
                {
                  filteredSubscriptions.filter(
                    (sub) => sub.status === "pending"
                  ).length
                }
              </h3>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <FiClock className="text-blue-500 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
        <div className="flex flex-wrap gap-4">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FiChevronRight className="w-4 h-4 text-gray-400 transform rotate-90" />
            </div>
          </div>

          {/* Plan Filter */}
          <div className="relative">
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="appearance-none bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            >
              {planOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FiChevronRight className="w-4 h-4 text-gray-400 transform rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <FiAlertCircle className="text-red-500 flex-shrink-0" />
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden animate-pulse"
            >
              <div className="h-4 bg-zinc-700 rounded-t-xl"></div>
              <div className="p-5 space-y-3">
                <div className="h-5 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-700 rounded w-full"></div>
                <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/3"></div>
              </div>
            </div>
          ))
        ) : subscriptions.length > 0 ? (
          currentSubscriptions.map((subscription) => {
            const user = subscription.user || {};
            const plan = subscription.plan || {};

            return (
              <motion.div
                key={subscription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden flex flex-col"
              >
                {/* Status Bar */}
                <div
                  className={`h-1 ${
                    subscription.status === "active"
                      ? "bg-green-500"
                      : subscription.status === "expired"
                      ? "bg-red-500"
                      : subscription.status === "canceled"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                ></div>

                <div className="p-5 flex-1">
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        subscription.status
                      )}`}
                    >
                      {subscription.status.charAt(0).toUpperCase() +
                        subscription.status.slice(1)}
                    </span>

                    {subscription.status === "active" && (
                      <span className="text-xs text-gray-400">
                        {getDaysRemaining(subscription.endDate)} days remaining
                      </span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-medium mr-3">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{user.name}</h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <FiCreditCard className="text-gray-400 mr-2" />
                      <span className="text-white">{plan.name}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <FiCalendar className="text-gray-400 mr-2" />
                      <span className="text-gray-400">
                        {formatDate(subscription.startDate)} -{" "}
                        {formatDate(subscription.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <FiUser className="text-gray-400 mr-2" />
                      <span className="text-gray-400">
                        Payment Method: {subscription.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-zinc-700/30 rounded-lg p-3 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                      Subscription Price
                    </span>
                    <span className="text-white font-medium">
                      {formatCurrency(plan.price)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-zinc-700 p-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    Created: {formatDate(subscription.createdAt)}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/admin/subscriptions/${subscription.id}`)
                    }
                    className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-sm flex items-center transition-colors"
                  >
                    <FiEye className="w-4 h-4 mr-1" />
                    Details
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full bg-zinc-800 rounded-xl border border-zinc-700 p-8 text-center">
            <p className="text-gray-400 mb-4">
              No subscriptions found matching your criteria
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === 1
                  ? "bg-zinc-700/30 text-gray-500 cursor-not-allowed"
                  : "bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
              }`}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              // Show current page, first page, last page, and pages around current
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      currentPage === pageNumber
                        ? "bg-primary text-white"
                        : "bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                (pageNumber === currentPage - 2 && currentPage > 3) ||
                (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={pageNumber} className="px-3 py-1 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === totalPages
                  ? "bg-zinc-700/30 text-gray-500 cursor-not-allowed"
                  : "bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
              }`}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
