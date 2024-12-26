import axios from "axios";
import {toast} from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_PLACEHOLDER,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk menangani response error
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific error status codes
            switch (error.response.status) {
                case 401:
                    toast.error('Sesi Anda telah berakhir. Silakan login ulang.');
                    // Optional: Clear token and redirect to login
                    localStorage.removeItem('token');
                    window.location.href = '/auth';
                    break;
                case 403:
                    toast.error('Anda tidak memiliki izin untuk mengakses halaman ini.');
                    break;
                case 404:
                    toast.error('Sumber tidak ditemukan.');
                    break;
                case 500:
                    toast.error('Terjadi kesalahan pada server.');
                    break;
                default:
                    toast.error(error.response.data.message || 'Terjadi kesalahan');
            }
        } else if (error.request) {
            toast.error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
        } else {
            toast.error('Terjadi kesalahan tidak terduga.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

export const isAxiosError = axios.isAxiosError;