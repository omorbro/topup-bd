"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-blue-600 text-white p-5 shadow">

        <h1 className="text-2xl font-bold">
          TOPUP BD Dashboard
        </h1>

        <p className="text-sm text-blue-100">
          Welcome Back
        </p>

      </div>

      {/* Content */}

      <div className="max-w-5xl mx-auto p-5">
        {/* Profile Card */}

        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex items-center gap-4">

            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
              {user?.displayName?.charAt(0) || "U"}
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                {user?.displayName || "User"}
              </h2>

              <p className="text-gray-600">
                {user?.email}
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

            <Link
              href="/topup"
              className="bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              💎 Top Up Now
            </Link>

            <Link
              href="/orders"
              className="bg-green-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              📦 My Orders
            </Link>

          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>

        </div>
        {/* Quick Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="text-gray-500 text-sm">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="text-gray-500 text-sm">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">0</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">
            <h3 className="text-gray-500 text-sm">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500 mt-2">0</p>
          </div>

        </div>

      </div>

    </div>
  );
}
