import { useEffect, useState } from "react";
import { auth } from "../firebase";
import Signature from "./Signature";
import {
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Edit2, Shield, Users, Gamepad2, 
  ShoppingBag, LogOut, CheckCircle, Mail, 
  Lock, X, Star, TrendingUp, Trophy, User,
  Loader2
} from 'lucide-react';

const RANDOM_AVATARS = [
  "https://robohash.org/Player1.png?set=set2&size=200x200",
  "https://robohash.org/GamerPro.png?set=set2&size=200x200",
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://api.dicebear.com/7.x/bottts/svg?seed=Mario",
];

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const navigate = useNavigate();
  const db = getFirestore();

  const mockPurchases = [
    { id: 1, title: "Elden Ring", date: "2025-04-01", price: "$13.99", icon: "👑" },
    { id: 2, title: "FIFA 26", date: "2025-03-28", price: "$10.99", icon: "⚽" },
    { id: 3, title: "Cyberpunk 2077", date: "2025-03-15", price: "$19.99", icon: "🤖" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      } else {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        let fetchedData = {};
        if (docSnap.exists()) {
          fetchedData = docSnap.data();
        }

        if (fetchedData.avatar) {
          setAvatar(fetchedData.avatar);
        } else if (localStorage.getItem("avatar")) {
          setAvatar(localStorage.getItem("avatar"));
        } else {
          const random = RANDOM_AVATARS[Math.floor(Math.random() * RANDOM_AVATARS.length)];
          localStorage.setItem("avatar", random);
          setAvatar(random);
        }

        setUserData(fetchedData);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 z-0"></div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="inline-block p-4 rounded-full bg-white/5 border border-white/10 shadow-2xl mb-4"
          >
            <Gamepad2 className="w-12 h-12 text-blue-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white tracking-wider">LOADING DASHBOARD...</h2>
          <p className="text-blue-400 mt-2 text-sm font-mono">Connecting to servers...</p>
        </motion.div>
      </div>
    );
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const newAvatar = reader.result;
      setAvatar(newAvatar);
      localStorage.setItem("avatar", newAvatar);
      try {
        if(user) await updateDoc(doc(db, "users", user.uid), { avatar: newAvatar });
      } catch(err) { console.log("Error saving avatar"); }
      window.dispatchEvent(new Event("avatarChanged"));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveData = async () => {
    if (!newUsername) return;
    try {
      await updateDoc(doc(db, "users", user.uid), { username: newUsername });
      setUserData({ ...userData, username: newUsername });
      setMessage("✅ Updated successfully");
    } catch (err) { setMessage("❌ Error: " + err.message); }
  };

  const handlePasswordChange = async () => {
    try {
      const credential = EmailAuthProvider.credential(user.email, prompt("Enter current password:"));
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage("✅ Password changed.");
    } catch (err) { setMessage("❌ Failed: " + err.message); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans relative overflow-hidden pb-20">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 mb-12">
        <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} 
          className="text-4xl font-black tracking-tight">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Account</span></motion.h1>
        <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-gray-400 mt-2">Welcome back, Commander.</motion.p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-4 space-y-6">
          
          {/* Identity Card */}
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl shadow-xl">
            <div className="flex flex-col items-center text-center">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-indigo-500 shadow-lg shadow-blue-500/20">
                  <img src={avatar || "https://via.placeholder.com/150"} className="w-full h-full object-cover rounded-full bg-[#020617]" alt="User Avatar"/>
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition-all cursor-pointer shadow-lg border-2 border-[#0f172a]">
                  <Camera className="w-4 h-4" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>

              <h2 className="mt-4 text-2xl font-bold">{userData.username || user.displayName || user.email.split('@')[0]}</h2>
              <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                <Mail className="w-3 h-3" /> {user.email}
              </div>
              
              <div className="flex gap-2 mt-4">
                <div className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </div>
                <div className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs font-bold flex items-center gap-1">
                  <Users className="w-3 h-3" /> Lvl 1
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-white/5">
              <div className="text-center">
                <span className="block text-xl font-black text-white">{mockPurchases.length}</span>
                <span className="text-xs text-gray-500 uppercase">Bought</span>
              </div>
              <div className="text-center border-x border-white/5">
                <span className="block text-xl font-black text-blue-400">$44.97</span>
                <span className="text-xs text-gray-500 uppercase">Spent</span>
              </div>
              <div className="text-center">
                <span className="block text-xl font-black text-purple-400">A+</span>
                <span className="text-xs text-gray-500 uppercase">Rank</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#0f172a]/50 border border-white/5 p-4 rounded-2xl">
            <h3 className="font-bold text-sm text-gray-400 mb-3 uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors text-sm group">
                <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg"><Star className="w-4 h-4"/></div>
                <span className="group-hover:text-white">Saved Games</span>
              </a>
              <button onClick={() => { localStorage.removeItem("username"); navigate("/") }}
                className="w-full flex items-center gap-3 p-3 hover:bg-red-500/10 rounded-xl transition-colors text-sm text-red-400 group">
                <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors"><LogOut className="w-4 h-4"/></div>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8 space-y-6">
          
          <AnimatePresence mode='wait'>
            {showHistory ? (
              /* HISTORY TAB */
              <motion.div key="history" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 min-h-[400px]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag className="text-blue-400" /> Purchase History</h2>
                    <button onClick={() => setShowHistory(false)} className="text-sm text-blue-400 hover:underline">Back to Profile</button>
                  </div>
                  
                  {mockPurchases.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 hover:border-blue-500/30 transition-all mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1e293b] rounded-lg flex items-center justify-center text-2xl">{item.icon}</div>
                        <div>
                          <h4 className="font-bold">{item.title}</h4>
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold text-green-400">{item.price}</span>
                        <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded">Paid</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* SETTINGS TAB */
              <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                
                {/* Settings Card */}
                <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/5 p-6 rounded-2xl">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Edit2 className="text-purple-400" /> Edit Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 ml-1">Display Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Enter username..."
                          className="w-full pl-10 pr-4 py-3 bg-[#020617] border border-white/10 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                      </div>
                    </div>
                    
                    <button onClick={handleSaveData} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                      Save Changes
                    </button>
                  </div>

                  <hr className="border-white/5 my-8" />

                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Lock className="text-red-400" /> Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-400 mb-1 ml-1">New Password</label>
                      <input type="password" placeholder="••••••••" onChange={(e) => setNewPassword(e.target.value)} 
                        className="w-full px-4 py-3 bg-[#020617] border border-white/10 rounded-xl focus:border-purple-500 outline-none" />
                    </div>
                    <button onClick={handlePasswordChange} className="py-3 bg-red-600/10 border border-red-500/30 text-red-400 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all">
                      Update Password
                    </button>
                    <button onClick={() => alert("This would link Steam account")} className="py-3 bg-[#171e2e] border border-white/5 text-gray-300 rounded-xl font-bold hover:bg-[#1e293b] transition-all">
                      Link Steam ID
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-6 bg-[#0f172a]/80 border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Recent Activity</h3>
                    <button onClick={() => setShowHistory(true)} className="text-sm text-blue-400 hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {mockPurchases.slice(0, 2).map((p) => (
                      <div key={p.id} className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{p.title}</span>
                        <span className="font-mono text-blue-300">{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <Signature />
    </div>
  );
}