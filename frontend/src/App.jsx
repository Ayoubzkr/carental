import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import VoitureList from './components/VoitureList';
import ReservationForm from './components/ReservationForm';
import AdminDashboard from './components/AdminDashboard';
import ReservationsList from './components/ReservationsList';
import Historique from './components/Historique';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
    return (
        <AuthProvider>
            <Routes>
                {/* Layout englobe TOUTES les routes */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/voitures" element={<VoitureList />} />
                    {/* Routes protégées */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/reservations" element={<ReservationsList />} />
                        <Route path="/historique" element={<Historique />} />
                        <Route path="/reservation/:id" element={<ReservationForm />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
};
export default App;