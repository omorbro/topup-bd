"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function WalletPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bKash");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (!amount || !senderNumber || !trxId) {
      alert("সব তথ্য পূরণ করুন।");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "wallet_requests"), {
        userId: user.uid,
        userName: user.displayName || "",
        userEmail: user.email || "",
        amount: Number(amount),
        method,
        senderNumber,
        trxId,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert("Wallet request submitted successfully!");

      setAmount("");
      setSenderNumber("");
      setTrxId("");
      setMethod("bKash");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        💰 My Wallet
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-lg font-semibold text-gray-700">
          Add Money
        </h2>

        <div className="mt-4 space-y-4">

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="bKash">bKash</option>
            <option value="Nagad">Nagad</option>
          </select>

          <input
            type="text"
            placeholder="Sender Number"
            value={senderNumber}
            onChange={(e) => setSenderNumber(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Transaction ID"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

        </div>
      </div>
      <div className="mt-8 bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-lg font-semibold mb-4">
          Transaction History
        </h2>

        <p className="text-gray-500 text-center">
          No transactions yet.
        </p>
      </div>
    </div>
  );
}
