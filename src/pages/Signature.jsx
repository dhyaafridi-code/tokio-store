export default function Signature() {
  return (
    <div
      className="fixed bottom-4 left-4 z-[9999]
      text-xs text-gray-400
      bg-[#020617]/70 backdrop-blur-md
      px-4 py-2 rounded-xl
      border border-blue-500/20

      transition duration-300
      hover:scale-105
      hover:text-white
      hover:border-blue-500/50
      hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]

      cursor-default
      "
    >
      <span className="opacity-70">Made by </span>
      <span className="text-blue-400 font-semibold">TOKIO</span>
      <br />
      <span className="text-[10px] opacity-60">
        Discord: _0tx.
      </span>
    </div>
  );
}