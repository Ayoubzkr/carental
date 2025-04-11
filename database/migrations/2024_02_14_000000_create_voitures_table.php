<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voitures', function (Blueprint $table) {
            $table->id();
            $table->string('marque');
            $table->string('modele');
            $table->integer('annee');
            $table->string('categorie');
            $table->decimal('prix_journalier', 10, 2);
            $table->boolean('disponible')->default(true);
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->string('carburant');
            $table->string('transmission');
            $table->integer('nombre_places');
            $table->integer('nombre_portes');
            $table->boolean('climatisation')->default(false);
            $table->boolean('gps')->default(false);
            $table->boolean('musique')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voitures');
    }
};
