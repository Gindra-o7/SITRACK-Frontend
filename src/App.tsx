import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/mahasiswa/Dashboard";
import LandingPage from "./pages/LandingPages";
import Pengajuan from "./pages/mahasiswa/Pengajuan";
import Status from "./pages/mahasiswa/Status";
import NotFound from "./pages/NotFound";
import DashboardInstansi from "./pages/instansi/Dashboard";
import DashboardDosen from "./pages/dosen/Dashboard";
import DashboardLayout from "./components/Dashboard.Layout";
import RiwayatDosen from "./pages/dosen/Riwayat";
import MahasiswaBimbingan from "./pages/dosen/Mahasiswa.Bimbingan";
import MahasiswaSeminar from "./pages/dosen/Mahasiswa.Seminar";
import ManageAccounts from "./pages/koordinator/Manage.Accounts";
import DashboardKoordinator from "./pages/koordinator/Dashboard";
import JadwalNilai from "./pages/koordinator/Jadwal.Nilai";
import Notifikasi from "./pages/koordinator/Notifikasi";
import Validasi from "./pages/koordinator/Validasi";
import DashboardKaprodi from "./pages/kaprodi/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<DashboardLayout role="mahasiswa" />}>
          <Route path="/mahasiswa/dashboard" element={<Dashboard />} />
          <Route path="/mahasiswa/pengajuan" element={<Pengajuan />} />
          <Route path="/mahasiswa/status" element={<Status />} />
        </Route>
        <Route
          path="/pembimbing-instansi/Dashboard"
          element={<DashboardInstansi />}
        />
        <Route element={<DashboardLayout role="dosen" />}>
          <Route path="/dosen/dashboard" element={<DashboardDosen />} />
          <Route
            path="/dosen/mahasiswa-bimbingan"
            element={<MahasiswaBimbingan />}
          />
          <Route
            path="/dosen/mahasiswa-seminar"
            element={<MahasiswaSeminar />}
          />
          <Route path="/dosen/riwayat" element={<RiwayatDosen />} />
        </Route>
        <Route element={<DashboardLayout role="koordinator" />}>
          <Route
            path="/koordinator/dashboard"
            element={<DashboardKoordinator />}
          />
          <Route path="/koordinator/manage-akun" element={<ManageAccounts />} />
          <Route
            path="/koordinator/jadwal-dan-nilai"
            element={<JadwalNilai />}
          />
          <Route path="/koordinator/validasi" element={<Validasi />} />
          <Route path="/koordinator/notifikasi" element={<Notifikasi />} />
        </Route>
        <Route path="/kaprodi/Dashboard" element={<DashboardKaprodi />} />
      </Routes>
    </Router>
  );
};

export default App;
