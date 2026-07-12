"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  function login() {
    if (password === "topupbd123") {
      localStorage.setItem("admin-login", "true");
      window.location.href = "/admin";
    } else {
      alert("❌ Wrong Password");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700">

        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-2">
          🔒 Admin Login
        </h1>

        <p className="text-center text-gray-400 mb-6">
          TOPUP BD Admin Panel
        </p>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              login();
            }
          }}
          className="w-full rounded-xl bg-slate-700 border border-slate-600 p-3 text-white outline-none focus:border-yellow-400"
        />

        <button
          onClick={login}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition"
        >
          Login
        </button>

      </div>
    </main>
  );
}
