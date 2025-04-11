import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import ReservationModal from './ReservationModal';

const VoitureList = () => {
    const [voitures, setVoitures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState({
        categorie: '',
        prix_min: '',
        prix_max: '',
        disponible: true
    });

    const fetchVoitures = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Envoi des filtres:', appliedFilters);

            const params = {
                disponible: appliedFilters.disponible
            };

            // Ne pas inclure le filtre de catégorie s'il est vide
            if (appliedFilters.categorie) {
                params.categorie = appliedFilters.categorie;
            }

            // Ne pas inclure les filtres de prix s'ils sont vides
            if (appliedFilters.prix_min) {
                params.prix_min = appliedFilters.prix_min;
            }
            if (appliedFilters.prix_max) {
                params.prix_max = appliedFilters.prix_max;
            }

            const response = await api.get('/voitures', { params });
            console.log('Réponse API:', response);

            if (!response.data) {
                throw new Error('Aucune donnée reçue du serveur');
            }

            const data = Array.isArray(response.data) ? response.data : [response.data];
            console.log('Données traitées:', data);

            setVoitures(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des voitures:', error);
            setError('Erreur lors de la récupération des voitures. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    }, [appliedFilters]);

    useEffect(() => {
        fetchVoitures();
    }, [fetchVoitures]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setAppliedFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                    onClick={fetchVoitures}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Filtres</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select
                        name="categorie"
                        value={appliedFilters.categorie}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    >
                        <option value="">Toutes les catégories</option>
                        <option value="berlines">Berlines</option>
                        <option value="Citadine">Citadines</option>
                        <option value="SUV">SUV</option>
                        <option value="Crossover">Crossovers</option>
                        <option value="Sportif">Sportifs</option>
                        <option value="cabriolets">Cabriolets</option>
                    </select>
                    <input
                        type="number"
                        name="prix_min"
                        placeholder="Prix minimum"
                        value={appliedFilters.prix_min}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="prix_max"
                        placeholder="Prix maximum"
                        value={appliedFilters.prix_max}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    />
                    <select
                        name="disponible"
                        value={appliedFilters.disponible}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    >
                        <option value={true}>Disponibles</option>
                        <option value={false}>Non disponibles</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {voitures.length > 0 ? (
                    voitures.map(voiture => (
                        <div key={voiture.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <img
                                src={`http://localhost:8000/storage/${voiture.image}`}
                                alt={`${voiture.marque} ${voiture.modele}`}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    console.error('Erreur de chargement de l\'image:', voiture.image);
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+non+disponible';
                                }}
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-white">{voiture.marque} {voiture.modele}</h3>
                                <p className="text-gray-300">Année: {voiture.annee}</p>
                                <p className="text-gray-300">Catégorie: {voiture.categorie}</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {voiture.prix_journalier} DH/jour
                                </p>
                                <p className="text-gray-300">Carburant: {voiture.carburant}</p>
                                <p className="text-gray-300">Transmission: {voiture.transmission}</p>
                                <p className="text-gray-300">Places: {voiture.nombre_places}</p>
                                <p className="text-gray-300">Portes: {voiture.nombre_portes}</p>
                                <div className="mt-2">
                                    <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                                        voiture.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {voiture.disponible ? 'Disponible' : 'Non disponible'}
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={() => setSelectedCar(voiture)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                    >
                                        Détails & Réserver
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-white">
                        Aucune voiture trouvée avec les filtres actuels
                    </div>
                )}
            </div>

            {selectedCar && (
                <ReservationModal
                    car={selectedCar}
                    onClose={() => setSelectedCar(null)}
                />
            )}
        </div>
    );
};

export default VoitureList;
