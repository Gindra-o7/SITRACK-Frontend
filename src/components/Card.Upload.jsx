import React from 'react';
import {ListChecks, Loader, FileX, MoveRight} from 'lucide-react';

const CardUpload = ({number, date, status, onStatusClick}) => {
    const getStatusButton = () => {
        if (status === 'revisi') {
            return (
                <div
                    onClick={onStatusClick}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg">
                    <FileX className="w-6 h-6 mr-2"/>
                    Revisi
                </div>
            );
        } else if (status === 'diterima') {
            return (
                <div
                    onClick={onStatusClick}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg">
                    <ListChecks className="w-6 h-6 mr-2"/>
                    Diterima
                </div>
            );
        } else if (status === 'menunggu') {
            return (
                <div
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg">
                    <Loader className="w-6 h-6 mr-2"/>
                    Menunggu
                </div>
            );
        }
    };

    return (
        <div
            className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Pengajuan #{number}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {date}
                    </p>
                </div>
                <div className="flex gap-3">
                    {getStatusButton()}
                    <button
                        onClick={onStatusClick}
                        disabled={status === "menunggu"}
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                            status === 'menunggu'
                                ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                : 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                        }`}>
                        View
                        <MoveRight className="w-4 h-4 ms-2"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardUpload;