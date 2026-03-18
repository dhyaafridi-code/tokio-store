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

export default function ProfilePage() {

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) setAvatar(savedAvatar);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);

        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <h1 className="text-white text-center mt-20">Loading...</h1>;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 🔥 Avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

reader.onloadend = () => {
  setAvatar(reader.result);
  localStorage.setItem("avatar", reader.result);

  // 🔥 هنا بالضبط تحطها
  window.dispatchEvent(new Event("avatarChanged"));
};
    reader.readAsDataURL(file);
  };

  // 🔥 Username
  const handleUsernameChange = async () => {
    if (!newUsername) return;

    await updateDoc(doc(db, "users", user.uid), {
      username: newUsername
    });

    setUserData({ ...userData, username: newUsername });
    setMessage("✅ Username updated");
  };

  // 🔐 Password
  const handlePasswordChange = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        prompt("Enter your current password")
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setMessage("✅ Password updated");

    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-[#020617] text-white relative overflow-hidden">

      {/* 🔥 Animated Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] 
        bg-blue-600 opacity-30 blur-[120px] animate-pulse"></div>

        <div className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] 
        bg-purple-600 opacity-30 blur-[120px] animate-pulse delay-1000"></div>

        <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] 
        bg-pink-500 opacity-20 blur-[100px] animate-pulse delay-500"></div>

      </div>

      {/* 🔥 CARD */}
      <div
  className="
  relative w-[420px] rounded-2xl overflow-hidden

  bg-[#020617]/80 backdrop-blur-md 
  border border-white/10

  transition-all duration-300 ease-out

  hover:scale-[1.03]
  hover:-translate-y-2
  hover:shadow-[0_0_80px_rgba(59,130,246,0.35),0_0_120px_rgba(168,85,247,0.25)]

  transform-gpu will-change-transform
  "
>
        {/* 🔥 COVER */}
        <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>

        {/* 🔥 AVATAR */}

        <div className="relative -mt-12 flex flex-col items-center">

          <div className="w-24 h-24 rounded-full overflow-hidden 
          border-4 border-[#020617]
          shadow-[0_0_25px_rgba(168,85,247,0.9)]">

            {avatar ? (
<img 
  src={avatar} 
  className="w-full h-full object-cover transition duration-300 hover:scale-110"
/>            ) : (
              <div className="w-full h-full flex items-center justify-center 
              bg-gradient-to-r from-blue-500 to-purple-500 text-3xl font-bold">
                {(userData.username || user.email).charAt(0).toUpperCase()}
              </div>
            )}

          </div>

          <label className="text-xs text-blue-400 mt-2 cursor-pointer hover:underline">
            Change Avatar
            <input type="file" onChange={handleAvatarChange} className="hidden" />
          </label>

        </div>

        {/* 🔥 INFO */}
        <div className="p-6 text-center">

          <h2 className="text-xl font-bold">
            {userData.username || "No Username"}
          </h2>

          <p className="text-gray-400 text-sm mb-3">
            {user.email}
          </p>

          {/* 🔥 STATS */}
          <div className="flex justify-center gap-8 mb-6 text-sm">

            <div>
              <p className="text-blue-400 font-bold text-lg">{cart.length}</p>
              <p className="text-gray-400">Purchased</p>
            </div>

            <div>
              <p className="text-purple-400 font-bold text-lg">1</p>
              <p className="text-gray-400">Level</p>
            </div>

          </div>

          {/* 🔥 INPUTS */}
          <input
            type="text"
            placeholder="New Username"
            className="w-full mb-2 px-4 py-2 bg-[#020617] border border-gray-700 rounded-lg"
            onChange={(e) => setNewUsername(e.target.value)}
          />

          <button
            onClick={handleUsernameChange}
            className="
w-full mb-4 py-2 rounded-lg 
bg-indigo-600 hover:bg-indigo-700 
transition duration-300

hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]
"
          >
            Change Username
          </button>

          <input
            type="password"
            placeholder="New Password"
            className="w-full mb-2 px-4 py-2 bg-[#020617] border border-gray-700 rounded-lg"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            onClick={handlePasswordChange}
           className="
w-full mb-4 py-2 rounded-lg 
bg-purple-600 hover:bg-purple-700 
transition duration-300

hover:shadow-[0_0_20px_rgba(168,85,247,0.8)]
"
          >
            Change Password
          </button>

          {/* 🔥 MESSAGE */}
          {message && (
            <p className="text-green-400 mb-3">{message}</p>
          )}

          {/* 🔥 LOGOUT */}
          <button
            onClick={() => {
              localStorage.removeItem("username");
              navigate("/login");
            }}
            className="
w-full py-2 rounded-lg 
bg-red-600 hover:bg-red-700 
transition duration-300

hover:shadow-[0_0_20px_rgba(239,68,68,0.8)]
"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}