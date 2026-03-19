import { useState, useEffect } from "react";
import Signature from "./Signature";
import { Link } from "react-router-dom";
export default function CartPage() {
  const [cartMessage, setCartMessage] = useState(""); // state لعرض الرسالة عند الإضافة إلى السلة
  const [cart, setCart] = useState([]); // السلة نفسها

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []); // تحميل السلة من localStorage عند بداية تحميل الصفحة

  // دالة لإضافة اللعبة إلى السلة
  const addToCart = (game) => {
    const newCart = [...cart, game];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    // إظهار رسالة تم الإضافة
    setCartMessage(`${game.title} has been added to your cart.`);
    console.log(cartMessage);  // التحقق من الرسالة

    // إخفاء الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
      setCartMessage(""); // إخفاء الرسالة بعد 3 ثوانٍ
    }, 3000);
  };

  // دالة لإزالة اللعبة من السلة
const removeGame = (index) => {
  const newCart = [...cart];
  newCart.splice(index, 1);
  setCart(newCart);
  localStorage.setItem("cart", JSON.stringify(newCart));

  window.dispatchEvent(new Event("cartUpdated")) // ✅ مهم
};
  // حساب المجموع الإجمالي
const total = cart
  .reduce((sum, game) => {
    return sum + Number(game.price)
  }, 0)
  .toFixed(2)
  return (
    
    <div className="min-h-screen bg-[#020617] text-white p-10">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      {/* هنا لعرض رسالة التأكيد في حال تم إضافة لعبة إلى السلة */}
     {cartMessage && (
      <div className="alert-message">
        <p>{cartMessage}</p>
      </div>
    )}
      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
<div className="max-w-6xl mx-auto">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    
    {cart.map((game, index) => (
      <div
        key={index}
        className="bg-[#0b121c] p-3 rounded-lg border border-gray-800 
        hover:scale-105 hover:border-blue-500/50 
        transition"
      >

        {/* الصورة */}
        <img
          src={game.image}
          className="w-full h-40 object-contain rounded-md mb-2 bg-gray-900"
        />

        {/* العنوان */}
        <h4 className="font-semibold text-sm">{game.title}</h4>

        {/* السعر */}
        <p className="text-blue-400 text-sm">
  {game.price === 0 ? "Free" : `$${game.price}`}
</p>

        {/* زر */}
        <button
          onClick={() => removeGame(index)}
          className="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 text-xs rounded w-full"
        >
          Remove
        </button>

      </div>
    ))}

  </div>
</div>
      )}

    <div className="mt-10 flex flex-col items-center gap-4">

  <h2 className="text-xl">
    Total: <span className="text-blue-400 font-bold">${total}</span>
  </h2>

<Link to="/checkout">
  <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-sm shadow-md transition">
    Confirm Purchase
  </button>
</Link>

</div>
<Signature />
    </div>
    
  );
}