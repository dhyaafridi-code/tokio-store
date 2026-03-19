import { BrowserRouter, Routes, Route } from "react-router-dom"
import manitta from "./assets/mannita.png"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard"
import { useState, useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import { signOut } from "firebase/auth";
import Signature from "./pages/Signature";
import CartPage from "./pages/CartPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import './index.css';
export default function App() {
  const [cartCount, setCartCount] = useState(0)
const [user,setUser] = useState(null)
const [cartMessage, setCartMessage] = useState("")
const [contactOpen, setContactOpen] = useState(false)
const [avatar, setAvatar] = useState(null);
const [menuOpen,setMenuOpen] = useState(false)


const addToCart = (game) => {

  const username = localStorage.getItem("username")

  if (!username) {
    setCartMessage("❌ You must log in to add to the cart")
    setTimeout(() => setCartMessage(""), 2000)
    return
  }

  const storedCart = JSON.parse(localStorage.getItem("cart")) || []

  // 🔥 check إذا راهي موجودة
  const exists = storedCart.find(item => item.title === game.title)

  if (exists) {
    setCartMessage("⚠️ This game is on the card")
    setTimeout(() => setCartMessage(""), 2000)
    return
  }

  const newCart = [...storedCart, game]

  localStorage.setItem("cart", JSON.stringify(newCart))
  window.dispatchEvent(new Event("cartUpdated"))

  setCartMessage(`✅ ${game.title} added to cart`)

  setTimeout(() => setCartMessage(""), 2000)
}
const handleLogout = async () => {
  await signOut(auth)
  localStorage.removeItem("username")
  window.location.href = "/"
}

useEffect(() => {

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    setCartCount(cart.length)
  }

  updateCartCount()

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser.email);
      localStorage.setItem("username", currentUser.email);
    } else {
      setUser(null);
      localStorage.removeItem("username");
    }
  });

  const updateAvatar = () => {
    const newAvatar = localStorage.getItem("avatar");
    setAvatar(newAvatar);
  };

  window.addEventListener("avatarChanged", updateAvatar);
  window.addEventListener("cartUpdated", updateCartCount);

  const savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar) setAvatar(savedAvatar);

  return () => {
    unsubscribe();
    window.removeEventListener("avatarChanged", updateAvatar);
    window.removeEventListener("cartUpdated", updateCartCount);
  };

}, []);

