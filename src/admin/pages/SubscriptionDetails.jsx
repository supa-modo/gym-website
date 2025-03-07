import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiUser,
  FiCreditCard,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiCheck,
  FiX,
  FiRefreshCw,
  FiMail,
} from "react-icons/fi";
import subscriptionAPI from "../utils//subscriptionAPI";
import formatDate from "../utils/dateFormatter";

// Status options
const statusOptions = [
  {
    value: "active",
    label: "Active",
    color: "bg-green-500/10 text-green-500",
    icon: <FiCheck className="w-4 h-4" />,
  },
  {
    value: "expired",
    label: "Expired",
    color: "bg-red-500/10 text-red-500",
    icon: <FiX className="w-4 h-4" />,
  },
  {
    value: "canceled",
    label: "Canceled",
    color: "bg-yellow-500/10 text-yellow-500",
    icon: <FiX className="w-4 h-4" />,
  },
  {
    value: "pending",
    label: "Pending",
    color: "bg-blue-500/10 text-blue-500",
    icon: <FiClock className="w-4 h-4" />,
  },
];

const SubscriptionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [extensionMonths, setExtensionMonths] = useState(1);

  // Fetch subscription data
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await subscriptionAPI.getById(id);

        // Ensure payments array exists
        const subscriptionData = {
          ...response,
          payments: response.payments || [], // Default to empty array if payments is undefined
        };

        setSubscription(subscriptionData);
      } catch (err) {
        console.error("Error fetching subscription:", err);
        setError("Failed to fetch subscription details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [id]);

  // Handle cancel subscription
  const handleCancelSubscription = async () => {
    try {
      setIsUpdating(true);
      setError(null);
      setSuccess(null);
      await subscriptionAPI.cancel(id);
      setSubscription((prev) => ({ ...prev, status: "cancelled" }));
      setSuccess("Subscription canceled successfully!");
    } catch (err) {
      console.error("Error canceling subscription:", err);
      setError("Failed to cancel subscription. Please try again.");
    } finally {
      setIsUpdating(false);
      setShowCancelModal(false);
    }
  };

  // Handle extend subscription
  const handleExtendSubscription = async () => {
    try {
      setIsUpdating(true);
      setError(null);
      setSuccess(null);
      await subscriptionAPI.extend(id, extensionMonths);
      setSubscription((prev) => ({
        ...prev,
        endDate: new Date(
          new Date(prev.endDate).setMonth(
            new Date(prev.endDate).getMonth() + extensionMonths
          )
        ).toISOString(),
      }));
      setSuccess(
        `Subscription extended by ${extensionMonths} month${
          extensionMonths > 1 ? "s" : ""
        }!`
      );
    } catch (err) {
      console.error("Error extending subscription:", err);
      setError("Failed to extend subscription. Please try again.");
    } finally {
      setIsUpdating(false);
      setShowExtendModal(false);
    }
  };

  // Send email to customer
  const handleSendEmail = () => {
    setSuccess("Email sent to customer!");

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );
    if (!statusOption) return null;

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${statusOption.color}`}
      >
        {statusOption.icon}
        {statusOption.label}
      </span>
    );
  };

  // Calculate days remaining
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/subscriptions")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">Subscription #{id}</h1>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleSendEmail}
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-2 rounded-lg text-sm flex items-center transition-colors"
          >
            <FiMail className="w-4 h-4 mr-2" />
            Email Customer
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-400">
              Loading subscription details...
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <FiAlertCircle className="text-red-500 flex-shrink-0" />
          <p className="text-red-500">{error}</p>
        </div>
      ) : subscription ? (
        <>
          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
              <FiCheck className="text-green-500 flex-shrink-0" />
              <p className="text-green-500">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subscription Summary */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden">
                <div className="p-6 border-b border-zinc-700">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-white">
                        Subscription Details
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Created on {formatDate(subscription.createdAt)}
                      </p>
                    </div>

                    {getStatusBadge(subscription.status)}
                  </div>

                  {subscription.status === "active" && (
                    <div className="bg-zinc-700/30 p-3 rounded-lg flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm">
                        <FiClock className="text-gray-400 mr-2" />
                        <span className="text-gray-400">Time remaining:</span>
                      </div>
                      <span className="text-white font-medium">
                        {getDaysRemaining(subscription.endDate)} days
                      </span>
                    </div>
                  )}
                </div>

                {/* Membership Plan */}
                <div className="p-6 border-b border-zinc-700">
                  <h3 className="text-white font-medium mb-4">
                    Membership Plan
                  </h3>

                  <div className="bg-zinc-700/30 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">
                        {subscription.plan.name}
                      </h4>
                      <span className="text-white font-bold">
                        {formatCurrency(subscription.plan.price)}/month
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-3">
                      {subscription.plan.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-400">
                      <FiCalendar className="mr-2" />
                      <span>
                        Duration: {subscription.plan.duration} month
                        {subscription.plan.duration > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subscription Dates */}
                <div className="p-6 border-b border-zinc-700">
                  <h3 className="text-white font-medium mb-4">
                    Subscription Timeline
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-2" />
                        <span className="text-gray-400">Start Date:</span>
                      </div>
                      <span className="text-white">
                        {formatDate(subscription.startDate)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-2" />
                        <span className="text-gray-400">End Date:</span>
                      </div>
                      <span className="text-white">
                        {formatDate(subscription.endDate)}
                      </span>
                    </div>

                    {subscription.status === "active" && (
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <FiRefreshCw className="text-gray-400 mr-2" />
                          <span className="text-gray-400">Next Renewal:</span>
                        </div>
                        <span className="text-white">
                          {formatDate(subscription.renewalDate)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <FiClock className="text-gray-400 mr-2" />
                        <span className="text-gray-400">Last Updated:</span>
                      </div>
                      <span className="text-white">
                        {formatDate(subscription.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment History */}
                <div className="p-6">
                  <h3 className="text-white font-medium mb-4">
                    Payment History
                  </h3>

                  {subscription.payments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-zinc-700/30">
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Method
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-700">
                          {subscription.payments.map((payment) => (
                            <tr
                              key={payment.id}
                              className="hover:bg-zinc-700/20"
                            >
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                                {formatDate(payment.date)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                                {formatCurrency(payment.amount)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    payment.status === "completed"
                                      ? "bg-green-500/10 text-green-500"
                                      : payment.status === "pending"
                                      ? "bg-yellow-500/10 text-yellow-500"
                                      : "bg-red-500/10 text-red-500"
                                  }`}
                                >
                                  {payment.status.charAt(0).toUpperCase() +
                                    payment.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                                {payment.paymentMethod}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-zinc-700/30 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm">
                        No payment history found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Information and Actions */}
            <div className="lg:col-span-1">
              {/* Customer Information */}
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
                <h3 className="text-white font-medium mb-4">
                  Customer Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-medium mr-3">
                      {subscription.user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">
                        {subscription.user.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {subscription.user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm">
                    <FiUser className="text-gray-400 mr-2" />
                    <span className="text-gray-400">Customer ID:</span>
                    <span className="text-white ml-2">
                      {subscription.user.id}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <FiUser className="text-gray-400 mr-2" />
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white ml-2">
                      {subscription.user.phone}
                    </span>
                  </div>

                  <div className="pt-2">
                    <Link to={`/admin/users/${subscription.user.id}`}>
                      <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-sm transition-colors w-full">
                        View Customer Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mt-6">
                <h3 className="text-white font-medium mb-4">
                  Payment Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <FiCreditCard className="text-gray-400 mr-2" />
                    <span className="text-gray-400">Payment Method:</span>
                    <span className="text-white ml-2">
                      {subscription.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <FiCreditCard className="text-gray-400 mr-2" />
                    <span className="text-gray-400">
                      Stripe Subscription ID:
                    </span>
                    <span className="text-white ml-2">
                      {subscription.stripeSubscriptionId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subscription Actions */}
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mt-6">
                <h3 className="text-white font-medium mb-4">
                  Subscription Actions
                </h3>

                <div className="space-y-3">
                  {subscription.status === "active" && (
                    <>
                      <button
                        onClick={() => setShowExtendModal(true)}
                        className="w-full bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                      >
                        <FiCalendar className="w-4 h-4 mr-2" />
                        Extend Subscription
                      </button>

                      <button
                        onClick={() => setShowCancelModal(true)}
                        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                      >
                        <FiX className="w-4 h-4 mr-2" />
                        Cancel Subscription
                      </button>
                    </>
                  )}

                  {subscription.status === "expired" && (
                    <button
                      onClick={() => setShowExtendModal(true)}
                      className="w-full bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                    >
                      <FiRefreshCw className="w-4 h-4 mr-2" />
                      Renew Subscription
                    </button>
                  )}

                  {subscription.status === "canceled" && (
                    <button
                      onClick={() => setShowExtendModal(true)}
                      className="w-full bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center"
                    >
                      <FiRefreshCw className="w-4 h-4 mr-2" />
                      Reactivate Subscription
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cancel Subscription Modal */}
          {showCancelModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 max-w-md w-full"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Confirm Cancellation
                </h3>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to cancel this subscription? This will
                  stop future billing but the customer will retain access until
                  the end of the current billing period.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                    disabled={isUpdating}
                  >
                    No, Keep Subscription
                  </button>
                  <button
                    onClick={handleCancelSubscription}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Canceling...
                      </>
                    ) : (
                      "Yes, Cancel Subscription"
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Extend Subscription Modal */}
          {showExtendModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 max-w-md w-full"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  {subscription.status === "active"
                    ? "Extend Subscription"
                    : "Reactivate Subscription"}
                </h3>
                <p className="text-gray-400 mb-4">
                  {subscription.status === "active"
                    ? "Extend this subscription by adding more time to the current end date."
                    : "Reactivate this subscription for the customer."}
                </p>

                <div className="mb-6">
                  <label
                    htmlFor="extensionMonths"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Duration (months)
                  </label>
                  <select
                    id="extensionMonths"
                    value={extensionMonths}
                    onChange={(e) =>
                      setExtensionMonths(parseInt(e.target.value))
                    }
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    {[1, 3, 6, 12].map((months) => (
                      <option key={months} value={months}>
                        {months} month{months > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-zinc-700/30 p-3 rounded-lg mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Cost:</span>
                    <span className="text-white font-medium">
                      {formatCurrency(
                        subscription.plan.price * extensionMonths
                      )}
                    </span>
                  </div>

                  {subscription.status === "active" && (
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-400">New End Date:</span>
                      <span className="text-white font-medium">
                        {formatDate(
                          new Date(
                            new Date(subscription.endDate).setMonth(
                              new Date(subscription.endDate).getMonth() +
                                extensionMonths
                            )
                          )
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowExtendModal(false)}
                    className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExtendSubscription}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-4 h-4 mr-2" />
                        {subscription.status === "active"
                          ? "Extend Subscription"
                          : "Reactivate Subscription"}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 text-center">
          <p className="text-gray-400">Subscription not found</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetails;
