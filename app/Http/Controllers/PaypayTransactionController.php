<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PaypayTransaction;

class PaypayTransactionController extends Controller
{
    public function uploadCsv(Request $request)
    {
        $request->validate([
            'csv' => 'required|file|mimes:csv',
        ]);

        $file = $request->file('csv');
        $data = array_map('str_getcsv', file($file->getRealPath()));
        $header = array_shift($data);
        $jsonData = array_map(fn($row) => array_combine($header, $row), $data);
        $jsonData = array_filter($jsonData, function ($row) {
            return array_filter($row, fn($value) => trim($value) !== '') !== [];
        });
        $jsonData = array_values($jsonData);

        // dd($jsonData);
        for ($i = 0; $i < count($jsonData); $i++) {
            if (isset($jsonData[$i]['取引番号'])) {
                PaypayTransaction::create([
                    'user_id' => auth()->id(),
                    'transaction_date' => $jsonData[$i]["\u{FEFF}取引日"] ?? null,
                    'deposit_amount' => $jsonData[$i]['入金金額（円）'] ?? null,
                    'withdrawal_amount' => $jsonData[$i]['出金金額（円）'] ?? null,
                    'overseas_withdrawal_amount' => $jsonData[$i]['海外出金金額'] ?? null,
                    'currency' => $jsonData[$i]['通貨'] ?? null,
                    'exchange_rate' => $jsonData[$i]['変換レート（円）'] ?? null,
                    'country_of_use' => $jsonData[$i]['利用国'] ?? null,
                    'transaction_details' => $jsonData[$i]['取引内容'] ?? null,
                    'recipient' => $jsonData[$i]['取引先'] ?? null,
                    'payment_method' => $jsonData[$i]['取引方法'] ?? null,
                    'payment_category' => $jsonData[$i]['支払い区分'] ?? null,
                    'user' => $jsonData[$i]['利用者'] ?? null,
                    'transaction_number' => $jsonData[$i]['取引番号'] ?? null,
                ]);
            } else {
                continue;
            }

            // return response()->json($jsonData);
        }
        return Inertia('dashboard');
    }
}
