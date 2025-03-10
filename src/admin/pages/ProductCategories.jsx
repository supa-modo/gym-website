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
import categoryAPI from "../utils/categoryAPI";
import { TbEdit, TbTrash } from "react-icons/tb";

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
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await categoryAPI.getAll();
        setCategories(response);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories. Please try again.");
      } finally {
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

    if (formData.description.length > 500) {
      errors.description = "Description must be less than 500 characters";
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
      description: "",
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
      description: category.description || "",
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
      const response = await categoryAPI.create({
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
      });
      setCategories([...categories, response]);
      setShowAddModal(false);
      setSuccess("Category added successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);

      setIsSubmitting(false);
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
      const response = await categoryAPI.update(categoryToEdit.id, {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
      });
      setCategories((prev) =>
        prev.map((category) =>
          category.id === categoryToEdit.id
            ? {
                ...category,
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
              }
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
      await categoryAPI.delete(categoryToDelete.id);
      setCategories(
        categories.filter((category) => category.id !== categoryToDelete.id)
      );
      setShowDeleteModal(false);
      setCategoryToDelete(null);
      setSuccess("Category deleted successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);

      setIsSubmitting(false);
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
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-5 max-w-sm truncate text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-3 py-5 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
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
                      <div className="h-4 bg-zinc-700 rounded w-8 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-32 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-zinc-700 rounded w-16 animate-pulse"></div>
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
                categories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-zinc-700/20">
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-400">
                      {index + 1}.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {category.slug || "Not Provided"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {category.productCount || "--"}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-sm truncate whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {category.description}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-6">
                        <button
                          onClick={() => handleOpenEditModal(category)}
                          className="text-yellow-500 hover:text-yellow-400 transition-colors flex items-center space-x-1"
                          title="Edit Category"
                        >
                          <TbEdit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(category)}
                          className={`text-red-500 hover:text-red-400 transition-colors flex items-center space-x-1 ${
                            category.productCount > 0
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          title="Delete Category"
                          disabled={category.productCount > 0}
                        >
                          <TbTrash className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 max-w-2xl w-full"
          >
            <h3 className="text-xl font-bold text-white mb-6">
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

                {/* Category Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full bg-zinc-700/50 border ${
                      formErrors.description
                        ? "border-red-500"
                        : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Enter category description (optional)"
                  ></textarea>
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.description}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    Max 500 characters. This will be shown on the category page.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-8 py-2 bg-zinc-700 text-white font-semibold text-sm md:text-base rounded-lg hover:bg-zinc-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white font-semibold text-sm md:text-base rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5 mr-2" />
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
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 max-w-2xl w-full"
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

                {/* Category Description */}
                <div>
                  <label
                    htmlFor="edit-description"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full bg-zinc-700/50 border ${
                      formErrors.description
                        ? "border-red-500"
                        : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Enter category description (optional)"
                  ></textarea>
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.description}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    Max 500 characters. This will be shown on the category page.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-8 py-2 bg-zinc-700 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-zinc-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white text-sm md:text-base font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center"
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
                className="px-8 py-2 bg-zinc-700 text-sm md:text-base font-semibold text-white rounded-lg hover:bg-zinc-600 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center"
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
