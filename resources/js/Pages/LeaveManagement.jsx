import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function LeaveManagement({ remainingDays = 10, usedDays = 0, user = {} }) {
    const [leaves, setLeaves] = useState([]);
    const [formData, setFormData] = useState({
        leave_type: 'ลาป่วย',
        start_date: '',
        end_date: '',
        reason: ''
    });

    // ดึงข้อมูลใบลาผ่าน API
    const fetchLeaves = async () => {
        try {
            const res = await fetch('/api/leave-requests');
            const data = await res.json();
            setLeaves(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    // ส่งฟอร์มยื่นคำร้อง
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/leave-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ ...formData, user_id: user?.id })
            });

            if (res.ok) {
                alert('ยื่นใบลาเรียบร้อย');
                setFormData({ leave_type: 'ลาป่วย', start_date: '', end_date: '', reason: '' });
                fetchLeaves();
            }
        } catch (err) {
            console.error(err);
        }
    };

    // เปลี่ยนสถานะ (อนุมัติ / ปฏิเสธ)
    const handleStatusChange = async (id, status) => {
        try {
            const res = await fetch(`/api/leave-requests/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                fetchLeaves();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800">ระบบบริหารการลางาน</h2>}>
            <Head title="Leave Management" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                
                {/* สรุปจำนวนวันลาคงเหลือ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                        <h3 className="text-gray-500 font-medium">วันลาที่ใช้ไปแล้ว (อนุมัติ)</h3>
                        <p className="text-3xl font-bold text-blue-600">{usedDays} วัน</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                        <h3 className="text-gray-500 font-medium">วันลาคงเหลือโดยประมาณ</h3>
                        <p className="text-3xl font-bold text-green-600">{remainingDays} วัน</p>
                    </div>
                </div>

                {/* ฟอร์มยื่นใบลา */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-4">ยื่นคำร้องขอลางาน</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">ประเภทการลา</label>
                            <select 
                                value={formData.leave_type} 
                                onChange={e => setFormData({...formData, leave_type: e.target.value})}
                                className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="ลาป่วย">ลาป่วย</option>
                                <option value="ลากิจ">ลากิจ</option>
                                <option value="ลาพักร้อน">ลาพักร้อน</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">เหตุผลการลา</label>
                            <input 
                                type="text" 
                                required
                                value={formData.reason} 
                                onChange={e => setFormData({...formData, reason: e.target.value})}
                                className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">วันที่เริ่มต้น</label>
                            <input 
                                type="date" 
                                required
                                value={formData.start_date} 
                                onChange={e => setFormData({...formData, start_date: e.target.value})}
                                className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">วันที่สิ้นสุด</label>
                            <input 
                                type="date" 
                                required
                                value={formData.end_date} 
                                onChange={e => setFormData({...formData, end_date: e.target.value})}
                                className="w-full mt-1 border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                ส่งคำร้อง
                            </button>
                        </div>
                    </form>
                </div>

                {/* ตารางรายการใบลาทั้งหมด */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-4">รายการใบลาทั้งหมด</h3>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="p-2">ชื่อผู้ลา</th>
                                <th className="p-2">ประเภท</th>
                                <th className="p-2">วันที่ลา</th>
                                <th className="p-2">จำนวนวัน</th>
                                <th className="p-2">สถานะ</th>
                                <th className="p-2">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="p-2">{item.user?.name || 'N/A'}</td>
                                    <td className="p-2">{item.leave_type}</td>
                                    <td className="p-2">{item.start_date} ถึง {item.end_date}</td>
                                    <td className="p-2">{item.total_days} วัน</td>
                                    <td className="p-2">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            item.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-2 space-x-2">
                                        {user?.role === 'admin' && item.status === 'Pending' ? (
                                            <>
                                                <button 
                                                    onClick={() => handleStatusChange(item.id, 'Approved')} 
                                                    className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                                                >
                                                    อนุมัติ
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusChange(item.id, 'Rejected')} 
                                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                                                >
                                                    ปฏิเสธ
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-xs text-gray-400">
                                                {user?.role === 'admin' ? '-' : 'รอแอดมินดำเนินการ'}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}