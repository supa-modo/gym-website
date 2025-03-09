import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSave,
  FiAlertCircle,
  FiGlobe,
  FiMail,
  FiCreditCard,
  FiDatabase,
  FiCheck,
} from "react-icons/fi";

const Settings = () => {
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Elite Fitness Guru",
    siteDescription: "Premium fitness equipment and supplements",
    contactEmail: "contact@elitefitnessguru.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Fitness Ave, Nairobi, Kenya",
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "notifications@elitefitnessguru.com",
    smtpPassword: "••••••••••••",
    fromEmail: "notifications@elitefitnessguru.com",
    fromName: "Elite Fitness Guru",
  });

  // Payment Gateway Settings
  const [paymentSettings, setPaymentSettings] = useState({
    stripePublicKey: "pk_test_••••••••••••••••••••••••",
    stripeSecretKey: "sk_test_••••••••••••••••••••••••",
    stripeWebhookSecret: "whsec_••••••••••••••••••••••••",
    paypalClientId: "••••••••••••••••••••••••",
    paypalClientSecret: "••••••••••••••••••••••••",
    currency: "USD",
  });

  // Backup Settings
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: "30",
    lastBackup: "2023-06-15T10:30:00Z",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState("general");

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // In a real app, you would fetch settings from your API
        // const response = await api.get('/settings');
        // setGeneralSettings(response.data.general);
        // setEmailSettings(response.data.email);
        // setPaymentSettings(response.data.payment);
        // setBackupSettings(response.data.backup);

        // Simulate API call
        setTimeout(() => {
          // Settings are already set with default values
        }, 500);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setError("Failed to fetch settings. Please try again.");
      }
    };

    fetchSettings();
  }, []);

  // Handle general settings change
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle email settings change
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle payment settings change
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle backup settings change
  const handleBackupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBackupSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      // In a real app, you would save settings to your API
      // await api.post('/settings', {
      //   general: generalSettings,
      //   email: emailSettings,
      //   payment: paymentSettings,
      //   backup: backupSettings
      // });

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setSuccess("Settings saved successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }, 1000);
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Failed to save settings. Please try again.");
      setIsLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  // Trigger manual backup
  const handleManualBackup = () => {
    setIsLoading(true);

    // Simulate backup process
    setTimeout(() => {
      setBackupSettings((prev) => ({
        ...prev,
        lastBackup: new Date().toISOString(),
      }));
      setIsLoading(false);
      setSuccess("Manual backup completed successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      {/* Settings Tabs */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden">
        <div className="flex flex-wrap border-b border-zinc-700">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === "general"
                ? "bg-zinc-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-zinc-700/50"
            } transition-colors`}
          >
            <FiGlobe className="mr-2" />
            General
          </button>

          <button
            onClick={() => setActiveTab("email")}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === "email"
                ? "bg-zinc-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-zinc-700/50"
            } transition-colors`}
          >
            <FiMail className="mr-2" />
            Email
          </button>

          <button
            onClick={() => setActiveTab("payment")}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === "payment"
                ? "bg-zinc-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-zinc-700/50"
            } transition-colors`}
          >
            <FiCreditCard className="mr-2" />
            Payment
          </button>

          <button
            onClick={() => setActiveTab("backup")}
            className={`px-4 py-4 text-sm font-medium flex items-center ${
              activeTab === "backup"
                ? "bg-zinc-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-zinc-700/50"
            } transition-colors`}
          >
            <FiDatabase className="mr-2" />
            Backup & Restore
          </button>
        </div>

        <div className="p-6">
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

          <form onSubmit={handleSubmit}>
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-white mb-4">
                  General Settings
                </h2>

                <div>
                  <label
                    htmlFor="siteName"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Site Name
                  </label>
                  <input
                    id="siteName"
                    name="siteName"
                    type="text"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="siteDescription"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Site Description
                  </label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    rows="3"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Contact Email
                  </label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactPhone"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Contact Phone
                  </label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="text"
                    value={generalSettings.contactPhone}
                    onChange={handleGeneralChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Business Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={generalSettings.address}
                    onChange={handleGeneralChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === "email" && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-white mb-4">
                  Email Settings
                </h2>

                <div>
                  <label
                    htmlFor="smtpHost"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    SMTP Host
                  </label>
                  <input
                    id="smtpHost"
                    name="smtpHost"
                    type="text"
                    value={emailSettings.smtpHost}
                    onChange={handleEmailChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="smtpPort"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    SMTP Port
                  </label>
                  <input
                    id="smtpPort"
                    name="smtpPort"
                    type="text"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="smtpUser"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    SMTP Username
                  </label>
                  <input
                    id="smtpUser"
                    name="smtpUser"
                    type="text"
                    value={emailSettings.smtpUser}
                    onChange={handleEmailChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="smtpPassword"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    SMTP Password
                  </label>
                  <input
                    id="smtpPassword"
                    name="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fromEmail"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    From Email
                  </label>
                  <input
                    id="fromEmail"
                    name="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={handleEmailChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fromName"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    From Name
                  </label>
                  <input
                    id="fromName"
                    name="fromName"
                    type="text"
                    value={emailSettings.fromName}
                    onChange={handleEmailChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Send Test Email
                  </button>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === "payment" && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-white mb-4">
                  Payment Gateway Settings
                </h2>

                <div className="bg-zinc-700/30 p-4 rounded-lg mb-6">
                  <h3 className="text-white font-medium mb-2">
                    Stripe Settings
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="stripePublicKey"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Stripe Public Key
                      </label>
                      <input
                        id="stripePublicKey"
                        name="stripePublicKey"
                        type="text"
                        value={paymentSettings.stripePublicKey}
                        onChange={handlePaymentChange}
                        className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="stripeSecretKey"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Stripe Secret Key
                      </label>
                      <input
                        id="stripeSecretKey"
                        name="stripeSecretKey"
                        type="password"
                        value={paymentSettings.stripeSecretKey}
                        onChange={handlePaymentChange}
                        className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="stripeWebhookSecret"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Stripe Webhook Secret
                      </label>
                      <input
                        id="stripeWebhookSecret"
                        name="stripeWebhookSecret"
                        type="password"
                        value={paymentSettings.stripeWebhookSecret}
                        onChange={handlePaymentChange}
                        className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-700/30 p-4 rounded-lg mb-6">
                  <h3 className="text-white font-medium mb-2">
                    PayPal Settings
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="paypalClientId"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        PayPal Client ID
                      </label>
                      <input
                        id="paypalClientId"
                        name="paypalClientId"
                        type="text"
                        value={paymentSettings.paypalClientId}
                        onChange={handlePaymentChange}
                        className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="paypalClientSecret"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        PayPal Client Secret
                      </label>
                      <input
                        id="paypalClientSecret"
                        name="paypalClientSecret"
                        type="password"
                        value={paymentSettings.paypalClientSecret}
                        onChange={handlePaymentChange}
                        className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="currency"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={paymentSettings.currency}
                    onChange={handlePaymentChange}
                    className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>
              </div>
            )}

            {/* Backup & Restore Settings */}
            {activeTab === "backup" && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-white mb-4">
                  Backup & Restore
                </h2>

                <div className="bg-zinc-700/30 p-4 rounded-lg mb-6">
                  <h3 className="text-white font-medium mb-4">
                    Automatic Backups
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="autoBackup"
                        name="autoBackup"
                        type="checkbox"
                        checked={backupSettings.autoBackup}
                        onChange={handleBackupChange}
                        className="h-4 w-4 bg-zinc-700 border-zinc-600 rounded text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="autoBackup"
                        className="ml-2 block text-sm text-gray-300"
                      >
                        Enable automatic backups
                      </label>
                    </div>

                    <div>
                      <label
                        htmlFor="backupFrequency"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Backup Frequency
                      </label>
                      <select
                        id="backupFrequency"
                        name="backupFrequency"
                        value={backupSettings.backupFrequency}
                        onChange={handleBackupChange}
                        disabled={!backupSettings.autoBackup}
                        className={`w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors ${
                          !backupSettings.autoBackup
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="backupRetention"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Backup Retention (days)
                      </label>
                      <input
                        id="backupRetention"
                        name="backupRetention"
                        type="number"
                        min="1"
                        value={backupSettings.backupRetention}
                        onChange={handleBackupChange}
                        disabled={!backupSettings.autoBackup}
                        className={`w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors ${
                          !backupSettings.autoBackup
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-700/30 p-4 rounded-lg mb-6">
                  <h3 className="text-white font-medium mb-4">Manual Backup</h3>

                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm">
                      Last backup: {formatDate(backupSettings.lastBackup)}
                    </p>

                    <button
                      type="button"
                      onClick={handleManualBackup}
                      disabled={isLoading}
                      className={`bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm transition-colors ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoading ? "Creating Backup..." : "Create Backup Now"}
                    </button>
                  </div>
                </div>

                <div className="bg-zinc-700/30 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-4">
                    Restore from Backup
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="backupFile"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Upload Backup File
                      </label>
                      <input
                        id="backupFile"
                        name="backupFile"
                        type="file"
                        className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Restore from Backup
                      </button>
                    </div>

                    <p className="text-red-400 text-xs">
                      Warning: Restoring from a backup will overwrite all
                      current data. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
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
                    Save Settings
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
