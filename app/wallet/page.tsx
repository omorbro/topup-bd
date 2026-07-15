"use client";

export default function WalletPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        💰 My Wallet
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-lg font-semibold text-gray-700">
          Current Balance
        </h2>

        <p className="text-4xl font-bold text-green-600 mt-2">
          ৳0
        </p>

        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
          ➕ Add Money
        </button>
      </div>

      <div className="mt-8 bg-white shadow rounded-xl p-6 border">
        <h3 className="text-xl font-semibold mb-4">
          Transaction History
        </h3>

        <p className="text-gray-500 text-center">
          No transactions found.
        </p>
      </div>
    </div>
  );
}
