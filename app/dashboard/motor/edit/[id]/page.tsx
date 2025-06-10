"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function EditMotorPage() {
  const { id } = useParams();
  const router = useRouter();
  const [motor, setMotor] = useState<Motor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotor = async () => {
      try {
        const res = await fetch(`/api/motor/${id}`);
        const data = await res.json();
        setMotor(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMotor();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!motor) return;
    const { name, value } = e.target;
    setMotor({ ...motor, [name]: name === "harga" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/motor/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(motor),
      });
      if (res.ok) {
        alert("Motor berhasil diperbarui!");
        router.push("/dashboard/data-motor");
      } else {
        alert("Gagal memperbarui motor");
      }
    } catch (error) {
      console.error("Gagal update:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!motor) return <p>Data tidak ditemukan</p>;

  return (
    <div className="max-w-xl ">
      <h1 className="text-2xl font-bold mb-6">Edit Motor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama</label>
          <input
            type="text"
            name="nama"
            value={motor.nama}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Merk</label>
          <input
            type="text"
            name="merk"
            value={motor.merk}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Harga</label>
          <input
            type="number"
            name="harga"
            value={motor.harga}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={motor.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="Belum Terjual">Belum Terjual</option>
            <option value="Terjual">Terjual</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
