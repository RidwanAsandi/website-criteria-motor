import Footer from "@/components/Footer";
import HeaderSlider from "@/components/HeaderSlider";
import HomeMotor from "@/components/HomeMotor";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeMotor />
      </div>
      <Footer />
    </>
  );
}
