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
    type: "pie"; // Set 'pie' type explicitly
  };
  stroke: {
    colors: string[];
    lineCap: "butt" | "square" | "round" | undefined; // Explicitly type 'lineCap'
  };
  plotOptions: {
    pie: {
      labels: {
        show: boolean;
      };
      size: string;
      dataLabels: {
        offset: number;
      };
    };
  };
  labels: string[];
  dataLabels: {
    enabled: boolean;
    style: {
      fontFamily: string;
    };
  };
  legend: {
    position: "top" | "right" | "bottom" | "left" | undefined; // Valid values for legend position
    fontFamily: string;
  };
  yaxis: {
    labels: {
      formatter: (value: number) => string;
    };
  };
  xaxis: {
    labels: {
      formatter: (value: string) => string; // Change parameter to string
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
      height: 420,
      width: "100%",
      type: "pie", // Set chart type to 'pie'
    },
    stroke: {
      colors: ["white"],
      lineCap: "butt", // Set lineCap to one of the allowed values ('butt', 'square', 'round')
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["Direct", "Organic search", "Referrals"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom", // Use valid position: 'top' | 'right' | 'bottom' | 'left'
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}%`, // No changes here
      },
    },
    xaxis: {
      labels: {
        formatter: (value) => `${value}%`, // Updated to accept string (fixing the error)
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
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-start w-full">
        <div className="flex-col items-center">
          <div className="flex items-center mb-1">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
              Website traffic
            </h5>
            <svg
              data-popover-target="chart-info"
              data-popover-placement="bottom"
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
          </div>
        </div>
        {/* Date Range Button */}
        <button
          id="dateRangeButton"
          data-dropdown-toggle="dateRangeDropdown"
          data-dropdown-ignore-click-outside-class="datepicker"
          type="button"
          className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline"
        >
          31 Nov - 31 Dec
          <svg
            className="w-3 h-3 ms-2"
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

      {/* Pie Chart */}
      <div className="py-6" id="pie-chart">
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="pie"
          height={420}
        />
      </div>

      {/* Additional Content (Buttons, Dropdowns) */}
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
