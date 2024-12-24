export const LoadingInterfaceLanding = () => {
  return (
    <div>
      <div className="w-full animate-pulse">
        {/* Navbar Container */}
        <div className="flex items-center justify-between p-4 bg-gray-200">
          {/* Brand Logo Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
          </div>

          {/* Button & Navbar Toggle Skeleton */}
          <div className="flex space-x-4">
            <div className="hidden sm:block h-10 w-36 bg-gray-300 rounded"></div>
            <div className="h-10 w-28 bg-gray-300 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      <div id="home" className="pt-20 bg-gray-200 animate-pulse">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
              <div className="text-left mb-2">
                <div className="h-20 bg-gray-300 rounded"></div>
              </div>
              <p className="h-10 bg-gray-300 rounded mb-8"></p>
              <div className="flex space-x-4">
                <div className="h-14 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="md:w-1/2 w-full h-70 md:h-[500px] mb-8 md:mb-0 flex items-center justify-center">
              <div className="h-5/6 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className="h-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export const LoadingRiwayatDosenPembimbing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-8 px-8 animate-pulse">
        {/* Header Section Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 w-96 bg-gray-200 rounded"></div>
        </div>

        {/* Filter and Search Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Skeleton */}
              <div className="flex-1">
                <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Filters Skeleton */}
              <div className="flex gap-4">
                <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
                <div className="w-40 h-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Period Section Skeleton */}
        {[1, 2].map((period) => (
          <div key={period} className="mb-8">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="h-4 w-64 bg-gray-200 rounded"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div>
                      <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                      <div className="h-8 w-12 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export const LoadingValidationDocument = ({ numberOfCards = 0 }) => {
  return (
    <div className="container px-4 py-6 md:px-6 bg-gray-50 min-h-screen animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded mb-4 md:mb-6"></div>

      {/* Search and Filter Skeleton */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center space-x-2">
          {/* Search Input Skeleton */}
          <div className="relative flex-grow">
            <div className="h-10 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Filter Buttons Skeleton */}
          <div className="hidden md:flex space-x-2">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="h-8 w-24 bg-gray-200 rounded-full"
              ></div>
            ))}
          </div>

          {/* Mobile Filter Toggle Skeleton */}
          <div className="md:hidden">
            <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Mobile Filter Dropdown Skeleton */}
        <div className="md:hidden mt-2 flex flex-wrap gap-2">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-8 w-28 bg-gray-200 rounded-full"
            ></div>
          ))}
        </div>
      </div>

      {/* Student Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: numberOfCards }).map((_, index) => (
          <div
            key={index}
            className="
              bg-white rounded-lg border border-gray-200
              hover:shadow-lg transition-all duration-200
              cursor-pointer relative overflow-hidden
              p-3 sm:p-4
            "
          >
            {/* Submission Date Skeleton */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-4">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Profile Initials Skeleton */}
              <div
                className="
                  flex-shrink-0 flex items-center justify-center rounded-full
                  bg-gray-200
                  w-12 h-12 sm:w-16 sm:h-16
                "
              ></div>

              {/* Content Container Skeleton */}
              <div className="flex-grow min-w-0">
                {/* Top Row Skeleton */}
                <div className="flex items-start gap-2 mb-1.5 sm:mb-2">
                  <div className="min-w-0">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Bottom Row Skeleton */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                  <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State Skeleton */}
        <div className="col-span-full text-center py-8 text-gray-500">
          <div className="h-6 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

interface LoadingDashboardProps {
  cardCount?: number;
  showAlert?: boolean;
  statsCount?: number;
  cardSize?: "default" | "compact";
}

