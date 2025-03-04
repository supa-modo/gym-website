import React from "react";

const CheckoutSummary = ({ deliveryMethod, cartTotal }) => {
  const deliveryFee = deliveryMethod === "delivery" ? 5.99 : 0;
  const totalWithDelivery = cartTotal + deliveryFee;

  return (
    <div className="p-4 border-t border-zinc-800">
      <div className="flex justify-between text-gray-400">
        <span>Subtotal</span>
        <span className="text-white">${cartTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-400">
        <span>Delivery</span>
        <span
          className={
            deliveryMethod === "pickup" ? "text-green-500" : "text-white"
          }
        >
          {deliveryMethod === "pickup" ? "Free" : `$${deliveryFee.toFixed(2)}`}
        </span>
      </div>
      <div className="flex justify-between text-white font-bold mt-2">
        <span>Total</span>
        <span className="text-primary">${totalWithDelivery.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CheckoutSummary;
