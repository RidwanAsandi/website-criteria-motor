/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs"; // Pastikan Anda menginstal 'bcryptjs'
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 409 } // Conflict
      );
    }

    const hashedPassword = await hash(password, 10); // Hash password
    await User.create({ email, password: hashedPassword });

    return NextResponse.json(
      { message: "Registrasi berhasil" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during registration API:", error);
    // Lebih generik untuk produksi, lebih detail untuk pengembangan
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat registrasi: " + error.message },
      { status: 500 }
    );
  }
}
