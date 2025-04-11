import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.data.is_admin) {
                    navigate('/');
                    return;
                }
            } catch (error) {
                console.error('Erreur de vérification admin:', error);
                navigate('/login');
            }
        };

        checkAdmin();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Outlet />
        </div>
    );
};

export default AdminLayout;
