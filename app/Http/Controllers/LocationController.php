<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Location;
use Illuminate\Support\Facades\DB;
use Exception;

class LocationController extends Controller
{
    public function saveLocation(Request $request)
    {
        $request->validate([
            'location' => 'required|string',
        ]);
        try {
            DB::transaction(function () use ($request) {
                if (count($request->location) !== 2 &&
                    !is_numeric(explode(', ', $request->location)[0]) &&
                    !is_numeric(explode(', ', $request->location)[1])) {
                    throw new Exception('無効な位置情報の形式です。');
                }
                Location::create([
                    'user_id' => auth()->id(),
                    'latitude' => explode(', ', $request->location)[0],
                    'longitude' => explode(', ', $request->location)[1],
                ]);
            });
        } catch (Exception $e) {
            return back()->withErrors(['location' => '無効な位置情報の形式です。', 'error' => $e->getMessage()]);
        }

        return inertia('Dashboard');
    }
}
