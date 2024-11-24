import React from "react";
import Button from "./Button";
import PicHero from "../assets/hero.svg";

interface HeroProps {

}

const Hero: React.FC<HeroProps> = () => {
  return (
      <div
          id="home"
          className="py-48 bg-gradient-to-br from-blue-50 to-white"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Sistem Informasi Seminar Kerja Praktik Teknik Informatika
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Platform digital untuk mendaftar dan mengelola seminar kerja
                praktik dengan mudah, cepat, dan efisien.
              </p>
              <div className="flex space-x-4">
                <button className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
              <img src={PicHero} alt="Hero" className="w-full" />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Hero;