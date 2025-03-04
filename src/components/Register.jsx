import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, CreditCard } from "lucide-react";
import { BsCheckLg } from "react-icons/bs";

const JoinNowModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    plan: null,
  });

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
    // For now, we'll just advance to the final step
    setStep(3);
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
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-zinc-800/90 backdrop-blur-lg rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-300 hover:text-white z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Modal Content */}
            {step === 1 && (
              <div className="p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                  Choose Your Membership Plan
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <motion.div
                      key={plan.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedPlan(plan);
                        setFormData((prev) => ({ ...prev, plan: plan }));
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
                        ${plan.price}/mo
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

            {step === 2 && (
              <div className="p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                  Personal Information
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
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

            {step === 3 && (
              <div className="p-8 sm:p-12 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="bg-primary/20 w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6"
                >
                  <BsCheckLg className="w-16 h-16 text-primary" />
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Registration Successful!
                </h2>

                <p className="text-gray-300 mb-6">
                  Welcome to Elite Fitness, {formData.firstName}! We'll send a
                  confirmation email to {formData.email} shortly.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
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
