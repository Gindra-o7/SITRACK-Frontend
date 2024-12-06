import React from "react";
import { ChevronRight, LucideIcon } from "lucide-react";

export interface CardData {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
}

const Card: React.FC<CardData> = ({ title, description, path, icon: Icon }) => {
  return (
    <a
      href={path}
      className="block bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] hover:border-blue-600"
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center justify-center p-3 bg-blue-50 rounded-full transition-colors duration-300 hover:bg-blue-100 group">
          <Icon className="w-6 h-6 text-black transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex items-center gap-1 text-black-400 font-bold">
        Details
        <ChevronRight className="w-4 h-4" />
      </div>
    </a>
  );
};

export default Card;
