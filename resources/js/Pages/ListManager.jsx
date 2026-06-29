import React, { useState } from "react";
import BootstrapLayout from "@/Layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";

export default function ListManager() {
    // โครงสร้าง State และฟังก์ชันเดิมของคุณทั้งหมด (ตรงตามเงื่อนไขเริ่มต้นด้วย Array เปล่า)
    const [items, setItems] = useState([]);
    
    const addItem = () => { 
        setItems([...items, `Item ${items.length + 1}`]); 
    };
    
    const removeItem = (index) => { 
        setItems(items.filter((_, i) => i !== index)); 
    };

    return (
        <BootstrapLayout>
            <div className="container mt-4">
                <Head title="List Manager" />
                
                <h1 className="mb-3">State managed List</h1>
                
                {/* 1. เติมคลาสปุ่ม Bootstrap ให้ปุ่ม Add Item หน้าตาสวยงามเหมือนในสไลด์ */}
                <button className="btn btn-primary mb-4" onClick={addItem}> 
                    Add Item 
                </button>
                
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {items.map((item, index) => (
                        <div className="col" key={index}>
                            <div className="card h-100 shadow-sm">
                                
                                {/* 2. เพิ่มรูปภาพจาก Placeholder ลิงก์ดึงรูปสุ่มตามเลข index จะได้ไม่ซ้ำกัน */}
                                <img 
                                    src={`https://picsum.photos/id/${(index + 10) * 3}/400/250`} 
                                    className="card-img-top" 
                                    alt={item} 
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                                
                                <div className="card-body">
                                    <h5 className="card-title">{item}</h5>
                                    {/* 3. เติมข้อความอธิบายให้ยาวขึ้นเหมือนในสไลด์ต้นแบบ */}
                                    <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                                        This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                    </p>
                                </div>
                                
                                {/* 4. ตกแต่งปุ่ม Remove ด้วยคลาสสีแดง (btn-danger) และทำมุมขอบมนด้านล่างให้รับกับการ์ด */}
                                <div className="card-footer p-0 border-top-0 bg-transparent">
                                    <button 
                                        className="btn btn-danger w-100 rounded-top-0 rounded-bottom py-2" 
                                        onClick={() => removeItem(index)} 
                                    >
                                        Remove
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>                
            </div>
        </BootstrapLayout>
    );
}