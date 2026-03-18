import React from "react";

const addToCart = (game)=>{

const cart = JSON.parse(localStorage.getItem("cart")) || []

cart.push(game)

localStorage.setItem("cart",JSON.stringify(cart))

alert("Added to cart")

}
<div className="grid md:grid-cols-3 gap-6">

<div className="bg-[#0b121c] p-4 rounded-xl border border-blue-500/20">

<img src="/hero.png" className="rounded-lg mb-3"/>

<h2 className="text-xl">GTA V</h2>

<p className="text-blue-400">$25</p>

<button
onClick={()=>addToCart({
title:"GTA V",
price:25,
image:"/hero.png"
})}
className="bg-blue-600 px-4 py-2 rounded mt-3"
>
Add to Cart
</button>

</div>

</div>

export default function Dashboard() {
  return (
    
    <div className="min-h-screen bg-[#020617] text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to <span className="text-blue-400">TOKIO Dashboard</span>
      </h1>

      <p className="text-gray-400 mb-10">
        Here you can see your purchased games and account info.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#0b121c] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold">My Games</h2>
          <p className="text-gray-400 text-sm mt-2">
            Your purchased games will appear here.
          </p>
        </div>

        <div className="bg-[#0b121c] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold">Account Info</h2>
          <p className="text-gray-400 text-sm mt-2">
            Email and profile settings.
          </p>
        </div>

        <div className="bg-[#0b121c] p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold">Support</h2>
          <p className="text-gray-400 text-sm mt-2">
            Contact TOKIO support anytime.
          </p>
        </div>
      </div>
    </div>
  );
}