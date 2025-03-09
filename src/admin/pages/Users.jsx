import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiFilter,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
} from "react-icons/fi";
import { userAPI } from "../utils/api";
import formatDate from "../utils/dateFormatter";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = {
          page: currentPage,
          limit: itemsPerPage,
          role: selectedRole !== "all" ? selectedRole : undefined,
          status: selectedStatus !== "all" ? selectedStatus : undefined,
          search: searchQuery || undefined,
        };

        const response = await userAPI.getAll(params);

        console.log("API response:", response);

        if (response && response.data) {
          const { users, total } = response.data;

          setUsers(users);
          setTotalUsers(total);
        } else {
          console.error("Unexpected API response:", response);
          setError("Failed to fetch users due to an unexpected response.");
          setUsers([]);
          setTotalUsers(0);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again.");
        setUsers([]);
        setTotalUsers(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, itemsPerPage, searchQuery, selectedRole, selectedStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      setIsLoading(true);
      await userAPI.update(userToDelete.id, { status: "inactive" });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userToDelete.id ? { ...user, status: "inactive" } : user
        )
      );

      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Error deactivating user:", err);
      setError("Failed to deactivate user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  // Add these calculations before the return statement
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalUsers);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <Link to="/admin/users/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors shadow-lg shadow-primary/20"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add New User</span>
          </motion.button>
        </Link>
      </div>

      <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="appearance-none bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="customer">Customer</option>
              </select>
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FiChevronRight className="w-4 h-4 text-gray-400 transform rotate-90" />
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FiChevronRight className="w-4 h-4 text-gray-400 transform rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <FiAlertCircle className="text-red-500 flex-shrink-0" />
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <div className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-700/30">
                <th className="px-4 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Phone No.
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-8 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-32 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-16 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-16 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-right">
                      <div className="h-4 bg-zinc-700 rounded w-20 ml-auto animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-zinc-700/20">
                    <td className="pl-5 py-3.5 whitespace-nowrap text-sm text-gray-400">
                      {startIndex + index + 1}.
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full text-sm px-5 bg-zinc-700 flex items-center justify-center text-white font-medium">
                          {user.name
                            .split(" ")
                            .slice(0, 2)
                            .map((name) => name.charAt(0))
                            .join("")}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-white">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`px-4 py-1 text-xs rounded-lg ${
                          user.role === "admin"
                            ? "bg-purple-500/10 text-purple-500"
                            : user.role === "member"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-green-500/10 text-green-500"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-400">
                      {user.phone || "Not Provided"}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(user.createdAt)}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`px-4 py-1 text-xs rounded-lg ${
                          user.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-6">
                        <button
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          className="text-blue-500 hover:text-blue-400 transition-colors flex items-center space-x-1"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => navigate(`/admin/users/${user.id}`)}
                          className="text-yellow-500 hover:text-yellow-400 transition-colors flex items-center space-x-1"
                          title="Edit User"
                        >
                          <FiEdit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            setUserToDelete(user);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-400 transition-colors flex items-center space-x-1"
                          title="Delete User"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-3.5 whitespace-nowrap text-center text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-2 py-3 flex items-center justify-between border-t border-zinc-700">
        <div className="text-sm text-gray-400">
          Showing{" "}
          <span className="font-medium text-white">{startIndex + 1}</span> to{" "}
          <span className="font-medium text-white">{endIndex}</span> of{" "}
          <span className="font-medium text-white">{totalUsers}</span> users
        </div>

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

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-zinc-900/80 flex items-center justify-center">
          <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
            <h2 className="text-lg font-semibold text-white">Confirm Delete</h2>
            <p className="text-gray-400 mt-2">
              Are you sure you want to delete user{" "}
              <span className="font-medium">
                {userToDelete ? userToDelete.name : ""}
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-zinc-700 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