return (
  <BrowserRouter>

<Routes>
<Route path="/cart" element={<CartPage />} />
<Route path="/profile" element={<ProfilePage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
<Route path="/checkout" element={<CheckoutPage />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/" element={

<div className="relative min-h-screen bg-[#020617] text-white overflow-x-hidden">

  {/* 🔥 الرسالة هنا */}
{cartMessage && (
  <div className="fixed top-8 left-1/2
  bg-blue-600 text-white px-6 py-3 rounded-xl
  shadow-[0_0_20px_rgba(37,99,235,0.8)]
  z-[9999]
  animate-[slideDown_0.4s_ease_forwards]">
     {cartMessage}
  </div>
)}

  {/* باقي الصفحة */}

{/* الخلفية */}

<div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
<div className="absolute top-20 left-10 w-96 h-96 border-[12px] border-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
<div className="absolute bottom-20 right-10 w-96 h-96 border-[12px] border-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
<img src={manitta} className="absolute top-[10%] left-[3%] w-80 opacity-20 animate-spin-slow"/>
<img src={manitta} className="absolute top-[5%] right-[3%] w-80 opacity-20 animate-bounce"/>
<img src={manitta} className="absolute top-[40%] left-[3%] w-80 opacity-20 animate-bounce"/>
<img src={manitta} className="absolute top-[60%] right-[3%] w-80 opacity-20 animate-spin-slow"/>
<img src={manitta} className="absolute top-[73%] left-[3%] w-80 opacity-20 animate-bounce"/>

</div>

<div className="relative z-10">

<div className="absolute top-10 left-10 w-64 h-64 border-4 border-blue-500 rounded-full animate-slow-float opacity-20"></div>

<div className="absolute bottom-20 right-20 w-80 h-80 border-4 border-purple-500 rounded-full animate-slow-float opacity-20"></div>

{/* NAVBAR */}

<nav className="flex justify-between items-center px-6 py-4 w-full relative">

{/* LOGO */}
<div className="text-xl md:text-2xl font-bold tracking-widest">
  TOKIO <span className="text-blue-500">Store</span>
</div>

{/* DESKTOP MENU */}
<div className="hidden md:flex items-center gap-6">

  <div className="relative group">
    <button className="text-gray-300 hover:text-blue-400">
      Contact ▾
    </button>

    <div className="absolute top-full right-0 w-40 bg-[#020617] border border-blue-500/30 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2">
      <ul className="py-2 text-sm">
        <li><a href="https://t.me/DHIAA_FRD" target="_blank" className="block px-4 py-2 hover:bg-blue-900/30">Telegram</a></li>
        <li><a href="https://www.instagram.com/el_fr1do/" target="_blank" className="block px-4 py-2 hover:bg-blue-900/30">Instagram</a></li>
        <li><a href="https://discord.gg/Ehz6sVjh" target="_blank" className="block px-4 py-2 hover:bg-blue-900/30">Discord</a></li>
      </ul>
    </div>
  </div>

  {!user ? (
    <div className="bg-blue-600 px-4 py-2 rounded-full flex gap-2">
      <a href="/login">Login</a>
      <span>/</span>
      <a href="/register">Signup</a>
    </div>
  ) : (
    <div className="relative group">

  {/* AVATAR */}
  <button className="flex items-center gap-2">
    <img
      src={avatar || "https://i.pravatar.cc/40"}
      className="w-10 h-10 rounded-full border-2 border-blue-500"
    />
    <span className="text-sm text-gray-300">▼</span>
  </button>

  {/* DROPDOWN */}
  <div className="
    absolute right-0 mt-3 w-40
    bg-[#020617] border border-blue-500/30
    rounded-lg
    opacity-0 invisible
    group-hover:opacity-100 group-hover:visible
    transition-all duration-300
  ">
    <ul className="py-2 text-sm">

      <li>
        <a href="/profile" className="block px-4 py-2 hover:bg-blue-900/30">
          My Profile
        </a>
      </li>

      <li>
     <div className="relative">
  <a href="/cart" className="block px-4 py-2 hover:bg-blue-900/30">
    Cart 🛒
  </a>

  {cartCount > 0 && (
    <span className="absolute top-1 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
      {cartCount}
    </span>
  )}
</div>
      </li>

      <li>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-red-900/30 text-red-400"
        >
          Logout
        </button>
      </li>

    </ul>
  </div>

</div>
  )}

</div>

{/* MOBILE BUTTON ☰ */}
<button
onClick={() => setMenuOpen(!menuOpen)}
className="md:hidden text-2xl"
>
☰
</button>

{/* MOBILE MENU */}
{menuOpen && (
  <div className="absolute top-full left-0 w-full bg-[#020617] border-t border-blue-500/30 md:hidden z-50">

    <div className="flex flex-col items-center py-6 gap-4">

      <a href="https://t.me/DHIAA_FRD" className="text-gray-300 hover:text-blue-400">Telegram</a>
      <a href="https://www.instagram.com/el_fr1do/" className="text-gray-300 hover:text-blue-400">Instagram</a>
      <a href="https://discord.gg/Ehz6sVjh" className="text-gray-300 hover:text-blue-400">Discord</a>

      {!user ? (
        <div className="bg-blue-600 px-4 py-2 rounded-full flex gap-2">
          <a href="/login">Login</a>
          <span>/</span>
          <a href="/register">Signup</a>
        </div>
      ) : (
        <>
          <a href="/profile" className="text-white">Profile</a>
          <a href="/cart" className="text-white">Cart</a>
          <button onClick={handleLogout} className="text-red-400">Logout</button>
        </>
      )}

    </div>
  </div>
)}

</nav>


{/* HERO */}

<main className="flex flex-col items-center mt-10 md:mt-20 text-center px-2">

<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight tracking-tight text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.9)] px-4">
YOUR NEXT <br/>

<span className="text-blue-400">ADVENTURE</span> AWAITS

</h2>

<p className="text-sm sm:text-base md:text-lg text-gray-400 mt-6 max-w-md px-4">

TOKIO Store is your ultimate destination for premium games. We provide instant delivery, unbeatable prices, and 100% trusted service.

</p>

</main>


{/* SHOP */}

<section className="px-10 py-20">

<h3 className="text-4xl font-black text-center mb-12">

OUR <span className="text-blue-400">SHOP</span>

</h3>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

{[
{ title:"FC 26",price:10.99,image:"https://image.api.playstation.com/vulcan/ap/rnd/202507/1617/2e757ffb0a6bb4b91af84db64e0183d725e56e5354f45eba.png"},
{ title:"GTA 5",price:10.50,image:"https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png"},
{ title:"Red Dead Redemption 2",price:9.99,image:"https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Red_Dead_Redemption_II.jpg/250px-Red_Dead_Redemption_II.jpg"},
{ title:"Tomb Raider",price:6.32,image:"https://store-images.s-microsoft.com/image/apps.41930.13751698123876051.fbe31682-3a2b-47ef-81cd-f2d61eb7eccd.a31a5e60-b857-4875-9874-e0db0f88a78d"},
{ title:"Uncharted",price:11.99,image:"https://www.ubuy.dz/productimg/?image=aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzUxZEZadUxmU3lMLmpwZw.jpg"},
{ title:"Cyberpunk 2077",price:19.99,image:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/250px-Cyberpunk_2077_box_art.jpg"},
{ title:"Elden Ring",price:13.99,image:"https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg"},
{ title:"The Witcher 3",price:14.99,image:"https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg"},
{ title:"God of War",price:16.99,image:"https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg"},
{ title:"Baldur's Gate 3",price:18.99,image:"https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Baldur%27s_Gate_3_cover_art.jpg/250px-Baldur%27s_Gate_3_cover_art.jpg"},
{ title:"Counter-Strike 2",price:0,image:"https://tamhongame.net/storage/games/counter-strike-2-online-multiplayer/counter-strike-2-online-multiplayer-vertical_photo-0NQZisZoNB3jqYbdxkop.jpeg"},
{ title:"Resident Evil 4",price:0,image:"https://media.senscritique.com/media/000021509526/0/resident_evil_4.png"},
{ title:"Hogwarts Legacy",price:12.50,image:"https://image.api.playstation.com/vulcan/ap/rnd/202503/2716/f6b1e4512ee6061913f7d604da8f5f39566be56ca32a68ee.png"},
{ title:"Call of Duty: MW3",price:19.25,image:"https://upload.wikimedia.org/wikipedia/en/b/bf/Call_of_Duty_Modern_Warfare_3_box_art.png"}
].map((game,index)=>(

<div key={index} className="bg-[#0b121c] p-4 rounded-xl border border-gray-800 hover:scale-105 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition">
    <img src={game.image} className="w-full h-64 object-contain rounded-lg mb-4 bg-gray-900" />
    <h4 className="font-bold text-lg">{game.title}</h4>
   <p className="text-blue-400 font-bold text-xl">{game.price === 0 ? "Free" : `$${game.price}`}</p>

    <div className="flex gap-3 mt-4">
        <a href="https://discord.gg/Ehz6sVjh" target="_blank" className="block w-full">
            <button className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded w-full">
                Buy Now
            </button>
        </a>

        <button
        onClick={() => addToCart(game)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
        >
            Add to Cart
        </button>
    </div>
</div> 


))}

</div>

</section>


{/* REVIEWS */}

<section className="px-10 py-20 bg-[#080d14]">

<h3 className="text-4xl font-black text-center mb-12">
CUSTOMER <span className="text-blue-400">REVIEWS</span>
</h3>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

{[
{name:"Alex M.",text:"Got GTA 5 for an insane price. Delivery was instant."},
{name:"Sarah K.",text:"The automated pricing always beats other sites."},
{name:"Jorden P.",text:"Smooth checkout, great customer support on Discord."},
{name:"Chris L.",text:"Reliable and fast. I've purchased 3 games."}
].map((review,index)=>(

<div key={index} className="bg-[#0b121c] p-4 rounded-xl border border-gray-800 hover:border-blue-500 hover:-translate-y-2 transition">

<div className="text-yellow-400 mb-4">★★★★★</div>

<p className="text-gray-400 text-sm mb-4">
"{review.text}"
</p>

<p className="font-bold text-blue-400">
— {review.name}
</p>

</div>

))}

</div>

</section>


{/* FOOTER */}

<footer className="w-full bg-[#020617] border-t border-blue-500/30 py-10 mt-20">

<div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">

<div className="text-2xl font-bold text-white mb-4 md:mb-0">
TOKIO <span className="text-blue-500">Store</span>
</div>

<div className="flex gap-6 text-gray-400">

<a href="https://www.instagram.com/el_fr1do/" target="_blank" className="hover:text-blue-400 transition">
Instagram
</a>

<a href="https://discord.gg/Ehz6sVjh" target="_blank" className="hover:text-blue-400 transition">
Discord
</a>

<a href="https://t.me/DHIAA_FRD" target="_blank" className="hover:text-blue-400 transition">
Telegram
</a>

</div>

<div className="text-gray-600 mt-4 md:mt-0 text-sm">
© 2026 TOKIO Store. All rights reserved.
</div>

</div>

</footer>


<a
  href="https://discord.gg/Ehz6sVjh"
  target="_blank"
  className="
  fixed bottom-4 right-4 z-[9999]

  bg-[#020617]/70 backdrop-blur-md
  border border-blue-500/20

  text-gray-300 text-sm
  px-4 py-2 rounded-xl

  transition duration-300

  hover:scale-105
  hover:text-white
  hover:border-blue-500/50
  hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]

  flex items-center gap-2
  "
>
  💬 Help
</a>

</div>

</div>
} />

</Routes>
<Signature />
</BrowserRouter>

);
}
