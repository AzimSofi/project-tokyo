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
        Schema::create('paypay_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->string('transaction_date')->nullable()->comment('取引日');
            $table->string('deposit_amount')->nullable()->comment('入金額 (円)');
            $table->string('withdrawal_amount')->nullable()->comment('出金額 (円)');
            $table->string('country_of_use')->nullable()->comment('利用国');

            $table->string('user')->nullable()->comment('利用者');
            $table->string('recipient')->nullable()->comment('取引先');
            $table->string('transaction_details')->nullable()->comment('取引内容');
            $table->string('payment_method')->nullable()->comment('取引方法');
            $table->string('transaction_number')->comment('取引番号');
            $table->unique(['transaction_number', 'transaction_details'], 'unique_transaction_number_transaction_details');

            $table->string('exchange_rate')->nullable()->comment('変換レート (円)');
            $table->string('payment_category')->nullable()->comment('支払い区分');
            $table->string('overseas_withdrawal_amount')->nullable()->comment('海外出金額');
            $table->string('currency')->nullable()->comment('通貨');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paypay_transactions');
    }
};
