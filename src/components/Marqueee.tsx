import React, {useEffect, useState} from 'react';
import { cn } from "../lib/utils";
import Marquee from "./ui/marquee";
import logo from "../assets/logoimage.png";
import { Button } from "flowbite-react"
import axiosInstance from "../configs/axios.configs.ts"
import { format } from 'date-fns';

export const getJadwalSeminar = async () => {
    try {
        const response = await axiosInstance.get('/jadwal'); // Adjust the URL based on your API endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching jadwal seminar:', error);
        throw error;
    }
};

const JadwalModal = ({ isOpen, onClose, reviews }) => {
  if (!isOpen) return null;



  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
          <div className="bg-primary dark:bg-primary text-white p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Jadwal Seminar-KP</h2>
            <button
                onClick={onClose}
                className="text-white hover:bg-blue-700 dark:hover:bg-blue-700 p-2 rounded-full transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid md:grid-cols-2 gap-4">
              {reviews.map((review) => (
                  <div
                      key={review.nim}
                      className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <img
                          className="w-12 h-12 rounded-full object-cover"
                          src={review.img}
                          alt={review.name}
                      />
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                          {review.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {review.nim}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{review.ruangan}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{review.tanggal}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{review.jam}</span>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

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
      <div
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
        <div className="mt-4 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 8c0 4.41 7 13 7 13s7-8.59 7-13c0-2.87-3.13-6-7-6zM12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
            </svg>
            <p className="font-medium">{ruangan}</p>
          </div>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 1.99-.9 1.99-2L21 5c0-1.1-.89-2-1.99-2zm0 16H5V8h14v11z" />
            </svg>
            <p>{tanggal}</p>
          </div>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 6V12L15 15" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p>{jam}</p>
          </div>
        </div>
      </div>
  );
};

export function Marqueee() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jadwalList, setJadwalList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJadwal = async () => {
            try {
                const data = await getJadwalSeminar();
                const formattedData = data.map(jadwal => ({
                    name: jadwal.mahasiswa.user.nama,
                    nim: jadwal.mahasiswa.nim,
                    tanggal: format(new Date(jadwal.tanggal), 'yyyy-MM-dd'),
                    jam: `${format(new Date(jadwal.waktuMulai), 'HH:mm')} WIB`,
                    ruangan: jadwal.ruangan,
                    img: logo, // Using default logo for all users
                }));
                setJadwalList(formattedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJadwal();
    }, []);

    const firstRow = jadwalList.slice(0, Math.ceil(jadwalList.length / 2));
    const secondRow = jadwalList.slice(Math.ceil(jadwalList.length / 2));

    if (loading) {
        return (
            <div className="relative flex h-[470px] w-full items-center justify-center rounded-2xl bg-white dark:bg-gray-900 shadow-lg">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative flex h-[470px] w-full items-center justify-center rounded-2xl bg-white dark:bg-gray-900 shadow-lg">
                <div className="text-center text-red-500">Error: {error}</div>
            </div>
        );
    }

  return (
      <div
          className="relative flex h-[470px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white dark:bg-gray-900 md:h-[470px] shadow-lg">
          <div className="absolute top-5 w-full text-left z-10">
              <h2 className="text-xl font-bold text-black dark:text-white ml-4">
                  Real-Time Jadwal Seminar-KP
              </h2>
          </div>

          {jadwalList.length > 0 ? (
              <>
                  <Marquee pauseOnHover className="[--duration:110s] md:[--duration:30s]">
                      {firstRow.map((review) => (
                          <ReviewCard key={review.nim} {...review} />
                      ))}
                  </Marquee>

                  <Marquee reverse pauseOnHover className="[--duration:100s] md:[--duration:30s]">
                      {secondRow.map((review) => (
                          <ReviewCard key={review.nim} {...review} />
                      ))}
                  </Marquee>
              </>
          ) : (
              <div className="text-center">No schedules available</div>
          )}

          <div
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-gray-900"></div>
          <div
              className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-gray-900"></div>

          <div className="absolute bottom-3 w-full text-right ml-4">
              <Button
                  onClick={() => setIsModalOpen(true)}
                  color='dark'
                  size='sm'
              >
                  Selengkapnya &gt;
              </Button>
          </div>

          <JadwalModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              reviews={jadwalList}
          />
      </div>
  );
}