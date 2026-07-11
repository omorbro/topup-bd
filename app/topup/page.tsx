"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Topup() {
  const router = useRouter();

  const [playerId, setPlayerId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

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

      <h1 className="text-3xl font-bold text-center mb-6">
        💎 Free Fire UID Top Up
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map((item) => (
          <button
            key={item.name}
            onClick={() => setSelectedProduct(item.name)}
            className={`rounded-xl p-4 border transition ${
              selectedProduct === item.name
                ? "bg-green-600 border-green-400"
                : "bg-slate-800 border-slate-700 hover:border-cyan-400"
            }`}
          >
            <h2 className="font-bold">{item.name}</h2>
            <p className="text-cyan-400 mt-2">{item.price}</p>
          </button>
        ))}
      </div>
      <div className="mt-8 bg-slate-800 rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">
          Player ID
        </h2>

        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter Free Fire UID"
          className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 outline-none"
        />

        <button
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-bold"
          onClick={() => {
            if (!playerId.trim()) {
              alert("Player ID লিখুন");
              return;
            }

            alert("Player ID: " + playerId);
          }}
        >
          🔍 Check Player
        </button>
      </div>

      <div className="mt-8 bg-slate-800 rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">
          Payment Method
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedPayment("bKash")}
            className={`rounded-xl p-4 transition ${
              selectedPayment === "bKash"
                ? "bg-pink-600 text-white"
                : "bg-white text-black"
            }`}
          >
            bKash
          </button>

          <button
            onClick={() => setSelectedPayment("Nagad")}
            className={`rounded-xl p-4 transition ${
              selectedPayment === "Nagad"
                ? "bg-orange-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Nagad
          </button>

          <button
            onClick={() => setSelectedPayment("Wallet")}
            className={`rounded-xl p-4 transition ${
              selectedPayment === "Wallet"
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            }`}
          >
            Wallet
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          if (!selectedProduct) {
            alert("⚠️ আগে একটি Diamond Package নির্বাচন করুন।");
            return;
          }

          if (!playerId.trim()) {
            alert("⚠️ আপনার Player ID লিখুন।");
            return;
          }

          if (!selectedPayment) {
            alert("⚠️ একটি Payment Method নির্বাচন করুন।");
            return;
          }

          const selectedItem = products.find(
            (item) => item.name === selectedProduct
          );

          const price = selectedItem?.price || "";

          router.push(
            `/order?uid=${encodeURIComponent(playerId)}&package=${encodeURIComponent(selectedProduct)}&payment=${encodeURIComponent(selectedPayment)}&price=${encodeURIComponent(price)}`
          );
        }}
        className="w-full mt-8 bg-green-600 hover:bg-green-700 rounded-xl py-4 text-xl font-bold"
      >
        🚀 Buy Now
      </button>

      <div className="mt-6 bg-slate-800 rounded-xl p-4">
        <h3 className="text-lg font-bold mb-4">
          📋 Selected Order
        </h3>

        <div className="space-y-2">
          <p>
            💎 Package:
            <span className="text-cyan-400 ml-2">
              {selectedProduct || "Not Selected"}
            </span>
          </p>

          <p>
            🆔 Player ID:
            <span className="text-cyan-400 ml-2">
              {playerId || "Not Entered"}
            </span>
          </p>

          <p>
            💳 Payment:
            <span className="text-cyan-400 ml-2">
              {selectedPayment || "Not Selected"}
            </span>
          </p>
        </div>
      </div>

    </main>
  );
}
