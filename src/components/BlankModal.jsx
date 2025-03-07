import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  CreditCard,
  Calendar,
  User,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const MembershipModal = ({ isOpen, onClose }) => {
  // State management
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position and lock scrolling
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position when modal is closed
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    return () => {
      // Cleanup function to ensure scroll is restored if component unmounts
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSelectedPlan(null);
      setSuccess(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    }
  }, [isOpen]);

  // Membership plans data
  const membershipPlans = [
    {
      id: "basic",
      name: "Basic",
      price: 29.99,
      duration: "Monthly",
      features: [
        "Access to gym equipment",
        "Locker room access",
        "Fitness assessment",
      ],
      color: "bg-zinc-700",
    },
    {
      id: "premium",
      name: "Premium",
      price: 49.99,
      duration: "Monthly",
      features: [
        "All Basic features",
        "Group fitness classes",
        "Personal trainer (1 session/month)",
        "Nutrition consultation",
      ],
      color: "bg-primary",
      recommended: true,
    },
    {
      id: "elite",
      name: "Elite",
      price: 99.99,
      duration: "Monthly",
      features: [
        "All Premium features",
        "Unlimited personal training",
        "Spa access",
        "Priority booking",
        "Exclusive events",
      ],
      color: "bg-gradient-to-r from-amber-500 to-amber-700",
    },
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);

      // Reset after 3 seconds and close
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
        setSelectedPlan(null);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error processing membership:", error);
    } finally {
      setLoading(false);
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
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
            className="bg-zinc-800/90 backdrop-blur-lg rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-300 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {success ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome to Elite Fitness!
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Your membership has been activated successfully.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {step === 1
                      ? "Choose Your Membership"
                      : "Complete Your Registration"}
                  </h2>
                  <p className="text-gray-400 mb-6">
                    {step === 1
                      ? "Select the plan that fits your fitness goals"
                      : "Just a few more details to activate your membership"}
                  </p>

                  {/* Progress indicator */}
                  <div className="flex items-center mb-8">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 1 ? "bg-primary" : "bg-zinc-700"
                      } text-white font-medium`}
                    >
                      1
                    </div>
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        step >= 2 ? "bg-primary" : "bg-zinc-700"
                      }`}
                    ></div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= 2 ? "bg-primary" : "bg-zinc-700"
                      } text-white font-medium`}
                    >
                      2
                    </div>
                  </div>

                  {step === 1 ? (
                    /* Step 1: Plan Selection */
                    <div className="space-y-4">
                      {membershipPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`${
                            selectedPlan === plan.id
                              ? "ring-2 ring-primary"
                              : "hover:bg-zinc-700/50"
                          } ${
                            plan.color
                          } relative rounded-xl p-5 cursor-pointer transition-all duration-200`}
                          onClick={() => setSelectedPlan(plan.id)}
                        >
                          {plan.recommended && (
                            <div className="absolute -top-3 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                              RECOMMENDED
                            </div>
                          )}
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                {plan.name}
                              </h3>
                              <p className="text-gray-300 text-sm">
                                {plan.duration}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-white">
                                ${plan.price}
                              </div>
                              <p className="text-gray-300 text-sm">per month</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <ul className="space-y-2">
                              {plan.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-gray-200"
                                >
                                  <Check className="w-4 h-4 mr-2 text-green-400" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}

                      <div className="pt-6">
                        <button
                          onClick={() => setStep(2)}
                          disabled={!selectedPlan}
                          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 ${
                            selectedPlan
                              ? "bg-primary text-white hover:bg-primary/90"
                              : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                          } transition-colors`}
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Step 2: Payment Information */
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="bg-zinc-700/30 p-4 rounded-xl mb-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {
                                membershipPlans.find(
                                  (p) => p.id === selectedPlan
                                )?.name
                              }{" "}
                              Plan
                            </h3>
                            <p className="text-gray-300 text-sm">
                              Monthly Membership
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">
                              $
                              {
                                membershipPlans.find(
                                  (p) => p.id === selectedPlan
                                )?.price
                              }
                            </div>
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              className="text-primary text-sm hover:underline"
                            >
                              Change
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-300 mb-1 text-sm">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                              className="w-full bg-zinc-700/50 border border-zinc-600 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              Email
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-zinc-700/50 border border-zinc-600 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              Phone
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full bg-zinc-700/50 border border-zinc-600 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="(123) 456-7890"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-300 mb-1 text-sm">
                            Card Number
                          </label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              required
                              className="w-full bg-zinc-700/50 border border-zinc-600 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              Expiry Date
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                required
                                className="w-full bg-zinc-700/50 border border-zinc-600 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="MM/YY"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              required
                              className="w-full bg-zinc-700/50 border border-zinc-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center"
                        >
                          {loading ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Complete Registration"
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MembershipModal;
