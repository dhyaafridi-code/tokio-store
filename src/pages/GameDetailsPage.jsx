import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Zap, ArrowLeft, ShieldCheck, Clock, Award, Share2, Globe, Calendar } from 'lucide-react';
import { GAMES } from '../games';
import { toast } from 'sonner';

// 🔑 ضع هنا الـ API Key الذي ستحصل عليه من موقع RAWG
const RAWG_API_KEY = "ضَع_مِفْتَاحَكَ_هُنَا_YOUR_API_KEY"; 

const GameDetailsPage = ({ addToCart }) => {
  const { slug } = useParams();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  // إيجاد اللعبة في السلة الخاصة بنا (من أجل السعر)
  const localGame = GAMES.find(g => g.title.toLowerCase().replace(/\s+/g, '-') === slug);

  useEffect(() => {
    if (!localGame) return;

    // جلب البيانات الحقيقية من RAWG API باستخدام اسم اللعبة
    const fetchRealData = async () => {
      setLoading(true);
      try {
        // البحث عن اللعبة بالاسم
        const searchRes = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${localGame.title}&page_size=1`);
        const searchData = await searchRes.json();

        if (searchData.results && searchData.results.length > 0) {
          const gameId = searchData.results[0].id;

          // جلب تفاصيل اللعبة بالكامل بفضل الـ ID
          const detailRes = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${RAWG_API_KEY}`);
          const detailData = await detailRes.json();
          setApiData(detailData);
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, [slug, localGame]);

  if (!localGame) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">404 - Game Not Found</h1>
        <Link to="/games" className="px-6 py-2 bg-blue-600 rounded-xl">Back to Games</Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard! 📋");
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-white overflow-hidden pb-12">
      {/* خلفية اللعبة الضبابية مأخوذة من الموقع الحقيقي */}
      <div className="absolute top-0 left-0 w-full h-[60vh] z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/80 to-[#030712] z-10" />
        <img src={apiData?.background_image || localGame.image} className="w-full h-full object-cover opacity-30 blur-xl" alt="" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        {/* أزرار التنقل */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/games" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-semibold">Back to Catalog</span>
          </Link>

          <button onClick={handleShare} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* محتوى اللعبة */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* العمود الأيسر: الصورة والأسعار */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/5">
              <img src={apiData?.background_image || localGame.image} alt={localGame.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-sm">{apiData?.metacritic ? `${apiData.metacritic} (Meta)` : localGame.rating}</span>
              </div>
            </div>

            <div className="bg-[#0a0f1e] p-6 rounded-2xl border border-white/5 space-y-5">
              <div className="flex items-baseline justify-between">
                <span className="text-gray-400 text-sm font-medium">Your Price</span>
                <span className="text-3xl font-black text-blue-400">{localGame.price === 0 ? "Free" : `$${localGame.price.toFixed(2)}`}</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => addToCart(localGame)} 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <a 
                  href={`https://t.me/DHIAA_FRD?text=${encodeURIComponent(`Hello, I want to buy: ${localGame.title}`)}`} 
                  target="_blank" rel="noopener noreferrer" 
                  className="w-full bg-white/[0.04] hover:bg-white/10 text-white font-bold py-3.5 rounded-xl border border-white/5 flex items-center justify-center gap-2 transition-all"
                >
                  <Zap className="w-5 h-5" /> Buy via Telegram
                </a>
              </div>
            </div>
          </motion.div>

          {/* العمود الأيمن: التفاصيل والمعلومات الحقيقية */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8 flex flex-col justify-between">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 font-medium">Fetching real game details from API...</p>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {apiData?.genres?.map((g) => (
                    <span key={g.id} className="px-3 py-1 bg-blue-600/10 text-blue-400 text-xs font-semibold rounded-md border border-blue-500/20 uppercase">
                      {g.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {apiData?.name || localGame.title}
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#0a0f1e] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <div className="p-2.5 bg-green-500/10 rounded-lg text-green-500">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400">Release Date</h4>
                      <span className="text-sm font-bold">{apiData?.released || "N/A"}</span>
                    </div>
                  </div>

                  <div className="bg-[#0a0f1e] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-500">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400">Publisher</h4>
                      <span className="text-sm font-bold truncate max-w-[100px]">{apiData?.publishers?.[0]?.name || "N/A"}</span>
                    </div>
                  </div>

                  <div className="bg-[#0a0f1e] p-4 rounded-xl border border-white/5 flex items-center gap-3">
                    <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-500">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400">Metacritic Score</h4>
                      <span className="text-sm font-bold">{apiData?.metacritic ? `${apiData.metacritic} / 100` : "N/A"}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4">About this game</h3>
                {/* الوصف الحقيقي المأخوذ من API */}
                <div className="text-gray-400 leading-relaxed mb-8 text-sm max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  {apiData?.description_raw || "No official description found for this game."}
                </div>

                {/* متطلبات النظام الحقيقية */}
                <div className="bg-[#0a0f1e] p-6 rounded-2xl border border-white/5">
                  <h3 className="text-lg font-bold mb-4">Supported Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {apiData?.platforms?.map((p) => (
                      <span key={p.platform.id} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-semibold text-gray-300">
                        {p.platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;