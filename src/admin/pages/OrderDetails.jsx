import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiPackage,
  FiUser,
  FiMapPin,
  FiCreditCard,
  FiCalendar,
  FiTruck,
  FiAlertCircle,
  FiCheck,
  FiPrinter,
  FiMail,
  FiClock,
} from "react-icons/fi";
import { orderAPI } from "../utils/api";

// Sample order data
const sampleOrder = {
  id: 1001,
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  },
  items: [
    {
      id: 1,
      name: "Premium Whey Protein",
      quantity: 2,
      price: 49.99,
      imageUrl: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Shaker Bottle",
      quantity: 1,
      price: 9.99,
      imageUrl: "https://via.placeholder.com/50",
    },
  ],
  totalAmount: 109.97,
  status: "completed",
  paymentMethod: "Credit Card",
  paymentId: "pi_1234567890",
  shippingAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  },
  trackingNumber: "TRK123456789",
  notes: "Customer requested gift wrapping.",
  createdAt: "2023-05-15T10:30:00Z",
  updatedAt: "2023-05-15T15:45:00Z",
};

// Status options
const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-500/10 text-yellow-500",
    icon: <FiClock className="w-4 h-4" />,
  },
  {
    value: "processing",
    label: "Processing",
    color: "bg-blue-500/10 text-blue-500",
    icon: <FiClock className="w-4 h-4" />,
  },
  {
    value: "shipped",
    label: "Shipped",
    color: "bg-purple-500/10 text-purple-500",
    icon: <FiTruck className="w-4 h-4" />,
  },
  {
    value: "delivered",
    label: "Delivered",
    color: "bg-teal-500/10 text-teal-500",
    icon: <FiPackage className="w-4 h-4" />,
  },
  {
    value: "completed",
    label: "Completed",
    color: "bg-green-500/10 text-green-500",
    icon: <FiCheck className="w-4 h-4" />,
  },
  {
    value: "canceled",
    label: "Canceled",
    color: "bg-red-500/10 text-red-500",
    icon: <FiAlertCircle className="w-4 h-4" />,
  },
];

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch order data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, you would fetch data from your API
        // const response = await orderAPI.getById(id);
        // setOrder(response.data);

        // Simulate API call
        setTimeout(() => {
          setOrder(sampleOrder);
          setSelectedStatus(sampleOrder.status);
          setTrackingNumber(sampleOrder.trackingNumber || "");
          setNotes(sampleOrder.notes || "");
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order details. Please try again.");
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Handle status change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Handle tracking number change
  const handleTrackingNumberChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  // Handle notes change
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  // Update order
  const handleUpdateOrder = async () => {
    try {
      setIsUpdating(true);
      setError(null);
      setSuccess(null);

      // In a real app, you would update the order via API
      // await orderAPI.updateStatus(id, {
      //   status: selectedStatus,
      //   trackingNumber,
      //   notes
      // });

      // Simulate API call
      setTimeout(() => {
        setOrder((prev) => ({
          ...prev,
          status: selectedStatus,
          trackingNumber,
          notes,
          updatedAt: new Date().toISOString(),
        }));

        setIsUpdating(false);
        setSuccess("Order updated successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 1000);
    } catch (err) {
      console.error("Error updating order:", err);
      setError("Failed to update order. Please try again.");
      setIsUpdating(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
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

  // Print order
  const handlePrintOrder = () => {
    window.print();
  };

  // Send email to customer
  const handleSendEmail = () => {
    setSuccess("Email sent to customer!");

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">Order #{id}</h1>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handlePrintOrder}
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-2 rounded-lg text-sm flex items-center transition-colors"
          >
            <FiPrinter className="w-4 h-4 mr-2" />
            Print
          </button>

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
            <p className="mt-2 text-gray-400">Loading order details...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <FiAlertCircle className="text-red-500 flex-shrink-0" />
          <p className="text-red-500">{error}</p>
        </div>
      ) : order ? (
        <>
          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
              <FiCheck className="text-green-500 flex-shrink-0" />
              <p className="text-green-500">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden">
                <div className="p-6 border-b border-zinc-700">
                  <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-white">
                        Order Summary
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>

                    {getStatusBadge(order.status)}
                  </div>

                  <div className="flex items-center text-sm text-gray-400 mt-2">
                    <FiCalendar className="mr-2" />
                    <span>Last updated: {formatDate(order.updatedAt)}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 border-b border-zinc-700">
                  <h3 className="text-white font-medium mb-4">Order Items</h3>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="w-12 h-12 bg-zinc-700 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-white font-medium">
                            {item.name}
                          </h4>
                          <div className="flex justify-between text-sm text-gray-400 mt-1">
                            <span>Quantity: {item.quantity}</span>
                            <span>{formatCurrency(item.price)} each</span>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <span className="text-white font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="p-6">
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                    <span>Subtotal</span>
                    <span>{formatCurrency(order.totalAmount)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>

                  <div className="flex justify-between items-center border-t border-zinc-700 pt-4">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-xl font-bold text-white">
                      {formatCurrency(order.totalAmount)}
                    </span>
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
                      {order.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <FiCreditCard className="text-gray-400 mr-2" />
                    <span className="text-gray-400">Payment ID:</span>
                    <span className="text-white ml-2">{order.paymentId}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <span className="text-gray-400">Payment Date:</span>
                    <span className="text-white ml-2">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer and Shipping Information */}
            <div className="lg:col-span-1">
              {/* Customer Information */}
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
                <h3 className="text-white font-medium mb-4">
                  Customer Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white font-medium mr-3">
                      {order.user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">
                        {order.user.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {order.user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-sm">
                    <FiUser className="text-gray-400 mr-2" />
                    <span className="text-gray-400">Customer ID:</span>
                    <span className="text-white ml-2">{order.user.id}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <FiUser className="text-gray-400 mr-2" />
                    <span className="text-gray-400">Phone:</span>
                    <span className="text-white ml-2">{order.user.phone}</span>
                  </div>

                  <div className="pt-2">
                    <Link to={`/admin/users/${order.user.id}`}>
                      <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-sm transition-colors w-full">
                        View Customer Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mt-6">
                <h3 className="text-white font-medium mb-4">
                  Shipping Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start text-sm">
                    <FiMapPin className="text-gray-400 mr-2 mt-1" />
                    <div>
                      <span className="text-gray-400">Shipping Address:</span>
                      <address className="text-white mt-1 not-italic">
                        {order.shippingAddress.street}
                        <br />
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zipCode}
                        <br />
                        {order.shippingAddress.country}
                      </address>
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="flex items-center text-sm">
                      <FiTruck className="text-gray-400 mr-2" />
                      <span className="text-gray-400">Tracking Number:</span>
                      <span className="text-white ml-2">
                        {order.trackingNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Actions */}
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mt-6">
                <h3 className="text-white font-medium mb-4">Order Actions</h3>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Order Status
                    </label>
                    <select
                      id="status"
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="trackingNumber"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Tracking Number
                    </label>
                    <input
                      id="trackingNumber"
                      type="text"
                      value={trackingNumber}
                      onChange={handleTrackingNumberChange}
                      placeholder="Enter tracking number"
                      className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Order Notes
                    </label>
                    <textarea
                      id="notes"
                      rows="3"
                      value={notes}
                      onChange={handleNotesChange}
                      placeholder="Add notes about this order"
                      className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpdateOrder}
                      disabled={isUpdating}
                      className={`w-full px-4 py-2 rounded-lg text-white flex items-center justify-center ${
                        isUpdating
                          ? "bg-primary/70"
                          : "bg-primary hover:bg-red-700"
                      } transition-colors shadow-lg shadow-primary/20`}
                    >
                      {isUpdating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <FiCheck className="w-4 h-4 mr-2" />
                          Update Order
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 text-center">
          <p className="text-gray-400">Order not found</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
