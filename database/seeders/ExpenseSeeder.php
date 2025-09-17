<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Expense;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Expense::create([
            'user_id' => 1,
            'date' => '2025-09-15',
            'total_amount' => 6226,
            'food_items_bought_in_bulk' => json_encode([
                ['name' => '納豆', 'price' => 93, 'quantity' => 3, 'unit' => '個'],
                ['name' => '玉子', 'price' => 397, 'quantity' => 10, 'unit' => '個'],
                ['name' => 'レタス', 'price' => 198, 'quantity' => 0.5, 'unit' => '玉'],
                ['name' => '緑茶', 'price' => 128, 'quantity' => 2, 'unit' => 'リットル'],
            ]),
            'non_food_items' => json_encode([
                ['name' => 'AC充電器', 'price' => 1870, 'quantity' => 1, 'unit' => '個'],
                ['name' => '傘', 'price' => 798, 'quantity' => 1, 'unit' => '本'],
            ]),
        ]);

        Expense::create([
            'user_id' => 1,
            'date' => '2025-09-16',
            'total_amount' => 1957,
            'food_items_bought_in_bulk' => json_encode([]),
            'non_food_items' => json_encode([
                ['name' => 'シャンプー', 'price' => 528, 'quantity' => 600, 'unit' => '㎖'],
                ['name' => '洗剤', 'price' => 498, 'quantity' => 720, 'unit' => '㎖'],
                ['name' => 'カミソリ', 'price' => 638, 'quantity' => 6, 'unit' => '本'],
            ]),
        ]);
    }

}
