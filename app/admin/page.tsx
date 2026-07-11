"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Order = {
  id: string;
  player: string;
  uid: string;
  package: string;
  price: string;
  status: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, "id">),
      }));

      setOrders(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        TOPUP BD Admin Panel
      </h1>

      <div className="bg-slate-800 rounded-xl p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left p-2">Player</th>
              <th className="text-left p-2">UID</th>
              <th className="text-left p-2">Package</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td className="p-2">No Orders Yet</td>
                <td className="p-2">-</td>
                <td className="p-2">-</td>
                <td className="p-2">-</td>
                <td className="p-2 text-yellow-400">Waiting</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-700"
                >
                  <td className="p-2">{order.player}</td>
                  <td className="p-2">{order.uid}</td>
                  <td className="p-2">{order.package}</td>
                  <td className="p-2">৳ {order.price}</td>
                  <td className="p-2">
                    <span className="text-green-400">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
