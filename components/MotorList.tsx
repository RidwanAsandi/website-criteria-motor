"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function FilteredProductCard() {
  const [motors, setMotors] = useState<Motor[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchMotors = async () => {
      try {
        const res = await fetch("/api/motor", { cache: "no-store" });
        const data = await res.json();
        setMotors(data);
      } catch (err) {
        console.error("Gagal fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMotors();
  }, []);

  // Filter otomatis saat query >= 2 huruf
  const filteredMotors =
    query.length >= 2
      ? motors.filter((motor) =>
          [motor._id, motor.merk, motor.nama]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : motors;

  return (
    <div className="p-2 md:p-4 w-full">
      <div className="flex justify-end mb-2 md:w-3/12">
        <input
          type="text"
          placeholder="Cari motor"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredMotors.length === 0 ? (
        <p>Tidak ada motor ditemukan.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredMotors.map((motor) => {
            const imageUrl =
              motor.gambar?.[0]?.url || "/assets/placeholder-motor.jpg";
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
                  Merk: {motor.merk}
                </p>
                <p className="w-full text-xs text-gray-500/70 truncate">
                  Km: {motor.jarak.toLocaleString()}
                </p>
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
        </div>
      )}
    </div>
  );
}
