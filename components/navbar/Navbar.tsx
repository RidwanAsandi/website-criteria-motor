"use client";

import Image from "next/image";
import { assets } from "@/assets/assets";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [isScroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]">
        <Image src={assets.header_bg_color} alt="" className="w-full" />
      </div>
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${
          isScroll ? "bg-white/50 backdrop-blur-lg shadow-sm " : ""
        }`}
      >
        <Link href="/">
          <h1 className="cursor-pointer mr-10 text-2xl font-bold">
            Criteria Motor
          </h1>
        </Link>
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${
            isScroll ? "" : "bg-white/50 shadow-sm "
          }`}
        >
          <li>
            <Link href="/" >
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/jenis-motor" >
              Jenis Motor
            </Link>
          </li>
          <li>
            <Link href="/alamat-kami">
              Alamat Kami
            </Link>
          </li>
          <li>
            <Link href="/kontak-kami">
              Kontak Kami
            </Link>
          </li>
        </ul>
        {session?.user ? (
          <div className="hidden lg:flex items-center gap-3 rounded-full font-serif">
            <span>{session.user.name}</span>
            <button
              onClick={() => signOut()}
              className="flex items-center px-8 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              <FiLogOut className="mr-2" /> Log Out
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-3 rounded-full">
            <Link
              className="flex items-center px-8 py-2 border border-gray-600 text-gray-800 rounded-lg hover:bg-gray-100 transition"
              href="/login"
            >
              <FiLogIn className="mr-2" /> Login
            </Link>
          </div>
        )}

        {/* tombol menu mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <Menu className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 h-screen bg-white flex flex-col items-center justify-center space-y-8 text-xl font-medium z-50 md:hidden"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4"
                aria-label="Close Menu"
              >
                <X className="w-8 h-8" />
              </button>
              <Link href="/" onClick={() => setOpen(false)}>
                Beranda
              </Link>
              <Link href="/jenis-motor" onClick={() => setOpen(false)}>
                Jenis Motor
              </Link>
              <Link href="/alamat-kami" onClick={() => setOpen(false)}>
                Alamat Kami
              </Link>
              <Link href="/kontak-kami" onClick={() => setOpen(false)}>
                Kontak Kami
              </Link>
              {session?.user ? (
                <>
                  <span className="text-lg">{session.user.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="flex justify-center items-center bg-red-500 text-white rounded-md hover:bg-red-600 transition py-3 px-4"
                  >
                    <FiLogOut className="mr-2" />
                    Log Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-4 border border-gray-600 text-gray-800 rounded-lg hover:bg-gray-100 transition"
                >
                  <FiLogIn className="mr-2" />
                  Login
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
