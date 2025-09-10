<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaypayTranscation extends Model
{
    protected $table = 'paypay_transactions';

    protected $fillable = [
        'user_id',
        'deposit_amount',
        'withdrawal_amount',
        'country_of_use',
        'user',
        'recipient',
        'transaction_details',
        'payment_method',
        'transaction_number',
        'exchange_rate',
        'payment_category',
        'overseas_withdrawal_amount',
        'currency',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
