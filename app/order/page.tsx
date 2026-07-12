"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
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
      const docRef = await addDoc(
        collection(db, "orders"),
        {
          uid,
          package: diamondPackage,
          payment,
          price,
          status: "Waiting",
          createdAt: serverTimestamp(),
        }
      );

      alert("✅ Order Submitted Successfully!");
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

      <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700">

        <div className="space-y-5">

          <div>
            <p className="text-gray-400 text-sm">
              Diamond Package
            </p>
            <h2 className="text-2xl font-bold text-yellow-400">
              {diamondPackage}
            </h2>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Player UID
            </p>
            <h2 className="text-xl font-bold">
              {uid}
            </h2>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Payment Method
            </p>
            <h2 className="text-xl font-bold">
              {payment}
            </h2>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Total Price
            </p>
            <h2 className="text-3xl font-bold text-green-400">
              {price}
            </h2>
          </div>

        </div>
      </div>
      <button
        onClick={submitOrder}
        className="w-full mt-8 bg-green-600 hover:bg-green-700 rounded-2xl py-4 text-lg font-bold transition"
      >
        ✅ Confirm Order
      </button>

    </main>
  );
}
