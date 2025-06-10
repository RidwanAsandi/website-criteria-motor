/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//Untuk GET (by id), PUT (update), DELETE
// app/api/motor/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Motor from "@/models/Motor";
import cloudinary from "@/lib/cloudinary";

export const dynamicParams = true; // Ini adalah solusi utama

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, any> } // ✅ Perbaikan di sini
) {
  await connectDB();
  const id = params.id;

  try {
    const motor = await Motor.findById(id);
    if (!motor)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(motor);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Record<string, any> } // ✅ Perbaikan di sini
) {
  await connectDB();
  const id = params.id;
  const data = await req.json();

  try {
    const updated = await Motor.findByIdAndUpdate(id, data, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Record<string, any> } // ✅ Perbaikan di sini
) {
  try {
    await connectDB();
    const id = params.id;
    const motor = await Motor.findById(id);

    if (!motor) {
      return NextResponse.json(
        { error: "Motor tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus semua gambar di Cloudinary
    for (const gbr of motor.gambar) {
      if (gbr.public_id) {
        await cloudinary.uploader.destroy(gbr.public_id);
      }
    }

    // Hapus data motor
    await Motor.findByIdAndDelete(id);

    return NextResponse.json({ message: "Motor dihapus" });
  } catch (error) {
    console.error("Error menghapus motor:", error);
    return NextResponse.json(
      { error: "Gagal menghapus motor", detail: error },
      { status: 500 }
    );
  }
}
