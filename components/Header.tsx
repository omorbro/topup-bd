"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        <Link href="/" className="text-2xl font-bold text-blue-700">
          TOPUP <span className="text-cyan-500">BD</span>
        </Link>

        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search games..."
            className="w-full border rounded-lg px-4 py-2 text-black"
          />
        </div>

        <div className="flex items-center gap-2">

          <button className="bg-gray-100 px-3 py-2 rounded-lg">
            🔔
          </button>

          <Link
            href="/wallet"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Wallet
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </header>
  );
}
