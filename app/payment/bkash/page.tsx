"use client";

export default function BkashPage() {
  const number = "01890584909";

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-5">

      <div className="max-w-md mx-auto">

        <div className="text-center mb-8">

            <div className="w-24 h-24 mx-auto relative">
  <img
    src="/images/bkash.jpg"
    alt="bKash"
    className="w-full h-full rounded-full object-cover shadow-lg"
  />
</div>
          <h1 className="text-4xl font-bold text-pink-600 mt-5">
            bKash Personal
          </h1>

          <p className="text-gray-500 mt-2">
            Secure Payment Gateway
          </p>

        </div>

        <div className="space-y-5">

          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 shadow-sm flex gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
              1
            </div>

            <p className="font-semibold text-gray-800">
              Dial <span className="text-pink-600 font-bold">*247#</span> অথবা bKash App খুলুন
            </p>
          </div>

          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 shadow-sm flex gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
              2
            </div>

            <p className="font-semibold text-gray-800">
              Send Money নির্বাচন করুন
            </p>
          </div>
          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 shadow-sm flex gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
              3
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-800">Number</p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-pink-600">
                  {number}
                </span>

                <button
                  onClick={() => navigator.clipboard.writeText(number)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-xl font-bold"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 shadow-sm flex gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
              4
            </div>

            <p className="font-semibold text-gray-800">
              Amount: (Selected Package Price)
            </p>
          </div>          <div className="bg-pink-50 border border-pink-200 rounded-2xl p-5 shadow-sm flex gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
              5
            </div>

            <p className="font-semibold text-gray-800">
              Transaction সম্পন্ন হলে Transaction ID কপি করুন
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Enter Transaction ID
            </label>

            <input
              type="text"
              placeholder="e.g. NGD123456789"
              className="w-full rounded-2xl border border-pink-200 p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-2xl font-bold shadow-lg transition">
            Verify
          </button>

        </div>
      </div>
    </main>
  );
}
