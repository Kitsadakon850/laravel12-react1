import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // เปลี่ยนมาใช้ Layout ของ Breeze

export default function Circle() {
    const [items, setItems] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
    const [color, setColor] = useState("blue");

    const onPressButton = () => {
        setColor("red");
    };

    return (
        // หุ้มด้วย AuthenticatedLayout เผื่อให้มีแถบเมนูระบบ หรือถ้าไม่ชอบสามารถเปลี่ยนเป็นแท็กเปล่า <> ... </> ได้ครับ
        <div style={{ padding: '20px' }}> 
            <Head title="Circle and state" />
            
            <div className="container mx-auto mt-5">
                <h1 className="text-2xl font-bold mb-4">Circle and state</h1>
                <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded mb-4" onClick={onPressButton}>
                    Change Color
                </button>
                
                <div className="row row-cols-1 row-cols-md-3 g-4 flex flex-wrap gap-4">
                    {items.map((item, index) => (
                        <div className="col" key={index}>
                            {/* แก้ไขหน่วยวัด width: 100 ให้เป็น '100px' (ใส่เครื่องหมายคำพูดและหน่วย) */}
                            <div style={{ backgroundColor: color, width: '100px', height: '100px', borderRadius: '50%' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}