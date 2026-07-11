"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!loggedIn) return;

    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(list);
    });

    return () => unsubscribe();
  }, [loggedIn]);

  const login = () => {
    if (password === "topupbd123") {
      setLoggedIn(true);
    } else {
      alert("Wrong Password!");
    }
  };

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-slate-800 p-6 rounded-xl w-full max-w-sm">
          <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700 text-white mb-4"
          />

          <button
            onClick={login}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          TOPUP BD Admin Panel
        </h1>

        <button
          onClick={() => setLoggedIn(false)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold"
        >
          Logout
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="p-2">UID</th>
              <th className="p-2">Package</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} className="border-b border-slate-700">
                <td className="p-2">{order.uid}</td>
                <td className="p-2">{order.package}</td>
                <td className="p-2">{order.payment}</td>
                <td className="p-2">{order.price}</td>
                <td className="p-2 text-green-400">
                  {order.status}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-6 text-gray-400"
                >
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
