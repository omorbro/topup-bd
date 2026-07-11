"use client";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function OrderPage() {
  const submitOrder = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        player: "Player",
        uid: "8112709077",
        package: "25 Diamond",
        price: "22",
        status: "Waiting",
        createdAt: new Date(),
      });

      alert("✅ Order Submitted Successfully!");
    } catch (error) {
      alert("❌ Failed to submit order!");
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        📋 Order Summary
      </h1>

      <div className="bg-slate-800 rounded-xl p-5 space-y-4">
        <div>
          <p className="text-gray-400">Diamond Package</p>
          <h2 className="text-xl font-bold">25 Diamond</h2>
        </div>

        <div>
          <p className="text-gray-400">Player ID</p>
          <h2 className="text-xl font-bold">8112709077</h2>
        </div>

        <div>
          <p className="text-gray-400">Payment Method</p>
          <h2 className="text-xl font-bold">bKash</h2>
        </div>

        <div>
          <p className="text-gray-400">Total Price</p>
          <h2 className="text-2xl font-bold text-green-400">
            TK 22
          </h2>
        </div>
      </div>

      <button
        onClick={submitOrder}
        className="w-full mt-8 bg-green-600 hover:bg-green-700 rounded-xl py-3 font-bold"
      >
        ✅ Confirm Order
      </button>
    </main>
  );
}
