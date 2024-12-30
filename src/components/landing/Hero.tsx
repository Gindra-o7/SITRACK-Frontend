import React from "react";
import { Marqueee } from "../Marqueee";
import TypingAnimation from "../ui/typing-animation.tsx";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  return (
    <div id="home" className="py-28 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-12">
          {/* Bagian kiri dengan judul dan deskripsi */}
          <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
            <h4 className="text-left mb-2">
              {/* Gunakan TypingAnimation dengan ukuran responsif */}
              <TypingAnimation 
                className="text-4xl md:text-6xl font-bold text-black dark:text-white leading-[3rem] md:leading-[5rem] tracking-[-0.02em]" // Ukuran responsif
                text="Sistem Informasi Seminar Kerja Praktik Teknik Informatika"
              />
            </h4>
            <p className="text-base md:text-lg text-gray-600 mb-8">
              Platform digital untuk mendaftar dan mengelola seminar kerja
              praktik dengan mudah, cepat, dan efisien.
            </p>
          </div>

          {/* Bagian kanan untuk Marqueee */}
          <div className="md:w-1/2 w-full h-70 md:h-[500px] bg-white mb-8 md:mb-0 flex items-center justify-center">
            <Marqueee />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
