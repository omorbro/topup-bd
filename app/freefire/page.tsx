"use client";

export default function FreeFirePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex justify-center items-center p-5">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-6">

        <h1 className="text-3xl font-bold text-yellow-400 text-center">
          TOPUP BD
        </h1>

        <p className="text-center mt-2">
          Free Fire Diamond Top Up
        </p>

        <input
          className="w-full mt-5 p-3 rounded-lg bg-slate-700"
          placeholder="Player Name"
        />

        <input
          className="w-full mt-3 p-3 rounded-lg bg-slate-700"
          placeholder="Free Fire UID"
        />

        <select className="w-full mt-3 p-3 rounded-lg bg-slate-700">
          <option>25 Diamond - ৳25</option>
          <option>50 Diamond - ৳45</option>
          <option>115 Diamond - ৳90</option>
          <option>240 Diamond - ৳180</option>
          <option>355 Diamond - ৳270</option>
          <option>505 Diamond - ৳360</option>
        </select>

        <select className="w-full mt-3 p-3 rounded-lg bg-slate-700">
          <option>bKash</option>
          <option>Nagad</option>
        </select>

        <input
          className="w-full mt-3 p-3 rounded-lg bg-slate-700"
          placeholder="Transaction ID"
        />

        <input
          type="file"
          className="w-full mt-3 p-2 rounded-lg bg-slate-700"
        />

        <div className="mt-4 bg-slate-700 rounded-lg p-4">
          <p>📱 bKash: 01890584909</p>
          <p>💳 Nagad: 01890584909</p>
        </div>

        <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg">
          Continue
        </button>

      </div>
    </main>
  );
}
