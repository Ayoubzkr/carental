import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api';

const Historique = () => {
    const [historique, setHistorique] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchHistorique = async () => {
            try {
                const response = await api.get('/historique');
                setHistorique(response.data);
                setError(null);
            } catch (err) {
                setError('Erreur lors du chargement de l\'historique');
                console.error('Erreur:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchHistorique();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Veuillez vous connecter pour voir votre historique</h2>
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
            <h1 className="text-3xl font-bold mb-8">Historique des Réservations</h1>
            {historique.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Vous n'avez pas encore d'historique de réservations</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {historique.map((reservation) => (
                        <div key={reservation.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">{reservation.voiture.marque} {reservation.voiture.modele}</h2>
                                    <p className="text-gray-600 mb-2">Date de début: {new Date(reservation.date_debut).toLocaleDateString()}</p>
                                    <p className="text-gray-600 mb-2">Date de fin: {new Date(reservation.date_fin).toLocaleDateString()}</p>
                                    <p className="text-gray-600 mb-2">Prix total: {reservation.prix_total} €</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-sm font-medium ${
                                        reservation.statut === 'terminée' ? 'text-green-600' :
                                        reservation.statut === 'annulée' ? 'text-red-600' :
                                        'text-gray-600'
                                    }`}>
                                        {reservation.statut}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {new Date(reservation.updated_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Historique;

