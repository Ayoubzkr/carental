<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Voiture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;

class ReservationController extends Controller
{
    public function index()
    {
        \Log::info('Fetching reservations for user: ' . Auth::id());
        $reservations = Reservation::where('user_id', Auth::id())
            ->with('voiture')
            ->get();
        \Log::info('Found reservations: ' . $reservations->count());
        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'voiture_id' => 'required|exists:voitures,id',
            'lieu_prise' => 'required|string',
            'lieu_retour' => 'required|string',
            'cin' => 'required|string',
            'permis' => 'required|string'
        ]);

        $voiture = Voiture::findOrFail($request->voiture_id);

        // Vérifier si la voiture est disponible pour les dates demandées
        $existingReservation = Reservation::where('voiture_id', $request->voiture_id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('date_debut', [$request->date_debut, $request->date_fin])
                    ->orWhereBetween('date_fin', [$request->date_debut, $request->date_fin])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('date_debut', '<=', $request->date_debut)
                            ->where('date_fin', '>=', $request->date_fin);
                    });
            })
            ->where('statut', '!=', 'annulee')
            ->exists();

        if ($existingReservation) {
            return response()->json(['message' => 'La voiture n\'est pas disponible pour ces dates'], 400);
        }

        $reservation = Reservation::create([
            'user_id' => Auth::id(),
            'voiture_id' => $request->voiture_id,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'lieu_prise' => $request->lieu_prise,
            'lieu_retour' => $request->lieu_retour,
            'cin' => $request->cin,
            'permis' => $request->permis,
            'statut' => 'en_attente'
        ]);

        return response()->json($reservation, 201);
    }

    public function show(Reservation $reservation)
    {
        if ($reservation->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        return response()->json($reservation->load('voiture'));
    }

    public function update(Request $request, Reservation $reservation)
    {
        if ($reservation->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate([
            'date_debut' => 'date',
            'date_fin' => 'date|after:date_debut',
            'statut' => 'in:en_attente,confirmee,annulee'
        ]);

        $reservation->update($request->all());
        return response()->json($reservation);
    }

    public function destroy(Reservation $reservation)
    {
        if ($reservation->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }
        $reservation->delete();
        return response()->json(null, 204);
    }

    public function generateRecu(Reservation $reservation)
    {
        if ($reservation->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $data = [
            'reservation' => $reservation->load('voiture', 'user'),
            'date_emission' => now()->format('d/m/Y'),
        ];

        $pdf = PDF::loadView('recu', $data);
        return $pdf->download('recu_reservation.pdf');
    }
}
