import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiPlus,
  FiMinus,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiArrowLeft,
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiInfo,
} from "react-icons/fi";
import { useStore } from "../context/StoreContext.jsx";
import { PiHeartDuotone } from "react-icons/pi";

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addToCart, cart, updateQuantity } = useStore();
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "default"
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlist, setWishlist] = useState(false);
  const [showColorName, setShowColorName] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState("");

  // Check if the product is already in the cart
  const isProductInCart = cart.some((item) => item.id === product.id);

  // Reset states when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || "default");
      setSelectedSize(product.sizes?.[0] || "");
      setQuantity(1);
      setCurrentImageIndex(0);
      setActiveTab("description");
      setWishlist(false);
    }
  }, [product]);

  // Add useEffect to handle body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!product || !isOpen) return null;

  const productImages = [
    product.image,
    `/images/shorts.jpg`,
    `/images/shaker.jpg`,
    `/images/gloves.jpg`,
    `/images/tshirt.jpg`,
    `/images/bag.jpg`,
  ];

  const handleAddToCart = () => {
    setAdding(true);
    addToCart(product, quantity, selectedColor);

    setTimeout(() => {
      setAdding(false);
    }, 1500);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + productImages.length) % productImages.length
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setWishlist(!wishlist);
  };

  const getColorName = (color) => {
    return color.charAt(0).toUpperCase() + color.slice(1);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedColorName(getColorName(color));
    setShowColorName(true);
    setTimeout(() => {
      setShowColorName(false);
    }, 1500);
  };

  const reviews = [
    {
      id: 1,
      user: "FitnessEnthusiast",
      rating: 5,
      comment: "Best product I've used. Really helped improve my workouts!",
      date: "2 months ago",
    },
    {
      id: 2,
      user: "GymLover42",
      rating: 4,
      comment: "Great quality, but I wish it came in more colors.",
      date: "3 weeks ago",
    },
    {
      id: 3,
      user: "StrengthTrainer",
      rating: 5,
      comment: "Excellent product. Will definitely buy again!",
      date: "1 month ago",
    },
  ];

  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="flex items-center justify-center min-h-screen p-2 sm:p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              style={{ maxHeight: "85vh" }}
              className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-3xl max-w-7xl w-full mx-auto overflow-hidden shadow-2xl border border-zinc-800"
            >
              <div className="flex flex-col md:flex-row h-[80vh] sm:h-[78vh] overflow-y-auto">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors bg-zinc-800/70 rounded-full p-2 hover:bg-primary"
                >
                  <FiX className="w-6 h-6" />
                </button>

                <div className="md:w-1/2 bg-gradient-to-b from-zinc-800 to-zinc-900">
                  <div className="relative h-60 sm:h-80 md:h-[31rem] bg-zinc-800 overflow-hidden group">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0.8, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={productImages[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-primary text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <FiChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-primary text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <FiChevronRight className="w-6 h-6" />
                    </button>
                    <AnimatePresence>
                      {showColorName && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-zinc-900/90 text-white px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {selectedColorName} selected
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => selectImage(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImageIndex === index
                              ? "bg-primary w-4"
                              : "bg-gray-400 hover:bg-gray-300/70"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex p-3 gap-2 overflow-x-auto">
                    {productImages.map((img, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectImage(index)}
                        className={`w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden ${
                          currentImageIndex === index
                            ? "ring-2 ring-primary"
                            : "ring-1 ring-zinc-700 hover:ring-zinc-500"
                        } transition-all duration-200`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} - view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                  <div className="px-4 pb-2 space-y-3 mt-6">
                    <h3 className="sm:text-lg font-semibold text-white">
                      Why Choose {product.name}?
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300">
                      Our {product.name} delivers unmatched performance and
                      comfort, whether you're hitting the gym or training at
                      home with 100% Satisfaction Guarantee.
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 p-3 sm:p-6 flex flex-col">
                  <div className="border-b border-zinc-700/50 pb-3 mb-3">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                      {product.name}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(averageRating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-yellow-500 font-medium">
                          {averageRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        ({reviews.length} reviews)
                      </span>
                      {product.inStock ? (
                        <span className="text-green-500 text-sm font-medium flex items-center ml-auto">
                          <FiCheck className="mr-1" /> In Stock
                        </span>
                      ) : (
                        <span className="text-red-500 text-sm font-medium flex items-center ml-auto">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline">
                      <span className="font-semibold text-gray-400 uppercase font-sans text-xs sm:text-sm mr-1">
                        KES.
                      </span>
                      <span className="font-bold text-green-500 text-2xl sm:text-3xl">
                        {product.price.toFixed(2)}
                      </span>
                      {product.id % 2 === 0 && (
                        <span className="ml-2 text-gray-400 line-through text-sm">
                          KES. {(product.price * 1.2).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex border-b border-zinc-700/50 mb-4 ">
                    {["description", "features", "reviews"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                          activeTab === tab
                            ? "text-primary border-b-2 border-primary"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="flex-grow mb-4 overflow-y-auto ">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full"
                      >
                        {activeTab === "description" && (
                          <div className="text-gray-300 space-y-4 text-sm md:text-base">
                            <p>{product.description}</p>
                            <p>
                              Experience the premium quality and exceptional
                              performance that our {product.name} offers.
                              Designed for serious fitness enthusiasts who
                              demand the best from their equipment and
                              supplements.
                            </p>

                            {product.category === "supplements" && (
                              <div className="mt-4 bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                                <h4 className="text-white font-medium mb-2 flex items-center">
                                  <FiInfo className="mr-2 text-primary" />{" "}
                                  Nutrition Information
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-gray-300 text-sm">
                                  <div className="flex justify-between pr-2">
                                    <span>Serving Size:</span>
                                    <span className="text-white">
                                      1 scoop (30g)
                                    </span>
                                  </div>
                                  <div className="flex justify-between pr-2">
                                    <span>Servings:</span>
                                    <span className="text-white">
                                      {product.name.includes("Whey")
                                        ? "30"
                                        : "60"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between pr-2">
                                    <span>Calories:</span>
                                    <span className="text-white">120</span>
                                  </div>
                                  <div className="flex justify-between pr-2">
                                    <span>Protein:</span>
                                    <span className="text-white">25g</span>
                                  </div>
                                  <div className="flex justify-between pr-2">
                                    <span>Carbohydrates:</span>
                                    <span className="text-white">3g</span>
                                  </div>
                                  <div className="flex justify-between pr-2">
                                    <span>Fat:</span>
                                    <span className="text-white">1.5g</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {product.category === "clothing" && (
                              <div className="mt-4 bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                                <h4 className="text-white font-medium mb-2 flex items-center">
                                  <FiInfo className="mr-2 text-primary" />{" "}
                                  Material Information
                                </h4>
                                <ul className="space-y-1 text-gray-300 text-xs">
                                  <li className="flex items-center">
                                    <span className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full mr-2"></span>
                                    88% Polyester, 12% Elastane
                                  </li>
                                  <li className="flex items-center">
                                    <span className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full mr-2"></span>
                                    Moisture-wicking fabric
                                  </li>
                                  <li className="flex items-center">
                                    <span className="w-2 sm:w-3 h-2 sm:h-3 bg-primary rounded-full mr-2"></span>
                                    Machine washable
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {activeTab === "features" && (
                          <div className="w-full text-sm sm:text-base">
                            <ul className="space-y-3">
                              {product.features.map((feature, index) => (
                                <motion.li
                                  key={index}
                                  className="flex items-start gap-3 bg-zinc-800/30 p-3 rounded-lg border border-zinc-700/30"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <span className="text-primary mt-1 bg-primary/10 p-1 rounded">
                                    <FiCheck className="w-4 h-4" />
                                  </span>
                                  <span className="text-gray-200">
                                    {feature}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>

                            {product.category === "supplements" && (
                              <div className="mt-6">
                                <h4 className="text-white font-medium mb-3 border-l-4 border-primary pl-3">
                                  Additional Benefits
                                </h4>
                                <ul className="space-y-3">
                                  <motion.li
                                    className="flex items-start gap-3 bg-zinc-800/30 p-3 rounded-lg border border-zinc-700/30"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                  >
                                    <span className="text-primary mt-1 bg-primary/10 p-1 rounded">
                                      <FiCheck className="w-4 h-4" />
                                    </span>
                                    <span className="text-gray-200">
                                      Fast absorption formula
                                    </span>
                                  </motion.li>
                                  <motion.li
                                    className="flex items-start gap-3 bg-zinc-800/30 p-3 rounded-lg border border-zinc-700/30"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                  >
                                    <span className="text-primary mt-1 bg-primary/10 p-1 rounded">
                                      <FiCheck className="w-4 h-4" />
                                    </span>
                                    <span className="text-gray-200">
                                      Scientifically backed ingredients
                                    </span>
                                  </motion.li>
                                  <motion.li
                                    className="flex items-start gap-3 bg-zinc-800/30 p-3 rounded-lg border border-zinc-700/30"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                  >
                                    <span className="text-primary mt-1 bg-primary/10 p-1 rounded">
                                      <FiCheck className="w-4 h-4" />
                                    </span>
                                    <span className="text-gray-200">
                                      Third-party tested for purity
                                    </span>
                                  </motion.li>
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {activeTab === "reviews" && (
                          <div className="w-full pb-2">
                            <div className="flex items-center justify-between mb-6">
                              <h4 className="text-white font-medium">
                                Customer Reviews
                              </h4>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-sm bg-primary/10 text-primary hover:bg-primary mr-2 hover:text-white px-4 py-1 rounded-lg transition-colors duration-300"
                              >
                                Write a review
                              </motion.button>
                            </div>

                            <div className="bg-zinc-800/30 p-4 rounded-xl mb-6 border border-zinc-700/30">
                              <div className="flex items-center gap-4 mb-3">
                                <div className="text-4xl font-bold text-white">
                                  {averageRating.toFixed(1)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <FiStar
                                        key={i}
                                        className={`w-5 h-5 ${
                                          i < Math.floor(averageRating)
                                            ? "text-yellow-500 fill-yellow-500"
                                            : "text-gray-600"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <div className="text-gray-400 text-sm">
                                    Based on {reviews.length} reviews (Verified
                                    Purchases)
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => {
                                  const count = reviews.filter(
                                    (r) => r.rating === star
                                  ).length;
                                  const percentage =
                                    (count / reviews.length) * 100;

                                  return (
                                    <div
                                      key={star}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="flex items-center w-8">
                                        <span className="text-sm text-gray-400">
                                          {star}
                                        </span>
                                        <FiStar className="w-3 h-3 text-gray-400 ml-1" />
                                      </div>
                                      <div className="flex-1 bg-zinc-700/30 h-2 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{
                                            width: `${percentage}%`,
                                          }}
                                          transition={{
                                            duration: 0.5,
                                            delay: 0.1 * (5 - star),
                                          }}
                                          className="h-full bg-yellow-500"
                                        />
                                      </div>
                                      <div className="w-8 text-right text-xs text-gray-400">
                                        {count}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="space-y-4">
                              {reviews.map((review, index) => (
                                <motion.div
                                  key={review.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="border border-zinc-800 bg-zinc-800/20 p-4 rounded-xl"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-white">
                                      {review.user}
                                    </span>
                                    <span className="text-xs text-gray-400 bg-zinc-800/80 px-2 py-1 rounded-full">
                                      {review.date}
                                    </span>
                                  </div>
                                  <div className="flex mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <FiStar
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < review.rating
                                            ? "text-yellow-500 fill-yellow-500"
                                            : "text-gray-600"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className="text-gray-300 text-sm">
                                    {review.comment}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Product Options */}
                  <div className="space-y-3 mt-auto pt-3 border-t border-zinc-700/50">
                    {/* Size and Color Selection */}
                    <div className="flex gap-3">
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1 sm:mb-2 flex items-center text-sm sm:text-base">
                            Size:
                            <span className="ml-2 text-xs text-gray-400 bg-zinc-800 px-3 py-1 rounded-lg">
                              {selectedSize}
                            </span>
                          </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {product.sizes.map((size) => (
                              <motion.button
                                key={size}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg transition-all duration-300 ${
                                  selectedSize === size
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                                }`}
                              >
                                {size}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}

                      {product.colors && product.colors.length > 1 && (
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            Color:
                            <span className="ml-2 text-xs text-gray-400 bg-zinc-800 px-3 py-1 rounded-lg">
                              {getColorName(selectedColor)}
                            </span>
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {product.colors.map((color) => {
                              const colorMap = {
                                default: { bg: "#777", name: "Default" },
                                black: { bg: "#222", name: "Black" },
                                white: { bg: "#f8f8f8", name: "White" },
                                red: { bg: "#ef4444", name: "Red" },
                                blue: { bg: "#3b82f6", name: "Blue" },
                                navy: { bg: "#1e3a8a", name: "Navy" },
                                gray: { bg: "#4b5563", name: "Gray" },
                              };

                              return (
                                <motion.button
                                  key={color}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleColorSelect(color)}
                                  style={{
                                    backgroundColor:
                                      colorMap[color]?.bg || "#777",
                                  }}
                                  className={`md:w-10 md:h-10 w-7 h-7  rounded-full flex items-center justify-center border-2 ${
                                    selectedColor === color
                                      ? "border-primary ring-1 ring-offset-zinc-900 ring-primary"
                                      : "border-zinc-700 hover:border-zinc-500"
                                  } transition-all duration-300`}
                                >
                                  {selectedColor === color && (
                                    <FiCheck className="w-4 h-4 text-white" />
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* New Add to Cart Section */}
                    <div className="flex gap-3 mt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center bg-zinc-800 rounded-lg overflow-hidden">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={decrementQuantity}
                          disabled={quantity === 1}
                          className="p-2 sm:p-3 text-gray-400 hover:text-white disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors"
                        >
                          <FiMinus className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                        <div className="w-10 sm:w-16 text-center">
                          <input
                            type="number"
                            min="1"
                            max="99"
                            value={quantity}
                            onChange={(e) => {
                              const value = Math.min(
                                Math.max(1, e.target.value),
                                99
                              );
                              setQuantity(value);
                            }}
                            className="w-full bg-transparent text-white text-sm sm:text-base text-center focus:outline-none"
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={incrementQuantity}
                          disabled={quantity === 99}
                          className="p-2 sm:p-3 text-gray-400 hover:text-white disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors"
                        >
                          <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        disabled={adding}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 sm:py-3 px-6 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                          isProductInCart
                            ? "bg-green-600/90 hover:bg-green-600 text-white"
                            : "bg-primary hover:bg-primary/90 text-white"
                        } ${adding ? "cursor-not-allowed opacity-90" : ""}`}
                      >
                        {isProductInCart ? (
                          <>
                            <FiCheck className="w-6 h-6" />
                            Added to Cart
                          </>
                        ) : adding ? (
                          <>
                            <FiCheck className="w-6 h-6" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <FiShoppingCart className="w-6 h-6" />
                            Add to Cart
                          </>
                        )}
                      </motion.button>

                      {/* Wishlist Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleWishlist}
                        className={`px-3 py-2 md:py-3 rounded-lg border ${
                          wishlist
                            ? "border-red-500 bg-red-500/10 text-red-500"
                            : "border-zinc-700 hover:border-zinc-600 text-gray-400 hover:text-white"
                        } transition-colors`}
                      >
                        <PiHeartDuotone className="w-5 h-5 sm:w-6 sm:h-6" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;
