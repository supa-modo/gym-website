import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCreditCard,
  FiTruck,
  FiUser,
  FiX,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
  FiMapPin,
  FiPhone,
  FiMail,
  FiDollarSign,
  FiShield,
} from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { SiVisa, SiMastercard, SiStripe } from "react-icons/si";
import { FaMobile } from "react-icons/fa";
import { useStore } from "../context/StoreContext.jsx";

const CheckoutModal = () => {
  const {
    cartTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    handleCompleteOrder,
    cart,
  } = useStore();

  // State for multi-step form
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Personal details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Delivery address (for delivery method)
    address: "",
    city: "",
    zipCode: "",

    // Payment details
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",

    // M-Pesa details
    mpesaNumber: "",

    // Pick-up details
    pickupLocation: "main-branch", // default value
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle delivery method change
  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method);
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setError(null); // Clear any previous errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate payment processing
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Randomly succeed or fail (80% success rate for demo)
      const isSuccessful = Math.random() < 0.8;

      if (!isSuccessful) {
        throw new Error(
          paymentMethod === "card"
            ? "Payment declined. Please check your card details and try again."
            : "M-Pesa payment failed. Please try again."
        );
      }

      // If successful, set success state and trigger order complete
      setSuccess(true);
      handleCompleteOrder();

      // Reset form after successful submission
      setTimeout(() => {
        setIsCheckoutOpen(false);
        setSuccess(false);
        setStep(1);
        // Reset form data here if needed
      }, 5000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Navigate between steps
  const nextStep = () => {
    setStep(step + 1);
    setError(null);
  };

  const prevStep = () => {
    setStep(step - 1);
    setError(null);
  };

  // Close modal and reset state
  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setError(null);
    setSuccess(false);
    // You may want to reset form data here too
  };

  // Calculate total with delivery fee
  const deliveryFee = deliveryMethod === "delivery" ? 5.99 : 0;
  const totalWithDelivery = cartTotal + deliveryFee;

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && !loading && !success) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [loading, success]);

  if (!isCheckoutOpen) return null;

  // Conditionally render different steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Personal Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-gray-400 text-sm mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="John"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-gray-400 text-sm mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-400 text-sm mb-1"
              >
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
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-gray-400 text-sm mb-1"
              >
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
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="+254 7XX XXX XXX"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Delivery Method</h3>

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
                    <span className="font-medium text-white">
                      Home Delivery
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-2 ml-8">
                  Get your items delivered to your doorstep
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
                    <span className="font-medium text-white">Store Pickup</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-2 ml-8">
                  Pick up your items from our store
                </p>
                <p className="text-green-500 text-sm font-medium mt-2 ml-8">
                  Free
                </p>
              </div>
            </div>

            {deliveryMethod === "delivery" && (
              <div className="space-y-4 mt-6 pt-6 border-t border-zinc-700">
                <h4 className="text-white font-medium">Delivery Address</h4>

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
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
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
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
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
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="00100"
                    />
                  </div>
                </div>
              </div>
            )}

            {deliveryMethod === "pickup" && (
              <div className="space-y-4 mt-6 pt-6 border-t border-zinc-700">
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
                      setFormData({ ...formData, pickupLocation: "westlands" })
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
                      <span className="font-medium text-white">
                        Karen Branch
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 ml-7">
                      789 Karen Road, Karen
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Payment Method</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-primary bg-zinc-800"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-gray-500"
                }`}
                onClick={() => handlePaymentMethodChange("card")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "card"
                        ? "border-primary"
                        : "border-gray-500"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCreditCard
                      className={
                        paymentMethod === "card"
                          ? "text-primary"
                          : "text-gray-400"
                      }
                    />
                    <span className="font-medium text-white">
                      Credit/Debit Card
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 ml-8">
                  <SiVisa className="w-8 h-8 text-blue-500" />
                  <SiMastercard className="w-8 h-8 text-yellow-500" />
                  <SiStripe className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  paymentMethod === "mpesa"
                    ? "border-primary bg-zinc-800"
                    : "border-zinc-700 bg-zinc-800/50 hover:border-gray-500"
                }`}
                onClick={() => handlePaymentMethodChange("mpesa")}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "mpesa"
                        ? "border-primary"
                        : "border-gray-500"
                    }`}
                  >
                    {paymentMethod === "mpesa" && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMobile
                      className={
                        paymentMethod === "mpesa"
                          ? "text-primary"
                          : "text-gray-400"
                      }
                    />
                    <span className="font-medium text-white">
                      Lipa na M-Pesa
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-2 ml-8">
                  Pay directly with your M-Pesa account
                </p>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4 pt-4 border-t border-zinc-700">
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-gray-400 text-sm mb-1"
                  >
                    Card Number
                  </label>
                  <div className="relative">
                    <FiCreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required={paymentMethod === "card"}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cardName"
                    className="block text-gray-400 text-sm mb-1"
                  >
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required={paymentMethod === "card"}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiryDate"
                      className="block text-gray-400 text-sm mb-1"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required={paymentMethod === "card"}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-gray-400 text-sm mb-1"
                    >
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required={paymentMethod === "card"}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                        placeholder="123"
                        maxLength="4"
                      />
                      <FiShield className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "mpesa" && (
              <div className="space-y-4 pt-4 border-t border-zinc-700">
                <div>
                  <label
                    htmlFor="mpesaNumber"
                    className="block text-gray-400 text-sm mb-1"
                  >
                    M-Pesa Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="tel"
                      id="mpesaNumber"
                      name="mpesaNumber"
                      value={formData.mpesaNumber}
                      onChange={handleChange}
                      required={paymentMethod === "mpesa"}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="07XX XXX XXX"
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    You'll receive a push notification on this number to
                    complete the payment
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Order Summary</h3>

            <div className="max-h-48 overflow-y-auto pr-2 space-y-3">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.color}`}
                  className="flex gap-3 bg-zinc-800/50 rounded-lg p-3"
                >
                  <div className="w-16 h-16 bg-zinc-700 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <span className="text-primary font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex text-gray-400 text-sm">
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
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 border-t border-b border-zinc-700">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Delivery Fee</span>
                <span
                  className={
                    deliveryMethod === "pickup"
                      ? "text-green-500"
                      : "text-white"
                  }
                >
                  {deliveryMethod === "pickup"
                    ? "Free"
                    : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-white font-bold mt-4">
                <span>Total</span>
                <span className="text-primary">
                  ${totalWithDelivery.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-medium">Personal Information</h4>
              <div className="bg-zinc-800/50 rounded-lg p-3">
                <p className="text-white">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-gray-400 text-sm">{formData.email}</p>
                <p className="text-gray-400 text-sm">{formData.phone}</p>
              </div>

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

              <h4 className="text-white font-medium">Payment Method</h4>
              <div className="bg-zinc-800/50 rounded-lg p-3">
                {paymentMethod === "card" ? (
                  <div className="flex items-center gap-2">
                    <FiCreditCard className="text-primary" />
                    <div>
                      <p className="text-white">
                        Credit Card ending in {formData.cardNumber.slice(-4)}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {formData.cardName}
                      </p>
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
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-zinc-900 shadow-xl">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="h-full flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center p-4 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              {success ? "Order Complete" : "Checkout"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
              disabled={loading}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {success ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <FiCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Thank You!</h3>
                <p className="text-gray-400">
                  Your order has been placed successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step Navigation */}
                <div className="flex justify-between items-center">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="text-gray-400 hover:text-white flex items-center gap-1"
                    >
                      <FiArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                  )}
                  <div className="text-gray-400 text-sm">Step {step} of 4</div>
                </div>

                {/* Render Current Step */}
                {renderStep()}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Next/Submit Button */}
                <div className="pt-4 border-t border-zinc-800">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type={step === 4 ? "submit" : "button"}
                    onClick={step === 4 ? null : nextStep}
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        Processing...
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : step === 4 ? (
                      <>
                        Complete Order
                        <FiCheck className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        Next
                        <FiArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          {!success && (
            <div className="p-4 border-t border-zinc-800">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery</span>
                <span
                  className={
                    deliveryMethod === "pickup"
                      ? "text-green-500"
                      : "text-white"
                  }
                >
                  {deliveryMethod === "pickup"
                    ? "Free"
                    : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-white font-bold mt-2">
                <span>Total</span>
                <span className="text-primary">
                  ${totalWithDelivery.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutModal;
