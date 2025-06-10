// components/ImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  motorName: string;
}

export default function ImageGallery({ images, motorName }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState<string>(
    images.length > 0 ? images[0] : ""
  );

  const handleThumbnailClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  return (
    <div className="px-5">
      {/* Gambar Utama */}
      {/* Container untuk gambar utama dengan tinggi tetap dan posisi relatif */}
      <div className="relative w-full h-[250px] md:h-[300px] rounded-lg mb-4 overflow-hidden bg-gray-100 flex items-center justify-center shadow-md">
        {currentImage &&
        typeof currentImage === "string" &&
        currentImage !== "" ? (
          <Image
            src={currentImage}
            alt={motorName}
            fill // Menggunakan layout="fill" agar gambar mengisi container
            style={{ objectFit: "contain" }} // Atau 'cover' tergantung preferensi Anda
            className="mix-blend-multiply" // Terapkan kelas di sini jika perlu
            priority
          />
        ) : (
          <p className="text-gray-500">Tidak ada gambar utama</p>
        )}
      </div>

      {/* Thumbnail Gambar */}
      <div className="grid grid-cols-4 gap-4">
        {images.map(
          (imageUrl: string, index: number) =>
            imageUrl &&
            typeof imageUrl === "string" &&
            imageUrl !== "" && (
              <div
                className={`cursor-pointer rounded-lg overflow-hidden bg-gray-500/10 relative w-16 h-16 ${
                  // Tambahkan tinggi tetap untuk thumbnail
                  imageUrl === currentImage
                    ? "border-2 border-gray-600 shadow-lg"
                    : ""
                }`}
                key={index}
                onClick={() => handleThumbnailClick(imageUrl)}
              >
                <Image
                  src={imageUrl}
                  alt={`${motorName} Thumbnail ${index + 1}`}
                  fill // Gunakan fill untuk thumbnail juga agar konsisten
                  style={{ objectFit: "cover" }} // Thumbnail seringkali menggunakan 'cover'
                  className="mix-blend-multiply"
                  sizes="100px" // Ukuran estimasi untuk thumbnail
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
