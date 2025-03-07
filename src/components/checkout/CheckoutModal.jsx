import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
  FiShoppingBag,
  FiCreditCard,
  FiMapPin,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import CheckoutStep1 from "./CheckoutStep1";
import CheckoutStep2 from "./CheckoutStep2";
import CheckoutStep3 from "./CheckoutStep3";
import CheckoutSummary from "./CheckoutSummary";
import { useStore } from "../../context/StoreContext";

const CheckoutModal = () => {
  const {
    cartTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    handleCompleteOrder,
    cart,
    setIsCartOpen,
  } = useStore();

  // State management
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    mpesaNumber: "",
    pickupLocation: "main-branch",
  });
  const [showExitAnimation, setShowExitAnimation] = useState(false);

  // Lock body scroll when checkout modal is open
  useEffect(() => {
    if (isCheckoutOpen) {
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
  }, [isCheckoutOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isCheckoutOpen) {
      setStep(1);
      setError(null);
      setSuccess(false);
      setShowExitAnimation(false);
    }
  }, [isCheckoutOpen]);

  // Navigation functions
  const nextStep = () => {
    // Add slide animation between steps
    const container = document.getElementById("checkout-steps-container");
    if (container) {
      container.classList.add("animate-slide-left");
      setTimeout(() => {
        setStep(step + 1);
        container.classList.remove("animate-slide-left");
      }, 300);
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    // Add slide animation between steps
    const container = document.getElementById("checkout-steps-container");
    if (container) {
      container.classList.add("animate-slide-right");
      setTimeout(() => {
        setStep(step - 1);
        container.classList.remove("animate-slide-right");
      }, 300);
    } else {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    setShowExitAnimation(true);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setStep(1);
      setError(null);
      setSuccess(false);
      setShowExitAnimation(false);
      // Reset form data
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
        mpesaNumber: "",
        pickupLocation: "main-branch",
      });
      setDeliveryMethod("delivery");
      setPaymentMethod("card");
    }, 300);
  };

  const handleBackToCart = () => {
    setShowExitAnimation(true);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setIsCartOpen(true);
      setStep(1);
      setError(null);
      setSuccess(false);
      setShowExitAnimation(false);
    }, 300);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate payment processing with progress feedback
      await simulatePaymentProcess();
      setSuccess(true);
      handleCompleteOrder();

      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 5000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simulate payment processing with steps
  const simulatePaymentProcess = async () => {
    const steps = [
      { message: "Validating payment information...", time: 1000 },
      { message: "Processing payment...", time: 2000 },
      { message: "Confirming order...", time: 1000 },
      { message: "Finalizing...", time: 1000 },
    ];

    for (const step of steps) {
      setError(step.message);
      await new Promise((resolve) => setTimeout(resolve, step.time));
    }

    // 10% chance of payment failure for testing
    if (Math.random() < 0.1) {
      throw new Error(
        "Payment failed. Please try again or use a different payment method."
      );
    }

    setError(null);
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "tween", duration: 0.3 } },
    exit: {
      x: showExitAnimation ? "-100%" : "100%",
      transition: { type: "tween", duration: 0.3 },
    },
  };

  if (!isCheckoutOpen) return null;

  // Calculate progress percentage
  const progressPercentage = (step / 3) * 100;

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md md:max-w-xl overflow-hidden">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full flex flex-col bg-zinc-900 shadow-xl"
            >
              {/* Modal Header */}
              <div className="flex flex-col p-4 border-b border-zinc-800">
                <div className="flex justify-between items-center">
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

                {!success && (
                  <div className="mt-4">
                    {/* Progress bar */}
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: `${((step - 1) / 3) * 100}%` }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Step indicators */}
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            step >= 1
                              ? "bg-primary text-white"
                              : "bg-zinc-700 text-zinc-400"
                          }`}
                        >
                          <FiMapPin
                            className={
                              step >= 1 ? "text-white" : "text-zinc-400"
                            }
                          />
                        </div>
                        <span
                          className={`ml-1 text-xs ${
                            step >= 1 ? "text-white" : "text-zinc-400"
                          }`}
                        >
                          Delivery
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            step >= 2
                              ? "bg-primary text-white"
                              : "bg-zinc-700 text-zinc-400"
                          }`}
                        >
                          <FiCreditCard
                            className={
                              step >= 2 ? "text-white" : "text-zinc-400"
                            }
                          />
                        </div>
                        <span
                          className={`ml-1 text-xs ${
                            step >= 2 ? "text-white" : "text-zinc-400"
                          }`}
                        >
                          Payment
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            step >= 3
                              ? "bg-primary text-white"
                              : "bg-zinc-700 text-zinc-400"
                          }`}
                        >
                          <FiShoppingBag
                            className={
                              step >= 3 ? "text-white" : "text-zinc-400"
                            }
                          />
                        </div>
                        <span
                          className={`ml-1 text-xs ${
                            step >= 3 ? "text-white" : "text-zinc-400"
                          }`}
                        >
                          Review
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto">
                <div id="checkout-steps-container" className="p-4">
                  {success ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                        <FiCheck className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Your order has been placed successfully.
                      </p>
                      <p className="text-gray-300 mb-2">
                        Order #EFG-{Math.floor(100000 + Math.random() * 900000)}
                      </p>
                      <p className="text-gray-400 text-sm mb-8">
                        We've sent a confirmation email to {formData.email}
                      </p>
                      <button
                        onClick={handleClose}
                        className="bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Step Navigation */}
                      <div className="flex justify-between items-center">
                        {step > 1 && (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                            disabled={loading}
                          >
                            <FiArrowLeft className="w-4 h-4" />
                            Back
                          </button>
                        )}
                        {step === 1 && (
                          <button
                            type="button"
                            onClick={handleBackToCart}
                            className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                          >
                            <FiArrowLeft className="w-4 h-4" />
                            Back to Cart
                          </button>
                        )}
                      </div>

                      {/* Render Current Step */}
                      {step === 1 && (
                        <CheckoutStep1
                          deliveryMethod={deliveryMethod}
                          setDeliveryMethod={setDeliveryMethod}
                          formData={formData}
                          setFormData={setFormData}
                        />
                      )}
                      {step === 2 && (
                        <CheckoutStep2
                          paymentMethod={paymentMethod}
                          setPaymentMethod={setPaymentMethod}
                          formData={formData}
                          setFormData={setFormData}
                        />
                      )}
                      {step === 3 && (
                        <CheckoutStep3
                          formData={{ ...formData, items: cart }}
                          deliveryMethod={deliveryMethod}
                          paymentMethod={paymentMethod}
                        />
                      )}

                      {/* Trust Badges */}
                      <div className="flex justify-center space-x-4 py-2 border-t border-zinc-800">
                        <div className="flex items-center text-gray-400 text-xs">
                          <FiShield className="w-4 h-4 mr-1" />
                          Secure Payment
                        </div>
                        <div className="flex items-center text-gray-400 text-xs">
                          <FiTruck className="w-4 h-4 mr-1" />
                          Fast Delivery
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div
                          className={`p-3 rounded-lg text-sm ${
                            loading
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {loading ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-2 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              {error}
                            </div>
                          ) : (
                            error
                          )}
                        </div>
                      )}

                      {/* Next/Submit Button */}
                      <div className="pt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type={step === 3 ? "submit" : "button"}
                          onClick={step === 3 ? undefined : nextStep}
                          disabled={loading}
                          className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              Processing...
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            </>
                          ) : step === 3 ? (
                            <>
                              Complete Order
                              <FiCheck className="w-5 h-5" />
                            </>
                          ) : (
                            <>
                              Continue
                              <FiArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              {!success && (
                <CheckoutSummary
                  deliveryMethod={deliveryMethod}
                  cartTotal={cartTotal}
                />
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;

// Add these styles to your CSS or tailwind.config.js
// @keyframes slideLeft {
//   from { transform: translateX(0); }
//   to { transform: translateX(-10px); opacity: 0; }
// }
// @keyframes slideRight {
//   from { transform: translateX(0); }
//   to { transform: translateX(10px); opacity: 0; }
// }
// .animate-slide-left {
//   animation: slideLeft 0.3s forwards;
// }
// .animate-slide-right {
//   animation: slideRight 0.3s forwards;
// }
