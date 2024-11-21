import React from "react";
import LoginForm from "../components/Login.Form.jsx";
import logo from "../assets/logoimage.png";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden md:flex md:w-1/2 bg-primary p-8 flex-col">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="SISKPTIF Logo" className="w-12 h-12" />
          <span className="text-white text-xl font-bold">SISKPTIF</span>
        </div>

        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-white text-5xl font-bold mb-4">Welcome to</h1>
          <p className="text-white text-xl">
            Sistem Informasi Seminar Kerja Praktik Teknik Informatika
          </p>
          <p className="text-white text-xl">UIN Sultan Syarif Kasim Riau</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
