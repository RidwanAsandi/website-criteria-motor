"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Gambar = {
  url: string;
  public_id: string;
};

type Motor = {
  _id: string;
  nama: string;
  merk: string;
  harga: number;
  status: string;
  gambar: Gambar[];
};

export default function MotorTable() {
  const [motors, setMotors] = useState<Motor[]>([]);
  const router = useRouter();

  const fetchMotors = async () => {
    try {
      const res = await fetch("/api/motor");
      const data = await res.json();
      setMotors(data);
    } catch (err) {
      console.error("Gagal fetch motor:", err);
    }
  };

  useEffect(() => {
    fetchMotors();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus motor ini?")) return;
    try {
      const res = await fetch(`/api/motor/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMotors((prev) => prev.filter((m) => m._id !== id));
      } else {
        console.error("Gagal hapus motor");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        {/* tampilan desktop dan laptop */}
        <thead>
          <tr className="bg-gray-100 hidden md:grid md:grid-cols-6">
            <th className="py-2 px-4">Gambar</th>
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Merk</th>
            <th className="py-2 px-4">Harga</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        {/* tampilan mobile */}
        <thead>
          <tr className="bg-gray-100 text-xs md:hidden">
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Merk</th>
            <th className="py-2 px-4">Harga</th>
            <th className="py-2 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {motors.length === 0 && (
            <tr>
              <td colSpan={6} className="py-4 text-center text-gray-500">
                Belum ada data motor.
              </td>
            </tr>
          )}
          {/* tampilan dekstop */}
          {motors.map((motor) => (
            <tr
              key={motor._id}
              className="border-t hidden md:grid md:grid-cols-6 text-center items-center"
            >
              <td className="py-2 px-2 flex justify-center items-center">
                {motor.gambar[0]?.url && (
                  <Image
                    src={motor.gambar[0].url}
                    alt={motor.nama}
                    width={80}
                    height={60}
                    className="object-cover rounded"
                  />
                )}
              </td>
              <td className="py-2 px-4">{motor.nama}</td>
              <td className="py-2 px-4">{motor.merk}</td>
              <td className="py-2 px-4">Rp {motor.harga.toLocaleString()}</td>
              <td className="py-2 px-4">{motor.status}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() =>
                    router.push(`/dashboard/motor/edit/${motor._id}`)
                  }
                  className="px-2 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(motor._id)}
                  className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {/* tampilan mobile */}
          {motors.map((motor) => (
            <tr
              key={motor._id}
              className="border-t md:hidden text-center text-xs"
            >
              <td className="py-2 px-4">{motor.nama}</td>
              <td className="py-2 px-4">{motor.merk}</td>
              <td className="py-2 px-4">Rp {motor.harga.toLocaleString()}</td>
              <td className="py-2 px-4 space-x-2 flex">
                <button
                  onClick={() =>
                    router.push(`/dashboard/motor/edit/${motor._id}`)
                  }
                  className="px-2 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(motor._id)}
                  className="px-2 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
