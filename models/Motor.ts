import mongoose, { Document, Model } from "mongoose";

interface IGambar {
  url: string;
  public_id: string;
}

export interface IMotor extends Document {
  nama: string;
  merk: string;
  tahun: number;
  harga: number;
  jenis: string;
  warna: string;
  jarak: number;
  surat: "Lengkap" | "BPKB" | "STNK";
  pajak: "Hidup" | "Mati";
  status: "Terjual" | "Belum Terjual";
  gambar: IGambar[]; // ← Array of objek { url, public_id }
}

const GambarSchema = new mongoose.Schema<IGambar>(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { _id: false } // _id: false agar tiap sub-dokumen tidak punya _id sendiri
);

const MotorSchema = new mongoose.Schema<IMotor>(
  {
    nama: { type: String, required: true },
    merk: { type: String, required: true },
    tahun: { type: Number, required: true },
    harga: { type: Number, required: true },
    jenis: { type: String, required: true },
    warna: { type: String, required: true },
    jarak: { type: Number, required: true },
    surat: {
      type: String,
      enum: ["Lengkap", "BPKB", "STNK"],
      default: "Lengkap",
    },
    pajak: { type: String, enum: ["Hidup", "Mati"], default: "Hidup" },
    status: {
      type: String,
      enum: ["Terjual", "Belum Terjual"],
      default: "Belum Terjual",
    },
    gambar: { type: [GambarSchema], default: [] }, // simpan array of { url, public_id }
  },
  { timestamps: true }
);

const Motor: Model<IMotor> =
  mongoose.models.Motor || mongoose.model("Motor", MotorSchema);
export default Motor;
