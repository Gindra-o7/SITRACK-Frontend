import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Chart Options Interface
interface ChartOptions {
  series: number[];
  colors: string[];
  chart: {
    height: number;
    width: string;
    type: "pie";
  };
  stroke: {
    colors: string[];
    lineCap: "butt" | "square" | "round" | undefined;
  };
  plotOptions: {
    pie: {
      labels: {
        show: boolean;
      };
      size: string;
      dataLabels: {
        offset: number;
        dropShadow: {
          enabled: boolean;
          blur: number;
          opacity: number;
        };
      };
    };
  };
  labels: string[];
  dataLabels: {
    enabled: boolean;
    style: {
      fontFamily: string;
      fontSize: string;
      fontWeight: string;
    };
  };
  legend: {
    position: "top" | "right" | "bottom" | "left" | undefined;
    fontFamily: string;
  };
  yaxis: {
    labels: {
      formatter: (value: number) => string;
    };
  };
  xaxis: {
    labels: {
      formatter: (value: string) => string;
    };
    axisTicks: {
      show: boolean;
    };
    axisBorder: {
      show: boolean;
    };
  };
}

const Chartprapasca: React.FC = () => {
  const getChartOptions = (): ChartOptions => ({
    series: [52.8, 26.8, 20.4],
    colors: ["#1C64F2", "#16BDCA", "#9061F9"],
    chart: {
      height: 350,
      width: "100%",
      type: "pie", 
    },
    stroke: {
      colors: ["white"],
      lineCap: "butt",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "80%",
        dataLabels: {
          offset: -10, // Adjust offset of data labels if needed
          dropShadow: {
            enabled: true, // Enable shadow to make labels more visible
            blur: 3, // Shadow blur effect
            opacity: 0.5, // Shadow opacity
          },
        },
      },
    },
    labels: ["UI & UX", "Pemograman", "Data Scienes"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
        fontSize: "14px", // Adjust font size for clarity
        fontWeight: "bold", // Bold text for emphasis
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
    xaxis: {
      labels: {
        formatter: (value) => `${value}%`,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  });

  const chartOptions = getChartOptions();

  return (
    <div className="max-w-full w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Peminatan Diagram
        </h5>
      </div>

      {/* Pie Chart Container */}
      <div className="flex justify-center py-6">
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="pie"
          height={350}
        />
      </div>

      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            Last 7 days
            <svg
              className="w-2.5 m-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chartprapasca;
