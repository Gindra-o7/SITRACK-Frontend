import React, { useEffect } from "react";
import { DataTable } from "simple-datatables"; // Corrected import

const SelectionTable: React.FC = () => {
  useEffect(() => {
    const tableElement = document.getElementById(
      "selection-table"
    ) as HTMLTableElement;

    if (tableElement) {
      const dataTable = new DataTable(tableElement, {
        searchable: true, // Enable search
        sensitivity: "base", // Sensitivitas pencarian
        searchQuerySeparator: " ", // Separator query pencarian
        perPageSelect: [5, 10, 15, 20], // Pilihan jumlah item per halaman
        sortable: true, // Enable sorting
        fixedHeight: true, // Fix the height of the table
      });

      // Cleanup DataTable on component unmount
      return () => {
        dataTable.destroy();
      };
    }
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-7xl">
        <h2 className="text-xl font-bold mb-4">
          Data Dosen Yang Menguji Dan Membimbing
        </h2>
        <table
          id="selection-table"
          className="min-w-full table-auto overflow-x-auto"
        >
          <thead>
            <tr>
              <th>
                <span className="flex items-center">Nama Dosen</span>
              </th>
              <th>
                <span className="flex items-center">Nip</span>
              </th>
              <th>
                <span className="flex items-center">
                  Mahasiswa Diuji-Semkp
                </span>
              </th>
              <th>
                <span className="flex items-center">
                  Mahasiswa Dibimbing-Semkp
                  <svg
                    className="w-4 h-4 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m8 15 4 4 4-4m0-6-4-4-4 4"
                    />
                  </svg>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Data Rows */}
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Budi Santoso
              </td>
              <td>1984567890</td>
              <td className="text-center">15</td> {/* Center align */}
              <td className="text-center">10</td> {/* Center align */}
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Prof. Anisa Putri
              </td>
              <td>1987654321</td>
              <td className="text-center">20</td>
              <td className="text-center">12</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Rudi Wijaya
              </td>
              <td>1986534789</td>
              <td className="text-center">18</td>
              <td className="text-center">14</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Eka Susanti
              </td>
              <td>1987432589</td>
              <td className="text-center">17</td>
              <td className="text-center">13</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Prof. Hasan Akbar
              </td>
              <td>1988567890</td>
              <td className="text-center">22</td>
              <td className="text-center">19</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Siti Aisyah
              </td>
              <td>1989987654</td>
              <td className="text-center">10</td>
              <td className="text-center">5</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Prof. Umar Farouk
              </td>
              <td>1986543210</td>
              <td className="text-center">25</td>
              <td className="text-center">20</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Linda Marissa
              </td>
              <td>1981234567</td>
              <td className="text-center">12</td>
              <td className="text-center">8</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Andi Hidayat
              </td>
              <td>1986789012</td>
              <td className="text-center">14</td>
              <td className="text-center">9</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Prof. Dian Kartika
              </td>
              <td>1987654322</td>
              <td className="text-center">13</td>
              <td className="text-center">6</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Yoga Pratama
              </td>
              <td>1984567878</td>
              <td className="text-center">9</td>
              <td className="text-center">4</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Sandi Wijaya
              </td>
              <td>1985463728</td>
              <td className="text-center">20</td>
              <td className="text-center">15</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Prof. Ratna Indah
              </td>
              <td>1989745612</td>
              <td className="text-center">16</td>
              <td className="text-center">10</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. David Kurniawan
              </td>
              <td>1985324761</td>
              <td className="text-center">18</td>
              <td className="text-center">12</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Mayang Sari
              </td>
              <td>1986547632</td>
              <td className="text-center">14</td>
              <td className="text-center">7</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Prof. Bintang Pratama
              </td>
              <td>1989876543</td>
              <td className="text-center">19</td>
              <td className="text-center">15</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Firman Hadi
              </td>
              <td>1981112233</td>
              <td className="text-center">11</td>
              <td className="text-center">6</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Prof. Rina Wulandari
              </td>
              <td>1984332244</td>
              <td className="text-center">22</td>
              <td className="text-center">18</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Dr. Suharto Dwi
              </td>
              <td>1989876540</td>
              <td className="text-center">13</td>
              <td className="text-center">10</td>
            </tr>
            <tr>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Prof. Selvi Arum
              </td>
              <td>1988796543</td>
              <td className="text-center">8</td>
              <td className="text-center">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectionTable;
