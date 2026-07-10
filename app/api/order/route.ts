import { NextResponse } from "next/server";

const BOT_TOKEN = "8942283173:AAGvHQGSynl5Zo0VgU-1x5trXbYclFznrn0";
const CHAT_ID = "6609436947";

export async function POST(req: Request) {
  const formData = await req.formData();

  const playerName = formData.get("playerName") as string;
  const uid = formData.get("uid") as string;
  const diamond = formData.get("diamond") as string;
  const price = formData.get("price") as string;
  const payment = formData.get("payment") as string;
  const trxid = formData.get("trxid") as string;
  const screenshot = formData.get("screenshot") as File | null;

  const text = `
🔥 নতুন অর্ডার

👤 Player: ${playerName}
🆔 UID: ${uid}
💎 Diamond: ${diamond}
💰 Price: ৳${price}
💳 Payment: ${payment}
🧾 TRX ID: ${trxid}
`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
    }),
  });

  if (screenshot) {
    const tgForm = new FormData();
    tgForm.append("chat_id", CHAT_ID);
    tgForm.append("photo", screenshot);
    tgForm.append("caption", text);

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      body: tgForm,
    });
  }

  return NextResponse.json({ success: true });
}
