import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSave, FiX, FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import productAPI from "../utils/productAPI";
import { ProductImageUpload } from "./components/ProductImageUpload";
import { ProductDetailsForm } from "./components/ProductDetailsForm";
import { ProductVariants } from "./components/ProductVariants";

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
    rating: 0,
    features: [],
    sizes: [],
    colors: [],
    hasSizeOptions: false,
    hasColorOptions: false,
    sizeType: "standard", // standard, volume, weight
  });

  // New state for managing color inputs
  const [newColor, setNewColor] = useState({ name: "", hex: "#000000" });

  // New state for managing size inputs
  const [newSize, setNewSize] = useState({ value: "", unit: "" });

  // Define common size units based on size type
  const sizeUnits = {
    standard: [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL",
      "4XL",
      "5XL",
      "6XL",
      "One Size",
    ],
    volume: ["ml", "L", "fl oz", "gal"],
    weight: ["g", "kg", "lb", "oz"],
  };

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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

        // Determine if product has size or color options
        const hasSizeOptions = product.sizes && product.sizes.length > 0;
        const hasColorOptions = product.colors && product.colors.length > 0;

        // Determine size type based on existing sizes
        let sizeType = "standard";
        if (hasSizeOptions) {
          const firstSize = product.sizes[0];
          if (typeof firstSize === "object" && firstSize.unit) {
            if (["ml", "L", "fl oz", "gal"].includes(firstSize.unit)) {
              sizeType = "volume";
            } else if (["g", "kg", "lb", "oz"].includes(firstSize.unit)) {
              sizeType = "weight";
            }
          }
        }

        setFormData({
          name: product.name || "",
          price: product.price?.toString() || "",
          category: product.category,
          stockQuantity: product.stockQuantity?.toString() || "",
          description: product.description || "",
          imageUrl: product.imageUrl || "",
          rating: product.rating || 0,
          features: product.features || [],
          sizes: product.sizes || [],
          colors: product.colors || [],
          hasSizeOptions,
          hasColorOptions,
          sizeType,
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
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Handle size type change
  const handleSizeTypeChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      sizeType: value,
      // Reset sizes when changing type to avoid inconsistencies
      sizes: [],
    }));

    setNewSize({ value: "", unit: "" });
  };

  // Handle new color change
  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setNewColor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle new size change
  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setNewSize((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new color
  const handleAddColor = () => {
    if (!newColor.name.trim()) {
      setErrors((prev) => ({
        ...prev,
        colorName: "Color name is required",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { ...newColor }],
    }));

    // Reset color input
    setNewColor({ name: "", hex: "#000000" });

    // Clear error
    if (errors.colorName) {
      setErrors((prev) => ({
        ...prev,
        colorName: null,
      }));
    }
  };

  // Add a new size
  const handleAddSize = () => {
    if (!newSize.value.trim()) {
      setErrors((prev) => ({
        ...prev,
        sizeValue: "Size value is required",
      }));
      return;
    }

    // For standard sizes, just use the value
    if (formData.sizeType === "standard") {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSize.value],
      }));
    } else {
      // For volume and weight, store as object with unit
      if (!newSize.unit) {
        setErrors((prev) => ({
          ...prev,
          sizeUnit: "Unit is required for this size type",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, { ...newSize }],
      }));
    }

    // Reset size input
    setNewSize({ value: "", unit: "" });

    // Clear errors
    if (errors.sizeValue || errors.sizeUnit) {
      setErrors((prev) => ({
        ...prev,
        sizeValue: null,
        sizeUnit: null,
      }));
    }
  };

  // Remove a color
  const handleRemoveColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  // Remove a size
  const handleRemoveSize = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  // Add quick color
  const handleQuickAddColor = (color) => {
    // Check if color exists and has a name property
    if (!color || !color.name) {
      console.error("Invalid color object:", color);
      return;
    }

    // Check if color already exists
    const colorExists = formData.colors.some(
      (c) => c && c.name && c.name.toLowerCase() === color.name.toLowerCase()
    );

    if (!colorExists) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, { ...color }],
      }));
    }
  };

  // Add quick standard size
  const handleQuickAddSize = (sizeValue) => {
    // Check if size already exists
    const sizeExists = formData.sizes.some(
      (s) => (typeof s === "string" ? s : s.value) === sizeValue
    );

    if (!sizeExists) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, sizeValue],
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

  // Get category ID by name
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

      // Prepare product data
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        categoryId: getCategoryIdByName(formData.category),
        stockQuantity: parseInt(formData.stockQuantity),
        description: formData.description,
        imageUrl: formData.imageUrl,
        rating: formData.rating,
        features: formData.features,
        // Include sizes and colors only if they are enabled
        sizes: formData.hasSizeOptions
          ? formData.sizes.map((size) =>
              typeof size === "string" ? size : `${size.value}${size.unit}`
            )
          : [],
        colors: formData.hasColorOptions ? JSON.stringify(formData.colors) : [],
      };

      // Upload image if new file exists
      if (imageFile) {
        const uploadResponse = await productAPI.uploadImage(imageFile);
        if (!uploadResponse.imageUrl) {
          throw new Error("Image upload failed");
        }
        productData.imageUrl = uploadResponse.imageUrl;
      }

      // If no colors are provided but hasColorOptions is true, add a default color
      if (formData.hasColorOptions && productData.colors.length === 0) {
        productData.colors = [{ name: "Default", hex: "#000000" }];
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
              <ProductImageUpload
                imagePreview={imagePreview}
                handleImageChange={handleImageChange}
                handleRemoveImage={handleRemoveImage}
                errors={errors}
              />
            </div>

            {/* Right Column - Product Details */}
            <div className="lg:col-span-2">
              <ProductDetailsForm
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                categories={categories}
              />

              <ProductVariants
                formData={formData}
                handleChange={handleChange}
                handleSizeTypeChange={handleSizeTypeChange}
                handleSizeChange={handleSizeChange}
                handleAddSize={handleAddSize}
                handleQuickAddSize={handleQuickAddSize}
                handleRemoveSize={handleRemoveSize}
                handleColorChange={handleColorChange}
                handleAddColor={handleAddColor}
                handleQuickAddColor={handleQuickAddColor}
                handleRemoveColor={handleRemoveColor}
                errors={errors}
                newSize={newSize}
                newColor={newColor}
                sizeUnits={sizeUnits}
              />
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
