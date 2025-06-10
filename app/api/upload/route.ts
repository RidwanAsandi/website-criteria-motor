/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/upload/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("images") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  const uploadedImages: { url: string; public_id: string }[] = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());

    try {
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "motor-images" }, (err, result) => {
            if (err || !result) return reject(err);
            resolve(result);
          })
          .end(buffer);
      });

      uploadedImages.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return NextResponse.json(
        { error: "Upload gagal", detail: error },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ images: uploadedImages }, { status: 200 });
}
