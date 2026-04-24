import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Zap, ArrowLeft, Share2, Calendar, Globe, Award } from 'lucide-react';
import { toast } from 'sonner';

const RAWG_API_KEY = "ffd68751a55e4390b62b44fddc91e628";

export default function GameDetailsPage({ addToCart }) {
  const { slug } = useParams();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const calculatePrice = (metacritic) => {
    if (!metacritic) return 9.99;
    if (metacritic >= 88) return 19.99;
    if (metacritic >= 80) return 14.99;
    if (metacritic >= 70) return 7.99;
    return 4.99;
  };

  useEffect(() => {
    let mounted = true;
    const fetchGameDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.rawg.io/api/games/${slug}?key=${RAWG_API_KEY}`);
        if (!res.ok) throw new Error('Game not found');
        const data = await res.json();
        if (mounted) setApiData(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch game details');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchGameDetails();
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted">Connecting to global database...</p>
        </div>
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="min-h-screen bg-surface text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">404 — Game Not Found</h1>
          <Link to="/games" className="px-6 py-2 bg-primary text-white rounded-xl">Back to Games</Link>
        </div>
      </div>
    );
  }

  const calculatedPrice = calculatePrice(apiData.metacritic);
  const gameForCart = {
    title: apiData.name,
    image: apiData.background_image,
    price: calculatedPrice,
    rating: apiData.rating || 4.0,
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="relative min-h-screen bg-surface text-white overflow-hidden pb-12">
      <div className="absolute top-0 left-0 w-full h-[60vh] z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/80 to-surface z-10" />
        {apiData.background_image && (
          <img src={apiData.background_image} className="w-full h-full object-cover opacity-30 blur-xl" alt="" />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        <div className="flex justify-between items-center mb-8">
          <Link to="/games" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors group">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-semibold">Back to Catalog</span>
          </Link>

          <button onClick={handleShare} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-neon hover:text-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gray-200/10 shadow-2xl">
              <img src={apiData.background_image} alt={apiData.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-sm">{apiData.rating}</span>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-2xl border border-gray-200/10 space-y-5">
              <div className="flex items-baseline justify-between">
                <span className="text-muted text-sm font-medium">Auto-Calculated Price</span>
                <span className="text-3xl font-black text-primary">${calculatedPrice.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => addToCart(gameForCart)} className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg neon-glow">
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <a href={`https://t.me/DHIAA_FRD?text=${encodeURIComponent(`Hello, I want to buy: ${apiData.name} for $${calculatedPrice.toFixed(2)}`)}`} target="_blank" rel="noopener noreferrer" className="w-full bg-neutral-100/5 hover:bg-neutral-100/10 text-white font-bold py-3.5 rounded-xl border border-gray-200/10 flex items-center justify-center gap-2 transition-all">
                  <Zap className="w-5 h-5" /> Buy via Telegram
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {apiData.genres?.map((g) => (
                  <span key={g.id} className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-md border border-accent/20 uppercase">
                    {g.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight bg-gradient-to-r from-white via-accent to-neon bg-clip-text text-transparent">
                {apiData.name}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-surface p-4 rounded-xl border border-gray-200/10 flex items-center gap-3">
                  <div className="p-2.5 bg-green-500/10 rounded-lg text-green-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-muted">Release Date</h4>
                    <span className="text-sm font-bold">{apiData.released || 'N/A'}</span>
                  </div>
                </div>
                <div className="bg-surface p-4 rounded-xl border border-gray-200/10 flex items-center gap-3">
                  <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-500">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-muted">Publisher</h4>
                    <span className="text-sm font-bold truncate max-w-[100px]">{apiData.publishers?.[0]?.name || 'N/A'}</span>
                  </div>
                </div>
                <div className="bg-surface p-4 rounded-xl border border-gray-200/10 flex items-center gap-3">
                  <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-500">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-muted">Metacritic Score</h4>
                    <span className="text-sm font-bold">{apiData.metacritic ? `${apiData.metacritic} / 100` : 'N/A'}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">About this game</h3>
              <div className="text-muted leading-relaxed mb-8 text-sm max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {apiData.description_raw || 'No official description found for this game.'}
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-gray-200/10">
                <h3 className="text-lg font-bold mb-4">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {apiData.platforms?.map((p) => (
                    <span key={p.platform.id} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-semibold text-muted">
                      {p.platform.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
