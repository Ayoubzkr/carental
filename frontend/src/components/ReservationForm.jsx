import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [voiture, setVoiture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        date_debut: '',
        date_fin: '',
        lieu_prise: '',
        lieu_retour: '',
        cin: '',
        permis: ''
    });

    useEffect(() => {
        const fetchVoiture = async () => {
            try {
                const response = await axios.get(`/api/voitures/${id}`);
                setVoiture(response.data);
            } catch (err) {
                setError('Erreur lors du chargement des détails de la voiture');
            } finally {
                setLoading(false);
            }
        };

        fetchVoiture();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/reservations', {
                ...formData,
                voiture_id: id
            });
            navigate('/reservation');
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la création de la réservation');
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!voiture) return <div>Voiture non trouvée</div>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Réservation de {voiture.marque} {voiture.modele}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-black">Date de début</label>
                    <input
                        type="date"
                        name="date_debut"
                        value={formData.date_debut}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">Date de fin</label>
                    <input
                        type="date"
                        name="date_fin"
                        value={formData.date_fin}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">Lieu de prise en charge</label>
                    <input
                        type="text"
                        name="lieu_prise"
                        value={formData.lieu_prise}
                        onChange={handleChange}
                        required
                        placeholder="Adresse de prise en charge"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Lieu de retour</label>
                    <input
                        type="text"
                        name="lieu_retour"
                        value={formData.lieu_retour}
                        onChange={handleChange}
                        required
                        placeholder="Adresse de retour"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Numéro CIN</label>
                    <input
                        type="text"
                        name="cin"
                        value={formData.cin}
                        onChange={handleChange}
                        required
                        placeholder="Votre numéro CIN"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Numéro de permis</label>
                    <input
                        type="text"
                        name="permis"
                        value={formData.permis}
                        onChange={handleChange}
                        required
                        placeholder="Votre numéro de permis"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Réserver
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;
