import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GameDetailsPage from "./pages/GameDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import AllGamesPage from "./pages/AllGamesPage"; 
import { GAMES, CATEGORIES } from "./games"; 

import { useState, useEffect, useMemo, useRef } from "react";
import { signOut } from "firebase/auth";
import Signature from "./pages/Signature";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import './index.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import {
  ShoppingCart, X, ChevronDown, Send, Star, Gamepad2,
  LogIn, LogOut, Mail, Lock, User, ShieldCheck, Search,
  Eye, EyeOff, Trash2, Plus, Minus, ArrowRight,
  CheckCircle2, Shield, Heart, ChevronUp, Zap, ChevronRight, ArrowUpRight, Settings,
  CreditCard, Sparkles,  Send as TelegramIcon, MessageCircle as DiscordIcon
} from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/el_fr1do/",
  telegram: "https://t.me/DHIAA_FRD",
  discord: "https://discord.gg/Ehz6sVjh",
};

const REVIEWS = [
  { id: 1, name: "Alex M.", game: "GTA 5", text: "Got GTA 5 for an insane price. Delivery was instant — literally within seconds! Best gaming store. 🔥", rating: 5, avatar: "A" },
  { id: 2, name: "Sarah K.", game: "Elden Ring", text: "The automated pricing always beats other sites. Saved over $40 on my last 3 purchases. Hidden gem! 💎", rating: 5, avatar: "S" },
  { id: 3, name: "Jorden P.", game: "Cyberpunk 2077", text: "Smooth checkout, great customer support on Discord. Had an issue and they resolved it in 5 minutes. 🎮", rating: 5, avatar: "J" },
  { id: 4, name: "Chris L.", game: "God of War", text: "Reliable and fast. I've purchased 5 games so far without any issues. Every key worked perfectly. ⭐", rating: 5, avatar: "C" },
  { id: 5, name: "Yacine D.", game: "Elden Ring", text: "Incredible prices for AAA games. Elden Ring was a steal at $13.99! All my friends use TOKIO now. 👑", rating: 5, avatar: "Y" },
  { id: 6, name: "Omar B.", game: "Red Dead 2", text: "Fast delivery, great support. Already bought 7 games here. The discounts are real and keys legit. 💯", rating: 5, avatar: "O" },
];

