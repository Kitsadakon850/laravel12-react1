import React, { useEffect, useState } from 'react';

export default function Quiz4() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // ใช้ Fetch API ดึงข้อมูลจาก API Route (/api/students)
        fetch('/api/students')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('ไม่สามารถโหลดข้อมูลได้');
                }
                return response.json();
            })
            .then((data) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#1e293b' }}>
                    รายชื่อนักศึกษา (Quiz 4)
                </h1>

                {loading && <p style={{ textAlign: 'center' }}>กำลังโหลดข้อมูล...</p>}
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                {!loading && !error && (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#2563eb', color: 'white' }}>
                                <th style={cellStyle}>ID</th>
                                <th style={cellStyle}>รหัสนักศึกษา</th>
                                <th style={cellStyle}>ชื่อ-นามสกุล</th>
                                <th style={cellStyle}>Email</th>
                                <th style={cellStyle}>สาขา</th>
                                <th style={cellStyle}>ชั้นปี</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td style={cellStyle}>{student.id}</td>
                                    <td style={cellStyle}>{student.student_code}</td>
                                    <td style={cellStyle}>{student.name}</td>
                                    <td style={cellStyle}>{student.email}</td>
                                    <td style={cellStyle}>{student.major}</td>
                                    <td style={cellStyle}>{student.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!loading && !error && students.length === 0 && (
                    <p style={{ textAlign: 'center' }}>ไม่พบข้อมูลนักศึกษา</p>
                )}
            </div>
        </div>
    );
}

const cellStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
};