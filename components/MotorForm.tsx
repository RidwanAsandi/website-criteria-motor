"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageInput {
  file: File | null;
  preview: string | null;
}

export default function MotorForm() {
  const [nama, setNama] = useState("");
  const [merk, setMerk] = useState("");
  const [tahun, setTahun] = useState("");
  const [harga, setHarga] = useState("");
  const [images, setImages] = useState<ImageInput[]>([
    { file: null, preview: null },
  ]);
  const [jenis, setJenis] = useState("");
  const [warna, setWarna] = useState("");
  const [jarak, setJarak] = useState("");
  const [surat, setSurat] = useState("");
  const [pajak, setPajak] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const MAX_SIZE_MB = 2;

  const handleFileChange = (index: number, file: File) => {
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Ukuran gambar maksimal ${MAX_SIZE_MB}MB`);
      return;
    }

    const newImages = [...images];
    newImages[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setImages(newImages);
  };

  const addImageInput = () => {
    setImages([...images, { file: null, preview: null }]);
  };

  const removeImageInput = (index: number) => {
    const newImages = [...images];
    // Hapus preview dari memory
    if (newImages[index].preview) {
      URL.revokeObjectURL(newImages[index].preview!);
    }
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const resetForm = () => {
    // Revoke semua preview dari memory
    images.forEach((img) => {
      if (img.preview) URL.revokeObjectURL(img.preview);
    });

    setNama("");
    setMerk("");
    setTahun("");
    setHarga("");
    setImages([{ file: null, preview: null }]);
    setJenis("");
    setWarna("");
    setJarak("");
    setSurat("");
    setPajak("");
    setStatus("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    images.forEach((img) => {
      if (img.file) formData.append("images", img.file);
    });

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const { urls } = await uploadRes.json();

    const motorRes = await fetch("/api/motor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        merk,
        tahun: Number(tahun),
        harga: Number(harga),
        jenis,
        warna,
        jarak: Number(jarak),
        surat,
        pajak,
        status,
        gambar: urls,
      }),
    });

    const result = await motorRes.json();
    console.log("Motor saved:", result);

    // Reset form
    resetForm();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Nama"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <input
        type="text"
        placeholder="Merk"
        value={merk}
        onChange={(e) => setMerk(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <input
        type="number"
        placeholder="Tahun"
        value={tahun}
        onChange={(e) => setTahun(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <input
        type="number"
        placeholder="Harga"
        value={harga}
        onChange={(e) => setHarga(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <input
        type="text"
        placeholder="Jenis"
        onChange={(e) => setJenis(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <input
        type="text"
        placeholder="Warna"
        onChange={(e) => setWarna(e.target.value)}
        className="w-full p-2 border"
        required
      />
      <input
        type="number"
        placeholder="Jarak Tempuh (km)"
        onChange={(e) => setJarak(e.target.value)}
        className="w-full p-2 border"
        required
      />

      <select
        onChange={(e) => setSurat(e.target.value)}
        className="w-full p-2 border"
        required
      >
        <option value="">Surat-surat</option>
        <option value="lengkap">Lengkap</option>
        <option value="tidak lengkap">Tidak Lengkap</option>
      </select>

      <select
        onChange={(e) => setPajak(e.target.value)}
        className="w-full p-2 border"
        required
      >
        <option value="">Status Pajak</option>
        <option value="hidup">Hidup</option>
        <option value="mati">Mati</option>
      </select>

      <select
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-2 border"
        required
      >
        <option value="">Status Motor</option>
        <option value="belum terjual">Belum Terjual</option>
        <option value="terjual">Terjual</option>
      </select>

      <div className="space-y-2">
        {images.map((img, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && handleFileChange(i, e.target.files[0])
              }
              className="w-full"
            />
            {img.preview && (
              <Image
                height={80}
                width={80}
                src={img.preview}
                alt={`preview-${i}`}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <button
              type="button"
              onClick={() => removeImageInput(i)}
              className="text-red-500 text-sm"
            >
              Hapus
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addImageInput}
          className="text-blue-600 text-sm underline"
        >
          + Tambah Gambar
        </button>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Mengunggah..." : "Simpan Motor"}
      </button>
    </form>
  );
}
