import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReservationModal = ({ car, onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date_debut: '',
        date_fin: '',
        lieu_prise: '',
        lieu_retour: '',
        cin: '',
        permis: '',
        voiture_id: car.id
    });
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [prixTotal, setPrixTotal] = useState(0);

    const calculateTotal = (dateDebut, dateFin) => {
        if (dateDebut && dateFin) {
            const debut = new Date(dateDebut);
            const fin = new Date(dateFin);
            const diffTime = Math.abs(fin - debut);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure le jour de début
            setPrixTotal(diffDays * car.prix_journalier);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'date_debut' || name === 'date_fin') {
            calculateTotal(
                name === 'date_debut' ? value : formData.date_debut,
                name === 'date_fin' ? value : formData.date_fin
            );
        }

        // Clear validation error when user types
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/reservations', {
                ...formData,
                voiture_id: car.id
            });
            navigate('/reservation');
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la création de la réservation');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold">
                            {car.marque} {car.modele}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img
                                src={car.image}
                                alt={`${car.marque} ${car.modele}`}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="mt-4 space-y-2">
                                <p><span className="font-semibold">Année:</span> {car.annee}</p>
                                <p><span className="font-semibold">Catégorie:</span> {car.categorie}</p>
                                <p><span className="font-semibold">Prix journalier:</span> {car.prix_journalier} €</p>
                                <p><span className="font-semibold">Carburant:</span> {car.carburant}</p>
                                <p><span className="font-semibold">Transmission:</span> {car.transmission}</p>
                                <p><span className="font-semibold">Nombre de places:</span> {car.nombre_places}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date de début</label>
                                <input
                                    type="date"
                                    name="date_debut"
                                    value={formData.date_debut}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                        validationErrors.date_debut ? 'border-red-500' : ''
                                    }`}
                                    required
                                />
                                {validationErrors.date_debut && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.date_debut[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date de fin</label>
                                <input
                                    type="date"
                                    name="date_fin"
                                    value={formData.date_fin}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                        validationErrors.date_fin ? 'border-red-500' : ''
                                    }`}
                                    required
                                />
                                {validationErrors.date_fin && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.date_fin[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Lieu de prise</label>
                                <input
                                    type="text"
                                    name="lieu_prise"
                                    value={formData.lieu_prise}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                        validationErrors.lieu_prise ? 'border-red-500' : ''
                                    }`}
                                    required
                                />
                                {validationErrors.lieu_prise && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.lieu_prise[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Lieu de retour</label>
                                <input
                                    type="text"
                                    name="lieu_retour"
                                    value={formData.lieu_retour}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                        validationErrors.lieu_retour ? 'border-red-500' : ''
                                    }`}
                                    required
                                />
                                {validationErrors.lieu_retour && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.lieu_retour[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">CIN</label>
                                <input
                                    type="text"
                                    name="cin"
                                    value={formData.cin}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                        validationErrors.cin ? 'border-red-500' : ''
                                    }`}
                                    required
                                />
                                {validationErrors.cin && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.cin[0]}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Numéro de permis</label>
                                <input
                                    type="text"
                                    name="permis"
                                    value={formData.permis}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                        validationErrors.permis ? 'border-red-500' : ''
                                    }`}
                                    required
                                />
                                {validationErrors.permis && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.permis[0]}</p>
                                )}
                            </div>
                            <div className="pt-4">
                                <p className="text-lg font-semibold">
                                    Prix total: {prixTotal} €
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Réserver
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationModal;
