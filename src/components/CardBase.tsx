import React from 'react';

interface CardBaseProps {
  title: string;
  description: string;
  children: React.ReactNode; // Konten yang ditampilkan di dalam card, seperti chart, gambar, atau teks
  height?: number; // Optional, digunakan jika ada konten yang membutuhkan ukuran tertentu, seperti chart
}

const CardBase: React.FC<CardBaseProps> = ({ title, description, children, height }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Card Header */}
      <div className="mb-4">
        <h5 className="text-xl font-bold text-gray-900">{title}</h5>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Card Body */}
      <div className="chart-canvas" style={height ? { height: `${height}px` } : {}}>
        {children}
      </div>
    </div>
  );
};

export default CardBase;
