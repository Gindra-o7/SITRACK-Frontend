import React from "react";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

type CardData = {
    title: string;
    description: string;
    path: string;
};

const Dashboard: React.FC = () => {
    const cards: CardData[] = [
        {
            title: "Upload Kebutuhan Dokumen Seminar",
            description:
                "Silakan ajukan dokumen untuk validasi kelengkapan dalam pelaksanaan menuju pendaftaran seminar hasil kerja praktik.",
            path: "/mahasiswa/pengajuan",
        },
        {
            title: "Status Seminar KP",
            description: "Ayo lihat status pengajuan seminar kerja praktik anda.",
            path: "/mahasiswa/status",
        },
    ];

    return (
        <div className="flex bg-gray-100">
            <div className="flex-1 overflow-auto">
                <main>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold">Halo, Gilang Ramadhan Indra</h2>
                        <p className="text-gray-500 text-lg">Ingin melakukan apa hari ini?</p>
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
