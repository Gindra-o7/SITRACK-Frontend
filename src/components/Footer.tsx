import React from "react";
import { Twitter, Instagram, Facebook } from "lucide-react";

const Footer: React.FC = () => {
  return (
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">SITRACK</h4>
              <p className="text-blue-200">
                Sistem Informasi Seminar Kerja Praktik Teknik Informatika
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Tentang
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-blue-200">
                <li>Email: ppid@uin-suska.ac.id</li>
                <li>Phone: 0761-562223</li>
                <li>Kampus Panam Jl. H.R. Soebrantas No. 155 Km 15, Simpang Baru, Tampan, Pekanbaru</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Social Media</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white">
                  <Facebook />
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <Instagram />
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <Twitter />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 SITRACK. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;