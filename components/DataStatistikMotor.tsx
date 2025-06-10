"use client";

import { useEffect, useState } from "react";

export default function DataStatistikMotor() {
  const [stats, setStats] = useState({
    total: 0,
    terjual: 0,
    belumTerjual: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/motor/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Gagal mengambil statistik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="">
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total */}
          <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-700">Total Motor</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>

          {/* Terjual */}
          <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
            <h2 className="text-lg font-semibold text-gray-700">
              Motor Terjual
            </h2>
            <p className="text-3xl font-bold text-green-600">{stats.terjual}</p>
          </div>

          {/* Belum Terjual */}
          <div className="bg-white shadow rounded-lg p-6 border-l-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-700">
              Belum Terjual
            </h2>
            <p className="text-3xl font-bold text-red-600">
              {stats.belumTerjual}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
