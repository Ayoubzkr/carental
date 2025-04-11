<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VoitureController extends Controller
{
    public function index(Request $request)
    {
        try {
            Log::info('Début de la récupération des voitures');
            Log::info('Filtres reçus:', $request->all());

            $query = Voiture::query();

            // Filtrage par catégorie
            if ($request->filled('categorie')) {
                $query->whereRaw('LOWER(categorie) = ?', [strtolower($request->categorie)]);
            }

            // Filtrage par disponibilité
            if ($request->filled('disponible')) {
                $disponible = filter_var($request->disponible, FILTER_VALIDATE_BOOLEAN);
                $query->where('disponible', $disponible);
            }

            // Filtrage par prix
            if ($request->filled('prix_min')) {
                $query->where('prix_journalier', '>=', (float) $request->prix_min);
            }
            if ($request->filled('prix_max')) {
                $query->where('prix_journalier', '<=', (float) $request->prix_max);
            }

            // Log pour le débogage
            Log::info('SQL généré:', [
                'sql' => $query->toSql(),
                'bindings' => $query->getBindings()
            ]);

            $voitures = $query->get();
            Log::info('Nombre de voitures trouvées:', ['count' => $voitures->count()]);
            Log::info('Voitures trouvées:', $voitures->toArray());

            if ($voitures->isEmpty()) {
                Log::info('Aucune voiture trouvée dans la base de données');
                return response()->json([], 200);
            }

            return response()->json($voitures);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des voitures:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Erreur lors de la récupération des voitures',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Voiture $voiture)
    {
        try {
            return response()->json($voiture);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération d\'une voiture:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);

            return response()->json([
                'message' => 'Erreur lors de la récupération de la voiture',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
