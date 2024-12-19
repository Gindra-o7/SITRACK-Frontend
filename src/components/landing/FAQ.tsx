import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1, 2, 3]); // All items open by default

  const faqs: FAQItem[] = [
    {
      question: "Apa saja syarat pendaftaran seminar KP?",
      answer:
          "Syarat pendaftaran meliputi telah menyelesaikan KP, memiliki laporan KP yang telah disetujui pembimbing, dan telah mengumpulkan semua dokumen yang diperlukan.",
    },
    {
      question: "Berapa lama proses verifikasi pendaftaran?",
      answer:
          "Proses verifikasi pendaftaran biasanya memakan waktu 2-3 hari kerja setelah semua dokumen lengkap.",
    },
    {
      question: "Bagaimana cara mengubah jadwal seminar?",
      answer:
          "Perubahan jadwal seminar dapat diajukan melalui sistem dengan menyertakan alasan yang jelas dan menunggu persetujuan dari koordinator KP.",
    },
    {
      question: "Apa format file yang diterima untuk upload dokumen?",
      answer:
          "Sistem menerima file dalam format PDF dengan ukuran maksimal 5MB per file.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndexes((prevIndexes) =>
        prevIndexes.includes(index)
            ? prevIndexes.filter((i) => i !== index)
            : [...prevIndexes, index]
    );
  };

  return (
      <div id="faq" className="my-32 w-full px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            FAQ Tentang Pendaftaran Seminar KP
          </h2>
          <p className="text-gray-600">
            Temukan jawaban atas pertanyaan umum terkait proses pendaftaran seminar
            Kerja Praktik (KP).
          </p>
        </div>
        <div className="mx-auto w-full max-w-4xl divide-y divide-black/20 rounded-xl bg-gray-50">
          {faqs.map((faq: FAQItem, index: number) => {
            const isOpen = openIndexes.includes(index);

            return (
                <div className="p-6" key={index}>
                  <button
                      onClick={() => toggleItem(index)}
                      className="group flex w-full items-center justify-between"
                  >
                <span className="text-md/6 font-semibold text-black group-hover:text-black/80">
                  {faq.question}
                </span>
                    <ChevronDown
                        className={`h-5 w-5 fill-white/60 group-hover:fill-white/50 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  <div
                      className={`mt-2 text-sm text-black transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? "h-auto opacity-100" : "h-0 opacity-0"
                      }`}
                  >
                    {faq.answer}
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default FAQ;