"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaMotorcycle, FaTachometerAlt, FaBars, FaTable } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false); // <-- solusi utama

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    {
      href: "/dashboard/add-motor",
      label: "Tambah Motor",
      icon: <FaTable />,
    },
    {
      href: "/dashboard/data-motor",
      label: "Data Motor",
      icon: <FaMotorcycle />,
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    setMounted(true); // now we know we're on the client
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsOpen]);

  if (!mounted) return null; // prevent mismatch

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 bg-gray-800 text-white z-50 ${
        isOpen ? "w-64" : "w-14"
      } transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className={`text-lg font-bold ${!isOpen && "hidden"}`}>Admin</h1>
        {!isMobile && (
          <button onClick={() => setIsOpen(!isOpen)}>
            <FaBars />
          </button>
        )}
      </div>
      <nav className="flex flex-col space-y-2 mt-6">
        {links.map(({ href, label, icon }) => (
          <Link key={href} href={href}>
            <div
              className={`flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer ${
                pathname === href ? "bg-gray-700" : ""
              }`}
            >
              <span className="text-xl">{icon}</span>
              {isOpen && <span className="ml-4">{label}</span>}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
