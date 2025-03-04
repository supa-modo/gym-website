import React from "react";
import { FiCreditCard, FiShield, FiPhone } from "react-icons/fi";
import { FaMobile } from "react-icons/fa";
import { SiVisa, SiMastercard, SiStripe } from "react-icons/si";

const CheckoutStep2 = ({
  paymentMethod,
  setPaymentMethod,
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold text-white">Payment Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Card Payment Option */}
        <div
          className={`border rounded-xl p-4 cursor-pointer transition-all ${
            paymentMethod === "card"
              ? "border-primary bg-zinc-800"
              : "border-zinc-700 bg-zinc-800/50 hover:border-gray-500"
          }`}
          onClick={() => handlePaymentMethodChange("card")}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "card" ? "border-primary" : "border-gray-500"
              }`}
            >
              {paymentMethod === "card" && (
                <div className="w-3 h-3 rounded-full bg-primary" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <FiCreditCard
                className={
                  paymentMethod === "card" ? "text-primary" : "text-gray-400"
                }
              />
              <span className="font-medium text-white">Credit/Debit Card</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3 ml-8">
            <SiVisa className="w-8 h-8 text-blue-500" />
            <SiMastercard className="w-8 h-8 text-yellow-500" />
            <SiStripe className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        {/* M-Pesa Payment Option */}
        <div
          className={`border rounded-xl p-4 cursor-pointer transition-all ${
            paymentMethod === "mpesa"
              ? "border-primary bg-zinc-800"
              : "border-zinc-700 bg-zinc-800/50 hover:border-gray-500"
          }`}
          onClick={() => handlePaymentMethodChange("mpesa")}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === "mpesa" ? "border-primary" : "border-gray-500"
              }`}
            >
              {paymentMethod === "mpesa" && (
                <div className="w-3 h-3 rounded-full bg-primary" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <img src="/mpesa.png" alt="mpesa-logo"  className={ 
                  paymentMethod === "mpesa" ? "text-primary" : "text-gray-400"
                }/>
              <FaMobile
                className={
                  paymentMethod === "mpesa" ? "text-primary" : "text-gray-400"
                }
              />
              <span className="font-medium text-white">Lipa na M-Pesa</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2 ml-8">
            Pay directly from your phone through Safaricom's M-Pesa
          </p>
        </div>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === "card" && (
        <div className="space-y-4 pt-4 border-t border-zinc-700">
          {/* Card Number */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-gray-400 text-sm mb-1"
            >
              Card Number
            </label>
            <div className="relative">
              <FiCreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>
          </div>

          {/* Card Name */}
          <div>
            <label
              htmlFor="cardName"
              className="block text-gray-400 text-sm mb-1"
            >
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
              placeholder="John Doe"
            />
          </div>

          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-gray-400 text-sm mb-1"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-gray-400 text-sm mb-1">
                CVV
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="123"
                  maxLength="4"
                />
                <FiShield className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* M-Pesa Payment Form */}
      {paymentMethod === "mpesa" && (
        <div className="space-y-4 pt-4 border-t border-zinc-700">
          <div>
            <label
              htmlFor="mpesaNumber"
              className="block text-gray-400 text-sm mb-1"
            >
              M-Pesa Phone Number
            </label>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="tel"
                id="mpesaNumber"
                name="mpesaNumber"
                value={formData.mpesaNumber}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                placeholder="07XX XXX XXX"
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">
              You'll receive a push notification on this number to complete the
              payment
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutStep2;
