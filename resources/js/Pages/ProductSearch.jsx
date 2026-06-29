import React, { useState } from "react";
import BootstrapLayout from "@/Layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";

export default function ProductSearch() {
    // 1. ข้อมูลเกมในร้าน (Master Data)
    const gamesData = [
        { id: 1, name: "Elden Ring", category: "Action RPG", price: 1790, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2iYUZeztetyKx8K4s8a6oFqRasusPGjbAdw&s" },
        { id: 2, name: "Cyberpunk 2077", category: "Open World", price: 1340, img: "https://picsum.photos/id/1062/300/200" },
        { id: 3, name: "EA SPORTS FC 24", category: "Sports", price: 1890, img: "https://picsum.photos/id/1050/300/200" },
        { id: 4, name: "Hogwarts Legacy", category: "Magic RPG", price: 1590, img: "https://picsum.photos/id/1043/300/200" },
        { id: 5, name: "Resident Evil 4 Remake", category: "Horror", price: 1490, img: "https://picsum.photos/id/1074/300/200" },
        { id: 6, name: "Street Fighter 6", category: "Fighting", price: 1650, img: "https://picsum.photos/id/1084/300/200" },
    ];

    // 2. State สำหรับระบบค้นหา
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // 3. State สำหรับระบบตะกร้าซื้อเกม (เริ่มต้นเป็น Array ว่าง [])
    const [cart, setCart] = useState([]);

    // 4. ฟังก์ชันกดซื้อเกม (เพิ่มเกมลงตะกร้า State)
    const addToCart = (game) => {
        // เช็คว่าในตะกร้ามีเกมนี้อยู่หรือยัง ถ้ามีแล้วไม่ให้เพิ่มซ้ำ
        if (cart.some(item => item.id === game.id)) {
            alert("เกมนี้อยู่ในตะกร้าของคุณแล้ว!");
            return;
        }
        setCart([...cart, game]); // อัปเดต Array State ด้วยตัวเก่า + ตัวใหม่
    };

    // 5. ฟังก์ชันลบเกมออกจากตะกร้า
    const removeFromCart = (gameId) => {
        setCart(cart.filter(item => item.id !== gameId));
    };

    // 6. คำนวณราคารวมทั้งหมดสดๆ จากการอัปเดตของ State ตะกร้า
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    // 7. ฟังก์ชันตัวกรองค้นหา Real-time
    const filteredGames = gamesData.filter((game) => {
        const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <BootstrapLayout>
            <Head title="Game Store" />
            <div className="container mt-4">
                <h1 className="mb-4">🎮 Game Store & Shopping Cart</h1>

                <div className="row g-4">
                    {/* ฝั่งซ้าย: หน้าร้านค้าและการค้นหา */}
                    <div className="col-lg-8">
                        {/* กล่องค้นหา */}
                        <div className="row g-3 mb-4 bg-light p-3 rounded shadow-sm">
                            <div className="col-md-7">
                                <label className="form-label fw-bold">ค้นหาชื่อเกม</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="พิมพ์ชื่อเกมเพื่อค้นหา..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="col-md-5">
                                <label className="form-label fw-bold">หมวดหมู่เกม</label>
                                <select
                                    className="form-select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="All">ทั้งหมด (All Genres)</option>
                                    <option value="Action RPG">Action RPG</option>
                                    <option value="Open World">Open World</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Magic RPG">Magic RPG</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Fighting">Fighting</option>
                                </select>
                            </div>
                        </div>

                        {/* แสดงเกมแบบ Grid */}
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {filteredGames.map((game) => (
                                <div className="col" key={game.id}>
                                    <div className="card h-100 shadow-sm position-relative">
                                        <span className="position-absolute top-0 start-0 badge bg-dark m-2 fs-6">
                                            {game.category}
                                        </span>
                                        <img src={game.img} className="card-img-top" alt={game.name} style={{ height: "180px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold">{game.name}</h5>
                                            <p className="card-text text-success fs-4 fw-bold">
                                                ฿{game.price.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="card-footer bg-transparent border-top-0">
                                            <button 
                                                className="btn btn-primary w-100 fw-bold"
                                                onClick={() => addToCart(game)}
                                            >
                                                🛒 Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredGames.length === 0 && (
                            <div className="text-center my-5 py-5 text-muted bg-light rounded border">
                                <h3>❌ ไม่พบเกมที่ค้นหา</h3>
                            </div>
                        )}
                    </div>

                    {/* ฝั่งขวา: ตะกร้าสินค้าและยอดรวมเงิน */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
                            <div className="card-header bg-dark text-white fw-bold fs-5 py-3">
                                🛒 ตะกร้าสินค้า ({cart.length})
                            </div>
                            <div className="card-body p-0">
                                {cart.length === 0 ? (
                                    <div className="text-center py-5 text-muted">
                                        <p className="mb-0 fs-5">ไม่มีเกมในตะกร้า</p>
                                        <small>กดซื้อเกมจากฝั่งซ้ายได้เลย!</small>
                                    </div>
                                ) : (
                                    <ul className="list-group list-group-flush">
                                        {cart.map((item) => (
                                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                                <div>
                                                    <h6 className="my-0 fw-bold">{item.name}</h6>
                                                    <small className="text-muted">฿{item.price.toLocaleString()}</small>
                                                </div>
                                                <button 
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    ลบ
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {/* ส่วนรวมเงินท้ายการ์ดตระกร้า */}
                            <div className="card-footer bg-light p-3">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="fs-5 fw-bold">ยอดรวมทั้งหมด:</span>
                                    <span className="fs-4 fw-bold text-success">฿{totalPrice.toLocaleString()}</span>
                                </div>
                                <button 
                                    className="btn btn-success w-100 py-2 fw-bold fs-5"
                                    disabled={cart.length === 0}
                                    onClick={() => {
                                        alert(`🎉 ซื้อเกมสำเร็จแล้ว! ยอดชำระเงินทั้งหมด ฿${totalPrice.toLocaleString()}`);
                                        setCart([]); // ล้างค่าตะกร้าให้ว่างเมื่อกดซื้อ
                                    }}
                                >
                                    Check Out (สั่งซื้อ)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BootstrapLayout>
    );
}