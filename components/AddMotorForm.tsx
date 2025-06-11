/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddMotorForm() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [merk, setMerk] = useState("");
  const [tahun, setTahun] = useState("");
  const [harga, setHarga] = useState("");
  const [jenis, setJenis] = useState("");
  const [warna, setWarna] = useState("");
  const [jarak, setJarak] = useState("");
  const [surat, setSurat] = useState("Lengkap");
  const [pajak, setPajak] = useState("Hidup");
  const [status, setStatus] = useState("Belum Terjual");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFiles((prev) => [...prev, selected]);
      setPreviews((prev) => [...prev, URL.createObjectURL(selected)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Harap pilih minimal satu gambar");
      return;
    }

    setLoading(true);
    try {
      // 1) Upload ke Cloudinary
      const formUpload = new FormData();
      files.forEach((f) => formUpload.append("images", f));

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formUpload,
      });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error || "Upload gagal");
      }

      // uploadData.images === [{url, public_id}, ...]
      const imagesArray = uploadData.images as {
        url: string;
        public_id: string;
      }[];

      // 2) Submit data motor ke /api/motor
      const formMotor = new FormData();
      formMotor.append("nama", nama);
      formMotor.append("merk", merk);
      formMotor.append("tahun", tahun);
      formMotor.append("harga", harga);
      formMotor.append("jenis", jenis);
      formMotor.append("warna", warna);
      formMotor.append("jarak", jarak);
      formMotor.append("surat", surat);
      formMotor.append("pajak", pajak);
      formMotor.append("status", status);

      // Kirim JSON.stringify(imagesArray) ke field “images”
      formMotor.append("images", JSON.stringify(imagesArray));

      const motorRes = await fetch("/api/motor", {
        method: "POST",
        body: formMotor,
      });
      const motorData = await motorRes.json();

      if (!motorRes.ok) {
        throw new Error(motorData.error || "Gagal simpan motor");
      }

      alert("Motor berhasil disimpan");
      router.push("/dashboard/data-motor"); // atau path list motor Anda
    } catch (err: any) {
      console.error("Gagal menyimpan:", err);
      alert(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4"
    >
      <input
        type="text"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Merk"
        value={merk}
        onChange={(e) => setMerk(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Tahun"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Jenis"
        value={jenis}
        onChange={(e) => setJenis(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Warna"
        value={warna}
        onChange={(e) => setWarna(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Jarak (km)"
        value={jarak}
        onChange={(e) => setJarak(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      {/* Dropdown Surat */}
      <select
        value={surat}
        onChange={(e) => setSurat(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="Lengkap">Lengkap</option>
        <option value="BPKB">BPKB</option>
        <option value="STNK">STNK</option>
      </select>

      {/* Dropdown Pajak */}
      <select
        value={pajak}
        onChange={(e) => setPajak(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="Hidup">Hidup</option>
        <option value="Mati">Mati</option>
      </select>

      {/* Dropdown Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="Belum Terjual">Belum Terjual</option>
        <option value="Terjual">Terjual</option>
      </select>

      {/* Upload Gambar */}
      <div className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {/* Preview dan Hapus */}
        <div className="flex gap-2 overflow-x-auto p-5">
          {previews.map((src, i) => (
            <div key={i} className="relative">
              <Image
                src={src}
                alt={`preview-${i}`}
                width={80}
                height={80}
                className="object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(i)}
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan Motor"}
      </button>
    </form>
  );
}
