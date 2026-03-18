import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"
import Signature from "./Signature";
import { auth } from "../firebase";

export default function RegisterPage() {
    const db = getFirestore();
const [errorMessage, setErrorMessage] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [username,setUsername] = useState("");

const handleRegister = async (e)=>{
e.preventDefault()

if(password !== confirmPassword){
setErrorMessage("❌ Passwords do not match")
return
}
try {

  const userCredential = await createUserWithEmailAndPassword(auth,email,password)

  const user = userCredential.user

  await setDoc(doc(db,"users",user.uid),{
    username: username,
    email: email
  })

  setErrorMessage("✅ Account created successfully");

  window.location.href="/login"

} catch(err) {

  if (err.code === "auth/email-already-in-use") {
    setErrorMessage("❌ Email already used");
  } else if (err.code === "auth/invalid-email") {
    setErrorMessage("❌ Invalid email");
  } else if (err.code === "auth/weak-password") {
    setErrorMessage("❌ Password too weak");
  } else {
    setErrorMessage("❌ Something went wrong");
  }

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">

<div className="bg-[#0b121c] p-8 rounded-xl border border-blue-500/30 w-[350px] shadow-lg">

<h2 className="text-3xl font-bold text-center mb-6">
Create <span className="text-blue-400">Account</span>
</h2>

<form onSubmit={handleRegister} className="flex flex-col gap-6">

<input
type="text"
placeholder="Username"
className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-2"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="email"
placeholder="Email"
className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-2"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-2"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<input
type="password"
placeholder="Confirm Password"
className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-2"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

<button className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg">
Register
</button>

{errorMessage && (
  <p className="text-red-500 text-sm text-center mt-3">
    {errorMessage}
  </p>
)}
</form>

<p className="text-gray-400 text-sm text-center mt-6">

Already have an account?

<a href="/login" className="text-blue-400 ml-2">
Login
</a>

</p>

</div>
<Signature />
</div>

)

}
