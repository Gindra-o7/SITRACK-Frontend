import React, { useEffect } from "react";
import { DataTable } from "simple-datatables"; // Corrected import

const Tablelok: React.FC = () => {
  useEffect(() => {
    const tableElement = document.getElementById(
      "default-table"
    ) as HTMLTableElement;

    if (tableElement) {
      const dataTable = new DataTable(tableElement, {
        searchable: true, // Enable search
        perPageSelect: [5, 10, 15, 20], // Provide valid options for pagination per page dropdown
        sortable: true, // Enable sorting for all columns
        fixedHeight: true, // Optional, if you want to have fixed table height
      });

      // Cleanup DataTable on component unmount
      return () => {
        dataTable.destroy();
      };
    }
  }, []);

  return (
    <div className="w-full"> {/* Added w-full to ensure full width of the container */}
      <h2 className="text-xl font-bold mb-4">
        Rekap Data Instansi/Tempat Mahasiswa Selesai KP
      </h2>
      <table id="default-table" className="w-full"> {/* Added w-full to ensure the table takes full width */}
        <thead>
          <tr>
            <th>
              <span className="flex items-center">Nama Instansi</span>
            </th>
            <th>
              <span className="flex items-center">Lokasi</span>
            </th>
            <th>
              <span className="flex items-center">
                Jumlah Mahasiswa KP
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
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              PT. Flowbite
            </td>
            <td>Jakarta</td>
            <td>15</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Universitas React
            </td>
            <td>Bandung</td>
            <td>30</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Angular Solutions
            </td>
            <td>Surabaya</td>
            <td>12</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Vue Innovations
            </td>
            <td>Yogyakarta</td>
            <td>8</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Svelte Labs
            </td>
            <td>Medan</td>
            <td>20</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Ember Enterprises
            </td>
            <td>Makassar</td>
            <td>25</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Backbone Corporation
            </td>
            <td>Malang</td>
            <td>10</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              jQuery Solutions
            </td>
            <td>Bali</td>
            <td>35</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Bootstrap Technologies
            </td>
            <td>Semarang</td>
            <td>18</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Foundation Development
            </td>
            <td>Solo</td>
            <td>14</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Bulma Design Studio
            </td>
            <td>Jakarta</td>
            <td>22</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Next.js Development
            </td>
            <td>Bogor</td>
            <td>17</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Nuxt.js Innovations
            </td>
            <td>Surabaya</td>
            <td>19</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Meteor Technologies
            </td>
            <td>Bandung</td>
            <td>13</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Aurelia Solutions
            </td>
            <td>Yogyakarta</td>
            <td>7</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Inferno Labs
            </td>
            <td>Medan</td>
            <td>10</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Preact Technologies
            </td>
            <td>Makassar</td>
            <td>8</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Lit Development
            </td>
            <td>Malang</td>
            <td>6</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Alpine.js Studio
            </td>
            <td>Bali</td>
            <td>15</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Stimulus Solutions
            </td>
            <td>Solo</td>
            <td>12</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Solid Framework
            </td>
            <td>Jakarta</td>
            <td>9</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tablelok;
