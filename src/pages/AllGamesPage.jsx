import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Star, Zap, ArrowLeft, Gamepad2, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GAMES, CATEGORIES } from '../games';

const AllGamesPage = ({ addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default'); // لتخزين طريقة الفرز
  const [showSortMenu, setShowSortMenu] = useState(false); // لإظهار القائمة المنسدلة

  // دالة التحديد والفرز معاً
  const filteredGames = useMemo(() => {
    let result = [...GAMES]; // إنشاء نسخة جديدة عشان نرتبها دون التأثير على الأصلي
    
    // 1. الفلترة حسب الفئة والبحث
    if (activeCategory !== 'all') {
      result = result.filter(g => g.category && g.category.includes(activeCategory));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(g => g.title.toLowerCase().includes(q));
    }

    // 2. الفرز (Sorting)
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } 
    // default لا يفعل شيئاً لأننا نريدهم بالنظام الأصلي

    return result;
  }, [activeCategory, searchQuery, sortOption]);

  return (
    <div className="relative min-h-screen bg-[#030712] text-white pt-24 pb-12 overflow-x-hidden">
      {/* خلفية احترافية */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/[0.05] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/[0.05] blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* زر الرجوع */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold">Back to Home</span>
        </Link>

        {/* العنوان والفرز والبحث */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl sm:text-5xl font-black mb-3">
              EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">ALL GAMES</span>
            </h1>
            <p className="text-gray-400">Find your next favorite game from our vast collection.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            
            {/* قسم البحث */}
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search games..."
                className="w-full md:w-[280px] bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all" 
              />
            </div>

            {/* قسم الفرز الجديد (Dropdown) */}
            <div className="relative">
              <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center justify-between gap-2 bg-white/[0.03] border border-white/10 hover:border-blue-500/50 rounded-xl px-4 py-3 text-sm font-semibold transition-all w-full md:w-auto justify-between"
              >
                <span className="text-gray-300">Sort By: <span className="text-white">{
                  sortOption === 'default' ? 'Recommended' : 
                  sortOption === 'price-low' ? 'Lowest Price' : 'Highest Price'
                }</span></span>
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* قائمة الفرز المنسدلة */}
              {showSortMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 divide-y divide-white/5"
                >
                  <button onClick={() => { setSortOption('default'); setShowSortMenu(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 text-gray-300">Recommended</button>
                  <button onClick={() => { setSortOption('price-low'); setShowSortMenu(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 text-gray-300">Price: Low to High</button>
                  <button onClick={() => { setSortOption('price-high'); setShowSortMenu(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 text-gray-300">Price: High to Low</button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* فلاتر الفئات */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-white/5 mb-8">
          {CATEGORIES.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.key 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
                : 'bg-white/[0.03] text-gray-400 border border-white/5 hover:border-white/20 hover:text-white hover:bg-white/5'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* شبكة الألعاب المحسنة */}
        {filteredGames.length > 0 ? (
          /* ✅ تم تعديل الكلاسات عشان تكون متجاوبة (2, 3, 4, 5 أعمدة) */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredGames.map((game, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.03 }}
                key={game.title} 
                className="group relative bg-[#0a0f1e] rounded-xl border border-white/[0.04] overflow-hidden hover:border-blue-500/30 transition-all flex flex-col hover:shadow-xl hover:shadow-blue-500/10">
                
                {/* الصورة والشارات (Badges) */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0d1225]">
               {/* ✅ أضفنا Link هنا حول الصورة ليأخذنا لصفحة التفاصيل */}
<Link to={`/game/${game.title.toLowerCase().replace(/\s+/g, '-')}`} className="relative aspect-[3/4] overflow-hidden bg-[#0d1225] cursor-pointer block">
  <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
    <span className="text-[11px] font-bold text-white">{game.rating}</span>
  </div>
</Link>
                    loading="lazy" // ✅ تحسين الأداء
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 
                  
                  {/* الشارة العلوية للتقييم */}
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[11px] font-bold text-white">{game.rating}</span>
                  </div>

                  {/* ✅ شارات إضافية ديناميكية بناء على السعر والتقييم */}
                  {game.price === 0 && (
                     <div className="absolute bottom-2 left-2 bg-green-500/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-lg">FREE</div>
                  )}
                   {game.price < 10 && game.price > 0 && (
                     <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-lg">HOT SALE</div>
                  )}
                  {game.rating >= 4.9 && (
                     <div className="absolute bottom-2 right-2 bg-blue-500/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-lg">TOP RATED</div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow bg-gradient-to-t from-[#0a0f1e] to-transparent">
                  <h3 className="font-bold text-base text-white mb-1 truncate">{game.title}</h3>
                  <div className="mb-4">
                    <span className="text-xl font-black text-blue-400">{game.price === 0 ? "Free" : `$${game.price.toFixed(2)}`}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <a href="https://t.me/DHIAA_FRD" target="_blank" className="bg-white/[0.04] text-white text-[11px] sm:text-xs font-semibold py-2.5 rounded-lg border border-white/5 flex items-center justify-center gap-1 hover:bg-white/10 transition-colors"><Zap className="w-3 h-3" /> Buy</a>
                    <button onClick={() => addToCart(game)} className="bg-blue-600 text-white text-[11px] sm:text-xs font-semibold py-2.5 rounded-lg active:scale-95 flex items-center justify-center gap-1 hover:bg-blue-500 transition-colors"><ShoppingCart className="w-3 h-3" /> Cart</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No games found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGamesPage;