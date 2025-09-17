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
                $locationParts = explode(', ', $request->location);
                if (count($locationParts) !== 2 ||
                    !is_numeric($locationParts[0]) ||
                    !is_numeric($locationParts[1])) {
                    throw new Exception('無効な位置情報の形式です。');
                }
                Location::create([
                    'user_id' => auth()->id(),
                    'latitude' => $locationParts[0],
                    'longitude' => $locationParts[1],
                ]);
            });
        } catch (Exception $e) {
            return back()->withErrors(['location' => '無効な位置情報の形式です。', 'error' => $e->getMessage()]);
        }

        return inertia('Dashboard');
    }
}
