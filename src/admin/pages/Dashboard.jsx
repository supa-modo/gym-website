import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiCreditCard,
  FiShoppingBag,
  FiDollarSign,
  FiArrowUp,
  FiArrowDown,
  FiActivity,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { dashboardAPI } from "../utils/api";

// Sample data for charts and stats
const sampleStats = {
  totalUsers: 1248,
  totalRevenue: 52680,
  activeSubscriptions: 876,
  totalOrders: 342,
  userGrowth: 12.5,
  revenueGrowth: 8.3,
  subscriptionGrowth: 15.2,
  orderGrowth: -3.7,
};

const sampleRecentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "member",
    joinedAt: "2023-06-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "member",
    joinedAt: "2023-06-14T14:45:00Z",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "customer",
    joinedAt: "2023-06-14T09:15:00Z",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "member",
    joinedAt: "2023-06-13T16:20:00Z",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "customer",
    joinedAt: "2023-06-13T11:10:00Z",
  },
];

const sampleRecentOrders = [
  {
    id: 1001,
    customer: "John Doe",
    amount: 129.99,
    status: "completed",
    date: "2023-06-15T11:30:00Z",
  },
  {
    id: 1002,
    customer: "Sarah Williams",
    amount: 79.99,
    status: "processing",
    date: "2023-06-15T09:45:00Z",
  },
  {
    id: 1003,
    customer: "Mike Johnson",
    amount: 199.99,
    status: "completed",
    date: "2023-06-14T16:20:00Z",
  },
  {
    id: 1004,
    customer: "Jane Smith",
    amount: 49.99,
    status: "completed",
    date: "2023-06-14T14:10:00Z",
  },
  {
    id: 1005,
    customer: "David Brown",
    amount: 89.99,
    status: "pending",
    date: "2023-06-14T10:05:00Z",
  },
];

const Dashboard = () => {
  const [stats, setStats] = useState(sampleStats);
  const [recentUsers, setRecentUsers] = useState(sampleRecentUsers);
  const [recentOrders, setRecentOrders] = useState(sampleRecentOrders);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // In a real app, you would fetch data from your API
        // const response = await dashboardAPI.getStats();
        // setStats(response.data.stats);
        // setRecentUsers(response.data.recentUsers);
        // setRecentOrders(response.data.recentOrders);

        // Simulate API call
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
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

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <FiCalendar className="text-gray-400" />
          <span className="text-sm text-gray-400">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Users Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-zinc-800 rounded-xl p-5 border border-zinc-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats.totalUsers.toLocaleString()}
              </h3>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <FiUsers className="text-blue-500 w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div
              className={`flex items-center ${
                stats.userGrowth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stats.userGrowth >= 0 ? (
                <FiArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <FiArrowDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(stats.userGrowth)}%
              </span>
            </div>
            <span className="text-gray-400 text-xs ml-2">vs last month</span>
          </div>
        </motion.div>

        {/* Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-zinc-800 rounded-xl p-5 border border-zinc-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {formatCurrency(stats.totalRevenue)}
              </h3>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <FiDollarSign className="text-green-500 w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div
              className={`flex items-center ${
                stats.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stats.revenueGrowth >= 0 ? (
                <FiArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <FiArrowDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(stats.revenueGrowth)}%
              </span>
            </div>
            <span className="text-gray-400 text-xs ml-2">vs last month</span>
          </div>
        </motion.div>

        {/* Subscriptions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-zinc-800 rounded-xl p-5 border border-zinc-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Active Subscriptions</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats.activeSubscriptions.toLocaleString()}
              </h3>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <FiCreditCard className="text-purple-500 w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div
              className={`flex items-center ${
                stats.subscriptionGrowth >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {stats.subscriptionGrowth >= 0 ? (
                <FiArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <FiArrowDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(stats.subscriptionGrowth)}%
              </span>
            </div>
            <span className="text-gray-400 text-xs ml-2">vs last month</span>
          </div>
        </motion.div>

        {/* Orders Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-zinc-800 rounded-xl p-5 border border-zinc-700"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {stats.totalOrders.toLocaleString()}
              </h3>
            </div>
            <div className="bg-orange-500/10 p-3 rounded-lg">
              <FiShoppingBag className="text-orange-500 w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div
              className={`flex items-center ${
                stats.orderGrowth >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {stats.orderGrowth >= 0 ? (
                <FiArrowUp className="w-4 h-4 mr-1" />
              ) : (
                <FiArrowDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(stats.orderGrowth)}%
              </span>
            </div>
            <span className="text-gray-400 text-xs ml-2">vs last month</span>
          </div>
        </motion.div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-zinc-800 rounded-xl border border-zinc-700 p-5 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-zinc-700 text-white rounded-lg">
                Weekly
              </button>
              <button className="px-3 py-1 text-xs bg-primary text-white rounded-lg">
                Monthly
              </button>
              <button className="px-3 py-1 text-xs bg-zinc-700 text-white rounded-lg">
                Yearly
              </button>
            </div>
          </div>

          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <FiActivity className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                Revenue chart will be displayed here
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Integrate with Chart.js or Recharts
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-zinc-800 rounded-xl border border-zinc-700 p-5"
        >
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <FiUsers className="text-blue-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  New user registered
                </p>
                <p className="text-gray-400 text-xs">
                  John Doe created an account
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center">
                  <FiClock className="w-3 h-3 mr-1" /> 2 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-500/10 p-2 rounded-lg">
                <FiDollarSign className="text-green-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  New subscription
                </p>
                <p className="text-gray-400 text-xs">
                  Sarah Williams subscribed to Monthly Plan
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center">
                  <FiClock className="w-3 h-3 mr-1" /> 3 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-orange-500/10 p-2 rounded-lg">
                <FiShoppingBag className="text-orange-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  New order placed
                </p>
                <p className="text-gray-400 text-xs">
                  Mike Johnson ordered Protein Powder
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center">
                  <FiClock className="w-3 h-3 mr-1" /> 5 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-red-500/10 p-2 rounded-lg">
                <FiCreditCard className="text-red-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  Subscription canceled
                </p>
                <p className="text-gray-400 text-xs">
                  David Brown canceled his subscription
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center">
                  <FiClock className="w-3 h-3 mr-1" /> 8 hours ago
                </p>
              </div>
            </div>
          </div>

          <button className="w-full mt-4 py-2 text-sm text-primary hover:text-red-400 transition-colors">
            View All Activity
          </button>
        </motion.div>
      </div>

      {/* Recent Users and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden"
        >
          <div className="p-5 border-b border-zinc-700">
            <h3 className="text-lg font-bold text-white">Recent Users</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-700/30">
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-700/20">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.role === "member"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-purple-500/10 text-purple-500"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(user.joinedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-zinc-700 text-center">
            <button className="text-sm text-primary hover:text-red-400 transition-colors">
              View All Users
            </button>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden"
        >
          <div className="p-5 border-b border-zinc-700">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-700/30">
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-700/20">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        #{order.id}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {order.customer}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {formatCurrency(order.amount)}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "completed"
                            ? "bg-green-500/10 text-green-500"
                            : order.status === "processing"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(order.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-zinc-700 text-center">
            <button className="text-sm text-primary hover:text-red-400 transition-colors">
              View All Orders
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
