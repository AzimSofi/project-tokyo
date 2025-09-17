<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    /** @use HasFactory<\Database\Factories\ExpenseFactory> */
    use HasFactory;
    protected $fillable = [
        'date',
        'total_amount',
        'food_items_bought_in_bulk',
        'non_food_items_bought_in_bulk',
    ];
}
