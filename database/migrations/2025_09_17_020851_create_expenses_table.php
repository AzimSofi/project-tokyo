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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->date('date')->comment('日付');
            $table->string('total_amount')->comment('円');
            $table->json('food_items_bought_in_bulk')->nullable()->comment('name(商品名)、price(価格)、quantity(数量)、unit(単位)');
            $table->json('non_food_items')->nullable()->comment('name(商品名)、price(価格)、quantity(数量)、unit(単位)');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
