// middleware.ts
import { withAuth } from "next-auth/middleware"; // Import dari next-auth/middleware

// Export default dari withAuth
export default withAuth(
  // Middleware akan me-redirect ke halaman sign-in jika belum terautentikasi
  // Logika tambahan bisa ditambahkan di sini, mirip dengan v5
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function middleware(req) {
    // Contoh: Jika Anda perlu mengakses token atau session
    // const token = req.nextauth.token;
    // console.log("Middleware token:", token);
  },
  {
    // Konfigurasi ini sama dengan v5
    callbacks: {
      authorized: ({ token }) => {
        // Mengembalikan true jika ada token (user terautentikasi)
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // Pastikan ini cocok dengan halaman login Anda
    },
  }
);

// Tentukan path mana yang akan dilindungi oleh middleware
export const config = {
  matcher: ["/dashboard/:path*", "/register/:path*"], // Lindungi semua path di bawah /dashboard dan /api/protected
};
