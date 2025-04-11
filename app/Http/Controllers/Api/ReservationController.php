<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class ReservationController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'Non authentifié'], 401);
            }

            $reservations = $user->reservations()->with('voiture')->get();
            return response()->json($reservations);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des réservations: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la récupération des réservations'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'Non authentifié'], 401);
            }

            $request->validate([
                'voiture_id' => 'required|exists:voitures,id',
                'date_debut' => 'required|date|after:today',
                'date_fin' => 'required|date|after:date_debut',
            ]);

            $voiture = Voiture::findOrFail($request->voiture_id);

            if (!$voiture->disponible) {
                return response()->json(['message' => 'La voiture n\'est pas disponible'], 400);
            }

            $existingReservation = Reservation::where('voiture_id', $request->voiture_id)
                ->where(function ($query) use ($request) {
                    $query->whereBetween('date_debut', [$request->date_debut, $request->date_fin])
                        ->orWhereBetween('date_fin', [$request->date_debut, $request->date_fin])
                        ->orWhere(function ($q) use ($request) {
                            $q->where('date_debut', '<=', $request->date_debut)
                                ->where('date_fin', '>=', $request->date_fin);
                        });
                })
                ->exists();

            if ($existingReservation) {
                return response()->json(['message' => 'La voiture est déjà réservée pour cette période'], 400);
            }

            $reservation = new Reservation([
                'user_id' => $user->id,
                'voiture_id' => $request->voiture_id,
                'date_debut' => $request->date_debut,
                'date_fin' => $request->date_fin,
                'statut' => 'en_attente'
            ]);

            $reservation->save();

            return response()->json([
                'message' => 'Réservation créée avec succès',
                'reservation' => $reservation
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la création de la réservation: ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la création de la réservation'], 500);
        }
    }

    public function show(Reservation $reservation)
    {
        return response()->json($reservation->load('voiture'));
    }

    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'date_debut' => 'date',
            'date_fin' => 'date|after:date_debut',
            'lieu_prise' => 'string',
            'lieu_retour' => 'string',
            'cin' => 'string',
            'permis' => 'string',
            'statut' => 'in:en_attente,confirmee,annulee'
        ]);

        $reservation->update($validated);
        return response()->json($reservation);
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return response()->json(null, 204);
    }

    public function generateRecu(Reservation $reservation)
    {
        try {
            Log::info('Génération du reçu pour la réservation', ['reservation_id' => $reservation->id]);

            // Vérifier que l'utilisateur est autorisé à voir ce reçu
            if ($reservation->user_id !== Auth::id()) {
                return response()->json(['message' => 'Non autorisé'], 403);
            }

            // Charger les relations nécessaires
            $reservation->load('voiture', 'user');

            $data = [
                'reservation' => $reservation,
                'date_emission' => now()->format('d/m/Y'),
            ];

            // Générer le PDF
            $pdf = PDF::loadView('recu', $data);

            // Retourner le PDF en téléchargement
            return $pdf->download('recu_reservation_' . $reservation->id . '.pdf');
        } catch (\Exception $e) {
            Log::error('Erreur lors de la génération du reçu', [
                'error' => $e->getMessage(),
                'reservation_id' => $reservation->id
            ]);
            return response()->json(['message' => 'Erreur lors de la génération du reçu'], 500);
        }
    }
}
