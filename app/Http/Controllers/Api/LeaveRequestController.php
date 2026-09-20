public function index()
{
    $user = auth()->user();

    // ถ้าเป็น admin ให้เห็นใบลาของทุกคน แต่ถ้าเป็น employee ให้เห็นเฉพาะของตัวเอง
    if ($user->role === 'admin') {
        $leaveRequests = LeaveRequest::with('user')->get();
    } else {
        $leaveRequests = LeaveRequest::where('user_id', $user->id)->get();
    }

    return Inertia::render('LeaveManagement', [
        'leaveRequests' => $leaveRequests,
        'auth' => ['user' => $user]
    ]);
}

public function updateStatus(Request $request, $id)
{
    // เช็กว่าต้องเป็น admin เท่านั้นถึงจะกดอนุมัติ/ปฏิเสธได้
    if (auth()->user()->role !== 'admin') {
        return redirect()->back()->with('error', 'คุณไม่มีสิทธิ์อนุมัติคำร้องนี้');
    }

    $leave = LeaveRequest::findOrFail($id);
    $leave->update(['status' => $request->status]);

    return redirect()->back();
}