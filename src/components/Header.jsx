import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronDown, Gamepad2 } from "lucide-react";

// Simple Instagram Icon (used for all socials for now)
const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/el_fr1do/",
  telegram: "https://t.me/DHIAA_FRD",
  discord: "https://discord.gg/Ehz6sVjh",
};

/**
 * Header component. Exposes props expected by App.jsx.
 */
const Header = ({
  user,
  avatar,
  cartCount,
  setShowCartDrawer,
  loginHandler,
  registerHandler,
}) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleContact = () => setContactOpen((v) => !v);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(6,7,10,0.7)] backdrop-blur-xl border-b border-accent/20 shadow-xl' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg shadow-[rgba(183,108,255,0.12)] transition-transform group hover:scale-105 neon-glow" >
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight hidden sm:block">
            <span className="bg-gradient-to-r from-primary via-accent to-neon bg-clip-text text-transparent neon-glow">TOKIO</span>
            <span className="ml-1 text-white/80 font-semibold">Store</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Contact dropdown – click to toggle */}
          <div className="relative" aria-haspopup="true" aria-expanded={contactOpen}>
            <button
              onClick={toggleContact}
              aria-controls="contact-menu"
              aria-expanded={contactOpen}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-muted hover:text-primary bg-white/5 hover:bg-neutral-100/20 rounded-lg transition-all"
            >
              <span className="sr-only">Open contact menu</span>
              <span aria-hidden>Contact</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${contactOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {contactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 bg-surface border border-gray-200/10 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4">
                          <h3 className="text-white font-bold mb-4 text-sm">GET IN TOUCH</h3>
                    <div className="space-y-2">
                      {Object.entries(SOCIAL_LINKS).map(([key, url]) => (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-xl hover:border-primary/30 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                            <InstagramIcon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className="text-white font-semibold text-sm block">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
                            <span className="text-accent text-xs">{url}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart icon */}
          <button
            onClick={() => setShowCartDrawer(true)}
            className="relative p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 text-muted" />
            <span className="sr-only">{cartCount} items in cart</span>
            <span
              aria-hidden="true"
              className={`absolute -top-0.5 -right-0.5 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-gray-200 ${cartCount > 0 ? "bg-primary" : "bg-muted"}`}
            >
              {cartCount}
            </span>
          </button>

          {/* Auth buttons */}
          {!user ? (
            <div className="flex gap-2">
              <button
                onClick={loginHandler}
                className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hidden sm:block transition-colors"
              >
                Login
              </button>
              <button
                onClick={registerHandler}
                className="px-4 py-1.5 text-sm bg-gradient-to-r from-primary to-accent rounded-lg text-white font-semibold transition-all hover:scale-[0.99] neon-glow"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src={avatar || "https://i.pravatar.cc/40"}
                alt="avatar"
                className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
              />
              <span className="text-sm font-semibold text-white hidden sm:block max-w-[100px] truncate">
                {user.split("@")[0]}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
