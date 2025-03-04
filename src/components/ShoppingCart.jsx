import React from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiX, FiPlus, FiMinus, FiCheck } from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { useStore } from "../context/StoreContext.jsx";
import CheckoutModal from "./checkout/CheckoutModal.jsx";

const ShoppingCart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    orderComplete,
    setIsCheckoutOpen,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />

        <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm sm:max-w-md md:max-w-lg bg-zinc-900 shadow-xl">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="h-full flex flex-col"
          >
            {/* Cart Header */}
            <div className="flex justify-between items-center p-3 sm:p-4 border-b border-zinc-800">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <FiShoppingCart className="w-5 h-5" />
                {orderComplete ? "Order Complete" : "Your Cart"}
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
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
                    Add some products to your cart and they will appear here.
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
                    <div
                      key={`${item.id}-${item.color}`}
                      className="flex gap-3 sm:gap-4 p-2 sm:p-3 bg-zinc-800/50 rounded-xl"
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
                            onClick={() => removeFromCart(item.id, item.color)}
                            className="text-gray-500 hover:text-red-500"
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
                              className="px-2 py-1 text-gray-400 hover:text-white hover:bg-zinc-600"
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
                              className="px-2 py-1 text-gray-400 hover:text-white hover:bg-zinc-600"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-primary font-medium text-sm sm:text-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {!orderComplete && cart.length > 0 && (
              <div className="p-3 sm:p-4 border-t border-zinc-800">
                <div className="flex justify-between mb-3 sm:mb-4">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Subtotal
                  </span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between mb-3 sm:mb-4">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Shipping
                  </span>
                  <span className="text-white font-medium text-sm sm:text-base">
                    $0.00
                  </span>
                </div>

                <div className="flex justify-between mb-4 sm:mb-6">
                  <span className="text-white font-bold text-sm sm:text-base">
                    Total
                  </span>
                  <span className="text-primary font-bold text-sm sm:text-base">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsCheckoutOpen(true);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-primary text-white py-2 sm:py-3 rounded-xl font-bold text-sm sm:text-base
                         hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  Checkout <IoArrowForward />
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <CheckoutModal />
    </>
  );
};

export default ShoppingCart;
