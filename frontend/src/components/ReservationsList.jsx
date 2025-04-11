import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api';

const ReservationsList = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get('/reservations');
                setReservations(response.data);
                setError(null);
            } catch (err) {
                setError('Erreur lors du chargement des réservations');
                console.error('Erreur:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchReservations();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Veuillez vous connecter pour voir vos réservations</h2>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">{error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Mes Réservations</h1>
            {reservations.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Vous n'avez pas encore de réservations</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reservations.map((reservation) => (
                        <div key={reservation.id} className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-2">{reservation.voiture.marque} {reservation.voiture.modele}</h2>
                            <p className="text-gray-600 mb-2">Date de début: {new Date(reservation.date_debut).toLocaleDateString()}</p>
                            <p className="text-gray-600 mb-2">Date de fin: {new Date(reservation.date_fin).toLocaleDateString()}</p>
                            <p className="text-gray-600 mb-2">Prix total: {reservation.prix_total} €</p>
                            <p className={`text-sm font-medium ${
                                reservation.statut === 'confirmée' ? 'text-green-600' :
                                reservation.statut === 'en attente' ? 'text-yellow-600' :
                                'text-red-600'
                            }`}>
                                Statut: {reservation.statut}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReservationsList;
