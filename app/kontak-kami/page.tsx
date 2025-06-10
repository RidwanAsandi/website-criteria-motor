import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <div className="text-center pt-28">
        <h1 className="text-3xl font-bold mb-2">Hubungi Kami</h1>
        <p className="text-gray-600 mb-8">
          Tim kami siap membantu Anda. Hubungi kami melalui telepon, email, atau
          formulir di bawah.
        </p>
      </div>
      <div className="px-6 md:px-16 lg:px-32">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
