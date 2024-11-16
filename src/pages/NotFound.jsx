import React from "react";
import { useNavigate } from "react-router-dom";
import NotFound_logo from "../assets/404.png";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center bg-gradient-to-br from-blue-50 to-white justify-center min-h-screen flex-col">
      <img src={NotFound_logo} alt="404" className="h-80" />
      <h1 className="font-bold text-4xl">Page not found</h1>
      <h2 className="pt-3 text-sm text-gray-500 px-10 text-center">
        Oops! Looks like you followed a bad link. If you think this is a problem
        with us, please tell us.
      </h2>
      <button
        className="bg-primary text-white px-8 py-3 rounded-lg mt-5"
        onClick={handleBackToHome}
      >
        Kembali
      </button>
    </div>
  );
};

export default NotFound;
