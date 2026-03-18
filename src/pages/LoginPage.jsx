import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import Signature from "./Signature";
export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // تخزين username (ولا email)
      localStorage.setItem("username", user.email);

      // نجاح
      setErrorMessage("✅ Login successful");

      // تحويل
      navigate("/");

    } catch (err) {

      if (err.code === "auth/user-not-found") {
        setErrorMessage("❌ User not found");
      } else if (err.code === "auth/wrong-password") {
        setErrorMessage("❌ Wrong password");
      } else if (err.code === "auth/invalid-email") {
        setErrorMessage("❌ Invalid email");
      } else {
        setErrorMessage("❌ Login failed");
      }

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">

      <div className="bg-[#0b121c] p-8 rounded-xl border border-blue-500/30 w-[350px] shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login <span className="text-blue-400">Account</span>
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">

          <input
            type="email"
            placeholder="Email"
            className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
            Login
          </button>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errorMessage}
            </p>
          )}

        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account?
          <Link to="/register" className="text-blue-400 ml-2">
            Register
          </Link>
        </p>

      </div>
<Signature />
    </div>
  );
}