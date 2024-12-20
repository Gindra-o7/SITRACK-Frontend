import { cn } from "../lib/utils";
import Marquee from "./ui/marquee";
import logo from "../assets/logoimage.png"; // Mengimpor gambar yang sama untuk semua review
import { Link } from "react-router-dom";  // Menambahkan impor Link

// Mengubah data review
const reviews = [
  {
    name: "Gilang Ramadhan",
    nim: "12250111234",
    tanggal: "2024-12-05",
    jam: "10:00 WIB",
    ruangan: "A101",
    img: logo,
  },
  {
    name: "Raka Sabri",
    nim: "12250111235",
    tanggal: "2024-12-06",
    jam: "11:00 WIB",
    ruangan: "B202",
    img: logo,
  },
  {
    name: "M.Rafly",
    nim: "12250111236",
    tanggal: "2024-12-07",
    jam: "13:00 WIB",
    ruangan: "C303",
    img: logo,
  },
  {
    name: "M.Nabil dawami",
    nim: "12250111237",
    tanggal: "2024-12-08",
    jam: "14:00 WIB",
    ruangan: "D404",
    img: logo,
  },
  {
    name: "Fajri",
    nim: "12250111238",
    tanggal: "2024-12-09",
    jam: "15:00 WIB",
    ruangan: "E505",
    img: logo,
  },
  {
    name: "Fakhri",
    nim: "12250111239",
    tanggal: "2024-12-10",
    jam: "16:00 WIB",
    ruangan: "F606",
    img: logo,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  nim,
  tanggal,
  jam,
  ruangan,
}: {
  img: string;
  name: string;
  nim: string;
  tanggal: string;
  jam: string;
  ruangan: string;
}) => {
  return (
    <Link
      to="/jadwal"  // Link menuju halaman "/jadwal" tanpa parameter
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-6",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex items-center gap-3">
        <img className="rounded-full" width="40" height="40" alt="user avatar" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </figcaption>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-300">{nim}</p>
        </div>
      </div>
      {/* Nama, NIM, dan Ruangan dalam satu baris */}
      <div className="mt-4 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
        {/* Ikon Lokasi */}
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 8c0 4.41 7 13 7 13s7-8.59 7-13c0-2.87-3.13-6-7-6zM12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
          </svg>
          <p className="font-medium">{ruangan}</p>
        </div>
      </div>

      {/* Tanggal dan Jam dalam satu baris */}
      <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-300">
        {/* Ikon Kalender (Tanggal) */}
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 1.99-.9 1.99-2L21 5c0-1.1-.89-2-1.99-2zm0 16H5V8h14v11z" />
          </svg>
          <p>{tanggal}</p>
        </div>

        {/* Ikon Jam */}
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 6V12L15 15" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <p>{jam}</p>
        </div>
      </div>
    </Link>
  );
};

export function Marqueee() {
  return (
    <div className="relative flex h-[470px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white md:h-[470px]">
      {/* Subjudul di atas Marquee */}
      <div className="absolute top-5 w-full text-left z-10">
        <h2 className="text-s font-bold text-black dark:text-white underline">
          Real-Time Jadwal Seminar-KP
        </h2>
      </div>

      {/* Marquee pertama */}
      <Marquee pauseOnHover className="[--duration:110s] md:[--duration:30s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.nim} {...review} />
        ))}
      </Marquee>

      {/* Marquee kedua */}
      <Marquee reverse pauseOnHover className="[--duration:100s] md:[--duration:30s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.nim} {...review} />
        ))}
      </Marquee>

      {/* Gradient effects on both sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>

      {/* Tautan Selengkapnya di bawah Marquee */}
      <div className="absolute bottom-6 w-full text-right z-10">
        <Link
          to="/jadwal"  // Menentukan link ke halaman "/jadwal"
          className="text-black-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 text-lg font-semibold"
        >
          Selengkapnya &gt;
        </Link>
      </div>
    </div>
  );
}
