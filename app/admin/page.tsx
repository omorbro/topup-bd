export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        TOPUP BD Admin Panel
      </h1>

      <div className="bg-slate-800 rounded-xl p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left p-2">Player</th>
              <th className="text-left p-2">UID</th>
              <th className="text-left p-2">Package</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-2">No Orders Yet</td>
              <td className="p-2">-</td>
              <td className="p-2">-</td>
              <td className="p-2">-</td>
              <td className="p-2 text-yellow-400">Waiting</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
