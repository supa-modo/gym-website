import React, { createContext, useState, useEffect } from "react";
import usersData from "../data/users.json";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem("adminUser");

        if (!storedUser) {
          setLoading(false);
          return;
        }

        // Parse stored user data
        const userData = JSON.parse(storedUser);

        // Only set as logged in if user is an admin
        if (userData.role === "admin") {
          setCurrentUser(userData);
        } else {
          // If not admin, clear storage
          localStorage.removeItem("adminUser");
          localStorage.removeItem("adminToken");
        }
      } catch (err) {
        console.error("Auth check error:", err);
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminToken");
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);

      // Find user in the JSON data
      const user = usersData.users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      // Check if user exists and password matches
      if (!user) {
        throw new Error("User not found");
      }

      if (user.password !== password) {
        throw new Error("Invalid password");
      }

      // Check if user is admin
      if (user.role !== "admin") {
        throw new Error("Unauthorized. Admin access only.");
      }

      // Create a user object without the password
      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      };

      // Create a simple token (in a real app, this would be a JWT)
      const token = btoa(`${user.email}:${Date.now()}`);

      // Save user and token to localStorage
      localStorage.setItem("adminUser", JSON.stringify(userWithoutPassword));
      localStorage.setItem("adminToken", token);

      // Set user in state
      setCurrentUser(userWithoutPassword);

      return userWithoutPassword;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    setCurrentUser(null);
  };

  // Get auth header
  const getAuthHeader = () => {
    const token = localStorage.getItem("adminToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    getAuthHeader,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
