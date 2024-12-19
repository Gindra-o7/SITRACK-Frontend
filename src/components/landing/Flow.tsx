import React from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

const Flow: React.FC = () => {
  const steps: Step[] = [
    {
      number: "1",
      title: "Registrasi Akun",
      description: "Daftar dan lengkapi profil mahasiswa",
    },
    {
      number: "2",
      title: "Upload Dokumen",
      description: "Unggah persyaratan yang dibutuhkan",
    },
    {
      number: "3",
      title: "Verifikasi",
      description: "Tunggu verifikasi dari admin",
    },
    {
      number: "4",
      title: "Jadwal Seminar",
      description: "Dapatkan jadwal seminar",
    },
  ];

  return (
      <div id="flow" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Alur Pendaftaran
            </h2>
            <p className="text-gray-600">
              Ikuti langkah-langkah berikut untuk mendaftar seminar KP
            </p>
          </div>

          <div className="flex flex-col items-center md:flex-row justify-between">
            {steps.map((step, index) => (
                <div key={index} className="flex-1 relative mb-8 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center text-xl font-bold mb-4 z-10">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-center">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-blue-200"></div>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Flow;