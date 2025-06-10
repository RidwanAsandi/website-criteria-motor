"use client";

import Sidebar from "@/components/navbarDasboard/Sidebar";
import Navbar from "@/components/navbarDasboard/Navbar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex flex-col flex-1 bg-gray-100 ${
          isOpen ? "pl-64" : "pl-20"
        }`}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
