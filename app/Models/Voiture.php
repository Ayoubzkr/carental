<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    use HasFactory;

    protected $fillable = [
        'marque',
        'modele',
        'annee',
        'categorie',
        'prix_journalier',
        'disponible',
        'image',
        'description',
        'carburant',
        'transmission',
        'nombre_places',
        'nombre_portes',
        'climatisation',
        'gps',
        'musique'
    ];

    protected $casts = [
        'disponible' => 'boolean',
        'climatisation' => 'boolean',
        'gps' => 'boolean',
        'musique' => 'boolean',
        'prix_journalier' => 'decimal:2',
        'annee' => 'integer',
        'nombre_places' => 'integer',
        'nombre_portes' => 'integer'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
