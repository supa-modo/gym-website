import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiCheck, FiShoppingCart } from "react-icons/fi";
import { useStore } from "../context/StoreContext.jsx";
import ProductDetailsModal from "./ProductDetailsModal.jsx";

// Product Card Component - Updated to open the modal
const ProductCard = ({ product }) => {
  const { addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [adding, setAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    setAdding(true);
    addToCart(product, 1, selectedColor);
    setTimeout(() => setAdding(false), 1500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group relative bg-zinc-800/70 backdrop-blur-sm rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Product Image */}
        <div className="relative h-40 sm:h-48 md:h-60 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-10"></div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />

          {/* Quick add button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 z-20 bg-primary text-white p-1.5 sm:p-2 rounded-full 
                       shadow-lg shadow-black/30 hover:bg-red-700 transition-colors"
            disabled={adding}
          >
            {adding ? (
              <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4 border-t border-gray-700 flex flex-col flex-grow">
          <div className="flex flex-col flex-grow">
            <div className="items-start mb-1 sm:mb-2">
              <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
                {product.name}
              </h3>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Size and Color Selection */}
            <div className="flex justify-between space-x-2 sm:space-x-3 mb-2 sm:mb-3">
              {product.sizes && (
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSize(size);
                      }}
                      className={`px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs rounded-lg border ${
                        selectedSize === size
                          ? "border-primary text-primary"
                          : "border-gray-400 text-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}

              {product.colors && (
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColor(color);
                      }}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-primary"
                          : "border-gray-400"
                      }`}
                      style={{
                        backgroundColor:
                          color === "default"
                            ? "#777"
                            : color === "black"
                            ? "#222"
                            : color === "white"
                            ? "#f8f8f8"
                            : color === "red"
                            ? "#ef4444"
                            : color === "blue"
                            ? "#3b82f6"
                            : color === "navy"
                            ? "#1e3a8a"
                            : color === "gray"
                            ? "#4b5563"
                            : "#777",
                      }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-auto items-center mb-2 sm:mb-4">
              <div>
                {/* Rating */}
                <div className="flex items-end gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-500"
                            : "text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-400 text-[10px] sm:text-xs">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-500 uppercase font-sans text-[10px] sm:text-xs">
                  KES.{" "}
                </span>
                <span className="font-semibold text-green-600 text-sm sm:text-base md:text-lg">
                  {product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening the modal
              handleAddToCart();
            }}
            className={`w-full ${
              adding ? "bg-green-600" : "bg-primary"
            } text-white py-1.5 sm:py-2 rounded-lg 
             font-medium text-xs sm:text-sm transition-all duration-300 
             border border-transparent hover:border-white`}
            disabled={adding}
          >
            {adding ? (
              <>
                <FiCheck className="inline-block w-4 h-4 mr-2" />
                Added
              </>
            ) : (
              <>
                <FiShoppingCart className="inline-block w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      <ProductDetailsModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
