import { FaMapMarkerAlt } from "react-icons/fa";

const AlamatKami = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Criteria Motor
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex items-start space-x-4">
            <FaMapMarkerAlt className="text-blue-600 text-2xl mt-1" />
            <div>
              
              <p className="text-gray-600">
                Jl. Margasatwa Gg. H Manin RT 005 RW OO3 Kel. Pondok Labu Kec.
                Cilandak Jakarta Selatan.
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md w-full md:w-2/3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.2811531589794!2d112.73533931432749!3d-7.317354274135601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbe5c39fabb7%3A0x84e4900b6b2e7f2e!2sSurabaya!5e0!3m2!1sen!2sid!4v1618923452769!5m2!1sen!2sid"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlamatKami;
