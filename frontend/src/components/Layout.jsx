import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="pt-16"> {/* Padding pour la navbar fixed */}
                <Outlet /> {/* Contenu des routes */}
            </main>
        </div>
    );
};

export default Layout;