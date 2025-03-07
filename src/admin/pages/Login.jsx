import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbAlertTriangle } from "react-icons/tb";
import { PiPasswordDuotone, PiUserDuotone } from "react-icons/pi";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(
        error.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen bg-zinc-900  flex items-center justify-center p-4"
      style={{
        backgroundImage: `url('/images/img3.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Enhanced gradient overlay with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 z-10 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-xl relative z-20"
      >
        <div className="bg-zinc-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="px-14 py-8">
            <div className="w-full ">
              <img
                src="/images/logo-gym.png"
                alt="gym-logo"
                className="w-28 h-28 mx-auto"
              />
            </div>
            <div className="text-center mb-5">
              <h1 className="text-3xl font-bold text-white mb-2">
                Elite Fitness Management Console
              </h1>
              <p className="text-gray-400 text-sm">
                Enter your login credentials to access the admin dashboard
              </p>
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6 flex items-center gap-3"
              >
                <TbAlertTriangle className="text-red-500 flex-shrink-0" />
                <p className="text-red-500 text-sm">{loginError}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <PiUserDuotone className="text-gray-500 w-5 h-5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-14 pr-3 py-3 bg-zinc-700/50 border ${
                        errors.email ? "border-red-500" : "border-zinc-600"
                      } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="youremail@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <PiPasswordDuotone className="text-gray-400 w-5 h-5" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-14 pr-10 py-3 bg-zinc-700/50 border ${
                        errors.password ? "border-red-500" : "border-zinc-600"
                      } rounded-lg text-white focus:outline-none focus:border-primary transition-colors`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={handleTogglePassword}
                      className="absolute inset-y-0 right-0 pr-6 flex items-center"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-400 w-5 h-5" />
                      ) : (
                        <FaEye className="text-gray-400 w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 bg-zinc-700 border-zinc-600 rounded text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-400"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-primary hover:text-red-400 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                      isLoading
                        ? "bg-primary/70"
                        : "bg-primary hover:bg-red-700"
                    } transition-colors shadow-lg shadow-primary/20 flex items-center justify-center`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </motion.button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-zinc-900/70 px-8 py-4 text-center">
            <p className="text-sm text-gray-400">
              Return to{" "}
              <a
                href="/"
                className="text-primary hover:text-red-400 transition-colors"
              >
                Main Website
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
