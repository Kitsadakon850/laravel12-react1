import React from 'react';

export default function BootstrapLayout({ children }) {
    return (
        <div>
            {/* คุณสามารถเพิ่ม Navbar หรือเมนูส่วนหัวตรงนี้ได้ในอนาคต */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
                <div className="container">
                    <a className="navbar-brand" href="#">My App (Bootstrap)</a>
                </div>
            </nav>

            {/* children คือเนื้อหาของหน้าเว็บแต่ละหน้า (เช่น หน้า Form หรือ หน้า Counter) ที่จะมาแสดงตรงนี้ */}
            <main>
                {children}
            </main>
        </div>
        
    );
}

