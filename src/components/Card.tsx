import React from "react";
import { PenLine, ChevronRight } from 'lucide-react';

interface CardProps {
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded flex items-center justify-center">
                    <PenLine className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-bold">{title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <button className="text-black-400 font-bold flex items-center gap-1">
                Details<ChevronRight className="w-4 h-4"/>
            </button>
        </div>
    );
};

export default Card;