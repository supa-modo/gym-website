import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSave,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiLock,
  FiUpload,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import userAPI from "../utils/userAPI";

const ProfileSettings = () => {
  const { currentUser, logout } = useAuth();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  // Add state for showing/hiding passwords
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      });

      if (currentUser.profilePicture) {
        setProfileImagePreview(currentUser.profilePicture);
      }
    }
  }, [currentUser]);

  // Handle profile data change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle password data change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, GIF, WEBP)");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
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
    setError(null);
  };

  // Remove profile image
  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImagePreview("");
  };

  // Validate profile form
  const validateProfileForm = () => {
    if (!profileData.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!profileData.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      setError("Email is invalid");
      return false;
    }

    return true;
  };

  // Validate password form
  const validatePasswordForm = () => {
    if (!passwordData.currentPassword) {
      setPasswordError("Current password is required");
      return false;
    }

    if (!passwordData.newPassword) {
      setPasswordError("New password is required");
      return false;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }

    return true;
  };

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      // Prepare form data
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      // Update profile
      const updatedUser = await userAPI.update(currentUser.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update local state
      setProfileData({
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      });
      if (updatedUser.profilePicture) {
        setProfileImagePreview(updatedUser.profilePicture);
      }

      setIsLoading(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile. Please try again.");
      setIsLoading(false);
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setPasswordError(null);
      setPasswordSuccess(null);

      // Change password
      await userAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setIsLoading(false);
      setPasswordSuccess("Password updated successfully!");

      // Clear form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error updating password:", err);
      setPasswordError(
        err.message || "Failed to update password. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image */}
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

                <p className="text-gray-400 text-xs mt-2">
                  Recommended size: 200x200 pixels. Max file size: 2MB.
                  Supported formats: JPEG, PNG, GIF, WEBP.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
            <h2 className="text-lg font-medium text-white mb-4">
              Profile Information
            </h2>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 mb-6">
                <FiAlertCircle className="text-red-500 flex-shrink-0" />
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3 mb-6">
                <FiCheck className="text-green-500 flex-shrink-0" />
                <p className="text-green-500">{success}</p>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="pt-1">
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4 mr-2" />
                      Save Profile
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mt-6">
            <h2 className="text-lg font-medium text-white mb-4">
              Change Password
            </h2>

            {/* Error Message */}
            {passwordError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 mb-6">
                <FiAlertCircle className="text-red-500 flex-shrink-0" />
                <p className="text-red-500">{passwordError}</p>
              </div>
            )}

            {/* Success Message */}
            {passwordSuccess && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3 mb-6">
                <FiCheck className="text-green-500 flex-shrink-0" />
                <p className="text-green-500">{passwordSuccess}</p>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showCurrentPassword ? (
                      <FaEyeSlash className="text-gray-400 w-5 h-5" />
                    ) : (
                      <FaEye className="text-gray-400 w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showNewPassword ? (
                        <FaEyeSlash className="text-gray-400 w-5 h-5" />
                      ) : (
                        <FaEye className="text-gray-400 w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-gray-400 w-5 h-5" />
                      ) : (
                        <FaEye className="text-gray-400 w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-1">
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
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiLock className="w-4 h-4 mr-2" />
                      Change Password
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
