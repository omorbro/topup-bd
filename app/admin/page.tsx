"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

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

  async function changeStatus(
    id: string,
    status: string
  ) {
    try {
      await updateDoc(doc(db, "orders", id), {
        status,
      });
    } catch (err) {
      console.error(err);
      alert("Status Update Failed");
    }
  }

  const login = () => {
    if (password === "topupbd123") {
      setLoggedIn(true);
    } else {
      alert("Wrong Password!");
    }
  };

  const totalOrders = orders.length;

  const waitingOrders = orders.filter(
    (o) => o.status === "Waiting"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.status === "Completed"
  ).length;

  const cancelledOrders = orders.filter(
    (o) => o.status === "Cancelled"
  ).length;

  const totalSales = orders
    .filter((o) => o.status === "Completed")
    .reduce(
      (sum, o) => sum + Number(o.price || 0),
      0
    );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const keyword = search.toLowerCase();

      const searchMatch =
        String(order.uid || "")
          .toLowerCase()
          .includes(keyword) ||
        String(order.package || "")
          .toLowerCase()
          .includes(keyword) ||
        String(order.payment || "")
          .toLowerCase()
          .includes(keyword);

      const statusMatch =
        statusFilter === "All"
          ? true
          : order.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [orders, search, statusFilter]);
  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6">

        <div className="w-full max-w-sm rounded-2xl bg-slate-800 border border-slate-700 p-8 shadow-2xl">

          <h1 className="text-3xl font-bold text-center text-yellow-400">
            TOPUP BD
          </h1>

          <p className="text-center text-gray-400 mt-2 mb-6">
            Professional Admin Panel
          </p>

          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-slate-700 border border-slate-600 p-3 text-white outline-none focus:border-yellow-400 mb-4"
          />

          <button
            onClick={login}
            className="w-full rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 transition"
          >
            Login
          </button>

        </div>

      </main>
    );
  }

  return (

    <main className="min-h-screen bg-slate-900 text-white p-6">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <h1 className="text-3xl font-bold text-yellow-400">
          TOPUP BD Admin Panel
        </h1>

        <button
          onClick={() => setLoggedIn(false)}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl font-bold"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-600 rounded-xl p-4">
          <p className="text-sm">📦 Total Orders</p>
          <h2 className="text-3xl font-bold">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-yellow-500 rounded-xl p-4">
          <p className="text-sm">⏳ Waiting</p>
          <h2 className="text-3xl font-bold">
            {waitingOrders}
          </h2>
        </div>

        <div className="bg-green-600 rounded-xl p-4">
          <p className="text-sm">✅ Completed</p>
          <h2 className="text-3xl font-bold">
            {completedOrders}
          </h2>
        </div>

        <div className="bg-red-600 rounded-xl p-4">
          <p className="text-sm">❌ Cancelled</p>
          <h2 className="text-3xl font-bold">
            {cancelledOrders}
          </h2>
        </div>

        <div className="bg-purple-600 rounded-xl p-4">
          <p className="text-sm">💰 Total Sales</p>
          <h2 className="text-3xl font-bold">
            ৳ {totalSales}
          </h2>
        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="🔍 Search UID / Package / Payment"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-slate-800 border border-slate-700"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 rounded-xl bg-slate-800 border border-slate-700"
        >
          <option value="All">All Status</option>
          <option value="Waiting">Waiting</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      <div className="bg-slate-800 rounded-xl overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-slate-700">

            <tr>

              <th className="p-3">UID</th>
              <th className="p-3">Package</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Details</th>
              <th className="p-3">Action</th>

            </tr>

          </thead>

          <tbody>
            {filteredOrders.map((order: any) => (

              <tr
                key={order.id}
                className="border-b border-slate-700 hover:bg-slate-700/40 transition"
              >

                <td className="p-3 font-semibold">
                  {order.uid}
                </td>

                <td className="p-3">
                  {order.package}
                </td>

                <td className="p-3">
                  {order.payment}
                </td>

                <td className="p-3 font-bold text-yellow-400">
                  ৳ {order.price}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      order.status === "Completed"
                        ? "bg-green-600"
                        : order.status === "Waiting"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3">

                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetails(true);
                    }}
                    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg font-bold"
                  >
                    👁 View
                  </button>

                </td>

                <td className="p-3">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      changeStatus(order.id, e.target.value)
                    }
                    className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                  >
                    <option value="Waiting">
                      ⏳ Waiting
                    </option>

                    <option value="Completed">
                      ✅ Completed
                    </option>

                    <option value="Cancelled">
                      ❌ Cancelled
                    </option>

                  </select>

                </td>

              </tr>

            ))}

            {filteredOrders.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center text-gray-400 p-8"
                >
                  No Orders Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold text-yellow-400">
                📋 Order Details
              </h2>

              <button
                onClick={() => setShowDetails(false)}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
              >
                ✕
              </button>

            </div>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-400">UID</span>
                <span className="font-bold">{selectedOrder.uid}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Package</span>
                <span className="font-bold">{selectedOrder.package}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Payment</span>
                <span className="font-bold">{selectedOrder.payment}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="font-bold">
                  ৳ {selectedOrder.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    selectedOrder.status === "Completed"
                      ? "bg-green-600"
                      : selectedOrder.status === "Waiting"
                      ? "bg-yellow-500 text-black"
                      : "bg-red-600"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">
                  Order Time
                </span>

                <span className="font-bold">
                  {selectedOrder.createdAt?.seconds
                    ? new Date(
                        selectedOrder.createdAt.seconds * 1000
                      ).toLocaleString()
                    : "N/A"}
                </span>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    String(selectedOrder.uid || "")
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
              >
                📋 Copy UID
              </button>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    String(selectedOrder.payment || "")
                  )
                }
                className="bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold"
              >
                💳 Copy Payment
              </button>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    String(selectedOrder.package || "")
                  )
                }
                className="bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold"
              >
                🎁 Copy Package
              </button>

              <button
                onClick={() => setShowDetails(false)}
                className="bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold"
              >
                ❌ Close
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}
