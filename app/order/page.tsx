"use client";

import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function OrderPage() {
  const [uid, setUid] = useState("");
  const [diamondPackage, setDiamondPackage] = useState("");
  const [payment, setPayment] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setUid(params.get("uid") || "");
    setDiamondPackage(params.get("package") || "");
    setPayment(params.get("payment") || "");
    setPrice(params.get("price") || "");
  }, []);

  async function submitOrder() {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        uid,
        package: diamondPackage,
        payment,
        price,
        status: "Waiting",
        createdAt: Date.now(),
      });

      alert("✅ Order Submitted!");
      console.log(docRef.id);
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        📋 Order Summary
      </h1>

      <div className="bg-slate-800 rounded-xl p-5 space-y-4">
        <div>
          <p className="text-gray-400">Diamond Package</p>
          <h2 className="text-xl font-bold">{diamondPackage}</h2>
        </div>

        <div>
          <p className="text-gray-400">Player UID</p>
          <h2 className="text-xl font-bold">{uid}</h2>
        </div>

        <div>
          <p className="text-gray-400">Payment Method</p>
          <h2 className="text-xl font-bold">{payment}</h2>
        </div>

        <div>
          <p className="text-gray-400">Total Price</p>
          <h2 className="text-2xl font-bold text-green-400">
            {price}
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
