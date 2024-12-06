import React from "react";

interface BaseProps {
  value: string;
}

interface BasicStat extends BaseProps {
  variant: "basic";
  label: string;
}

interface DetailedStat extends BaseProps {
  variant: "detailed";
  title: string;
  description: string;
}

type StatProps = BasicStat | DetailedStat;

const CardStat: React.FC<StatProps> = (props) => {
  if (props.variant === "basic") {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="text-3xl font-bold text-blue-600">{props.value}</div>
        <div className="text-sm text-gray-600">{props.label}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="text-base font-semibold text-gray-800">{props.title}</div>
      <div className="text-3xl font-bold text-blue-600 mt-1">{props.value}</div>
      <div className="text-sm text-gray-500 mt-2">{props.description}</div>
    </div>
  );
};

export default CardStat;
