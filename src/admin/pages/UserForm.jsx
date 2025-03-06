import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSave,
  FiArrowLeft,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiUpload,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";
import { userAPI } from "../utils/api";

// Sample user data
const sampleUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "member",
  phone: "+1 (555) 123-4567",
  profilePicture: "https://via.placeholder.com/150",
  status: "active",
  createdAt: "2023-05-15T10:30:00Z",
  updatedAt: "2023-05-15T15:45:00Z",
};

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "customer",
    phone: "",
    status: "active",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch user data if in edit mode
  useEffect(() => {
    const fetchUser = async () => {
      if (!isEditMode) return;

      try {
        setIsFetching(true);
        setError(null);

        // In a real app, you would fetch data from your API
        // const response = await userAPI.getById(id);
        // const user = response.data;

        // Simulate API call
        setTimeout(() => {
          // Mock user data
          const user = sampleUser;

          setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone || "",
            status: user.status,
            password: "",
            confirmPassword: "",
          });

          if (user.profilePicture) {
            setProfileImagePreview(user.profilePicture);
          }

          setIsFetching(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user data. Please try again.");
        setIsFetching(false);
      }
    };

    fetchUser();
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
        profileImage: "Please upload a valid image file (JPEG, PNG, GIF, WEBP)",
      }));
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        profileImage: "Image size should be less than 2MB",
      }));
      return;
    }

    setProfileImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Clear error
    if (errors.profileImage) {
      setErrors((prev) => ({
        ...prev,
        profileImage: null,
      }));
    }
  };

  // Remove profile image
  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImagePreview("");
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!isEditMode && !formData.password) {
      newErrors.password = "Password is required for new users";
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      // Prepare data for API
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        status: formData.status,
      };

      if (formData.password) {
        userData.password = formData.password;
      }

      // In a real app, you would upload the image and then save the user
      // if (profileImage) {
      //   const formData = new FormData();
      //   formData.append('image', profileImage);
      //   const uploadResponse = await axios.post('/api/upload', formData);
      //   userData.profilePicture = uploadResponse.data.imageUrl;
      // }

      // Then save the user
      // if (isEditMode) {
      //   await userAPI.update(id, userData);
      // } else {
      //   await userAPI.create(userData);
      // }

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(
          isEditMode
            ? "User updated successfully!"
            : "User created successfully!"
        );

        // Redirect after a short delay
        setTimeout(() => {
          navigate("/admin/users");
        }, 1500);
      }, 1000);
    } catch (err) {
      console.error("Error saving user:", err);
      setError(
        isEditMode
          ? "Failed to update user. Please try again."
          : "Failed to create user. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/admin/users")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">
            {isEditMode ? "Edit User" : "Add New User"}
          </h1>
        </div>
      </div>

      {/* Loading State */}
      {isFetching ? (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-400">Loading user data...</p>
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
              <FiCheck className="text-green-500 flex-shrink-0" />
              <p className="text-green-500">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Image */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  Profile Image
                </h2>

                <div className="space-y-4">
                  {/* Image Preview */}
                  <div className="w-40 h-40 mx-auto bg-zinc-700 rounded-full overflow-hidden flex items-center justify-center">
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="w-20 h-20 text-gray-500" />
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="profile-image-upload"
                      className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center cursor-pointer"
                    >
                      {profileImagePreview ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    {profileImagePreview && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <FiTrash2 className="w-4 h-4 mr-2" />
                        Remove Image
                      </button>
                    )}

                    {errors.profileImage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.profileImage}
                      </p>
                    )}

                    <p className="text-gray-400 text-xs mt-2">
                      Recommended size: 200x200 pixels. Max file size: 2MB.
                      Supported formats: JPEG, PNG, GIF, WEBP.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - User Details */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  User Details
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-500" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 bg-zinc-700/50 border ${
                          errors.name ? "border-red-500" : "border-zinc-600"
                        } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                        placeholder="Enter full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 bg-zinc-700/50 border ${
                          errors.email ? "border-red-500" : "border-zinc-600"
                        } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                        placeholder="Enter email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-500" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  {/* Role and Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Role */}
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        User Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                        <option value="customer">Customer</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Password{" "}
                      {!isEditMode && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-500" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 bg-zinc-700/50 border ${
                          errors.password ? "border-red-500" : "border-zinc-600"
                        } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                        placeholder={
                          isEditMode
                            ? "Leave blank to keep current password"
                            : "Enter password"
                        }
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Confirm Password{" "}
                      {!isEditMode && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-500" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 bg-zinc-700/50 border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-zinc-600"
                        } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                        placeholder="Confirm password"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <Link to="/admin/users">
              <button
                type="button"
                className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg text-white flex items-center ${
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
                  {isEditMode ? "Update User" : "Create User"}
                </>
              )}
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserForm;
