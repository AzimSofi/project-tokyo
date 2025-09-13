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
