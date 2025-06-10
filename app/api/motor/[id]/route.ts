/* eslint-disable @typescript-eslint/no-unused-vars */
//Untuk GET (by id), PUT (update), DELETE
// app/api/motor/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Motor from "@/models/Motor";
import cloudinary from "@/lib/cloudinary";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { id } = await params;

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
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = await params;
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
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id: motorId } = await context.params;
    const motor = await Motor.findById(motorId);

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
    await Motor.findByIdAndDelete(motorId);

    return NextResponse.json({ message: "Motor dihapus" });
  } catch (error) {
    console.error("Error menghapus motor:", error);
    return NextResponse.json(
      { error: "Gagal menghapus motor", detail: error },
      { status: 500 }
    );
  }
}
