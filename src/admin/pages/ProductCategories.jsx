import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiAlertCircle,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiSave,
} from "react-icons/fi";

// Sample categories data
const sampleCategories = [
  { id: 1, name: "Supplements", slug: "supplements", productCount: 15 },
  { id: 2, name: "Clothing", slug: "clothing", productCount: 25 },
  { id: 3, name: "Equipment", slug: "equipment", productCount: 10 },
  { id: 4, name: "Accessories", slug: "accessories", productCount: 20 },
];

const ProductCategories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, you would fetch data from your API
        // const response = await api.get('/product-categories');
        // setCategories(response.data);

        // Simulate API call
        setTimeout(() => {
          setCategories(sampleCategories);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories. Please try again.");
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If name field is being updated, generate slug automatically
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      setFormData((prev) => ({
        ...prev,
        name: value,
        slug,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Category name is required";
    }

    if (!formData.slug.trim()) {
      errors.slug = "Slug is required";
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      errors.slug =
        "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    // Check if slug is unique (except when editing the same category)
    const slugExists = categories.some(
      (category) =>
        category.slug === formData.slug &&
        (!categoryToEdit || category.id !== categoryToEdit.id)
    );

    if (slugExists) {
      errors.slug = "This slug is already in use";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Open add modal
  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      slug: "",
    });
    setFormErrors({});
    setShowAddModal(true);
  };

  // Open edit modal
  const handleOpenEditModal = (category) => {
    setCategoryToEdit(category);
    setFormData({
      name: category.name,
      slug: category.slug,
    });
    setFormErrors({});
    setShowEditModal(true);
  };

  // Open delete modal
  const handleOpenDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  // Handle add category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // In a real app, you would call your API
      // const response = await api.post('/product-categories', formData);
      // const newCategory = response.data;

      // Simulate API call
      setTimeout(() => {
        const newCategory = {
          id: Math.max(...categories.map((c) => c.id), 0) + 1,
          name: formData.name,
          slug: formData.slug,
          productCount: 0,
        };

        setCategories((prev) => [...prev, newCategory]);
        setShowAddModal(false);
        setSuccess("Category added successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);

        setIsSubmitting(false);
      }, 500);
    } catch (err) {
      console.error("Error adding category:", err);
      setError("Failed to add category. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle edit category
  const handleEditCategory = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // In a real app, you would call your API
      // await api.put(`/product-categories/${categoryToEdit.id}`, formData);

      // Simulate API call
      setTimeout(() => {
        setCategories((prev) =>
          prev.map((category) =>
            category.id === categoryToEdit.id
              ? { ...category, name: formData.name, slug: formData.slug }
              : category
          )
        );

        setShowEditModal(false);
        setCategoryToEdit(null);
        setSuccess("Category updated successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);

        setIsSubmitting(false);
      }, 500);
    } catch (err) {
      console.error("Error updating category:", err);
      setError("Failed to update category. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle delete category
  const handleDeleteCategory = async () => {
    try {
      setIsSubmitting(true);

      // In a real app, you would call your API
      // await api.delete(`/product-categories/${categoryToDelete.id}`);

      // Simulate API call
      setTimeout(() => {
        setCategories((prev) =>
          prev.filter((category) => category.id !== categoryToDelete.id)
        );

        setShowDeleteModal(false);
        setCategoryToDelete(null);
        setSuccess("Category deleted successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);

        setIsSubmitting(false);
      }, 500);
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">Product Categories</h1>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAddModal}
          className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors shadow-lg shadow-primary/20"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Category</span>
        </motion.button>
      </div>

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
          <FiCheck className="text-green-500 flex-shrink-0" />
          <p className="text-green-500">{success}</p>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-700/30">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-32 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-16 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="h-4 bg-zinc-700 rounded w-20 ml-auto animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-zinc-700/20">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {category.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {category.productCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(category)}
                          className="text-yellow-500 hover:text-yellow-400 transition-colors"
                          title="Edit Category"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(category)}
                          className={`text-red-500 hover:text-red-400 transition-colors ${
                            category.productCount > 0
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          title="Delete Category"
                          disabled={category.productCount > 0}
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No categories found. Click "Add New Category" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Add New Category
            </h3>

            <form onSubmit={handleAddCategory}>
              <div className="space-y-4">
                {/* Category Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-zinc-700/50 border ${
                      formErrors.name ? "border-red-500" : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="e.g. Supplements, Clothing"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Category Slug */}
                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    value={formData.slug}
                    onChange={handleChange}
                    className={`w-full bg-zinc-700/50 border ${
                      formErrors.slug ? "border-red-500" : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="e.g. supplements, clothing"
                  />
                  {formErrors.slug && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.slug}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    The slug is used in URLs and should contain only lowercase
                    letters, numbers, and hyphens.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4 mr-2" />
                      Add Category
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4">Edit Category</h3>

            <form onSubmit={handleEditCategory}>
              <div className="space-y-4">
                {/* Category Name */}
                <div>
                  <label
                    htmlFor="edit-name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="edit-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-zinc-700/50 border ${
                      formErrors.name ? "border-red-500" : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Category Slug */}
                <div>
                  <label
                    htmlFor="edit-slug"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="edit-slug"
                    name="slug"
                    type="text"
                    value={formData.slug}
                    onChange={handleChange}
                    className={`w-full bg-zinc-700/50 border ${
                      formErrors.slug ? "border-red-500" : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                  />
                  {formErrors.slug && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.slug}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    The slug is used in URLs and should contain only lowercase
                    letters, numbers, and hyphens.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4 mr-2" />
                      Update Category
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Category Modal */}
      {showDeleteModal && (
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
              Are you sure you want to delete the category{" "}
              <span className="text-white font-medium">
                {categoryToDelete?.name}
              </span>
              ? This action cannot be undone.
            </p>

            {categoryToDelete?.productCount > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <p className="text-yellow-500 text-sm">
                  This category has {categoryToDelete.productCount} products
                  associated with it. You need to reassign or delete these
                  products before deleting this category.
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                disabled={isSubmitting || categoryToDelete?.productCount > 0}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="w-4 h-4 mr-2" />
                    Delete Category
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductCategories;
