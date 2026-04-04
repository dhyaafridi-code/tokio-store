// src/components/Loader.jsx
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden">
       {/* الخلفية الحركية */}
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
         
         <h2 className="text-2xl font-bold text-white tracking-wider animate-pulse">LOADING DASHBOARD...</h2>
         <p className="text-blue-400 mt-2 text-sm font-mono">Connecting to servers...</p>
       </motion.div>
    </div>
  );
}