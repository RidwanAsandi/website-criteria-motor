/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      toast.error("Email dan password wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/registrasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registrasi berhasil! Mengarahkan ke halaman login...");
        router.push("/login");
      } else {
        const errorMessage = data.error || "Gagal mendaftar";
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Registrasi gagal:", data);
      }
    } catch (err: any) {
      console.error("Error saat registrasi:", err);
      setError("Terjadi kesalahan jaringan.");
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 text-sm">
            Join us and start managing now
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 text-center">{error}</div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Mendaftar..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="text-green-600 hover:underline font-medium"
          >
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
}
