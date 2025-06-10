// api untuk menampilakn jumlah terjual dan di post
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Motor from "@/models/Motor";

export async function GET() {
  try {
    await connectDB();

    const total = await Motor.countDocuments();
    const terjual = await Motor.countDocuments({ status: "Terjual" });
    const belumTerjual = await Motor.countDocuments({
      status: "Belum Terjual",
    });

    return NextResponse.json({ total, terjual, belumTerjual });
  } catch (error) {
    console.error("Gagal mengambil statistik:", error);
    return NextResponse.json(
      { error: "Gagal mengambil statistik" },
      { status: 500 }
    );
  }
}
