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