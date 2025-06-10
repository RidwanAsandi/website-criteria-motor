import Footer from "@/components/Footer";
import MotorList from "@/components/MotorList";
import Navbar from "@/components/navbar/Navbar";

const JenisMotorPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center pt-28">
        <h1 className="text-3xl font-bold">Jenis Motor</h1>
      </div>
      <div className="px-6 md:px-16 lg:px-32">
        <MotorList />
      </div>
      <Footer />
    </>
  );
};

export default JenisMotorPage;
