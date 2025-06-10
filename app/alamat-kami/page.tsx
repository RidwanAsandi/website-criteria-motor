import AlamatKami from "@/components/AlamatKami";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center pt-28">
        <h1 className="text-3xl font-bold mb-2">Alamat Kami</h1>
        <p className="text-gray-600 mb-8">
          Anda bisa langsung datang ke kantor kami pada jam operasional untuk
          informasi lebih lanjut.
        </p>
      </div>
      <div className="px-6 md:px-16 lg:px-32">
        <AlamatKami />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
