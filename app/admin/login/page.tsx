"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [password, setPassword] = useState("");

  function login() {
    if (password === "topupbd123") {
      localStorage.setItem("admin-login", "true");
      router.push("/admin");
    } else {
      alert("❌ Wrong Password");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 p-4">

      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-6">

        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          🔒 Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl bg-slate-700 p-3 text-white outline-none"
        />

        <button
          onClick={login}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold"
        >
          Login
        </button>

      </div>

    </main>
  );
}
