<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // ... existing code ...
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'azcompany@gmail.com',
            'password' => Hash::make('@azcompany'),
            'created_at' => now(),
            'updated_at' => now()
        ]);
        // ... existing code ...
    }
}
