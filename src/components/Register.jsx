import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, CreditCard, ChevronLeft } from "lucide-react";
import { FaCreditCard, FaMobileAlt } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

const JoinNowModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [period, setPeriod] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    plan: null,
    period: "monthly",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    mpesaNumber: "",
  });

  const periods = {
    weekly: { label: "Weekly", multiplier: 1 },
    monthly: { label: "Monthly", multiplier: 3.5 },
    yearly: { label: "Yearly", multiplier: 35 },
  };

  const plans = [
    {
      name: "Beginner Plan",
      price: 25,
      color: "from-blue-600 to-cyan-600",
      features: [
        "Access to gym equipment",
        "Basic fitness assessment",
        "2 Group classes per week",
        "Locker room access",
      ],
    },
    {
      name: "Premium Plan",
      price: 45,
      color: "from-primary to-red-600",
      features: [
        "Unlimited group classes",
        "3 Personal trainer sessions",
        "Nutrition consultation",
        "Access to spa facilities",
      ],
    },
    {
      name: "Elite Plan",
      price: 75,
      color: "from-yellow-600 to-amber-600",
      features: [
        "Unlimited PT sessions",
        "Custom meal plans",
        "VIP member events",
        "24/7 support",
      ],
    },
  ];

  const calculatePrice = (basePrice) => {
    const price = basePrice * periods[period].multiplier;
    return price % 1 === 0 ? price : price.toFixed(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Submission Data:", formData);
    setStep(3);
  };

  const handleClose = () => {
    // Reset all state values
      
      onClose();
      // Reset all state to initial values
      setStep(1);
      setSelectedPlan(null);
      setPeriod("monthly");
      setPaymentMethod("card");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        plan: null,
        period: "monthly",
        paymentMethod: "card",
        cardNumber: "",
        cardExpiry: "",
        cardCVV: "",
        mpesaNumber: "",
      });
    
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-zinc-800/90 backdrop-blur-lg rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            // Stop propagation to prevent closing when clicking inside the modal
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                onClose();
                // Reset all state to initial values
                setStep(1);
                setSelectedPlan(null);
                setPeriod("monthly");
                setPaymentMethod("card");
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  plan: null,
                  period: "monthly",
                  paymentMethod: "card",
                  cardNumber: "",
                  cardExpiry: "",
                  cardCVV: "",
                  mpesaNumber: "",
                });
              }}
              className="absolute top-4 right-4 text-gray-300 hover:text-white z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Step 1: Plan Selection */}
            {step === 1 && (
              <div className="p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                  Choose Your Membership Plan
                </h2>

                {/* Period Toggle */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center p-1 bg-zinc-800/50 backdrop-blur-sm rounded-xl">
                    {Object.keys(periods).map((key) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPeriod(key)}
                        className={`relative px-6 py-2 text-sm sm:text-base rounded-lg transition-all duration-300
                          ${
                            period === key
                              ? "text-white"
                              : "text-gray-400 hover:text-gray-300"
                          }`}
                      >
                        {period === key && (
                          <motion.div
                            layoutId="periodBubble"
                            className="absolute inset-0 bg-gradient-to-r from-primary to-red-600 rounded-lg"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <span className="relative z-10">
                          {periods[key].label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <motion.div
                      key={plan.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedPlan(plan);
                        setFormData((prev) => ({
                          ...prev,
                          plan: { ...plan, price: calculatePrice(plan.price) },
                          period: period,
                        }));
                        setStep(2);
                      }}
                      className={`
                        cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300
                        ${
                          selectedPlan?.name === plan.name
                            ? "border-primary bg-gradient-to-br " + plan.color
                            : "border-zinc-700 bg-zinc-800/50 hover:border-primary/50"
                        }
                      `}
                    >
                      <h3 className="text-xl font-bold text-white mb-4">
                        {plan.name}
                      </h3>
                      <div className="text-3xl font-bold text-white mb-4">
                        ${calculatePrice(plan.price)}/{period.slice(0, 1)}
                      </div>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-gray-300"
                          >
                            <BsCheckLg className="mr-2 text-amber-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Personal & Payment Information */}
            {step === 2 && (
              <div className="p-8 sm:p-12">
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => setStep(1)}
                    className="mr-4 text-gray-300 hover:text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Complete Your Membership
                  </h2>
                </div>

                {/* Selected Plan Summary */}
                <div className="bg-zinc-700/50 rounded-xl p-4 mb-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {selectedPlan.name}
                    </h3>
                    <p className="text-gray-300">
                      {periods[period].label} Billing
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    ${calculatePrice(selectedPlan.price)}/{period.slice(0, 1)}
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Choose Payment Method
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setPaymentMethod("card");
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethod: "card",
                        }));
                      }}
                      className={`p-4 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all
                        ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/10"
                            : "border-zinc-700 hover:border-zinc-600"
                        }`}
                    >
                      <FaCreditCard
                        className={`w-8 h-8 mr-3 ${
                          paymentMethod === "card"
                            ? "text-primary"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={
                          paymentMethod === "card"
                            ? "text-white"
                            : "text-gray-400"
                        }
                      >
                        Credit Card
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setPaymentMethod("mpesa");
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethod: "mpesa",
                        }));
                      }}
                      className={`p-4 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all
                        ${
                          paymentMethod === "mpesa"
                            ? "border-primary bg-primary/10"
                            : "border-zinc-700 hover:border-zinc-600"
                        }`}
                    >
                      <FaMobileAlt
                        className={`w-8 h-8 mr-3 ${
                          paymentMethod === "mpesa"
                            ? "text-primary"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={
                          paymentMethod === "mpesa"
                            ? "text-white"
                            : "text-gray-400"
                        }
                      >
                        M-Pesa
                      </span>
                    </motion.div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-gray-300 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-zinc-700 rounded-xl text-white 
                            focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter first name"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-gray-300 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-zinc-700 rounded-xl text-white 
                            focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="relative">
                    <label className="block text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-zinc-700 rounded-xl text-white 
                          focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-zinc-700 rounded-xl text-white 
                          focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  {/* Payment Method Specific Fields */}
                  {paymentMethod === "card" ? (
                    <>
                      <div className="relative">
                        <label className="block text-gray-300 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="1234 5678 9012 3456"
                            className="w-full pl-10 pr-4 py-3 bg-zinc-700 rounded-xl text-white 
                              focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="block text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            required
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-zinc-700 rounded-xl text-white 
                              focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="relative">
                          <label className="block text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cardCVV"
                            value={formData.cardCVV}
                            onChange={handleInputChange}
                            required
                            placeholder="123"
                            className="w-full px-4 py-3 bg-zinc-700 rounded-xl text-white 
                              focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="relative">
                      <label className="block text-gray-300 mb-2">
                        M-Pesa Phone Number
                      </label>
                      <div className="relative">
                        <FaMobileAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="mpesaNumber"
                          value={formData.mpesaNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter M-Pesa registered number"
                          className="w-full pl-10 pr-4 py-3 bg-zinc-700 rounded-xl text-white 
                            focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        You will receive a payment prompt on this number
                      </p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-red-600 text-white 
                      py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/20 
                      transition-all duration-300"
                  >
                    Complete Registration
                  </motion.button>
                </form>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="p-8 sm:p-12 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="bg-primary/20 w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6"
                >
                  <BsCheckLg className="w-16 h-16 text-primary" />
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Registration Successful!
                </h2>

                <p className="text-gray-300 mb-6">
                  Welcome to Elite Fitness, {formData.firstName}! Your{" "}
                  {selectedPlan.name} ({period} plan) is now active. We'll send
                  a confirmation to {formData.email} shortly.
                  {paymentMethod === "mpesa" &&
                    " Please complete the payment via the M-Pesa prompt sent to your phone."}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="bg-primary text-white px-10 py-3 rounded-xl font-semibold 
                    hover:bg-red-700 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default JoinNowModal;
