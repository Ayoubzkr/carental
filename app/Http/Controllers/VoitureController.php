<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Log::info('Starting car fetch request');
        Log::info('Request parameters:', $request->all());
        Log::info('Request headers:', $request->headers->all());

        try {
            $query = Voiture::query();

            // Filtrage par catégorie
            if ($request->has('categorie') && !empty($request->categorie)) {
                Log::info('Filtrage par catégorie', ['categorie' => $request->categorie]);
                $query->where('categorie', $request->categorie);
            }

            // Filtrage par disponibilité
            if ($request->has('disponible')) {
                Log::info('Filtrage par disponibilité', ['disponible' => $request->disponible]);
                $query->where('disponible', $request->disponible === 'true');
            }

            // Filtrage par prix
            if ($request->has('prix_min') && !empty($request->prix_min)) {
                $query->where('prix_journalier', '>=', $request->prix_min);
            }
            if ($request->has('prix_max') && !empty($request->prix_max)) {
                $query->where('prix_journalier', '<=', $request->prix_max);
            }

            $voitures = $query->get();
            Log::info('Query completed. Found cars:', ['count' => $voitures->count()]);

            if ($voitures->count() > 0) {
                Log::info('Première voiture trouvée', ['voiture' => $voitures->first()->toArray()]);
            } else {
                Log::info('Aucune voiture trouvée');
            }

            return response()->json($voitures)
                ->header('Access-Control-Allow-Origin', $request->header('Origin'))
                ->header('Access-Control-Allow-Credentials', 'true');
        } catch (\Exception $e) {
            Log::error('Error fetching cars:', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Erreur lors de la récupération des voitures'], 500)
                ->header('Access-Control-Allow-Origin', $request->header('Origin'))
                ->header('Access-Control-Allow-Credentials', 'true');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $voiture = Voiture::findOrFail($id);
        return response()->json($voiture);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Voiture $voiture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Voiture $voiture)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Voiture $voiture)
    {
        //
    }
}
