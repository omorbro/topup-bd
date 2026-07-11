"use client";

import { useState } from "react";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

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

      <div className="bg-slate-800 rounded-xl p-4">
        <p className="text-green-400 text-lg font-bold">
          ✅ Login Successful
        </p>

        <p className="text-slate-300 mt-2">
          এখন এখানে আগের Firestore Order Table বসানো হবে।
        </p>
      </div>
    </main>
  );
}
