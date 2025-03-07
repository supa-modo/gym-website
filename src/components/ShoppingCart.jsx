import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiX,
  FiPlus,
  FiMinus,
  FiCheck,
  FiTrash2,
  FiArrowLeft,
  FiArrowRight,
  FiShoppingBag,
  FiCreditCard,
  FiMapPin,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { useStore } from "../context/StoreContext.jsx";
import CheckoutStep1 from "./checkout/CheckoutStep1";
import CheckoutStep2 from "./checkout/CheckoutStep2";
import CheckoutStep3 from "./checkout/CheckoutStep3";
import CheckoutSummary from "./checkout/CheckoutSummary";

const ShoppingCart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    orderComplete,
    handleCompleteOrder,
    clearCart,
  } = useStore();

  // View state (cart or checkout)
  const [currentView, setCurrentView] = useState("cart");

  // Checkout state
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

  // Animation states
  const [slideDirection, setSlideDirection] = useState("right");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isCartOpen) {
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
  }, [isCartOpen]);

  // Reset states when modal is closed
  useEffect(() => {
    if (!isCartOpen) {
      resetAllStates();
    }
  }, [isCartOpen]);

  // Reset all states
  const resetAllStates = () => {
    setCurrentView("cart");
    setStep(1);
    setError(null);
    setSuccess(false);
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
  };

  // Handle transition to checkout
  const handleProceedToCheckout = () => {
    setSlideDirection("left");
    setCurrentView("checkout");
  };

  // Handle back to cart
  const handleBackToCart = () => {
    setSlideDirection("right");
    setCurrentView("cart");
  };

  // Navigation functions for checkout steps
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
        setIsCartOpen(false);
        resetAllStates();
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

  // Calculate progress percentage
  const progressPercentage = (step / 3) * 100;

  // Modal animation variants
  const modalVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "tween", duration: 0.3 } },
    exit: { x: "100%", transition: { type: "tween", duration: 0.3 } },
  };

  // Content animation variants
  const contentVariants = {
    enter: (direction) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3 },
    },
    exit: (direction) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3 },
    }),
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm sm:max-w-md md:max-w-lg">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full flex flex-col bg-zinc-900 shadow-xl"
            >
              {/* Modal Header */}
              <div
                className={`flex ${
                  currentView === "checkout" && !success ? "flex-col" : ""
                } justify-between items-center p-3 sm:p-4 border-b border-zinc-800`}
              >
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    {success ? (
                      "Order Complete"
                    ) : currentView === "cart" ? (
                      <>
                        <FiShoppingCart className="w-5 h-5" />
                        Your Cart
                      </>
                    ) : (
                      "Checkout"
                    )}
                  </h2>
                  <div className="flex items-center gap-2">
                    {currentView === "cart" &&
                      cart.length > 0 &&
                      !orderComplete && (
                        <button
                          onClick={() => clearCart()}
                          className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm"
                          title="Clear cart"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Clear</span>
                        </button>
                      )}
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                      disabled={loading}
                    >
                      <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>

                {/* Checkout Progress Indicator */}
                {currentView === "checkout" && !success && (
                  <div className="mt-4 w-full">
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
              <div className="flex-1 overflow-hidden relative">
                <AnimatePresence initial={false} custom={slideDirection}>
                  {/* Cart View */}
                  {currentView === "cart" && (
                    <motion.div
                      key="cart-view"
                      custom={slideDirection}
                      variants={contentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 overflow-y-auto"
                    >
                      <div className="p-3 sm:p-4">
                        {orderComplete ? (
                          <div className="flex flex-col items-center justify-center h-full text-center gap-3 sm:gap-4">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center">
                              <FiCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white">
                              Thank You!
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base">
                              Your order has been placed successfully.
                            </p>
                          </div>
                        ) : cart.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            <FiShoppingCart className="w-14 h-14 sm:w-16 sm:h-16 text-gray-600 mb-3 sm:mb-4" />
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                              Your cart is empty
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
                              Add some products to your cart and they will
                              appear here.
                            </p>
                            <button
                              onClick={() => setIsCartOpen(false)}
                              className="bg-primary text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl font-medium text-sm sm:text-base"
                            >
                              Continue Shopping
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3 sm:space-y-4">
                            {cart.map((item) => (
                              <motion.div
                                key={`${item.id}-${item.color}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex gap-3 sm:gap-4 p-2 sm:p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-800/80 transition-colors"
                              >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-zinc-700 rounded-lg overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <h4 className="text-white font-medium text-sm sm:text-base">
                                      {item.name}
                                    </h4>
                                    <button
                                      onClick={() =>
                                        removeFromCart(item.id, item.color)
                                      }
                                      className="text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                      <FiX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </button>
                                  </div>

                                  {item.color !== "default" && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <span className="text-gray-400 text-xs">
                                        Color:
                                      </span>
                                      <div
                                        className="w-3 h-3 rounded-full"
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
                                      <span className="text-gray-400 text-xs capitalize">
                                        {item.color}
                                      </span>
                                    </div>
                                  )}

                                  <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center bg-zinc-700 rounded-lg overflow-hidden">
                                      <button
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            item.quantity - 1,
                                            item.color
                                          )
                                        }
                                        className="px-2 py-1 text-gray-400 hover:text-white hover:bg-zinc-600 transition-colors"
                                      >
                                        <FiMinus className="w-3 h-3" />
                                      </button>
                                      <span className="px-2 text-white text-sm">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            item.quantity + 1,
                                            item.color
                                          )
                                        }
                                        className="px-2 py-1 text-gray-400 hover:text-white hover:bg-zinc-600 transition-colors"
                                      >
                                        <FiPlus className="w-3 h-3" />
                                      </button>
                                    </div>

                                    <div className="text-primary font-medium text-sm sm:text-base">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Cart Footer */}
                      {!orderComplete && cart.length > 0 && (
                        <div className="p-3 sm:p-4 border-t border-zinc-800">
                          <div className="space-y-3 sm:space-y-4 mb-4">
                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm sm:text-base">
                                Subtotal
                              </span>
                              <span className="text-white font-medium text-sm sm:text-base">
                                ${cartTotal.toFixed(2)}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-gray-400 text-sm sm:text-base">
                                Shipping
                              </span>
                              <span className="text-white font-medium text-sm sm:text-base">
                                $0.00
                              </span>
                            </div>

                            <div className="flex justify-between pt-2 border-t border-zinc-700">
                              <span className="text-white font-bold text-sm sm:text-base">
                                Total
                              </span>
                              <span className="text-primary font-bold text-sm sm:text-base">
                                ${cartTotal.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleProceedToCheckout}
                              className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base
                                     hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                            >
                              Proceed to Checkout <IoArrowForward />
                            </motion.button>

                            <button
                              onClick={() => setIsCartOpen(false)}
                              className="w-full py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors"
                            >
                              Continue Shopping
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Checkout View */}
                  {currentView === "checkout" && (
                    <motion.div
                      key="checkout-view"
                      custom={slideDirection}
                      variants={contentVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 overflow-y-auto"
                    >
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
                              Order #EFG-
                              {Math.floor(100000 + Math.random() * 900000)}
                            </p>
                            <p className="text-gray-400 text-sm mb-8">
                              We've sent a confirmation email to{" "}
                              {formData.email}
                            </p>
                            <button
                              onClick={() => setIsCartOpen(false)}
                              className="bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                            >
                              Continue Shopping
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Step Navigation */}
                            <div className="flex justify-between items-center">
                              {step > 1 ? (
                                <button
                                  type="button"
                                  onClick={prevStep}
                                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                                  disabled={loading}
                                >
                                  <FiArrowLeft className="w-4 h-4" />
                                  Back
                                </button>
                              ) : (
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

                      {/* Order Summary */}
                      {!success && (
                        <CheckoutSummary
                          deliveryMethod={deliveryMethod}
                          cartTotal={cartTotal}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
