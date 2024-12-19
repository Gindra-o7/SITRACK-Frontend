import React from "react";
import { useNavigate } from "react-router-dom";
import Forbidden_logo from "../assets/forbidden.png";

// Type declaration for PNG import
declare module "*.png" {
  const value: string;
}

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = (): void => {
    navigate("/");
  };

  return (
      <div className="flex items-center bg-gradient-to-br from-red-50 to-white justify-center min-h-screen flex-col">
        <img src={Forbidden_logo} alt="403" className="h-80" />
        <h1 className="font-bold text-4xl">Akses Ditolak</h1>
        <h2 className="pt-3 text-sm text-gray-500 px-10 text-center">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.
          Silakan hubungi administrator jika Anda merasa ini adalah kesalahan.
        </h2>
        <button
            className="bg-primary text-white px-8 py-3 rounded-lg mt-5"
            onClick={handleBackToHome}
        >
          Kembali ke Beranda
        </button>
      </div>
  );
};

export default Forbidden;