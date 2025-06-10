// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "MongoDB Connected!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "MongoDB connection failed" },
      { status: 500 }
    );
  }
}
