import React from "react";
import { FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiCreditCard } from "react-icons/hi";
import { MdPayments } from "react-icons/md";
import { TbCalendarUser, TbOctahedron } from "react-icons/tb";

const SubscriptionTable = ({
  subscriptions,
  navigate,
  formatDate,
  formatCurrency,
  getStatusColor,
  getDaysRemaining,
  currentPage,
  setCurrentPage,
  totalPages,
  totalSubscriptions,
  itemsPerPage,
}) => {
  // Calculate display range for "Showing X of Y" text
  const startItem = (currentPage - 1) * itemsPerPage + 1;

  // Add handleRowClick function
  const handleRowClick = (subscriptionId) => {
    navigate(`/admin/subscriptions/${subscriptionId}`);
  };

  return (
    <div className="flex flex-col">
      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-700">
        <table className="w-full">
          <thead className="bg-gray-700/60 border-b border-zinc-700">
            <tr>
              {/* Add Auto Number Column */}
              <th className="px-4 py-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                #
              </th>
              <th className="px-4 py-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Member Name
              </th>
              <th className="px-4 py-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-4 py-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
                Period
              </th>
              <th className="px-4 py-6 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Payment Method
              </th>
              <th className="px-4 py-6 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-6 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-zinc-800 divide-y divide-zinc-700">
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription, index) => {
                const user = subscription.user || {};
                const plan = subscription.plan || {};

                return (
                  <tr
                    key={subscription.id}
                    className="hover:bg-zinc-700/30 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(subscription.id)}
                  >
                    {/* Auto Number Column */}
                    <td className="pl-4 py-3 whitespace-nowrap text-sm text-gray-400">
                      {startItem + index}.
                    </td>

                    {/* Status Column */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            subscription.status === "active"
                              ? "bg-green-500"
                              : subscription.status === "expired"
                              ? "bg-red-500"
                              : subscription.status === "cancelled"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        ></div>
                        <span
                          className={`px-3 py-1 text-xs rounded-lg ${getStatusColor(
                            subscription.status
                          )}`}
                        >
                          {subscription.status.charAt(0).toUpperCase() +
                            subscription.status.slice(1)}
                        </span>
                      </div>
                      {subscription.status === "active" && (
                        <span className="block mt-1 text-xs text-gray-400">
                          {getDaysRemaining(subscription.endDate)} days left
                        </span>
                      )}
                    </td>

                    {/* User Column */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full text-sm px-5 bg-zinc-700 flex items-center justify-center text-white font-medium mr-3">
                          {user.name
                            .split(" ")
                            .slice(0, 2)
                            .map((name) => name.charAt(0))
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Plan Column */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center text-sm">
                        <TbOctahedron className="text-gray-400 w-5 h-5 mr-2" />
                        <span className="text-white">{plan.name}</span>
                      </div>
                    </td>

                    {/* Period Column (hidden on small screens) */}
                    <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                      <div className="flex items-center text-sm">
                        <TbCalendarUser className="text-gray-400 w-5 h-5 mr-2" />
                        <span className="text-gray-400">
                          {formatDate(subscription.startDate)} -{" "}
                          {formatDate(subscription.endDate)}
                        </span>
                      </div>
                    </td>

                    {/* Payment Method Column (hidden on small screens) */}
                    <td className="px-4 py-3 whitespace-nowrap hidden lg:table-cell">
                      <div className="flex items-center text-sm">
                        <MdPayments className="text-gray-400 w-5 h-5 mr-2" />
                        <span className="text-gray-400">
                          {subscription.paymentMethod || "Mpesa Mobile"}
                        </span>
                      </div>
                    </td>

                    {/* Price Column */}
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <span className="text-white font-medium">
                        {formatCurrency(plan.price)}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from triggering
                          handleRowClick(subscription.id);
                        }}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-1 rounded-lg text-sm flex items-center transition-colors ml-auto"
                      >
                        <FiEye className="w-4 h-4 mr-1" />
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-400">
                  No subscriptions found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between px-4">
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-400">
            Showing {startItem}-
            {Math.min(startItem + itemsPerPage - 1, totalSubscriptions)} of{" "}
            {totalSubscriptions} subscriptions
          </p>
        </div>

        {/* Pagination */}
        {/* {totalPages > 1 && ( */}
        <div className="flex items-center justify-center mt-6">
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
        {/* )} */}
      </div>
    </div>
  );
};

export default SubscriptionTable;
