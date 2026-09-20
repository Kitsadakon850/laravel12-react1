<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LeaveRequestController extends Controller
{
    // ดึงรายการใบลาทั้งหมด
    public function index()
    {
        $leaves = LeaveRequest::with('user')->latest()->get();
        return response()->json($leaves);
    }

    // พนักงานยื่นใบลาใหม่ (คำนวณจำนวนวันลาอัตโนมัติ)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'leave_type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string',
        ]);

        // คำนวณจำนวนวันลาอัตโนมัติ
        $start = Carbon::parse($validated['start_date']);
        $end = Carbon::parse($validated['end_date']);
        $validated['total_days'] = $start->diffInDays($end) + 1;

        $leave = LeaveRequest::create($validated);

        return response()->json(['message' => 'ยื่นใบลาเรียบร้อยแล้ว', 'data' => $leave], 201);
    }

    // หัวหน้ากด อนุมัติ / ปฏิเสธ
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Approved,Rejected'
        ]);

        $leave = LeaveRequest::findOrFail($id);
        $leave->update(['status' => $validated['status']]);

        return response()->json(['message' => 'อัปเดตสถานะสำเร็จ', 'data' => $leave]);
    }

    // ลบรายการใบลา
    public function destroy($id)
    {
        LeaveRequest::destroy($id);
        return response()->json(['message' => 'ลบรายการสำเร็จ']);
    }
}