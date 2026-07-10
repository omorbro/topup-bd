export default function BkashPage() {
  return (
    <main className="min-h-screen bg-white p-5">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        bKash Personal
      </h1>

      <div className="space-y-4">

        <div className="border rounded-xl p-4">
          <b>1.</b> Dial *247# অথবা bKash App খুলুন
        </div>

        <div className="border rounded-xl p-4">
          <b>2.</b> Send Money নির্বাচন করুন
        </div>

        <div className="border rounded-xl p-4">
          <b>3.</b> নম্বর: <b>01890584909</b>
        </div>

        <div className="border rounded-xl p-4">
          <b>4.</b> Amount পরিশোধ করুন
        </div>

        <div className="border rounded-xl p-4">
          <b>5.</b> Transaction সম্পন্ন হলে Transaction ID কপি করুন
        </div>

        <input
          type="text"
          className="w-full border rounded-xl p-3"
          placeholder="Enter Transaction ID"
        />

        <button className="w-full bg-pink-600 text-white rounded-xl py-3 font-bold">
          Verify
        </button>

      </div>
    </main>
  );
}
