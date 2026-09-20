import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function WeightTracker({ weights }) {
    const { data, setData, post, reset } = useForm({
        weight: '',
        date: new Date().toISOString().split('T')[0],
    });

    const [editingId, setEditingId] = useState(null);

    const chartData = {
        labels: weights.map(w => w.date),
        datasets: [
            {
                label: 'น้ำหนัก (กก.)',
                data: weights.map(w => w.weight),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.2,
            },
        ],
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            router.put(`/weights/${editingId}`, data, {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                }
            });
        } else {
            post('/weights', {
                onSuccess: () => reset()
            });
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setData({
            weight: item.weight,
            date: item.date,
        });
    };

    const handleDelete = (id) => {
        if (confirm('ยืนยันการลบข้อมูลน้ำหนักนี้?')) {
            router.delete(`/weights/${id}`);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2>ระบบบันทึกน้ำหนัก (Weight Tracker)</h2>

            {/* แสดงกราฟน้ำหนัก */}
            <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <Line data={chartData} />
            </div>

            {/* ฟอร์มบันทึก / แก้ไข */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    type="number"
                    step="0.1"
                    placeholder="น้ำหนัก (กก.)"
                    value={data.weight}
                    onChange={e => setData('weight', e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={data.date}
                    onChange={e => setData('date', e.target.value)}
                    required
                />
                <button type="submit">{editingId ? 'อัปเดตน้ำหนัก' : 'บันทึกน้ำหนัก'}</button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); reset(); }}>ยกเลิก</button>
                )}
            </form>

            {/* ตารางแสดงรายการ */}
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>วันที่</th>
                        <th>น้ำหนัก (กก.)</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {weights.map((item) => (
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.weight}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>แก้ไข</button> {' '}
                                <button onClick={() => handleDelete(item.id)}>ลบ</button>
                            </td>
                        </tr>
                    ))}
                    {weights.length === 0 && (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>ยังไม่มีข้อมูลน้ำหนัก</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}