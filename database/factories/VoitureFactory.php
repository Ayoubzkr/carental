<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Voiture;

class VoitureFactory extends Factory
{
    protected $model = Voiture::class;

    public function definition()
    {
        $categories = ['suv', 'berlines', 'crossover', 'compact', 'breaks', 'cabriolets'];
        $marques = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Peugeot', 'Renault'];
        $carburants = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
        $transmissions = ['Manuelle', 'Automatique'];

        return [
            'marque' => $this->faker->randomElement($marques),
            'modele' => $this->faker->word,
            'annee' => $this->faker->numberBetween(2015, 2024),
            'categorie' => $this->faker->randomElement($categories),
            'prix_journalier' => $this->faker->numberBetween(50, 300),
            'disponible' => $this->faker->boolean(90),
            'image' => 'voitures/' . $this->faker->numberBetween(1, 10) . '.jpg',
            'description' => $this->faker->paragraph,
            'carburant' => $this->faker->randomElement($carburants),
            'transmission' => $this->faker->randomElement($transmissions),
            'nombre_places' => $this->faker->numberBetween(2, 7),
            'nombre_portes' => $this->faker->numberBetween(2, 5),
            'climatisation' => $this->faker->boolean(90),
            'gps' => $this->faker->boolean(80),
            'musique' => $this->faker->boolean(95),
        ];
    }
}
