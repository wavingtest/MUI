import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';
import Inicio from './views/Inicio';
import Showcase from './views/Showcase';
import Profile from './views/Profile';
import Login from './views/Login';
import RecordsPage from './views/RecordsPage';
import RegionsPage from './views/RegionsPage';
import AssetsPage from './views/AssetsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/components" element={<Showcase />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/regions" element={<RegionsPage />} />
        <Route path="/assets" element={<AssetsPage />} />
        <Route path="/vinculos" element={<RecordsPage />} />
        <Route path="/unidades-federativas" element={<RegionsPage />} />
        <Route path="/chassi-nota-fiscal" element={<AssetsPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
