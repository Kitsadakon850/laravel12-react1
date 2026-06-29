import React, { useState } from "react"; // นำเข้า React และ useState ให้ถูกต้อง
import { Head } from "@inertiajs/react";

export default function Counter() {

    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    return (
        // เปลี่ยนจาก <BootstrapLayout> เป็นแท็กเปล่าสำหรับห่อหุ้มคอมโพเนนต์ (<> และ </>)
        <>                     
            <Head title="Counter"/>
            <div className="container mt-4">
                <h1 className="text-center mb-4">Counter App</h1>                
                <h5 className="text-center bg-info text-white py-3 fs-1 rounded mb-4">{count}</h5>
                <div className="row text-center">
                    <div className="col-lg-4 mb-2">                
                        <button className="btn btn-warning w-100" onClick={decrement}>ลด</button>      
                    </div>                    
                    <div className="col-lg-4 mb-2">                
                        <button className="btn btn-secondary w-100" onClick={reset}>รีเซ็ท</button>      
                    </div>                    
                    <div className="col-lg-4 mb-2">                
                        <button className="btn btn-success w-100" onClick={increment}>เพิ่ม</button>      
                    </div>                    
                </div>
            </div>
        </>
    );
}