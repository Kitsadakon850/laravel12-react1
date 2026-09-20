<?php

namespace App\Http\Controllers;

use App\Models\Weight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeightController extends Controller
{
    public function index()
    {
        $weights = Weight::orderBy('date', 'asc')->get();
        return Inertia::render('WeightTracker', [
            'weights' => $weights
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'weight' => 'required|numeric|min:1',
            'date' => 'required|date',
        ]);

        Weight::create($validated);
        return redirect()->back();
    }

    public function update(Request $request, Weight $weight)
    {
        $validated = $request->validate([
            'weight' => 'required|numeric|min:1',
            'date' => 'required|date',
        ]);

        $weight->update($validated);
        return redirect()->back();
    }

    public function destroy(Weight $weight)
    {
        $weight->delete();
        return redirect()->back();
    }
}