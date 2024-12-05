import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "simple-datatables";
import "font-awesome/css/font-awesome.min.css"; // Pastikan FontAwesome diimpor jika menggunakan ikon ini

interface TableRow {
  name: string;
  nim: string;
  pembimbing: string;
  penguji: string;
  tanggal: string;
  jam: string;
  ruangan: string;
  selected: boolean;
}

const Jadwal: React.FC = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [data, setData] = useState<TableRow[]>([
    { name: "Gilang Ramadhan", nim: "12250111234", pembimbing: "Dr. Ali", penguji: "Prof. Budi", tanggal: "2024-12-05", jam: "10:00 WIB", ruangan: "A101", selected: false },
    { name: "Raka Sabri", nim: "12250111235", pembimbing: "Dr. Siti", penguji: "Prof. Caca", tanggal: "2024-12-06", jam: "11:00 WIB", ruangan: "B202", selected: false },
    { name: "M. Rafly", nim: "12250111236", pembimbing: "Dr. Laila", penguji: "Prof. Dani", tanggal: "2024-12-07", jam: "13:00 WIB", ruangan: "C303", selected: false },
    { name: "M. Nabil Dawami", nim: "12250111237", pembimbing: "Dr. Maya", penguji: "Prof. Udin", tanggal: "2024-12-08", jam: "14:00 WIB", ruangan: "D404", selected: false },
    { name: "Fajri", nim: "12250111238", pembimbing: "Dr. Zain", penguji: "Prof. Eko", tanggal: "2024-12-09", jam: "15:00 WIB", ruangan: "E505", selected: false },
    { name: "Fakhri", nim: "12250111239", pembimbing: "Dr. Joko", penguji: "Prof. Hani", tanggal: "2024-12-10", jam: "16:00 WIB", ruangan: "F606", selected: false },
    { name: "Dani Susanto", nim: "12250111240", pembimbing: "Dr. Rina", penguji: "Prof. Zaki", tanggal: "2024-12-11", jam: "08:00 WIB", ruangan: "G707", selected: false },
    { name: "Siska Nurhayati", nim: "12250111241", pembimbing: "Dr. Omar", penguji: "Prof. Fira", tanggal: "2024-12-12", jam: "09:00 WIB", ruangan: "H808", selected: false },
    { name: "Arif Setiawan", nim: "12250111242", pembimbing: "Dr. Ika", penguji: "Prof. Wira", tanggal: "2024-12-13", jam: "10:00 WIB", ruangan: "I909", selected: false },
    { name: "Lina Marlina", nim: "12250111243", pembimbing: "Dr. Budi", penguji: "Prof. Edi", tanggal: "2024-12-14", jam: "11:00 WIB", ruangan: "J010", selected: false },
    { name: "Tari Putri", nim: "12250111244", pembimbing: "Dr. Hana", penguji: "Prof. Asep", tanggal: "2024-12-15", jam: "12:00 WIB", ruangan: "K111", selected: false },
    { name: "Sandi Pratama", nim: "12250111245", pembimbing: "Dr. Indah", penguji: "Prof. Dian", tanggal: "2024-12-16", jam: "13:00 WIB", ruangan: "L212", selected: false },
    { name: "Budi Suryana", nim: "12250111246", pembimbing: "Dr. Rudi", penguji: "Prof. Tini", tanggal: "2024-12-17", jam: "14:00 WIB", ruangan: "M313", selected: false },
    { name: "Siti Khadijah", nim: "12250111247", pembimbing: "Dr. Nisa", penguji: "Prof. Fajar", tanggal: "2024-12-18", jam: "15:00 WIB", ruangan: "N414", selected: false },
    { name: "Reza Ramadhan", nim: "12250111248", pembimbing: "Dr. Agus", penguji: "Prof. Yuni", tanggal: "2024-12-19", jam: "16:00 WIB", ruangan: "O515", selected: false },
    { name: "Dewi Kartika", nim: "12250111249", pembimbing: "Dr. Sofia", penguji: "Prof. Vina", tanggal: "2024-12-20", jam: "17:00 WIB", ruangan: "P616", selected: false },
    { name: "Zaki Murtada", nim: "12250111250", pembimbing: "Dr. Heri", penguji: "Prof. Eka", tanggal: "2024-12-21", jam: "18:00 WIB", ruangan: "Q717", selected: false },
  ]);

  // State untuk menyimpan jumlah data per halaman
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement) {
      const table = new DataTable(tableElement, {
        searchable: true,
        sortable: true,
        perPage: pageSize,  // Tampilkan hanya 5 data saat pertama kali
      });
    }
  }, [pageSize]); // Setiap kali pageSize berubah, refresh DataTable

  // Fungsi untuk mengubah jumlah data per halaman
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Real-Time Jadwal Seminar-KP</h1>
      


      <table ref={tableRef} id="jadwal-table" className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Nama</th>
            <th className="border p-2">NIM</th>
            <th className="border p-2">Hari/Tanggal</th>
            <th className="border p-2">Jam</th>
            <th className="border p-2">Ruangan</th>
            <th className="border p-2">Pembimbing</th>
            <th className="border p-2">Penguji</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{row.name}</td>
              <td className="border p-2">{row.nim}</td>
              <td className="border p-2">{row.tanggal}</td>
              <td className="border p-2">{row.jam}</td>
              <td className="border p-2">{row.ruangan}</td>
              <td className="border p-2">{row.pembimbing}</td>
              <td className="border p-2">{row.penguji}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jadwal;
