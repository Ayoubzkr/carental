<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Voiture;

class VoitureSeeder extends Seeder
{
    public function run()
    {
        // Désactiver les contraintes de clé étrangère
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        // Vider la table
        Voiture::truncate();

        // Charger les données
        $voitures = require database_path('seeders/voitures_data.php');

        // Insérer les données
        foreach ($voitures as $voiture) {
            Voiture::create($voiture);
        }

        // Réactiver les contraintes de clé étrangère
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
}
