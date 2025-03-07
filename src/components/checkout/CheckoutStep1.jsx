import React, { useState } from "react";
import { FiTruck, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { PiUserDuotone } from "react-icons/pi";

const CheckoutStep1 = ({
  deliveryMethod,
  setDeliveryMethod,
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Order Details & Delivery</h3>

      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-gray-400 text-sm mb-1"
          >
            Your Full Name
          </label>
          <div className="relative">
            <PiUserDuotone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
              placeholder="John"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-400 text-sm mb-1">
            Email Address
          </label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-gray-400 text-sm mb-1">
          Phone Number
        </label>
        <div className="relative">
          <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            placeholder="+254 7XX XXX XXX"
          />
        </div>
      </div>

      {/* Delivery Method */}
      <div className="pt-6 border-t border-zinc-700">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              deliveryMethod === "delivery"
                ? "border-primary bg-zinc-800"
                : "border-zinc-700 bg-zinc-800/50 hover:border-gray-500"
            }`}
            onClick={() => handleDeliveryMethodChange("delivery")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  deliveryMethod === "delivery"
                    ? "border-primary"
                    : "border-gray-500"
                }`}
              >
                {deliveryMethod === "delivery" && (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <FiTruck
                  className={
                    deliveryMethod === "delivery"
                      ? "text-primary"
                      : "text-gray-400"
                  }
                />
                <span className="font-medium text-sm text-white">
                  City / Home Delivery
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-[0.8rem] mt-2 ml-8">
              Get your items delivered to you. (Doorstep delivery - only within
              Nairobi).
            </p>
            <p className="text-primary text-sm font-medium mt-2 ml-8">
              $5.99 - Delivery fee
            </p>
          </div>

          <div
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              deliveryMethod === "pickup"
                ? "border-primary bg-zinc-800"
                : "border-zinc-700 bg-zinc-800/50 hover:border-gray-500"
            }`}
            onClick={() => handleDeliveryMethodChange("pickup")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  deliveryMethod === "pickup"
                    ? "border-primary"
                    : "border-gray-500"
                }`}
              >
                {deliveryMethod === "pickup" && (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin
                  className={
                    deliveryMethod === "pickup"
                      ? "text-primary"
                      : "text-gray-400"
                  }
                />
                <span className="font-medium text-sm text-white">
                  Store Pickup
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-[0.8rem] mt-2 ml-8">
              Pick up your items from any of our gym branches
            </p>
            <p className="text-green-500 text-sm font-medium mt-2 ml-8">Free</p>
          </div>
        </div>

        {/* Delivery Address or Pickup Location */}
        {deliveryMethod === "delivery" ? (
          <div className="space-y-4 mt-6">
            <div>
              <label
                htmlFor="address"
                className="block text-gray-400 text-sm mb-1"
              >
                Street Address
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required={deliveryMethod === "delivery"}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="123 Main St, Apartment 4"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-gray-400 text-sm mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required={deliveryMethod === "delivery"}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="Nairobi"
                />
              </div>

              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-gray-400 text-sm mb-1"
                >
                  Zip/Postal Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required={deliveryMethod === "delivery"}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  placeholder="00100"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            <h4 className="text-white font-medium">Pickup Location</h4>

            <div className="space-y-3">
              <div
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  formData.pickupLocation === "main-branch"
                    ? "border-primary bg-zinc-800"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-gray-500"
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    pickupLocation: "main-branch",
                  })
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.pickupLocation === "main-branch"
                        ? "border-primary"
                        : "border-gray-500"
                    }`}
                  >
                    {formData.pickupLocation === "main-branch" && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="font-medium text-white">
                    Main Branch - CBD
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-1 ml-7">
                  123 Fitness Street, Central Business District
                </p>
              </div>

              <div
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  formData.pickupLocation === "westlands"
                    ? "border-primary bg-zinc-800"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-gray-500"
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    pickupLocation: "westlands",
                  })
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.pickupLocation === "westlands"
                        ? "border-primary"
                        : "border-gray-500"
                    }`}
                  >
                    {formData.pickupLocation === "westlands" && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="font-medium text-white">
                    Westlands Branch
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-1 ml-7">
                  456 Westlands Road, Westlands
                </p>
              </div>

              <div
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  formData.pickupLocation === "karen"
                    ? "border-primary bg-zinc-800"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-gray-500"
                }`}
                onClick={() =>
                  setFormData({ ...formData, pickupLocation: "karen" })
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      formData.pickupLocation === "karen"
                        ? "border-primary"
                        : "border-gray-500"
                    }`}
                  >
                    {formData.pickupLocation === "karen" && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="font-medium text-white">Karen Branch</span>
                </div>
                <p className="text-gray-400 text-xs mt-1 ml-7">
                  789 Karen Road, Karen
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutStep1;
