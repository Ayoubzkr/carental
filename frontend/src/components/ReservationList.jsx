import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            console.log('Début du chargement des réservations...');
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            if (!token) {
                throw new Error('Non authentifié');
            }

            const response = await axios.get('/api/reservations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Réponse de l\'API:', response.data);
            setReservations(response.data);
        } catch (err) {
            console.error('Erreur détaillée:', err);
            if (err.response) {
                console.error('Statut de l\'erreur:', err.response.status);
                console.error('Données de l\'erreur:', err.response.data);
            }
            setError(err.response?.data?.message || 'Erreur lors du chargement des réservations');
        } finally {
            setLoading(false);
        }
    };

    const handleAnnuler = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.put(`/api/reservations/${id}`,
                    { statut: 'annulee' },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                fetchReservations();
            } catch (err) {
                console.error('Erreur lors de l\'annulation:', err);
                setError('Erreur lors de l\'annulation de la réservation');
            }
        }
    };

    const handleRecu = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/reservations/${id}/recu`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `recu_reservation_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Erreur lors de la génération du reçu:', err);
            setError('Erreur lors de la génération du reçu');
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Mes Réservations</h2>
            {reservations.length === 0 ? (
                <div className="text-center text-gray-500">
                    Vous n'avez pas encore de réservations.
                </div>
            ) : (
                <div className="space-y-4">
                    {reservations.map((reservation) => (
                        <div key={reservation.id} className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {reservation.voiture.marque} {reservation.voiture.modele}
                                    </h3>
                                    <p className="text-gray-600">
                                        Du {new Date(reservation.date_debut).toLocaleDateString()} au{' '}
                                        {new Date(reservation.date_fin).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600">
                                        Lieu de prise: {reservation.lieu_prise}
                                    </p>
                                    <p className="text-gray-600">
                                        Lieu de retour: {reservation.lieu_retour}
                                    </p>
                                    <p className="text-gray-600">
                                        Statut: <span className={`font-semibold ${
                                            reservation.statut === 'confirmee' ? 'text-green-600' :
                                            reservation.statut === 'annulee' ? 'text-red-600' :
                                            'text-yellow-600'
                                        }`}>
                                            {reservation.statut === 'en_attente' ? 'En attente' :
                                             reservation.statut === 'confirmee' ? 'Confirmée' :
                                             'Annulée'}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    {reservation.statut !== 'annulee' && (
                                        <button
                                            onClick={() => handleAnnuler(reservation.id)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Annuler
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleRecu(reservation.id)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Reçu
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReservationList;

