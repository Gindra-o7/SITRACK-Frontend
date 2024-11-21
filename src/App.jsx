import React, {useState} from "react";
import Login from "../src/pages/Login";
import Dashboard from "../src/pages/mahasiswa/Dashboard";
import LandingPage from "./pages/LandingPages";
import Pendaftaran from "./pages/mahasiswa/Pendaftaran";
import Status from "../src/pages/mahasiswa/Status";
import NotFound from "../src/pages/NotFound";
import Persyaratan from "./pages/mahasiswa/Persyaratan";
import PascaSeminar from "./pages/mahasiswa/Pasca.Seminar.jsx";
import DashboardInstansi from "./pages/instansi/Dashboard.jsx"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DashboardDosen from "./pages/dosen/Dashboard.jsx";
import DashboardLayout from "./components/Dashboard.Layout.jsx";
import MahasiswaBimbingan from "./pages/dosen/Mahasiswa.Bimbingan.jsx";
import MahasiswaSeminar from "./pages/dosen/Mahasiswa.Seminar.jsx";
import ManageAccounts from "./pages/koordinator/Manage.Accounts.jsx";
import DashboardKoordinator from "./pages/koordinator/Dashboard.jsx";
import NilaiSeminar from "./pages/koordinator/Nilai.Seminar.jsx";
import Notifikasi from "./pages/koordinator/Notifikasi.jsx";
import Validasi from "./pages/koordinator/Validasi.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route element={<DashboardLayout role="mahasiswa"/>}>
                    <Route path="/mahasiswa/dashboard" element={<Dashboard/>}/>
                    <Route path="/mahasiswa/pendaftaran" element={<Pendaftaran/>}/>
                    <Route path="/mahasiswa/persyaratan" element={<Persyaratan/>}/>
                    <Route path="/mahasiswa/pasca-seminar" element={<PascaSeminar/>}/>
                    <Route path="/mahasiswa/status" element={<Status/>}/>
                </Route>
                <Route path="/pembimbing-instansi/Dashboard" element={<DashboardInstansi/>}/>
                <Route element={<DashboardLayout role="dosen"/>}>
                    <Route path="/dosen/dashboard" element={<DashboardDosen/>}/>
                    <Route path="/dosen/mahasiswa-bimbingan" element={<MahasiswaBimbingan/>}/>
                    <Route path="/dosen/mahasiswa-seminar" element={<MahasiswaSeminar/>}/>
                </Route>
                <Route element={<DashboardLayout role="koordinator"/>}>
                    <Route path="/koordinator/dashboard" element={<DashboardKoordinator/>}/>
                    <Route path="/koordinator/manage-akun" element={<ManageAccounts/>}/>
                    <Route path="/koordinator/nilai-seminar" element={<NilaiSeminar/>}/>
                    <Route path="/koordinator/validasi" element={<Validasi/>}/>
                    <Route path="/koordinator/notifikasi" element={<Notifikasi/>}/>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
