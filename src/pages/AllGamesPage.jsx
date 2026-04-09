import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Zap, ArrowLeft, Gamepad2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const RAWG_API_KEY = "ffd68751a55e4390b62b44fddc91e628"; 

const AllGamesPage = ({ addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  // دالة التسعير المحمية من الأعطال
  const getPricing = (metacritic) => {
    if (!metacritic) return { current: 9.99, original: 29.99, discount: 67 };
    if (metacritic >= 88) return { current: 19.99, original: 59.99, discount: 67 };
    if (metacritic >= 80) return { current: 14.99, original: 39.99, discount: 63 };
    if (metacritic >= 70) return { current: 7.99, original: 19.99, discount: 60 };
    return { current: 4.99, original: 14.99, discount: 67 };
  };

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        let url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=25&platforms=4`;
        if (searchQuery.trim()) url += `&search=${searchQuery}&ordering=-relevance`;
        else url += `&ordering=-added`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("API Network Error");
        const data = await res.json();

        // ✅ حماية: التأكد من وجود النتائج لتجنب الـ Crash
        if (data && data.results && Array.isArray(data.results)) {
          const formattedGames = data.results
            .filter(g => g && g.background_image && g.name) // استبعاد الألعاب المكسورة
            .map(g => {
              const pricing = getPricing(g.metacritic);
              return {
                slug: g.slug || "unknown",
                title: g.name || "Untitled Game",
                image: g.background_image || "https://via.placeholder.com/300x400?text=No+Image",
                rating: g.rating || 4.2,
                metacritic: g.metacritic,
                ...pricing
              };
            });
          setGames(formattedGames);
        } else {
          setGames([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch games database");
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchGames, 500);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#030712] text-white pt-24 pb-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group">
          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-semibold">Back to Home</span>
        </Link>

        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black mb-3 tracking-tight">
              SPECIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">OFFERS</span>
            </h1>
            <p className="text-gray-400">Authentic PC digital keys at unbeatable local prices.</p>
          </div>

          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search game..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder-gray-500" 
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-[#0a0f1e] rounded-xl h-[350px] border border-white/[0.04] animate-pulse flex flex-col">
                <div className="aspect-[3/4] bg-white/5 rounded-t-xl" />
                <div className="p-4 space-y-3 flex-grow">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-6 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : games.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {games.map((game, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: idx * 0.03 }}
                className="group relative bg-[#0a0f1e] rounded-xl border border-white/[0.04] overflow-hidden hover:border-blue-500/30 transition-all flex flex-col hover:shadow-xl hover:shadow-blue-500/10">
                
                <Link to={`/game/${game.slug}`} className="relative aspect-[3/4] overflow-hidden bg-[#0d1225] block">
                  <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg">
                    -{game.discount}% OFF
                  </div>

                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[11px] font-bold text-white">{game.metacritic || 80}</span>
                  </div>
                </Link>

                <div className="p-4 flex flex-col flex-grow bg-gradient-to-t from-[#0a0f1e] to-transparent">
                  <h3 className="font-bold text-sm text-white mb-1 truncate">{game.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-black text-blue-400">${game.current.toFixed(2)}</span>
                    <span className="text-xs text-gray-500 line-through">${game.original.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <a href={`https://t.me/DHIAA_FRD?text=${encodeURIComponent(`Buy: ${game.title} ($${game.current.toFixed(2)})`)}`} target="_blank" rel="noopener noreferrer" className="bg-white/[0.04] text-white text-[11px] sm:text-xs font-semibold py-2.5 rounded-lg border border-white/5 flex items-center justify-center gap-1 hover:bg-white/10 transition-colors"><Zap className="w-3 h-3" /> Buy</a>
                    <button onClick={() => addToCart({ title: game.title, image: game.image, price: game.current, rating: game.rating })} className="bg-blue-600 text-white text-[11px] sm:text-xs font-semibold py-2.5 rounded-lg active:scale-95 flex items-center justify-center gap-1 hover:bg-blue-500 transition-colors"><ShoppingCart className="w-3 h-3" /> Cart</button>
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
            <p className="text-gray-400">Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllGamesPage;