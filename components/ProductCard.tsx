"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// export const dynamic = "force-dynamic"; // Tidak diperlukan di Client Component

type Motor = {
  _id: string;
  nama: string;
  merk: string;
  tahun: number;
  harga: number;
  jenis: string;
  gambar: { url: string; public_id: string }[];
  jarak: number;
  surat: string;
  pajak: string;
  status: string;
};

// Tambahkan prop `limit` jika Anda ingin mengontrol jumlah kartu
interface ProductCardProps {
  id?: string;
  limit?: number; // Prop baru untuk membatasi jumlah motor yang ditampilkan
}

const ProductCard = ({ id, limit }: ProductCardProps) => {
  const [motors, setMotors] = useState<Motor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotors = async () => {
      try {
        setLoading(true);
        let url = "";

        if (id) {
          url = `/api/motor/${id}`;
        } else {
          // Jika tidak ada ID, tambahkan parameter limit ke URL API
          url = `/api/motor${limit ? `?limit=${limit}` : ""}`; // Menambahkan limit jika ada
        }

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          // Tangani error jika res.ok false (misal, 404, 500)
          console.error(
            `Gagal fetch motor dari ${url}:`,
            res.status,
            res.statusText
          );
          setMotors([]); // Kosongkan motors jika gagal
          return;
        }

        const data = await res.json();
        if (id) {
          setMotors([data]); // Masukkan ke array supaya bisa pakai map()
        } else {
          setMotors(data);
        }
      } catch (error) {
        console.error("Gagal fetch motor:", error);
        setMotors([]); // Kosongkan motors jika error
      } finally {
        setLoading(false);
      }
    };

    fetchMotors();
  }, [id, limit]); // Tambahkan `limit` ke dependency array

  if (loading) return <p>Loading...</p>;

  // Jika tidak ada motor yang ditemukan
  if (motors.length === 0 && !loading) {
    if (id) {
      return <p>Motor dengan ID tidak ditemukan.</p>;
    } else {
      return <p>Tidak ada motor yang tersedia.</p>;
    }
  }

  return (
    <>
      {motors.map((motor) => {
        // Pengecekan ekstra untuk gambar. Pastikan gambar[0] tidak undefined/null/empty string
        const imageUrl =
          Array.isArray(motor.gambar) &&
          motor.gambar.length > 0 &&
          motor.gambar[0].url
            ? motor.gambar[0].url
            : "/assets/placeholder-motor.jpg";

        return (
          <div
            key={motor._id}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full"
          >
            <div className="cursor-pointer group relative w-full h-40 flex items-center justify-center">
              <Link href={`/motor/${motor._id}`}>
                <Image
                  src={imageUrl}
                  alt={motor.nama}
                  // Gunakan fill dan atur container jika Anda ingin ukuran gambar tetap
                  // Atau gunakan width/height jika Anda sudah yakin dengan rasio aspek gambar
                  // Untuk kasus ini, saya mengikuti width/height yang sudah ada.
                  width={800}
                  height={800}
                  className="group-hover:scale-105 transition object-cover h-4/5 md:w-full md:h-full"
                />
              </Link>
            </div>
            <p className="md:text-base font-medium pt-2 w-full truncate">
              {motor.nama}
            </p>
            <p className="w-full text-xs text-gray-500/70 truncate">
              Km: {motor.jarak.toLocaleString()} {/* Format angka jarak */}
            </p>
            <p className="w-full text-xs text-gray-500/70 truncate">Second</p>
            <p className="text-xs font-semibold text-gray-600">
              {motor.status === "Terjual" ? "Terjual" : "Belum Terjual"}
            </p>
            <div className="flex items-end justify-between w-full mt-1">
              <p className="text-base font-medium">
                Rp. {motor.harga.toLocaleString()}
              </p>
              <Link href={`/motor/${motor._id}`}>
                <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-gray-600 hover:text-white transition">
                  Visit
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
