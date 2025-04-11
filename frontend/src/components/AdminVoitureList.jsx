import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminVoitureList = () => {
    const [voitures, setVoitures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVoiture, setSelectedVoiture] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [filterMarque, setFilterMarque] = useState('');
    const [formData, setFormData] = useState({
        marque: '',
        modele: '',
        annee: '',
        categorie: '',
        prix_journalier: '',
        image: '',
        description: '',
        carburant: '',
        transmission: '',
        nombre_places: '',
        nombre_portes: '',
        climatisation: false,
        gps: false,
        musique: false
    });

    useEffect(() => {
        fetchVoitures();
    }, []);

    const fetchVoitures = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/voitures', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setVoitures(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erreur lors du chargement des voitures');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (selectedVoiture) {
                await axios.put(`http://localhost:8000/api/admin/voitures/${selectedVoiture.id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                await axios.post('http://localhost:8000/api/admin/voitures', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            fetchVoitures();
            setShowForm(false);
            setSelectedVoiture(null);
            setFormData({
                marque: '',
                modele: '',
                annee: '',
                categorie: '',
                prix_journalier: '',
                image: '',
                description: '',
                carburant: '',
                transmission: '',
                nombre_places: '',
                nombre_portes: '',
                climatisation: false,
                gps: false,
                musique: false
            });
        } catch (err) {
            setError('Erreur lors de la sauvegarde de la voiture');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8000/api/admin/voitures/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                fetchVoitures();
            } catch (err) {
                setError('Erreur lors de la suppression de la voiture');
            }
        }
    };

    const handleEdit = (voiture) => {
        setSelectedVoiture(voiture);
        setFormData({
            marque: voiture.marque,
            modele: voiture.modele,
            annee: voiture.annee,
            categorie: voiture.categorie,
            prix_journalier: voiture.prix_journalier,
            image: voiture.image,
            description: voiture.description,
            carburant: voiture.carburant,
            transmission: voiture.transmission,
            nombre_places: voiture.nombre_places,
            nombre_portes: voiture.nombre_portes,
            climatisation: voiture.climatisation,
            gps: voiture.gps,
            musique: voiture.musique
        });
        setShowForm(true);
    };

    const filteredVoitures = voitures.filter(voiture =>
        voiture.marque.toLowerCase().includes(filterMarque.toLowerCase())
    );

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gestion des Voitures</h2>
                <button
                    onClick={() => {
                        setSelectedVoiture(null);
                        setFormData({
                            marque: '',
                            modele: '',
                            annee: '',
                            categorie: '',
                            prix_journalier: '',
                            image: '',
                            description: '',
                            carburant: '',
                            transmission: '',
                            nombre_places: '',
                            nombre_portes: '',
                            climatisation: false,
                            gps: false,
                            musique: false
                        });
                        setShowForm(true);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                    Ajouter une voiture
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filtrer par marque..."
                    value={filterMarque}
                    onChange={(e) => setFilterMarque(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">
                            {selectedVoiture ? 'Modifier la voiture' : 'Ajouter une voiture'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Marque</label>
                                    <input
                                        type="text"
                                        value={formData.marque}
                                        onChange={(e) => setFormData({...formData, marque: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Modèle</label>
                                    <input
                                        type="text"
                                        value={formData.modele}
                                        onChange={(e) => setFormData({...formData, modele: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Année</label>
                                    <input
                                        type="number"
                                        value={formData.annee}
                                        onChange={(e) => setFormData({...formData, annee: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                                    <input
                                        type="text"
                                        value={formData.categorie}
                                        onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Prix journalier (DH)</label>
                                    <input
                                        type="number"
                                        value={formData.prix_journalier}
                                        onChange={(e) => setFormData({...formData, prix_journalier: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Carburant</label>
                                    <select
                                        value={formData.carburant}
                                        onChange={(e) => setFormData({...formData, carburant: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Sélectionnez...</option>
                                        <option value="Essence">Essence</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Électrique">Électrique</option>
                                        <option value="Hybride">Hybride</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Transmission</label>
                                    <select
                                        value={formData.transmission}
                                        onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">Sélectionnez...</option>
                                        <option value="Manuelle">Manuelle</option>
                                        <option value="Automatique">Automatique</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre de places</label>
                                    <input
                                        type="number"
                                        value={formData.nombre_places}
                                        onChange={(e) => setFormData({...formData, nombre_places: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre de portes</label>
                                    <input
                                        type="number"
                                        value={formData.nombre_portes}
                                        onChange={(e) => setFormData({...formData, nombre_portes: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.climatisation}
                                        onChange={(e) => setFormData({...formData, climatisation: e.target.checked})}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2">Climatisation</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.gps}
                                        onChange={(e) => setFormData({...formData, gps: e.target.checked})}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2">GPS</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.musique}
                                        onChange={(e) => setFormData({...formData, musique: e.target.checked})}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2">Système audio</span>
                                </label>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    {selectedVoiture ? 'Modifier' : 'Ajouter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVoitures.map((voiture) => (
                    <div key={voiture.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={voiture.image}
                            alt={`${voiture.marque} ${voiture.modele}`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">
                                {voiture.marque} {voiture.modele}
                            </h3>
                            <p className="text-gray-600">{voiture.annee}</p>
                            <p className="text-gray-600">{voiture.prix_journalier} DH/jour</p>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={() => handleEdit(voiture)}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(voiture.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminVoitureList;
