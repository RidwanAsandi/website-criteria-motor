// components/Navbar.tsx
"use client";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => (
  <div className="bg-white shadow-md pl-4 pr-6 py-4 flex justify-between items-center">
    <h2 className="font-bold text-lg">Dashboard</h2>
    <button
      onClick={() => signOut({ callbackUrl: "/login" })} // Redirect ke halaman login setelah logout
      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      <FiLogOut className="mr-2" /> Log Out
    </button>
  </div>
);

export default Navbar;
