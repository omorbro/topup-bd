import Link from "next/link";
import Header from "../components/Header";
import BannerSlider from "../components/BannerSlider";

export default function Home() {
  const cards = [
    {
      title: "🔥 Daily Offer",
      image: "/images/daily-offer.jpg",
      link: "/daily-offer",
    },
    {
      title: "💎 Top Up",
      image: "/images/topup.jpg",
      link: "/topup",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <Header />

<div className="bg-purple-700 p-3 text-center font-semibold">
  📢 Notice: ২৪/৭ অটো টপআপ চালু আছে।
</div>

<div className="bg-yellow-400 text-black py-2 overflow-hidden whitespace-nowrap">
  <div className="animate-marquee inline-block font-semibold">
    🎉 New Offer: Free Fire Diamond Top Up • ⚡ Instant Delivery • 💳 bKash & Nagad Accepted • 🔥 24/7 Auto Top Up
  </div>
</div>
          <section className="p-4">
  <BannerSlider />
</section>

      <section className="px-4">
        <h2 className="text-3xl text-center font-bold mb-6">
          HOT OFFER
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.link}
              className="bg-slate-800 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-3 text-center font-bold">
                {card.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="p-4">
        <div className="bg-yellow-100 text-black rounded-xl p-5">
          <h2 className="text-2xl font-bold mb-4">
            📺 How to Top Up
          </h2>

          <div className="bg-gray-300 rounded-lg h-56 flex items-center justify-center">
            <p className="text-gray-700 text-center">
              এখানে পরে YouTube ভিডিও যোগ করা হবে
            </p>
          </div>
        </div>
      </section>

      <section className="p-4">
        <div className="bg-yellow-100 text-black rounded-xl p-5">
          <h2 className="text-2xl font-bold mb-4">
            📋 My Deposits
          </h2>

          <p>Serial No: 00000</p>
          <p className="mt-2">Status: Pending</p>
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 bg-white text-black border-t shadow-lg">
        <div className="grid grid-cols-5 text-center py-2">
          <Link href="/" className="flex flex-col items-center">
            <span>🏠</span>
            <span className="text-xs">Home</span>
          </Link>

          <Link href="/tutorial" className="flex flex-col items-center">
            <span>📺</span>
            <span className="text-xs">Tutorial</span>
          </Link>

          <Link href="/add-money" className="flex flex-col items-center">
            <span>💳</span>
            <span className="text-xs">Add Money</span>
          </Link>

          <Link href="/orders" className="flex flex-col items-center">
            <span>📦</span>
            <span className="text-xs">Orders</span>
          </Link>

          <Link href="/account" className="flex flex-col items-center">
            <span>👤</span>
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
