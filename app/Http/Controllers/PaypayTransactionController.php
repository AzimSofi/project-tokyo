<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\PaypayTransaction;
use Exception;
use Inertia\Inertia;

class PaypayTransactionController extends Controller
{
    public function uploadCsv(Request $request)
    {
        $request->validate([
            'csv' => 'required|file|mimetypes:text/csv,text/plain|ends_with:.csv',
        ]);

        $file = $request->file('csv');
        $data = array_map('str_getcsv', file($file->getRealPath()));
        $header = array_shift($data);
        $header = array_map(fn($h) => preg_replace('/^\x{FEFF}/u', '', $h), $header);
        $jsonData = array_map(fn($row) => array_combine($header, $row), $data);
        $jsonData = array_filter($jsonData, function ($row) {
            return array_filter($row, fn($value) => trim($value) !== '') !== [];
        });
        $jsonData = array_values($jsonData);

        try {
            DB::transaction(function () use ($jsonData) {
                for ($i = 0; $i < count($jsonData); $i++) {
                    if (!isset($jsonData[$i]['取引番号'])) {
                        continue;
                    }
                    PaypayTransaction::create([
                        'user_id' => auth()->id(),
                        'transaction_date' => $jsonData[$i]["取引日"] ?? null,
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
                }
            });
        } catch (Exception $e) {
            Log::error('残念、CSVインポート失敗： ' . $e->getMessage());
            return back()->withErrors(['csv' => 'CSVのインポート中にエラーが発生しました。']);
        }
        return Inertia('dashboard');
    }
}
