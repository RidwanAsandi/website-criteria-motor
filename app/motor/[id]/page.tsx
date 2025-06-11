/* eslint-disable @typescript-eslint/no-explicit-any */
// app/motor/[id]/page.tsx

import { notFound } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery"; // <-- Import komponen baru
import { FaMotorcycle } from "react-icons/fa";
import {
  IoBookSharp,
  IoCalendarNumber,
  IoSpeedometerOutline,
} from "react-icons/io5";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { GiGearStickPattern } from "react-icons/gi";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const getMotorById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/motor/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  return res.json();
};

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // Pastikan ini sudah diperbaiki dari diskusi sebelumnya
  const motor = await getMotorById(id);
  if (!motor) return notFound();

  // Pastikan motor.gambar adalah array dan tidak null/undefined
  const imagesToDisplay: { url: string; public_id: string }[] =
    Array.isArray(motor.gambar) &&
    motor.gambar.every((img: any) => img && typeof img.url === "string")
      ? motor.gambar
      : [];

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto pt-16 md:pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-10">
          {/* Menggunakan komponen ImageGallery baru */}
          <ImageGallery
            images={imagesToDisplay.map((img) => img.url)}
            motorName={motor.nama}
          />
          {/* Akhir penggunaan ImageGallery */}

          <div className="space-y-1 px-3 md:mx-auto">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">{motor.nama}</h1>
              <h3 className="text-xl font-bold">
                Rp. {motor.harga.toLocaleString()}
              </h3>
              <p>{motor.status}</p>
            </div>
            <div className="flex justify-between ">
              <div className="descripsi-jenis-motor space-y-2">
                <div className="flex items-center gap-2">
                  <FaMotorcycle />
                  <p>Merk</p>
                </div>

                <div className="flex items-center gap-2">
                  <IoSpeedometerOutline />
                  <p>Jarak</p>
                </div>
                <div className="merk flex items-center gap-2">
                  <IoCalendarNumber />
                  <p>Tahun</p>
                </div>
                <div className="merk flex items-center gap-2">
                  <HiOutlineReceiptTax />
                  <p>Pajak</p>
                </div>
                <div className="merk flex items-center gap-2">
                  <IoBookSharp />
                  <p>Surat-surat</p>
                </div>
                <div className="merk flex items-center gap-2">
                  <GiGearStickPattern />
                  <p>Jenis</p>
                </div>
              </div>
              <div className="text-end space-y-2">
                <p>{motor.merk}</p>
                <p>{motor.jarak.toLocaleString()} km</p>
                <p>{motor.tahun}</p>
                <p>{motor.pajak}</p>
                <p>{motor.surat}</p>
                <p>{motor.jenis}</p>
              </div>
            </div>
            <div className="flex justify-center items-center p-4">
              <Link href="/kontak-kami">
                <button className="px-12 py-2.5 border rounded-lg text-white bg-gray-600 hover:bg-slate-50/90 hover:text-gray-600 transition">
                  Hubungi Kami
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 mt-16">
          <p className="text-3xl font-medium">
            Populer <span className="font-medium text-orange-600">Motor</span>
          </p>
          <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
        </div>
        <div className="px-6 md:px-16 lg:px-32">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
            <ProductCard limit={5} />
          </div>
          <div className="flex justify-center">
            <Link href="/jenis-motor">
              <button className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                See more
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
