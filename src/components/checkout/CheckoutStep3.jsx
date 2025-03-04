import React from "react";
import { FiCreditCard } from "react-icons/fi";
import { FaMobile } from "react-icons/fa";

const CheckoutStep3 = ({ formData, deliveryMethod, paymentMethod }) => {
  return (
    <div className="space-y-4">
      {/* Order Details */}
      <div className="space-y-3">
        <h4 className="text-white font-medium">Order Details</h4>
        {formData.items.map((item) => (
          <div key={item.id} className="flex justify-between text-gray-400">
            <span>{item.name}</span>
            <div className="flex items-center">
              <span>Qty: {item.quantity}</span>
              {item.color !== "default" && (
                <span className="ml-3 flex items-center">
                  Color:
                  <span className="capitalize ml-1">{item.color}</span>
                  <div
                    className="w-3 h-3 rounded-full ml-1"
                    style={{
                      backgroundColor:
                        item.color === "black"
                          ? "#222"
                          : item.color === "white"
                          ? "#f8f8f8"
                          : item.color === "red"
                          ? "#ef4444"
                          : item.color === "blue"
                          ? "#3b82f6"
                          : item.color === "navy"
                          ? "#1e3a8a"
                          : item.color === "gray"
                          ? "#4b5563"
                          : "#777",
                    }}
                  />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Personal Information */}
      <div className="space-y-3">
        <h4 className="text-white font-medium">Personal Information</h4>
        <div className="bg-zinc-800/50 rounded-lg p-3">
          <p className="text-white">{formData.fullName}</p>
          <p className="text-gray-400 text-sm">{formData.email}</p>
          <p className="text-gray-400 text-sm">{formData.phone}</p>
        </div>

        {/* Delivery/Pickup Information */}
        <h4 className="text-white font-medium">
          {deliveryMethod === "delivery"
            ? "Delivery Address"
            : "Pickup Location"}
        </h4>
        <div className="bg-zinc-800/50 rounded-lg p-3">
          {deliveryMethod === "delivery" ? (
            <>
              <p className="text-white">{formData.address}</p>
              <p className="text-gray-400 text-sm">
                {formData.city}, {formData.zipCode}
              </p>
            </>
          ) : (
            <p className="text-white">
              {formData.pickupLocation === "main-branch"
                ? "Main Branch - 123 Fitness Street, CBD"
                : formData.pickupLocation === "westlands"
                ? "Westlands Branch - 456 Westlands Road"
                : "Karen Branch - 789 Karen Road"}
            </p>
          )}
        </div>

        {/* Payment Information */}
        <h4 className="text-white font-medium">Payment Method</h4>
        <div className="bg-zinc-800/50 rounded-lg p-3">
          {paymentMethod === "card" ? (
            <div className="flex items-center gap-2">
              <FiCreditCard className="text-primary" />
              <div>
                <p className="text-white">
                  Credit Card ending in {formData.cardNumber.slice(-4)}
                </p>
                <p className="text-gray-400 text-sm">{formData.cardName}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaMobile className="text-primary" />
              <div>
                <p className="text-white">M-Pesa</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutStep3;
