export default function Topup() {

  const products = [
    { name: "25 Diamond", price: "TK 22" },
    { name: "50 Diamond", price: "TK 37" },
    { name: "115 Diamond", price: "TK 80" },
    { name: "240 Diamond", price: "TK 160" },
    { name: "355 Diamond", price: "TK 240" },
    { name: "505 Diamond", price: "TK 338" },
    { name: "725 Diamond", price: "TK 480" },
    { name: "1090 Diamond", price: "TK 718" },
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4">

      <h1 className="text-3xl font-bold mb-6">
        💎 UID TOP UP (BD)
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map((item) => (
          <div
            key={item.name}
            className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700"
          >
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-cyan-400 mt-2">{item.price}</p>
          </div>
        ))}
      </div>

    </main>
  );
}
