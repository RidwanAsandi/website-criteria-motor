"use client";

import toast from "react-hot-toast";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkedAlt,
  FaInstagramSquare,
  FaFacebookSquare,
} from "react-icons/fa";

const ContactSection = () => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "5fd846b1-8462-4f29-a1a9-0cd0335eace6",
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    const result = await response.json();
    if (result.success) {
      toast.success("Pesan berhasil terkirim!");

      // Mengosongkan form setelah submit berhasil
      form.reset();
    } else {
      // Menampilkan toast jika ada error
      toast.error("Gagal mengirim pesan. Coba lagi.");
    }
  }

  return (
    <section className="bg-white py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Informasi Kontak */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-gray-600 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-700 text-lg">Telepon</h4>
                <p className="text-gray-600">+62 812 3456 7890</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-gray-600 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-700 text-lg">Email</h4>
                <p className="text-gray-600">info@motorku.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaInstagramSquare className="text-gray-600 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-700 text-lg">
                  Instagram
                </h4>
                <p className="text-gray-600">info@motorku.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaFacebookSquare className="text-gray-600 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-700 text-lg">
                  Facebook
                </h4>
                <p className="text-gray-600">info@motorku.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaMapMarkedAlt
                size={50}
                className="text-gray-600 text-2xl mt-1"
              />
              <div>
                <h4 className="font-semibold text-gray-700 text-lg">Alamat</h4>
                <p className="text-gray-600">
                  Jl. Margasatwa Gg. H Manin RT 005 RW OO3 Kel. Pondok Labu Kec.
                  Cilandak Jakarta Selatan.
                </p>
              </div>
            </div>
          </div>

          {/* Form Kontak */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 p-6 rounded-xl shadow space-y-4"
          >
            <div>
              <label className="block text-gray-700">Nama</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Nama Anda"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="email@domain.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Pesan</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tulis pesan Anda..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
