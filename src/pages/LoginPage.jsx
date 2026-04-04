import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Signature from "./Signature";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 👈 الأخطاء تخرج هنا
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // تصفير الخطأ القديم

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("username", userCredential.user.email);
      navigate("/");
    } catch (err) {
      // 👈 كود الفايربيس الجديد يجمع الأخطاء في invalid-credential
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setErrorMessage("❌ الإيميل أو كلمة المرور غير صحيحة");
      } else if (err.code === "auth/invalid-email") {
        setErrorMessage("❌ الإيميل غير صالح");
      } else {
        setErrorMessage("❌ حدث خطأ، يرجى المحاولة لاحقاً");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/[0.08] blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-md bg-[#0a0f1e]/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-xl p-8"
      >
        <div className="text-center mb-7">
          <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white">Welcome Back 👋</h2>
          <p className="text-sm text-gray-400 mt-1">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-gray-400 uppercase">Email</label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-400 uppercase">Password</label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"} required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg py-3 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-blue-500/50"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" /> Sign In
          </button>

          {/* 👈 هنا تخرج الرسالة حمراء تحت البوتون */}
          {errorMessage && (
            <p className="text-red-500 text-sm font-semibold text-center mt-3 bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {errorMessage}
            </p>
          )}
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?
          <Link to="/register" className="text-blue-400 ml-2 hover:underline">Register</Link>
        </p>
      </motion.div>
      <Signature />
    </div>
  );
}