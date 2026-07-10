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
{ name: "1240 Diamond", price: "TK 802" },
{ name: "1505 Diamond", price: "TK 980" },
{ name: "1850 Diamond", price: "TK 1202" },
{ name: "2090 Diamond", price: "TK 1360" },
{ name: "2530 Diamond", price: "TK 1612" },
{ name: "3140 Diamond", price: "TK 2012" },
{ name: "3770 Diamond", price: "TK 2412" },
{ name: "4380 Diamond", price: "TK 2812" },
{ name: "5060 Diamond", price: "TK 3222" },
{ name: "6300 Diamond", price: "TK 4022" },
{ name: "7590 Diamond", price: "TK 4832" },
{ name: "8830 Diamond", price: "TK 5632" },
{ name: "10120 Diamond", price: "TK 6442" },
  ];

       return (
  <main className="min-h-screen bg-slate-900 text-white p-4">

    <div className="mb-6">
      <img
        src="/images/topup.jpg"
        alt="Topup Banner"
        className="w-full rounded-xl"
      />
    </div>

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
<div className="mt-8 bg-slate-800 rounded-xl p-4">
  <h2 className="text-xl font-bold mb-4">Player ID</h2>

  <input
    type="text"
    placeholder="Player ID (UID)"
    className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600 outline-none"
  />

  <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-bold">
    আপনার গেম আইডির নাম চেক করুন
  </button>
</div>

<div className="mt-8 bg-slate-800 rounded-xl p-4">
  <h2 className="text-xl font-bold mb-4">Payment Method</h2>

  <div className="grid grid-cols-2 gap-4">

    <button className="bg-white text-black rounded-xl p-4 border-2 border-purple-600">
      <p className="font-bold">bKash</p>
      <p className="text-sm">Auto Payment</p>
    </button>

    <button className="bg-white text-black rounded-xl p-4">
      <p className="font-bold">Nagad</p>
      <p className="text-sm">Auto Payment</p>
    </button>

    <button className="bg-white text-black rounded-xl p-4">
      <p className="font-bold">Wallet</p>
      <p className="text-sm">Balance Payment</p>
    </button>

  </div>
</div>

    </main>
  );
}
