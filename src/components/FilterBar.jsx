import React from "react";
import { motion } from "framer-motion";

const FilterBar = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: "all", name: "All Products" },
    { id: "supplements", name: "Supplements" },
    { id: "clothing", name: "Clothing" },
    { id: "accessories", name: "Accessories" },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-8">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory(category.id)}
          className={`px-4 py-2 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
            activeCategory === category.id
              ? "bg-primary text-white"
              : "bg-zinc-800/70 text-gray-400 hover:bg-zinc-700"
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterBar;
