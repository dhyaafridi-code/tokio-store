import React from "react";

const addToCart = (game) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(game);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-brand text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to <span className="text-accent">TOKIO Dashboard</span>
      </h1>

      <p className="text-muted mb-10">
        Here you can see your purchased games and account info.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-gray-200/10">
          <h2 className="text-xl font-bold">My Games</h2>
          <p className="text-muted text-sm mt-2">Your purchased games will appear here.</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-gray-200/10">
          <h2 className="text-xl font-bold">Account Info</h2>
          <p className="text-muted text-sm mt-2">Email and profile settings.</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-gray-200/10">
          <h2 className="text-xl font-bold">Support</h2>
          <p className="text-muted text-sm mt-2">Contact TOKIO support anytime.</p>
        </div>
      </div>
    </div>
  );
}
