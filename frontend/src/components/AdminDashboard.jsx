import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [voitures, setVoitures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMarque, setSelectedMarque] = useState('');
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        const checkAdmin = async () => {
            if (!user || !user.is_admin) {
                navigate('/login');
                return;
            }
            fetchVoitures();
        };

        checkAdmin();
    }, [user, navigate]);

    const fetchVoitures = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/voitures');
            setVoitures(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des voitures');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
            try {
                await axios.delete(`http://localhost:8000/api/admin/voitures/${id}`);
                fetchVoitures();
            } catch (err) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Erreur de déconnexion:', error);
        }
    };

    const filteredVoitures = voitures.filter(voiture =>
        !selectedMarque || voiture.marque.toLowerCase() === selectedMarque.toLowerCase()
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* En-tête avec le bouton de déconnexion */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16 items-center">
                        <h1 className="text-xl font-bold text-gray-800">Dashboard Admin</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Connecté en tant que {user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                            >
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Filtres et recherche */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <label className="mr-2 text-gray-700">Marque :</label>
                                <select
                                    value={selectedMarque}
                                    onChange={(e) => setSelectedMarque(e.target.value)}
                                    className="border rounded px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Toutes</option>
                                    <option value="BMW">BMW</option>
                                    <option value="Mercedes">Mercedes</option>
                                    <option value="Audi">Audi</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/admin/ajouter-voiture')}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                        >
                            Ajouter une voiture
                        </button>
                    </div>
                </div>

                {/* Tableau des voitures */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Libellé</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Achat</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix/Jour</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marque</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passagers</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valises</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transmission</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carburant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredVoitures.map((voiture) => (
                                    <tr key={voiture.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={voiture.image}
                                                alt={voiture.modele}
                                                className="h-12 w-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{voiture.marque} {voiture.modele}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(voiture.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{voiture.prix_journalier} DH</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{voiture.marque}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{voiture.categorie}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{voiture.nombre_places}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">3</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{voiture.transmission}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{voiture.carburant}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => navigate(`/admin/modifier-voiture/${voiture.id}`)}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(voiture.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