const HomePage = ({ 
  user, avatar, handleLogout, cartCount, setShowCartDrawer, 
  cartItems, updateQuantity, removeItem, totalAmount, addToCart,
  searchQuery, setSearchQuery, activeCategory, setActiveCategory,
  headerScrolled, shopRef, scrollToShop 
}) => {
  
  const [showContact, setShowContact] = useState(false);
  
  const filteredGames = useMemo(() => {
    let result = GAMES;
    if (activeCategory !== 'all') result = result.filter(g => g.category && g.category.includes(activeCategory));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(g => g.title.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#030712] text-white font-sans overflow-x-hidden selection:bg-blue-600/30">
      
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/[0.07] blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/[0.05] blur-[150px]" />
      </div>

      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerScrolled ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-all">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight hidden sm:block">
              TOKIO <span className="text-blue-500">Store</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* زر Contact */}
<div 
  className="relative"
  onMouseEnter={() => setShowContact(true)}
  onMouseLeave={() => setShowContact(false)}
>
  <button 
    className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
  >
    Contact
    <ChevronDown className={`w-4 h-4 transition-transform ${showContact ? 'rotate-180' : ''}`} />
  </button>

  <AnimatePresence>
    {showContact && (
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="absolute right-0 mt-2 w-72 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
      >
        <div className="p-4">
          <h3 className="text-white font-bold mb-4 text-sm">GET IN TOUCH</h3>
          <div className="space-y-2">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl hover:border-pink-500/40 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <InstagramIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-white font-semibold text-sm block">Instagram</span>
                <span className="text-pink-400 text-xs">@el_fr1do</span>
              </div>
            </a>

            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <TelegramIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-white font-semibold text-sm block">Telegram</span>
                <span className="text-blue-400 text-xs">@DHIAA_FRD</span>
              </div>
            </a>

            <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-xl hover:border-indigo-500/40 transition-all group">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <DiscordIcon className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-white font-semibold text-sm block">Discord</span>
                <span className="text-indigo-400 text-xs">Join server</span>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

            {/* زر السلة */}
            <button onClick={() => setShowCartDrawer(true)} className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <ShoppingCart className="w-5 h-5" />
              <span className={`absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-[#030712] ${cartCount > 0 ? 'bg-blue-600' : 'bg-gray-700'}`}>
                {cartCount}
              </span>
            </button>

            {/* البروفايل */}
            {!user ? (
              <div className="flex gap-2">
                <a href="/login" className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hidden sm:block transition-colors">Login</a>
                <a href="/register" className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition-colors">Sign Up</a>
              </div>
            ) : (
              <a href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img src={avatar || "https://i.pravatar.cc/40"} className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover" />
                <span className="text-sm font-semibold text-white hidden sm:block max-w-[100px] truncate">
                  {user.split('@')[0]}
                </span>
              </a>
              
            )}
          </div>
          

        </div>
      </header>

      <main className="relative z-10 pt-16">
        <section className="relative pt-20 pb-20 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-5">
                YOUR NEXT<br /><span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">ADVENTURE</span><br />AWAITS
              </h1>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">Instant delivery, unbeatable prices, 100% trusted.</p>
              <button onClick={scrollToShop} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-7 py-3.5 rounded-xl flex items-center gap-2 mx-auto hover:scale-105 transition-transform">Browse Games <ArrowRight className="w-5 h-5" /></button>
            </motion.div>
          </div>
        </section>

        <section ref={shopRef} className="max-w-7xl mx-auto px-6 mb-24">
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search games..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/50" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border whitespace-nowrap transition-all ${activeCategory === cat.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/[0.03] text-gray-400 border-white/5 hover:border-white/20'}`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* قسم الألعاب في HomePage */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            
            {/* عرض أول 11 لعبة فقط */}
            {filteredGames.slice(0, 11).map((game, idx) => (
              <motion.div key={game.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="group relative bg-[#0a0f1e] rounded-xl border border-white/[0.04] overflow-hidden hover:border-blue-500/30 transition-all flex flex-col hover:shadow-lg hover:shadow-blue-500/10">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0d1225]">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /><span className="text-[10px] font-bold text-white">{game.rating}</span>
                  </div>
                </div>
                <div className="p-3.5 flex flex-col flex-grow">
                  <h3 className="font-bold text-sm text-white mb-1 truncate">{game.title}</h3>
                  <div className="mb-3 flex-grow"><span className="text-lg font-black text-blue-400">{game.price === 0 ? "Free" : `$${game.price.toFixed(2)}`}</span></div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <a href={SOCIAL_LINKS.telegram} target="_blank" className="bg-white/[0.04] text-white text-[11px] font-semibold py-2.5 rounded-lg border border-white/5 flex items-center justify-center gap-1 hover:bg-white/10 transition-colors"><Zap className="w-3 h-3" /> Buy</a>
                    <button onClick={() => addToCart(game)} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-semibold py-2.5 rounded-lg active:scale-95 flex items-center justify-center gap-1 hover:opacity-90 transition-opacity"><ShoppingCart className="w-3 h-3" /> Cart</button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* الكارطة الأخيرة لي تدي لصفحة كل الألعاب */}
            {filteredGames.length > 11 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
                <Link to="/games" className="group relative bg-gradient-to-br from-[#0f172a] to-[#0a0f1e] rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition-all flex flex-col items-center justify-center h-full min-h-[300px] hover:shadow-xl hover:shadow-blue-500/20 overflow-hidden cursor-pointer">
                  <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-400/30 transition-all" />
                  
                  <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
                    <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/30 transition-all duration-300">
                      <Plus className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white mb-1">Explore More</h3>
                      <p className="text-xs text-gray-400 font-medium">+500,000 Other Games</p>
                    </div>
                    <span className="mt-2 text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View All <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}

          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-2">CUSTOMER <span className="text-blue-500">REVIEWS</span></h2>
            <p className="text-gray-400 text-sm">Trusted by 5,000+ gamers worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <motion.div key={review.id} whileHover={{ y: -5 }} className="bg-[#0a0f1e] border border-white/5 rounded-xl p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{review.game}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">{review.avatar}</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{review.name}</h4>
                    <span className="text-xs text-green-500 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Verified</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 mb-24">
          <div className="relative bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-2xl p-8 sm:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to <span className="text-blue-400">Play?</span></h2>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">Join thousands of gamers who trust TOKIO Store. Get exclusive deals!</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/register" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                  <User className="w-4 h-4" /> Create Free Account
                </a>
                <a href={SOCIAL_LINKS.discord} target="_blank" className="w-full sm:w-auto bg-[#5865F2]/20 border border-[#5865F2]/50 text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#5865F2]/30 transition-all">
                  <DiscordIcon className="w-4 h-4" /> Join Discord
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 bg-[#020617] pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Gamepad2 className="w-4 h-4 text-white" /></div>
                  <span className="text-lg font-black">TOKIO <span className="text-blue-500">Store</span></span>
                </div>
                <p className="text-gray-400 text-sm mb-6">Premium games at unbeatable prices. Instant delivery guaranteed.</p>
                <div className="flex gap-3">
                  <a href={SOCIAL_LINKS.instagram} target="_blank" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:bg-pink-500/10 transition-all"><InstagramIcon className="w-4 h-4" /></a>
                  <a href={SOCIAL_LINKS.telegram} target="_blank" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"><TelegramIcon className="w-4 h-4" /></a>
                  <a href={SOCIAL_LINKS.discord} target="_blank" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-indigo-400/10 transition-all"><DiscordIcon className="w-4 h-4" /></a>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">QUICK LINKS</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" onClick={scrollToShop} className="hover:text-blue-400 transition-colors">Shop</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">CATEGORIES</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" onClick={() => setActiveCategory('hot')} className="hover:text-blue-400 transition-colors flex items-center gap-2">🔥 Hot</a></li>
                  <li><a href="#" onClick={() => setActiveCategory('shooter')} className="hover:text-blue-400 transition-colors flex items-center gap-2">🎯 Shooter</a></li>
                  <li><a href="#" onClick={() => setActiveCategory('adventure')} className="hover:text-blue-400 transition-colors flex items-center gap-2">🗺️ Adventure</a></li>
                  <li><a href="#" onClick={() => setActiveCategory('rpg')} className="hover:text-blue-400 transition-colors flex items-center gap-2">⚔️ RPG</a></li>
                  <li><a href="#" onClick={() => setActiveCategory('action')} className="hover:text-blue-400 transition-colors flex items-center gap-2">💥 Action</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-4">CONTACT</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><a href={SOCIAL_LINKS.instagram} target="_blank" className="flex items-center gap-2 hover:text-pink-400 transition-colors"><InstagramIcon className="w-4 h-4" /> @el_fr1do</a></li>
                  <li><a href={SOCIAL_LINKS.telegram} target="_blank" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><TelegramIcon className="w-4 h-4" /> @DHIAA_FRD</a></li>
                  <li><a href={SOCIAL_LINKS.discord} target="_blank" className="flex items-center gap-2 hover:text-indigo-400 transition-colors"><DiscordIcon className="w-4 h-4" /> Discord Server</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
              <p>© {new Date().getFullYear()} TOKIO Store. All rights reserved.</p>
             
              <p>Made with <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> by TOKIO</p>
            </div>
          </div>
        </footer>
      </main>

      <a href={SOCIAL_LINKS.discord} target="_blank" className="fixed bottom-4 right-4 z-[40] bg-[#020617]/70 backdrop-blur-md border border-blue-500/20 text-gray-300 text-sm px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all">💬 Help</a>
    </div>
  );
};

export default function App() {
  const [cartCount, setCartCount] = useState(0)
  const [showPaymentMethod, setShowPaymentMethod] = useState('telegram'); 
  const [user, setUser] = useState(null)
  const [avatar, setAvatar] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const shopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const refreshCart = () => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(stored.map(item => ({ ...item, quantity: item.quantity || 1 })));
    setCartCount(stored.length);
  };

  useEffect(() => {
    refreshCart();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) { setUser(currentUser.email); localStorage.setItem("username", currentUser.email); } 
      else { setUser(null); localStorage.removeItem("username"); }
    });

    const updateAvatar = () => setAvatar(localStorage.getItem("avatar"));
    window.addEventListener("avatarChanged", updateAvatar);
    window.addEventListener("cartUpdated", refreshCart);

    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) setAvatar(savedAvatar);

    return () => {
      unsubscribe();
      window.removeEventListener("avatarChanged", updateAvatar);
      window.removeEventListener("cartUpdated", refreshCart);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  // دوال السلة الكاملة المفقودة (Update Quantity & Remove Item)
  const updateQuantity = (title, delta) => {
    const updated = cartItems.map(i => 
      i.title === title ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    refreshCart(); // لتحديث العداد والواجهة
  };

  const removeItem = (title) => {
    const updated = cartItems.filter(i => i.title !== title);
    localStorage.setItem("cart", JSON.stringify(updated));
    refreshCart();
    toast.success("🗑️ تم الحذف من السلة");
  };

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const addToCart = (game) => {
    const username = localStorage.getItem("username");
    
    if (!username) { 
      toast.error("❌ يجب عليك تسجيل الدخول أولاً"); 
      return; 
    }
    
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedCart.find(item => item.title === game.title)) { 
      toast.warning("⚠️ اللعبة موجودة بالفعل في السلة"); 
      return; 
    }

    const newCart = [...storedCart, { ...game, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(newCart));
    refreshCart();
    toast.success(`✅ تم إضافة ${game.title}`);
  };

  const scrollToShop = () => shopRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <BrowserRouter>
     {/* ✅ Toaster Global لتعمل في كل الصفحات */}
     <Toaster position="top-center" theme="dark" richColors />

            {/* السلة الجانبية (Cart Drawer) */}
      <AnimatePresence>
        {showCartDrawer && (
           <div className="fixed inset-0 z-[100]">
            {/* الخلفية الغامقة */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCartDrawer(false)} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />

            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 35, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0f1e]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col h-full overflow-hidden"
            >              
              {/* الهيدر ديال السلة */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0f172a]/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xl text-white">Your Cart</h3>
                </div>
                <button onClick={() => setShowCartDrawer(false)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* المحتوى: الألعاب */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 pt-10">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                      <ShoppingCart className="w-10 h-10" />
                    </div>
                    <p className="text-gray-400 font-medium">Your cart is empty.</p>
                    <button onClick={() => setShowCartDrawer(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all">
                      Go Shopping
                    </button>
                  </div>
                ) : (
                  <>
                     <p className="text-xs text-gray-500 mb-2 pl-1"><strong>{cartItems.length}</strong> Item(s)</p>

                    {cartItems.map((item) => (
                      <div key={item.title} className="flex gap-4 bg-white/[0.02] p-3 rounded-xl border border-white/5 group hover:border-blue-500/30 transition-all">
                        <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg shadow-sm" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-white truncate pr-2">{item.title}</h4>
                            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold text-green-400 bg-green-400/10 rounded border border-green-400/20">
                              ${item.price.toFixed(2)} each
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                             <div className="flex items-center bg-black/50 rounded-xl p-1 border border-white/5 overflow-hidden">
                                <button 
                                  onClick={() => updateQuantity(item.title, -1)} 
                                  className="w-8 h-8 flex items-center justify-center bg-white/[0.07] hover:bg-red-500/20 text-gray-300 hover:text-red-400 rounded-lg transition-all active:scale-90"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center text-sm font-black text-white">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.title, 1)} 
                                  className="w-8 h-8 flex items-center justify-center bg-white/[0.07] hover:bg-green-500/20 text-gray-300 hover:text-green-400 rounded-lg transition-all active:scale-90"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <button 
                                onClick={() => removeItem(item.title)} 
                                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* الجزء الأسفل: الدفع والدفع الحقيقي */}
              {cartItems.length > 0 && (
                <div className="border-t border-white/10 bg-[#0f172a] p-6 space-y-4 relative z-10">
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 font-medium">Total Amount</span>
                    <div className="text-right">
                       <span className="text-2xl font-black text-white">${totalAmount.toFixed(2)}</span>
                       <span className="block text-[10px] text-gray-500">USD / ~{Math.round(totalAmount * 130)} DZD</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase text-gray-500 font-bold tracking-wider ml-1">Payment Method</label>
                    
                    <a 
  href={`https://t.me/DHIAA_FRD?text=${encodeURIComponent(
    `Hello, I want to buy:\n${cartItems.map(i => `${i.title} (x${i.quantity})`).join('\n')}\n\nTotal: $${totalAmount.toFixed(2)}\n\nPlease send your Bank/CIB number.`
  )}`} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="w-full flex items-center gap-4 p-4 bg-[#0088cc] hover:bg-[#0077b5] rounded-xl group transition-all shadow-lg shadow-cyan-900/20 cursor-pointer text-white"
>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">Continue with Telegram</div>
                        <div className="text-[11px] text-blue-100 opacity-90">Pay via CIB, BaridiMob or Transfer</div>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform"/>
                    </a>

                    <button 
                      onClick={() => toast.info("Coming Soon! We are adding Stripe integration soon.")}
                      disabled
                      className="w-full flex items-center gap-4 p-4 bg-[#1e293b] border border-white/5 rounded-xl cursor-not-allowed opacity-50 grayscale transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                         <div className="font-bold text-gray-300">Credit Card (Visa/Mastercard)</div>
                         <div className="text-[11px] text-gray-500">Secure payment via Stripe</div>
                      </div>
                      <Lock className="w-4 h-4 text-gray-600"/>
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-gray-500">
                    <ShieldCheck className="w-3 h-3 text-green-500" />
                    <span>Instant Delivery after confirmed payment</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={
          <HomePage 
            user={user} avatar={avatar} handleLogout={handleLogout}
            cartCount={cartCount} setShowCartDrawer={setShowCartDrawer}
            cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} totalAmount={totalAmount} addToCart={addToCart}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeCategory={activeCategory} setActiveCategory={setActiveCategory}
            headerScrolled={headerScrolled} shopRef={shopRef} scrollToShop={scrollToShop}
          />
        } />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/games" element={<AllGamesPage addToCart={addToCart} />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/games" element={<AllGamesPage addToCart={addToCart} />} /> 

<Route path="/game/:slug" element={<GameDetailsPage addToCart={addToCart} />} />
      </Routes>
      <Signature />
      
    </BrowserRouter>
  );
}