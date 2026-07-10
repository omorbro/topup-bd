"use client";

import { useState } from "react";

const packages = [
  { name: "25 Diamond", price: 25 },
  { name: "50 Diamond", price: 45 },
  { name: "115 Diamond", price: 90 },
  { name: "240 Diamond", price: 180 },
  { name: "355 Diamond", price: 270 },
  { name: "505 Diamond", price: 360 },
  { name: "610 Diamond", price: 450 },
  { name: "850 Diamond", price: 620 },
  { name: "1090 Diamond", price: 780 },
  { name: "1240 Diamond", price: 890 },
];

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const [uid, setUid] = useState("");
  const [diamond, setDiamond] = useState(packages[0].name);
  const [payment, setPayment] = useState("bKash");
  const [trxid, setTrxid] = useState("");
const [screenshot, setScreenshot] = useState<File | null>(null);

  const selected =
    packages.find((p) => p.name === diamond) || packages[0];

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-6">

        <h1 className="text-3xl font-bold text-yellow-400 text-center">
          TOPUP BD
        </h1>

        <p className="text-center text-gray-300 mt-2">
          Free Fire Diamond Top Up
        </p>

        <input
          className="w-full mt-6 p-3 rounded-lg bg-slate-700 text-white"
          placeholder="Player Name"
          value={playerName}
          onChange={(e)=>setPlayerName(e.target.value)}
        />

        <input
          className="w-full mt-3 p-3 rounded-lg bg-slate-700 text-white"
          placeholder="Free Fire UID"
          value={uid}
          onChange={(e)=>setUid(e.target.value)}
        />

        <select
          className="w-full mt-3 p-3 rounded-lg bg-slate-700 text-white"
          value={diamond}
          onChange={(e)=>setDiamond(e.target.value)}
        >
          {packages.map((p)=>(
            <option key={p.name}>{p.name}</option>
          ))}
        </select>

        <div className="mt-3 bg-slate-700 rounded-lg p-3 text-center">
          <p className="text-lg font-bold text-green-400">
            Price: ৳{selected.price}
          </p>
        </div>

        <select
          className="w-full mt-3 p-3 rounded-lg bg-slate-700 text-white"
          value={payment}
          onChange={(e)=>setPayment(e.target.value)}
        >
          <option>bKash</option>
          <option>Nagad</option>
        </select>

        <input
          className="w-full mt-3 p-3 rounded-lg bg-slate-700 text-white"
          placeholder="Transaction ID"
          value={trxid}
          onChange={(e)=>setTrxid(e.target.value)}
        />
<div className="mt-3">
  <label className="block mb-2 text-sm">
    Payment Screenshot
  </label>

  <input
    type="file"
    accept="image/*"
    className="w-full p-2 rounded-lg bg-slate-700"
    onChange={(e) =>
      setScreenshot(e.target.files?.[0] || null)
    }
  />

  {screenshot && (
    <p className="mt-2 text-green-400 text-sm">
      Selected: {screenshot.name}
    </p>
  )}
</div>
        <div className="mt-5 bg-slate-700 rounded-lg p-4">
          <p>📱 bKash: 01890584909</p>
          <p>💳 Nagad: 01890584909</p>
        </div>

<button
  onClick={async () => {
const formData = new FormData();

formData.append("playerName", playerName);
formData.append("uid", uid);
formData.append("diamond", diamond);
formData.append("price", String(selected.price));
formData.append("payment", payment);
formData.append("trxid", trxid);


if (screenshot) {
  formData.append("screenshot", screenshot);
}

await fetch("/api/order", {
  method: "POST",
  body: formData,
});
    alert("✅ আপনার অর্ডার সফলভাবে সাবমিট হয়েছে!");
  }}
  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg"
>
  Continue
</button>

    </div>
  </main>
);
}
