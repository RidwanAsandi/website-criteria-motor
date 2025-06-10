"use client";

import Image from "next/image";

export default function WhatsAppButton() {
  const phoneNumber = "6281234567890"; // ganti dengan nomor WA kamu (pakai kode negara tanpa +)
  const message = encodeURIComponent(
    "Halo, saya ingin bertanya tentang motor yang tersedia."
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div >
        <Image
          src="/assets/whatsapp-icon.png"
          alt="WhatsApp"
          width={180}
          height={180}
          className="w-14 h-14"
        />
      </div>
    </a>
  );
}
