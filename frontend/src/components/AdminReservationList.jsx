import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/admin/reservations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setReservations(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des réservations');
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/admin/reservations/${id}/status`, {
                statut: newStatus
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchReservations();
        } catch (err) {
            setError('Erreur lors de la modification du statut');
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Gestion des Réservations</h2>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Voiture
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date de début
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date de fin
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Statut
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {reservation.user.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {reservation.user.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {reservation.voiture.marque} {reservation.voiture.modele}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {reservation.voiture.annee}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(reservation.date_debut).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(reservation.date_fin).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        reservation.statut === 'confirmée'
                                            ? 'bg-green-100 text-green-800'
                                            : reservation.statut === 'annulée'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {reservation.statut}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {reservation.statut === 'en_attente' && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleStatusChange(reservation.id, 'confirmée')}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                Confirmer
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(reservation.id, 'annulée')}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReservationList;
