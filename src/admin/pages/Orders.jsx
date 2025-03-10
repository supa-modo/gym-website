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
  FiDollarSign,
  FiPackage,
  FiTruck,
  FiUser,
  FiClock,
} from "react-icons/fi";
import { orderAPI } from "../utils/api";
import { PiMoneyWavyDuotone, PiPackageDuotone } from "react-icons/pi";
import { TbCalendarCode, TbFilter } from "react-icons/tb";
import { MdPayments } from "react-icons/md";

// Sample order data
const sampleOrders = [
  {
    id: 1001,
    user: { id: 1, name: "John Doe", email: "john@example.com" },
    items: [
      { id: 1, name: "Premium Whey Protein", quantity: 2, price: 49.99 },
      { id: 2, name: "Shaker Bottle", quantity: 1, price: 9.99 },
    ],
    totalAmount: 109.97,
    status: "completed",
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main St, New York, NY 10001",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T15:45:00Z",
  },
  {
    id: 1002,
    user: { id: 2, name: "Jane Smith", email: "jane@example.com" },
    items: [
      { id: 3, name: "Men's Training T-Shirt", quantity: 1, price: 24.99 },
      { id: 4, name: "Resistance Bands Set", quantity: 1, price: 19.99 },
    ],
    totalAmount: 44.98,
    status: "processing",
    paymentMethod: "PayPal",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    createdAt: "2023-05-14T14:20:00Z",
    updatedAt: "2023-05-14T14:20:00Z",
  },
  {
    id: 1003,
    user: { id: 3, name: "Mike Johnson", email: "mike@example.com" },
    items: [
      { id: 5, name: "Adjustable Dumbbell Set", quantity: 1, price: 199.99 },
    ],
    totalAmount: 199.99,
    status: "shipped",
    paymentMethod: "Credit Card",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    createdAt: "2023-05-13T09:15:00Z",
    updatedAt: "2023-05-13T16:30:00Z",
  },
  {
    id: 1004,
    user: { id: 4, name: "Sarah Williams", email: "sarah@example.com" },
    items: [
      { id: 6, name: "Yoga Mat", quantity: 1, price: 29.99 },
      { id: 7, name: "BCAA Supplement", quantity: 2, price: 29.99 },
    ],
    totalAmount: 89.97,
    status: "delivered",
    paymentMethod: "Credit Card",
    shippingAddress: "321 Elm St, Houston, TX 77001",
    createdAt: "2023-05-12T11:45:00Z",
    updatedAt: "2023-05-12T17:20:00Z",
  },
  {
    id: 1005,
    user: { id: 5, name: "David Brown", email: "david@example.com" },
    items: [
      { id: 8, name: "Performance Pre-Workout", quantity: 1, price: 39.99 },
    ],
    totalAmount: 39.99,
    status: "pending",
    paymentMethod: "PayPal",
    shippingAddress: "654 Maple Dr, Miami, FL 33101",
    createdAt: "2023-05-11T13:10:00Z",
    updatedAt: "2023-05-11T13:10:00Z",
  },
];

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState(sampleOrders);
  const [filteredOrders, setFilteredOrders] = useState(sampleOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(sampleOrders.length);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [error, setError] = useState(null);

  // Status options
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  // Date range options
  const dateRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, you would fetch data from your API
        // const response = await orderAPI.getAll({
        //   page: currentPage,
        //   limit: itemsPerPage,
        //   status: selectedStatus !== 'all' ? selectedStatus : undefined,
        //   dateRange: dateRange !== 'all' ? dateRange : undefined
        // });
        // setOrders(response.data);

        // Simulate API call with filtering
        let filtered = [...sampleOrders];

        if (selectedStatus !== "all") {
          filtered = filtered.filter(
            (order) => order.status === selectedStatus
          );
        }

        // Apply date range filter
        if (dateRange !== "all") {
          const now = new Date();
          const startOfDay = new Date(now.setHours(0, 0, 0, 0));
          const startOfWeek = new Date(
            now.setDate(now.getDate() - now.getDay())
          );
          const startOfMonth = new Date(now.setDate(1));
          const startOfYear = new Date(now.setMonth(0, 1));

          filtered = filtered.filter((order) => {
            const orderDate = new Date(order.createdAt);
            switch (dateRange) {
              case "today":
                return orderDate >= startOfDay;
              case "week":
                return orderDate >= startOfWeek;
              case "month":
                return orderDate >= startOfMonth;
              case "year":
                return orderDate >= startOfYear;
              default:
                return true;
            }
          });
        }

        setFilteredOrders(filtered);
        setTotalOrders(filtered.length);

        // Simulate API delay
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again.");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, itemsPerPage, selectedStatus, dateRange]);

  // Calculate pagination
  const totalPages = Math.ceil(totalOrders / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalOrders);
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

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

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "processing":
        return "bg-blue-500/10 text-blue-500";
      case "shipped":
        return "bg-purple-500/10 text-purple-500";
      case "delivered":
        return "bg-teal-500/10 text-teal-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FiPackage className="w-4 h-4" />;
      case "processing":
        return <FiClock className="w-4 h-4" />;
      case "shipped":
        return <FiTruck className="w-4 h-4" />;
      case "delivered":
        return <FiPackage className="w-4 h-4" />;
      case "pending":
        return <FiClock className="w-4 h-4" />;
      case "cancelled":
        return <FiX className="w-4 h-4" />;
      default:
        return <FiPackage className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {/* Total Orders */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <h3 className="text-xl font-bold text-white mt-1">
                {totalOrders}
              </h3>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <PiPackageDuotone className="text-blue-500 w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <h3 className="text-xl font-bold text-white mt-1">
                {formatCurrency(
                  filteredOrders.reduce(
                    (total, order) => total + order.totalAmount,
                    0
                  )
                )}
              </h3>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <PiMoneyWavyDuotone className="text-green-500 w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Orders</p>
              <h3 className="text-xl font-bold text-white mt-1">
                {
                  filteredOrders.filter((order) => order.status === "pending")
                    .length
                }
              </h3>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <FiClock className="text-yellow-500 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed Orders</p>
              <h3 className="text-xl font-bold text-white mt-1">
                {
                  filteredOrders.filter((order) => order.status === "completed")
                    .length
                }
              </h3>
            </div>
            <div className="bg-teal-500/10 p-3 rounded-lg">
              <PiPackageDuotone className="text-teal-500 w-6 h-6" />
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
            <TbFilter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FiChevronRight className="w-4 h-4 text-gray-400 transform rotate-90" />
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <TbCalendarCode  className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

      {/* Orders List */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-xl border border-zinc-700 p-5 animate-pulse"
            >
              <div className="space-y-3">
                <div className="h-5 bg-zinc-700 rounded w-1/4"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/3"></div>
                <div className="h-4 bg-zinc-700 rounded w-full"></div>
                <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
              </div>
            </div>
          ))
        ) : currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden"
            >
              <div className="p-5">
                {/* Order Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-1">
                      Order #{order.id}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>

                    <button
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-sm flex items-center transition-colors"
                    >
                      <FiEye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="flex items-center mb-4">
                  <div className="w-9 h-9 rounded-full text-sm px-5 bg-zinc-700 flex items-center justify-center text-white font-medium mr-3">
                    {order.user.name.split(" ")
                            .slice(0, 2)
                            .map((name) => name.charAt(0))
                            .join("")}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">
                      {order.user.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{order.user.email}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center">
                        <PiPackageDuotone className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-white">{item.name}</span>
                        <span className="text-gray-400 mx-2">×</span>
                        <span className="text-gray-400">{item.quantity}</span>
                      </div>
                      <span className="text-gray-400">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-zinc-700">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm">
                      <MdPayments className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-400">
                        Payment: {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-lg font-bold text-white">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 text-center">
            <p className="text-gray-400">
              No orders found matching your criteria
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

export default Orders;
