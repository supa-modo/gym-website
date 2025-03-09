import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSave,
  FiX,
  FiAlertCircle,
  FiUpload,
  FiTrash2,
  FiArrowLeft,
} from "react-icons/fi";
import productAPI from "../utils/productAPI";
import { TbTrash } from "react-icons/tb";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "supplements",
    stockQuantity: "",
    description: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  // Modify the categories state and fetch real categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await productAPI.getCategories();
        setCategories(
          categoriesData.map((cat) => ({
            value: cat.name.toLowerCase(),
            label: cat.name,
            id: cat.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch product data if in edit mode
  useEffect(() => {
    const fetchProduct = async () => {
      if (!isEditMode) return;

      try {
        setIsFetching(true);
        setError(null);
        const product = await productAPI.getById(id);

        setFormData({
          name: product.name || "",
          price: product.price?.toString() || "",
          category: product.category,
          stockQuantity: product.stockQuantity?.toString() || "",
          description: product.description || "",
          imageUrl: product.imageUrl || "",
        });

        setImagePreview(product.imageUrl || "");
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchProduct();
  }, [id, isEditMode]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Please upload a valid image file (JPEG, PNG, GIF, WEBP)",
      }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size should be less than 5MB",
      }));
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Clear error
    if (errors.image) {
      setErrors((prev) => ({
        ...prev,
        image: null,
      }));
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.stockQuantity) {
      newErrors.stockQuantity = "Stock quantity is required";
    } else if (
      isNaN(parseInt(formData.stockQuantity)) ||
      parseInt(formData.stockQuantity) < 0
    ) {
      newErrors.stockQuantity = "Stock quantity must be a non-negative number";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!isEditMode && !imageFile && !formData.imageUrl) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add this function to convert category name to ID
  const getCategoryIdByName = (categoryName) => {
    const category = categories.find((cat) => cat.value === categoryName);
    return category ? category.id : null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      // Prepare product data with category ID
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        categoryId: getCategoryIdByName(formData.category),
        stockQuantity: parseInt(formData.stockQuantity),
        description: formData.description,
        imageUrl: formData.imageUrl,
      };

      // Upload image if new file exists
      if (imageFile) {
        const uploadResponse = await productAPI.uploadImage(imageFile);
        if (!uploadResponse.imageUrl) {
          throw new Error("Image upload failed");
        }
        // Ensure the image URL is from the backend
        productData.imageUrl = uploadResponse.imageUrl;
      }

      // Save product
      if (isEditMode) {
        await productAPI.update(id, productData);
        setSuccess("Product updated successfully!");
      } else {
        await productAPI.create(productData);
        setSuccess("Product created successfully!");
      }

      // Redirect after success
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (err) {
      console.error("Error saving product:", err);
      setError(
        isEditMode
          ? "Failed to update product. Please try again."
          : "Failed to create product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-white">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
      </div>

      {/* Loading State */}
      {isFetching ? (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-400">Loading product data...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
              <FiAlertCircle className="text-red-500 flex-shrink-0" />
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
              <FiAlertCircle className="text-green-500 flex-shrink-0" />
              <p className="text-green-500">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Image Upload */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  Product Image
                </h2>

                <div className="space-y-4">
                  {/* Image Preview */}
                  <div className="aspect-square bg-zinc-700 rounded-lg overflow-hidden flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-6">
                        <FiUpload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-400 text-sm">
                          No image selected
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="image-upload"
                      className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center cursor-pointer"
                    >
                      {imagePreview ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    {imagePreview && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <TbTrash className="w-4 h-4 mr-2" />
                        Remove Image
                      </button>
                    )}

                    {errors.image && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.image}
                      </p>
                    )}

                    <p className="text-gray-400 text-xs mt-2">
                      Recommended size: 800x800 pixels. Max file size: 5MB.
                      Supported formats: JPEG, PNG, GIF, WEBP.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  Product Details
                </h2>

                <div className="space-y-4">
                  {/* Product Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-zinc-700/50 border ${
                        errors.name ? "border-red-500" : "border-zinc-600"
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Price and Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Price */}
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Price ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="price"
                        name="price"
                        type="text"
                        value={formData.price}
                        onChange={handleChange}
                        className={`w-full bg-zinc-700/50 border ${
                          errors.price ? "border-red-500" : "border-zinc-600"
                        } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                        placeholder="0.00"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.price}
                        </p>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      >
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Stock Quantity */}
                  <div>
                    <label
                      htmlFor="stockQuantity"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="stockQuantity"
                      name="stockQuantity"
                      type="number"
                      min="0"
                      value={formData.stockQuantity}
                      onChange={handleChange}
                      className={`w-full bg-zinc-700/50 border ${
                        errors.stockQuantity
                          ? "border-red-500"
                          : "border-zinc-600"
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="Enter stock quantity"
                    />
                    {errors.stockQuantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.stockQuantity}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      value={formData.description}
                      onChange={handleChange}
                      className={`w-full bg-zinc-700/50 border ${
                        errors.description
                          ? "border-red-500"
                          : "border-zinc-600"
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="Enter product description"
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <Link to="/admin/products">
              <button
                type="button"
                className="px-4 py-2 bg-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors flex items-center"
              >
                <FiX className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-white font-semibold flex items-center ${
                isLoading ? "bg-primary/70" : "bg-primary hover:bg-red-700"
              } transition-colors shadow-lg shadow-primary/20`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4 mr-2" />
                  {isEditMode ? "Update Product" : "Create Product"}
                </>
              )}
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductForm;