export const LoadingDashboard: React.FC<LoadingDashboardProps> = ({
  cardCount = 0,
  showAlert = false,
  statsCount = 0,
  cardSize = "default",
}) => {
  // Menentukan padding dan spacing berdasarkan size
  const cardPadding = cardSize === "compact" ? "p-4" : "p-6";
  const iconSize = cardSize === "compact" ? "w-5 h-5" : "w-6 h-6";
  const titleHeight = cardSize === "compact" ? "h-5" : "h-6";
  const descHeight = cardSize === "compact" ? "h-3" : "h-4";
  const marginBottom = cardSize === "compact" ? "mb-3" : "mb-4";

  return (
    <div className="flex bg-gray-50">
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {/* Header Section Skeleton */}
          <div className="mb-8 animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 w-48 bg-gray-200 rounded"></div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array(statsCount)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 animate-pulse"
                >
                  <div
                    className={`${titleHeight} w-24 bg-gray-200 rounded mb-2`}
                  ></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
          </div>

          {/* Alert Skeleton - Conditional */}
          {showAlert && (
            <div className="mb-6 animate-pulse">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="h-4 w-3/4 bg-yellow-200 rounded"></div>
              </div>
            </div>
          )}

          {/* Cards Grid Skeleton - Dynamic */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(cardCount)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className={`block bg-white rounded-lg shadow-md ${cardPadding} border-l-4 border-gray-200 animate-pulse`}
                >
                  <div
                    className={`flex items-center space-x-2 ${marginBottom}`}
                  >
                    <div className="flex items-center justify-center p-2 bg-gray-100 rounded-full">
                      <div className={`${iconSize} bg-gray-200 rounded`}></div>
                    </div>
                    <div
                      className={`${titleHeight} w-32 bg-gray-200 rounded`}
                    ></div>
                  </div>
                  <div className={`space-y-2 ${marginBottom}`}>
                    <div
                      className={`${descHeight} w-full bg-gray-200 rounded`}
                    ></div>
                    <div
                      className={`${descHeight} w-3/4 bg-gray-200 rounded`}
                    ></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`${titleHeight} w-16 bg-gray-200 rounded`}
                    ></div>
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export const LoadingPenjadwalanKoordinator = () => {
  return (
    <div className="p-6 bg-gray-50 animate-pulse">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-64 bg-gray-200 rounded"></div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-4 border-b">
        <div className="flex space-x-4">
          <div className="py-2 px-4 h-10 w-24 bg-gray-200 rounded"></div>
          <div className="py-2 px-4 h-10 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Search and Add Button */}
      <div className="mb-4 flex justify-between items-center">
        <div className="relative flex-grow">
          <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
          <div className="absolute left-3 top-2.5 w-5 h-5 bg-gray-300 rounded"></div>
        </div>
        <div className="ml-4 h-10 w-40 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <div className="bg-white rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
              <tr>
                {[
                  "Tanggal",
                  "Waktu",
                  "Mahasiswa",
                  "Judul",
                  "Penguji",
                  "Ruangan",
                  "Aksi",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 border-b border-gray-200"
                  >
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <div className="h-5 w-5 bg-gray-200 rounded"></div>
                      <div className="h-5 w-5 bg-gray-200 rounded"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="px-3 py-1 h-8 w-20 bg-gray-200 rounded"></div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="px-3 py-1 h-8 w-8 bg-gray-200 rounded"
            ></div>
          ))}
          <div className="px-3 py-1 h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const LoadingPengajuanMahasiswa = () => {
  return (
    <div className="container bg-white p-4 rounded-lg animate-pulse">
      {/* Progress Steps Skeleton */}
      <div className="flex justify-between items-center mb-8">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative w-1/3"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-2 z-10"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            {index < 2 && (
              <div
                className="absolute top-4 -right-1/2 w-full h-1 bg-gray-200"
                style={{ right: "-50%", width: "100%" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Header Section Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="h-6 w-64 bg-gray-200 rounded"></h3>
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Submission Cards Skeleton */}
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="p-4 rounded-xl mb-4 sm:p-6 bg-gray-50 border border-gray-200 shadow-sm"
        >
          <div className="flex flex-col justify-between items-start sm:flex-row">
            <div>
              <div className="inline-flex items-center px-3 py-1 h-6 w-24 bg-gray-200 rounded-full mb-1 sm:mb-2"></div>
              <h5 className="h-8 w-40 bg-gray-200 rounded mt-4"></h5>
            </div>
            <div className="text-left sm:mt-0 sm:text-right">
              <div className="h-5 w-48 bg-gray-200 rounded mb-1 sm:mb-2"></div>
              <div className="inline-flex items-center px-3 py-2 h-10 w-24 bg-gray-200 rounded-full mt-4"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons Skeleton */}
      <div className="flex justify-between mt-6">
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

interface LoadingMahasiswaSeminarProps {
  cardCount?: number;
  showStats?: boolean;
  compact?: boolean;
}

export const LoadingMahasiswaSeminar: React.FC<
  LoadingMahasiswaSeminarProps
> = ({ cardCount = 6, showStats = true, compact = false }) => {
  // Adjust spacing based on compact mode
  const padding = compact ? "p-4" : "p-6";
  const spacing = compact ? "space-y-2" : "space-y-3";
  const margin = compact ? "mb-4" : "mb-6";
  const headerSize = compact ? "h-6" : "h-8";

  return (
    <div className="min-h-screen bg-gray-50">
      <main className={`pt-8 px-6 pb-6 ${compact ? "space-y-4" : "space-y-6"}`}>
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div
            className={`${headerSize} w-64 bg-gray-200 rounded animate-pulse`}
          ></div>
        </div>

        {/* Stats Cards Skeleton */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-sm rounded-lg p-4 border-l-4 border-gray-200 animate-pulse"
              >
                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Content Card Skeleton */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Search and Filter Skeleton */}
          <div className={`${padding} border-b border-gray-200`}>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <div className="h-10 bg-gray-200 rounded-lg w-full animate-pulse"></div>
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Student Cards Skeleton */}
          <div className={padding}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(cardCount)].map((_, index) => (
                <div
                  key={index}
                  className={`${padding} bg-white rounded-lg border border-gray-200 animate-pulse`}
                >
                  <div className={`flex justify-between items-start ${margin}`}>
                    <div className={spacing}>
                      <div className="h-6 w-40 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
                  </div>

                  <div className={`${spacing} ${margin}`}>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>

                  <div
                    className={`mt-3 pt-3 border-t border-gray-100 ${spacing}`}
                  >
                    <div className="flex justify-between">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const LoadingDashboardKaprodi: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col animate-pulse">
      <main className="p-4 sm:p-6 lg:p-8 flex-1">
        {/* Header Section Skeleton */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="h-8 sm:h-9 md:h-10 w-3/4 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-5 sm:h-6 md:h-7 w-2/3 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Stats Cards Section Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[
            { border: "border-blue-500" },
            { border: "border-yellow-500" },
            { border: "border-green-500" },
            { border: "border-purple-500" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg rounded-lg p-4 sm:p-6 border-l-4 ${stat.border}`}
            >
              <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-7 sm:h-8 md:h-9 w-16 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Chart Section Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 sm:p-6"
            >
              <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Additional Charts Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 sm:p-6"
            >
              <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Selection Table and Chart Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6 sm:mb-8">
          {/* Selection Table Skeleton */}
          <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
            <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Chart Skeleton */}
          <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
            <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const LoadingDashboardPembimbingInstansi: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-pulse">
      {/* Header Section Skeleton */}
      <div className="flex flex-col justify-between items-start mb-8">
        <div>
          <div className="h-8 w-96 bg-gray-200 rounded mb-2"></div>
          <div className="h-5 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { border: "border-blue-500", label: "Total Mahasiswa" },
          { border: "border-yellow-500", label: "Mahasiswa Aktif" },
          { border: "border-green-500", label: "Mahasiswa Selesai" },
        ].map((stat, index) => (
          <div
            key={index}
            className={`bg-white shadow-sm rounded-lg p-4 border-l-4 ${stat.border}`}
          >
            <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Alert Skeleton */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-8">
        <div className="h-4 w-3/4 bg-yellow-200 rounded"></div>
      </div>

      {/* Student List Section Skeleton */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="h-6 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1">
              <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="w-full sm:w-auto h-10 bg-gray-200 rounded-lg px-6"></div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-36 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingInterfaceDosenPAMahasiswa = () => {
  return (
    <div className="flex flex-col p-1">
      <div className="flex gap-2">
        <div
          className={`skeleton w-32 h-14 mb-2 p-2 justify-center items-center btn-rounded-sm`}
        />
        <div
          className={`skeleton w-32 h-14 mb-2 p-2 justify-center items-center btn-rounded-sm`}
        />
        <div
          className={`skeleton w-32 h-14 mb-2 p-2 justify-center items-center btn-rounded-sm`}
        />
        <div
          className={`skeleton w-32 h-14 mb-2 p-2 justify-center items-center btn-rounded-sm`}
        />
        <div
          className={`skeleton w-32 h-14 mb-2 p-2 justify-center items-center btn-rounded-sm`}
        />
      </div>
      <div className="flex flex-col gap-4 w-full h-[calc(100vh-170px)] bg-base-200 p-4">
        <label className="flex items-center gap-2 input input-bordered">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Cari mahasiswa berdasarkan Nama ataupun NIM..."
          />
        </label>{" "}
        <div className="bg-base-100">
          <table className="table w-full text-base text-center table-zebra">
            <thead className="text-base font-bold bg-base-300">
              <tr>
                <th className="w-16">No.</th>
                <th className="w-96">NIM</th>
                <th className="w-96">Nama Mahasiswa</th>
                <th>Aksi</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};
