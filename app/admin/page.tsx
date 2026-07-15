"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  getDoc,
  setDoc,
  increment,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type Order = {
  id: string;
  uid?: string;
  package?: string;
  payment?: string;
  price?: number | string;
  status?: string;
  walletAdded?: boolean;
  createdAt?: any;
};

export default function AdminPage() {
  const router = useRouter();

  const [checkingLogin, setCheckingLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const [toast, setToast] = useState("");

const [walletRequests, setWalletRequests] = useState<any[]>([]);

  function showToast(message: string) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

async function changeStatus(id: string, status: string) {
  try {
    await updateDoc(doc(db, "orders", id), {
      status,
    });

    if (status === "Completed") {
      const order = orders.find((o) => o.id === id);

      if (order && !order.walletAdded) {
        const walletRef = doc(db, "wallets", String(order.uid));
        const walletSnap = await getDoc(walletRef);

        if (!walletSnap.exists()) {
          await setDoc(walletRef, {
            uid: String(order.uid),
            balance: Number(order.price || 0),
          });
        } else {
          await updateDoc(walletRef, {
            balance: increment(Number(order.price || 0)),
          });
        }
      
       await updateDoc(doc(db, "orders", id), {
  walletAdded: true,    
});
 
    }
  }  
 
  showToast("✅ Status Updated");
  } catch (error) {
    console.error(error);
    showToast("❌ Status Update Failed");
  }
}

  async function deleteOrder(id: string) {
    const ok = confirm("Delete this order?");

    if (!ok) return;

    try {
      await deleteDoc(doc(db, "orders", id));

      showToast("🗑 Order Deleted");
    } catch {
      showToast("❌ Delete Failed");
    }
  }
  useEffect(() => {
    const login = localStorage.getItem("admin-login");

    if (login !== "true") {
      router.replace("/admin/login");
      return;
    }

    setLoggedIn(true);
    setCheckingLogin(false);

    const timer = setTimeout(() => {
      localStorage.removeItem("admin-login");
      router.replace("/admin/login");
    }, 1000 * 60 * 30);

    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    if (!loggedIn) return;

    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Order[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, "id">),
      }));

      setOrders(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loggedIn]);
 
  useEffect(() => {
  if (!loggedIn) return;

  const q = query(
    collection(db, "wallet_requests"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    setWalletRequests(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });

  return () => unsubscribe();
}, [loggedIn]);

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
    .reduce((sum, o) => sum + Number(o.price || 0), 0);

  const today = new Date().toDateString();

  const todayOrders = orders.filter((o) => {
    if (!o.createdAt) return false;

    const date = new Date(
      o.createdAt.seconds
        ? o.createdAt.seconds * 1000
        : o.createdAt
    );

    return date.toDateString() === today;
  });

  const todaySales = todayOrders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + Number(o.price || 0), 0);

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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ordersPerPage)
  );

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  if (checkingLogin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        Checking Login...
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-6">

      {toast && (
        <div className="fixed top-5 right-5 z-50 rounded-xl bg-green-600 px-5 py-3 font-bold shadow-xl">
          {toast}
        </div>
      )}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-extrabold text-yellow-400">
            🚀 TOPUP BD Admin Panel
          </h1>

          <p className="mt-1 text-gray-400">
            Premium Dashboard v2.0
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("admin-login");
            router.replace("/admin/login");
          }}
          className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
        >
          Logout
        </button>

      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-7">

        <div className="rounded-2xl bg-blue-600 p-5 shadow-lg">
          <p className="text-sm text-white/80">📦 Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold">
            {totalOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-cyan-600 p-5 shadow-lg">
          <p className="text-sm text-white/80">📅 Today Orders</p>
          <h2 className="mt-2 text-3xl font-bold">
            {todayOrders.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-600 p-5 shadow-lg">
          <p className="text-sm text-white/80">💰 Total Sales</p>
          <h2 className="mt-2 text-3xl font-bold">
            ৳ {totalSales}
          </h2>
        </div>

        <div className="rounded-2xl bg-emerald-600 p-5 shadow-lg">
          <p className="text-sm text-white/80">💵 Today Sales</p>
          <h2 className="mt-2 text-3xl font-bold">
            ৳ {todaySales}
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-500 p-5 text-black shadow-lg">
          <p className="text-sm">⏳ Waiting</p>
          <h2 className="mt-2 text-3xl font-bold">
            {waitingOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-700 p-5 shadow-lg">
          <p className="text-sm text-white/80">✅ Completed</p>
          <h2 className="mt-2 text-3xl font-bold">
            {completedOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-red-700 p-5 shadow-lg">
          <p className="text-sm text-white/80">❌ Cancelled</p>
          <h2 className="mt-2 text-3xl font-bold">
            {cancelledOrders}
          </h2>
        </div>

      </div>
      <div className="mb-6 rounded-2xl bg-slate-900 p-4">

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

          <input
            type="text"
            placeholder="🔍 Search UID / Package / Payment"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-cyan-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-slate-700 bg-slate-800 p-3"
          >
            <option value="All">All Status</option>
            <option value="Waiting">⏳ Waiting</option>
            <option value="Completed">✅ Completed</option>
            <option value="Cancelled">❌ Cancelled</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 p-3"
          >
            <option value="All">📅 All Time</option>
            <option value="Today">Today</option>
            <option value="Week">Last 7 Days</option>
            <option value="Month">Last 30 Days</option>
          </select>

          <button
            onClick={() => window.print()}
            className="rounded-xl bg-blue-600 p-3 font-bold hover:bg-blue-700"
          >
            🖨 Print
          </button>

          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-emerald-600 p-3 font-bold hover:bg-emerald-700"
          >
            🔄 Refresh
          </button>

        </div>
        <div className="mt-6 rounded-2xl bg-slate-900 p-4">
  <h2 className="mb-4 text-xl font-bold">
    💰 Wallet Requests ({walletRequests.length})
  </h2>

  {walletRequests.length === 0 ? (
    <p className="text-gray-400">No Wallet Requests</p>
  ) : (
    <div className="space-y-3">
      {walletRequests.map((req: any) => (
        <div
          key={req.id}
          className="rounded-xl border border-slate-700 p-4"
        >
          <p>👤 {req.userName}</p>
          <p>📧 {req.userEmail}</p>
          <p>💵 ৳{req.amount}</p>
          <p>💳 {req.method}</p>
          <p>📱 {req.senderNumber}</p>
          <p>🧾 {req.trxId}</p>
          <p>📌 {req.status}</p>
        </div>
      ))}
    </div>
  )}
</div>
      </div>

      {loading && (
        <div className="mb-4 rounded-xl bg-yellow-500 p-3 text-center font-bold text-black">
          Loading Orders...
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-3 text-left">UID</th>
              <th className="p-3 text-left">Package</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Action</th>

            </tr>

          </thead>

          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-800 hover:bg-slate-800/60"
              >
                <td className="p-3 font-bold">
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
                  <select
                    value={order.status}
                    onChange={(e) =>
                      changeStatus(order.id, e.target.value)
                    }
                    className="rounded-lg bg-slate-700 px-3 py-2"
                  >
                    <option value="Waiting">⏳ Waiting</option>
                    <option value="Completed">✅ Completed</option>
                    <option value="Cancelled">❌ Cancelled</option>
                  </select>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetails(true);
                    }}
                    className="rounded-lg bg-cyan-600 px-4 py-2 font-bold hover:bg-cyan-700"
                  >
                    👁 View
                  </button>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 font-bold hover:bg-red-700"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}

            {currentOrders.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-gray-400"
                >
                  No Orders Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      <div className="mt-6 flex items-center justify-center gap-3">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="rounded-lg bg-slate-700 px-4 py-2 disabled:opacity-40"
        >
          ⬅ Previous
        </button>

        <span className="font-bold">
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="rounded-lg bg-slate-700 px-4 py-2 disabled:opacity-40"
        >
          Next ➡
        </button>

      </div>
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-yellow-400">
                📋 Order Details
              </h2>

              <button
                onClick={() => setShowDetails(false)}
                className="rounded-lg bg-red-600 px-3 py-2 hover:bg-red-700"
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
                <span className="font-bold text-yellow-400">
                  ৳ {selectedOrder.price}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>

                <span className="rounded-full bg-cyan-600 px-3 py-1 text-sm font-bold">
                  {selectedOrder.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Order Time</span>

                <span className="font-bold">
                  {selectedOrder.createdAt
                    ? new Date(
                        selectedOrder.createdAt.seconds
                          ? selectedOrder.createdAt.seconds * 1000
                          : selectedOrder.createdAt
                      ).toLocaleString()
                    : "N/A"}
                </span>
              </div>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">

              <button
                onClick={() => {
                  navigator.clipboard.writeText(String(selectedOrder.uid || ""));
                  showToast("✅ UID Copied");
                }}
                className="rounded-lg bg-blue-600 py-3 font-bold hover:bg-blue-700"
              >
                📋 Copy UID
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(String(selectedOrder.payment || ""));
                  showToast("✅ Payment Copied");
                }}
                className="rounded-lg bg-green-600 py-3 font-bold hover:bg-green-700"
              >
                💳 Copy Payment
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(String(selectedOrder.package || ""));
                  showToast("✅ Package Copied");
                }}
                className="rounded-lg bg-purple-600 py-3 font-bold hover:bg-purple-700"
              >
                🎁 Copy Package
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(String(selectedOrder.price || ""));
                  showToast("✅ Price Copied");
                }}
                className="rounded-lg bg-yellow-500 py-3 font-bold text-black hover:bg-yellow-600"
              >
                💰 Copy Price
              </button>

            </div>

            <div className="mt-6">

              <button
                onClick={() => setShowDetails(false)}
                className="w-full rounded-lg bg-red-600 py-3 font-bold hover:bg-red-700"
              >
                ❌ Close
              </button>

            </div>

          </div>

        </div>
      )}
      <footer className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-gray-400">
        <p>© 2026 TOPUP BD Admin Panel v2.0</p>
        <p className="mt-1">
          Developed with ❤️ using Next.js + Firebase
        </p>
      </footer>

    </main>
  );
}
