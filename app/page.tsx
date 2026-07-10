export default function Home() {
  const games = [
    "🔥 Free Fire",
    "⚔️ PUBG Mobile",
    "🎮 Mobile Legends",
    "💎 Free Fire MAX",
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <header className="bg-blue-700 p-4 text-center">
        <h1 className="text-3xl font-bold text-yellow-300">TOPUP BD</h1>
        <p>বাংলাদেশের বিশ্বস্ত গেম টপ-আপ</p>
      </header>

      <div className="bg-yellow-300 text-black p-3 text-center font-bold">
        📢 Notice: অর্ডার দেওয়ার আগে UID ভালোভাবে যাচাই করুন।
      </div>

      <section className="p-4">
        <div className="rounded-xl bg-slate-800 p-8 text-center">
          <h2 className="text-2xl font-bold">WELCOME</h2>
          <p className="text-gray-300 mt-2">
            Free Fire, PUBG, MLBB এবং আরও অনেক গেম টপ-আপ।
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 p-4">
        {games.map((game) => (
          <div
            key={game}
            className="bg-slate-800 rounded-xl p-5 text-center hover:bg-slate-700"
          >
            <h3 className="font-bold">{game}</h3>
            <button className="mt-3 bg-blue-600 px-4 py-2 rounded-lg">
              Order Now
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
