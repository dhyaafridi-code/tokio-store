import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase";
import Signature from "./Signature";
import { motion } from "framer-motion";
import { Mail, Lock, User, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const db = getFirestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 👈 الأخطاء هنا
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("❌ كلمتا المرور غير متطابقتين");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      await setDoc(doc(db, "users", user.uid), { username, email });
      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setErrorMessage("❌ الإيميل مستخدم بالفعل");
      else if (err.code === "auth/weak-password") setErrorMessage("❌ كلمة المرور ضعيفة جداً");
      else if (err.code === "auth/invalid-email") setErrorMessage("❌ الإيميل غير صالح");
      else setErrorMessage("❌ حدث خطأ، أعد المحاولة");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/[0.08] blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-surface/90 backdrop-blur-2xl rounded-2xl border border-gray-200/10 shadow-xl p-8"
      >
        <div className="text-center mb-7">
          <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white">Create Account 🎮</h2>
          <p className="text-sm text-muted mt-1">Join TOKIO Store</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon" />
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
              className="w-full bg-neutral-100/5 border border-gray-200/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent/50" />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
              className="w-full bg-neutral-100/5 border border-gray-200/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent/50" />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
              className="w-full bg-neutral-100/5 border border-gray-200/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent/50" />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon" />
            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"
              className="w-full bg-neutral-100/5 border border-gray-200/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent/50" />
          </div>

          <button className="w-full bg-gradient-to-r from-accent to-primary text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98]">
            Register Now
          </button>

          {/* 👈 الخطأ يخرج هنا أحمر تحت البوتون */}
          {errorMessage && (
            <p className="text-red-500 text-sm font-semibold text-center mt-3 bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {errorMessage}
            </p>
          )}
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-purple-400 ml-2 hover:underline">Login</Link>
        </p>
      </motion.div>
      <Signature />
    </div>
  );
}