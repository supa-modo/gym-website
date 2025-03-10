import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiPackage,
} from "react-icons/fi";
import productAPI from "../utils/productAPI";
import formatDate from "../utils/dateFormatter";
import { TbShoppingBagEdit, TbTrash } from "react-icons/tb";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [error, setError] = useState(null);

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Categories for filter
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "supplements", label: "Supplements" },
    { value: "clothing", label: "Clothing" },
    { value: "equipment", label: "Equipment" },
    { value: "accessories", label: "Accessories" },
  ];

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Add category to the API params
        const params = {
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          search: searchQuery || undefined,
        };

        const response = await productAPI.getAll(params);

        console.log("Fetched products:", response);
        setProducts(response);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedCategory]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Handle delete product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      setIsLoading(true);
      await productAPI.delete(productToDelete.id);

      const updatedProducts = products.filter(
        (product) => product.id !== productToDelete.id
      );
      setProducts(updatedProducts);

      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update the currentProducts calculation to filter by category if needed
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "all") return true;
    return product.category === selectedCategory;
  });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts
    .map((product) => ({
      ...product,
      category: product.category?.value || product.category,
      features: product.features || [],
      sizes: product.sizes || [],
      colors: product.colors || [],
      rating: product.rating || 0,
    }))
    .slice(startIndex, endIndex);

  // Add items per page change handler
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Get category label
  const getCategoryLabel = (categoryValue) => {
    const category = categories.find((cat) => cat.value === categoryValue);
    return category ? category.label : categoryValue;
  };

  // Format color for display
  const formatColor = (color) => {
    if (typeof color === "string") {
      try {
        return JSON.parse(color);
      } catch {
        return { name: "Default", hex: "#000000" };
      }
    }
    return color;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">
          Elite Store Product Management
        </h1>
        <div className="flex gap-3">
          <Link to="/admin/products/categories">
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
              Manage Categories
            </button>
          </Link>
          <Link to="/admin/products/new">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary hover:bg-red-700 text-white px-5 py-2 rounded-lg flex items-center space-x-2 text-sm font-semibold transition-colors shadow-lg shadow-primary/20"
            >
              <FiPlus className="w-4 h-4" />
              <span>Add New Product</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-8 py-2 text-white font-nunito font-semibold focus:outline-none focus:border-primary transition-colors"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FiChevronRight className="w-4 h-4 text-gray-400 transform rotate-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-zinc-700"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-zinc-700 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-700 rounded w-1/3"></div>
                <div className="h-4 bg-zinc-700 rounded w-full"></div>
              </div>
            </div>
          ))
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden flex flex-col hover:cursor-pointer"
              onClick={() => navigate(`/admin/products/${product.id}`)}
            >
              <div className="relative h-56 bg-zinc-700 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-4 py-1 text-xs rounded-lg ${
                      product.stockQuantity > 50
                        ? "bg-green-600 text-green-200"
                        : product.stockQuantity > 10
                        ? "bg-yellow-500 text-yellow-200"
                        : "bg-red-500 text-red-200"
                    }`}
                  >
                    {product.stockQuantity > 50
                      ? "In Stock"
                      : product.stockQuantity > 10
                      ? "Low Stock"
                      : "Very Low Stock"}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1">
                <h3 className="text-lg font-bold font-geist text-white mb-1">
                  {product.name}
                </h3>

                {/* Price, Category, and Stock */}
                <div className="flex justify-between items-center gap-2 mb-3">
                  <span className="text-lg font-bold font-nunito text-white">
                    {formatCurrency(product.price)}
                  </span>
                  <div className="flex space-x-3">
                    <span className="px-3 py-0.5 text-xs rounded-lg bg-gray-500 text-gray-300">
                      {getCategoryLabel(product.category)}
                    </span>
                    <div className="flex items-center text-sm text-gray-400">
                      <FiPackage className="mr-1" />
                      <span>{product.stockQuantity} in stock</span>
                    </div>
                  </div>
                </div>

                {/* Sizes and Colors */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.sizes &&
                    product.sizes.length > 0 &&
                    product.sizes[0] !== "default" && (
                      <div className="flex items-center bg-zinc-700/50 rounded-lg px-2 py-0.5">
                        <span className="text-xs text-gray-400 mr-1">
                          Sizes:
                        </span>
                        <div className="flex items-center">
                          {product.sizes
                            .slice(0, 4)
                            .map((size, index) => (
                              <span
                                key={index}
                                className="text-xs text-gray-300 mx-0.5"
                              >
                                {size}
                              </span>
                            ))
                            .reduce((prev, curr, i) => [
                              prev,
                              <span
                                key={`sep-${i}`}
                                className="text-gray-500 text-xs mx-0.5"
                              >
                                ·
                              </span>,
                              curr,
                            ])}
                          {product.sizes.length > 4 && (
                            <span className="text-xs text-gray-400 ml-0.5">
                              ...
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                  {product.colors &&
                    product.colors.length > 0 &&
                    product.colors[0] !== "default" && (
                      <div className="flex items-center bg-zinc-700/50 rounded-lg px-2 py-0.5">
                        <span className="text-xs text-gray-400 mr-1">
                          Colors:
                        </span>
                        <div className="flex items-center">
                          {product.colors.slice(0, 3).map((color, index) => {
                            // Parse the color if it's a stringified JSON
                            let colorObj = color;
                            if (typeof color === "string") {
                              try {
                                colorObj = JSON.parse(color);
                              } catch {
                                // If parsing fails, treat it as a simple color name
                                colorObj = { name: color, hex: "#000000" };
                              }
                            }

                            // Handle both object and string color formats
                            const colorHex =
                              typeof colorObj === "object"
                                ? colorObj.hex
                                : colorObj === "black"
                                ? "#222"
                                : colorObj === "white"
                                ? "#eee"
                                : colorObj === "red"
                                ? "#e53e3e"
                                : colorObj === "blue"
                                ? "#3182ce"
                                : colorObj === "green"
                                ? "#38a169"
                                : colorObj === "purple"
                                ? "#805ad5"
                                : colorObj === "gray"
                                ? "#718096"
                                : colorObj === "navy"
                                ? "#2c5282"
                                : colorObj === "brown"
                                ? "#9C4221"
                                : colorObj === "pink"
                                ? "#ed64a6"
                                : "#cbd5e0";

                            const colorName =
                              typeof colorObj === "object"
                                ? colorObj.name
                                : colorObj;

                            return (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full mx-0.5 border border-zinc-600"
                                style={{ backgroundColor: colorHex }}
                                title={colorName}
                              />
                            );
                          })}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-gray-400 ml-0.5">
                              ...
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                </div>

                <p className="text-gray-400 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-zinc-700 px-4 py-3 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  Added: {formatDate(product.createdAt)}
                </span>

                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/products/${product.id}`);
                    }}
                    className="px-4 py-1 rounded-md text-yellow-500 hover:text-yellow-400 bg-yellow-400/20 transition-colors flex items-center space-x-1 text-xs"
                    title="Edit Product"
                  >
                    <TbShoppingBagEdit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProductToDelete(product);
                      setIsDeleteModalOpen(true);
                    }}
                    className="px-4 py-1.5 rounded-md bg-red-500/20 text-red-500 hover:text-red-400 transition-colors flex items-center space-x-1 text-xs"
                    title="Delete Product"
                  >
                    <TbTrash className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full bg-zinc-800 rounded-xl border border-zinc-700 p-8 text-center">
            <p className="text-gray-400 mb-4">
              No products found matching your criteria
            </p>
            <Link to="/admin/products/new">
              <button className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Add New Product
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8">
        {/* Product count and items per page */}
        <div className="flex items-center space-x-14 mb-4 sm:mb-0">
          <span className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, totalProducts)} of{" "}
            {totalProducts} products
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-zinc-700/50 border border-zinc-600 rounded-lg px-3 py-1 text-white text-xs font-bold focus:outline-none focus:border-primary"
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
              <option value={96}>96</option>
            </select>
          </div>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === 1
                  ? "bg-zinc-700/30 text-gray-500 cursor-not-allowed"
                  : "bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
              }`}
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              // Show current page, first page, last page, and pages around current
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      currentPage === pageNumber
                        ? "bg-primary text-white"
                        : "bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                (pageNumber === currentPage - 2 && currentPage > 3) ||
                (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={pageNumber} className="px-3 py-1 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === totalPages
                  ? "bg-zinc-700/30 text-gray-500 cursor-not-allowed"
                  : "bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
              }`}
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 max-w-lg w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete the product{" "}
              <span className="text-white font-medium">
                {productToDelete?.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setProductToDelete(null);
                }}
                className="px-6 py-2 bg-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Products;
