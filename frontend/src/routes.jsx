import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import VoitureList from './components/VoitureList';
import ReservationForm from './components/ReservationForm';
import AdminDashboard from './components/AdminDashboard';
import ReservationsList from './components/ReservationsList';
import Historique from './components/Historique';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/voitures" element={<VoitureList />} />
            <Route
                path="/reservations"
                element={
                    <ProtectedRoute>
                        <ReservationsList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/historique"
                element={
                    <ProtectedRoute>
                        <Historique />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reservation/:id"
                element={
                    <ProtectedRoute>
                        <ReservationForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
