import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiFilter,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiDollarSign,
  FiPackage,
} from "react-icons/fi";
import productAPI from "../utils/productAPI";
import formatDate from "../utils/dateFormatter";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [error, setError] = useState(null);

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

        const response = await productAPI.getAll({
          page: currentPage,
          limit: itemsPerPage,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          search: searchQuery || undefined,
        });

        // Ensure we have an array of products
        const products = Array.isArray(response.products)
          ? response.products
          : [];
        setProducts(products);
        setFilteredProducts(products);
        setTotalProducts(response.total || products.length);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
        setProducts([]);
        setFilteredProducts([]);
        setTotalProducts(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, searchQuery, selectedCategory]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
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
      setFilteredProducts(updatedProducts);
      setTotalProducts((prev) => prev - 1);

      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalProducts);
  const currentProducts =
    filteredProducts
      ?.map((product) => ({
        ...product,
        category: product.category?.value || product.category,
      }))
      .slice(startIndex, endIndex) || [];

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Product Management</h1>
        <div className="flex gap-2">
          <Link to="/admin/products/categories">
            <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Manage Categories
            </button>
          </Link>
          <Link to="/admin/products/new">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors shadow-lg shadow-primary/20"
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
              className="appearance-none bg-zinc-700/50 border border-zinc-600 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:border-primary transition-colors"
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

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <FiAlertCircle className="text-red-500 flex-shrink-0" />
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden flex flex-col"
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
                        : "bg-red-500 text-red-500"
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
                <div className="flex items-center mb-1">
                  <FiDollarSign className="text-primary mr-1 w-4 h-4" />
                  <span className="text-lg font-bold font-nunito text-white">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="">
                    <span className="px-2 py-1 text-xs rounded-full bg-zinc-700 text-gray-300">
                      {getCategoryLabel(product.category)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <FiPackage className="mr-1" />
                    <span>{product.stockQuantity} in stock</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="border-t border-zinc-700 p-4 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  Added: {formatDate(product.createdAt)}
                </span>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/admin/products/${product.id}`)}
                    className="text-blue-500 hover:text-blue-400 transition-colors"
                    title="View Details"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/admin/products/${product.id}`)}
                    className="text-yellow-500 hover:text-yellow-400 transition-colors"
                    title="Edit Product"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setProductToDelete(product);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-400 transition-colors"
                    title="Delete Product"
                  >
                    <FiTrash2 className="w-4 h-4" />
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-8">
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
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 max-w-md w-full"
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
                className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
