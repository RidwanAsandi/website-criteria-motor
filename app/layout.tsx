import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import WhatsAppButton from "@/components/whatsAppButton";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins", // opsional untuk CSS variable
});

export const metadata: Metadata = {
  title: "Criteria Motor",
  description: "Temuka motor yang berkualitas bersama kami.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <Toaster position="top-right" />
        <Providers>
          {children}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
