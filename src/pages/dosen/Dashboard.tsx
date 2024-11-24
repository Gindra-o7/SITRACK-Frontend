import React from "react";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

interface CardType {
    title: string;
    description: string;
    path: string;
}

const Dashboard: React.FC = () => {
    const cards: CardType[] = [
        {
            title: "Penilaian Seminar",
            description:
                "Berikan penilaian untuk mahasiswa yang telah melaksanakan seminar kerja praktik.",
            path: "/dosen/mahasiswa-seminar"
        },
        {
            title: "Mahasiswa Bimbingan",
            description:
                "Lihat daftar mahasiswa yang pernah dan sedang Anda bimbing dalam kerja praktik.",
            path: "/dosen/mahasiswa-bimbingan"
        },
        {
            title: "Riwayat",
            description:
                "Lihat daftar mahasiswa yang pernah dan sedang Anda bimbing dalam kerja praktik.",
            path: "/dosen/riwayat"
        }
    ];

    return (
        <div className="flex bg-gray-100">
            <div className="flex-1 overflow-auto">
                <main className="p-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold">Selamat Datang, Dr. Budi Santoso, M.Kom</h2>
                        <p className="text-gray-500 text-lg">
                            Anda memiliki 3 pengajuan berkas baru yang perlu divalidasi
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, index) => (
                            <Link to={card.path} key={index}>
                                <Card
                                    title={card.title}
                                    description={card.description}
                                />
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;