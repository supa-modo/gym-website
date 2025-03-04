import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck, FiArrowLeft, FiArrowRight } from "react-icons/fi";
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

  // Navigation functions
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setError(null);
    setSuccess(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const isSuccessful = Math.random() < 0.8;
      if (!isSuccessful) throw new Error("Payment failed. Please try again.");

      setSuccess(true);
      handleCompleteOrder();
      setTimeout(handleClose, 5000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md md:max-w-xl bg-zinc-900 shadow-xl overflow-y-auto">
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
                  <div className="text-gray-400 text-sm">Step {step} of 3</div>
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
                        Confirm Payment
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
            <CheckoutSummary
              deliveryMethod={deliveryMethod}
              cartTotal={cartTotal}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutModal;
