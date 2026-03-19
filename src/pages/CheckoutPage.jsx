import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, game) => sum + game.price, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-10">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <div className="max-w-3xl mx-auto bg-[#0b121c] p-6 rounded-xl border border-gray-800">

        <h2 className="text-xl mb-4">Order Summary</h2>

        {cart.map((game, index) => (
          <div key={index} className="flex justify-between mb-2 text-sm">
            <span>{game.title}</span>
            <span>${game.price}</span>
          </div>
        ))}

        <hr className="my-4 border-gray-700" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-blue-400">${total}</span>
        </div>

        <button
          onClick={() => alert("Payment system coming soon 😎")}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}