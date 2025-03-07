import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AuthContext = createContext();

// API base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          setLoading(false);
          return;
        }

        // Verify token and get user data from backend
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Only set as logged in if user is an admin
        if (response.data.role === "admin") {
          setCurrentUser(response.data);
        } else {
          // If not admin, clear token
          localStorage.removeItem("adminToken");
        }
      } catch (err) {
        console.error("Auth check error:", err);
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

      // Call backend login API
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Check if user is admin
      if (user.role !== "admin") {
        throw new Error("Unauthorized. Admin access only.");
      }

      // Save token to localStorage
      localStorage.setItem("adminToken", token);

      // Set user in state
      setCurrentUser(user);

      return user;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);

      // Call backend register API
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("adminToken", token);

      // Set user in state
      setCurrentUser(user);

      return user;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Logout function
  const logout = () => {
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
    register,
    logout,
    getAuthHeader,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
