// app/api/motor/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Motor from "@/models/Motor";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    await connectDB();

    // Ambil field data motor dari formData
    const nama = formData.get("nama") as string;
    const merk = formData.get("merk") as string;
    const tahun = Number(formData.get("tahun"));
    const harga = Number(formData.get("harga"));
    const jenis = formData.get("jenis") as string;
    const warna = formData.get("warna") as string;
    const jarak = Number(formData.get("jarak"));
    const surat = formData.get("surat") as string; // "Lengkap", "BPKB", atau "STNK"
    const pajak = formData.get("pajak") as string; // "Hidup" atau "Mati"
    const status = formData.get("status") as string; // "Terjual" atau "Belum Terjual"

    // Ambil gambar (array of objek { url, public_id }),
    // Frontend harus mengirimkan field "images" sebagai JSON array!
    // Kita asumsikan frontend sudah mengirimkan field "images" bertipe JSON: [{url, public_id}, ...]
    const imagesJson = formData.get("images") as string;
    // Contoh: imagesJson = '[{"url":"https://...jpg","public_id":"motor-images/abc"}, ...]'
    let gambar: { url: string; public_id: string }[] = [];
    if (imagesJson) {
      gambar = JSON.parse(imagesJson);
    }

    // Validasi minimal satu gambar
    if (!gambar.length) {
      return NextResponse.json(
        { error: "Harus upload minimal satu gambar" },
        { status: 400 }
      );
    }

    // Simpan ke MongoDB
    const newMotor = new Motor({
      nama,
      merk,
      tahun,
      harga,
      jenis,
      warna,
      jarak,
      surat,
      pajak,
      status,
      gambar, // array of { url, public_id }
    });

    const saved = await newMotor.save();
    return NextResponse.json(
      { message: "Motor disimpan", motor: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error menyimpan motor:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data motor", detail: error },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "0");

    const motors = await Motor.find()
      .sort({ createdAt: -1 })
      .limit(limit > 0 ? limit : 100); // jika limit tidak dikirim, default 100

    return NextResponse.json(motors);
  } catch (error) {
    console.error("Error GET motor:", error);
    return NextResponse.json({ error: "Gagal fetch motor" }, { status: 500 });
  }
}
