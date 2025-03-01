import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiX, FiCheck } from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { StoreProvider, useStore } from "../context/StoreContext.jsx";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import ShoppingCart from "./ShoppingCart";

// Sample product data - in production, this would come from an API or backend

// Main Store Component
const Store = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { products, cart, isCartOpen, setIsCartOpen } = useStore();

  // Filter products by category
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section
      id="store"
      className="pt-32 pb-20 bg-secondary/40 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#FF0000,_transparent_50%)] opacity-5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#FF0000,_transparent_55%)] opacity-5"></div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
            Elite Fitness Store
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent"></div>
          </h2>
          <p className="text-gray-400 text-[14px] sm:text-lg">
            Premium supplements, apparel, and accessories to fuel your fitness
            journey
          </p>
        </motion.div>

        {/* Cart Button (Mobile) */}
        <div className="lg:hidden flex justify-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="bg-zinc-800 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2"
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>View Cart</span>
            {cart.length > 0 && (
              <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </motion.button>
        </div>

        {/* Filter Bar */}
        <FilterBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-zinc-800/50 via-zinc-800/30 to-zinc-800/50 
                     backdrop-blur-sm rounded-2xl px-4 py-8 sm:p-8 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
              Get 15% Off Your First Order
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-2xl mx-auto">
              Sign up for our newsletter and receive a 15% discount code for
              your first purchase. Stay updated with new products and exclusive
              offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-zinc-700/50 border border-zinc-600 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold
                         hover:bg-red-700 transition-colors shadow-lg shadow-primary/20 whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
        </motion.div>

        {/* Cart Button (Desktop) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-40 bg-primary text-white rounded-full p-4 shadow-lg shadow-primary/30 hidden lg:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FiShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </motion.button>
      </div>

      {/* Shopping Cart */}
      <ShoppingCart />

      {/* AnimatePresence for modals */}
      <AnimatePresence>
        {/* This will allow child modals to animate properly */}
      </AnimatePresence>
    </section>
  );
};

const StoreSection = () => {
  return (
    <StoreProvider>
      <Store />
    </StoreProvider>
  );
};

export default StoreSection;
