export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        <h1 className="text-2xl font-bold text-blue-700">
          TOPUP <span className="text-cyan-500">BD</span>
        </h1>

        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search games..."
            className="w-full border rounded-lg px-4 py-2 text-black"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200">
            🔔
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Wallet
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>

          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            Register
          </button>
        </div>

      </div>
    </header>
  );
}
