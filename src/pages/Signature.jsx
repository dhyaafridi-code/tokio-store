export default function Signature() {
  return (
    <div
      className="fixed bottom-4 left-4 z-[9999]
      text-xs text-muted
      bg-brand/70 backdrop-blur-md
      px-4 py-2 rounded-xl
      border border-accent/20

      transition duration-300
      hover:scale-105
      hover:text-white
      hover:border-accent/30
      hover:shadow-[0_0_20px_rgba(124,58,237,0.12)]

      cursor-default
      "
    >
      <span className="opacity-70">Made by </span>
      <span className="bg-gradient-to-r from-primary via-accent to-neon bg-clip-text text-transparent font-semibold">TOKIO</span>
      <br />
      <span className="text-[10px] opacity-60">
        Discord: _0tx.
      </span>
    </div>
  );
}