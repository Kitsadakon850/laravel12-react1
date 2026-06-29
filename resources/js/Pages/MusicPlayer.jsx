import React, { useState } from "react";
import BootstrapLayout from "@/Layouts/BootstrapLayout"; // ครอบ Layout ส่วนกลาง
import { Head } from "@inertiajs/react";

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <BootstrapLayout>
      <Head title="Music Player" />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            {/* ปรับสไตล์เดิมของคุณให้กลายเป็นการ์ด Bootstrap ที่สวยงามขึ้น */}
            <div className="card text-center shadow border-0 p-4 rounded-3">
              <div className="card-body">
                <h1 className="card-title mb-4">🎵 Music Player</h1>

                {/* แสดงสถานะเสียงด้วย Badge สีสันตามเงื่อนไขของ State */}
                <h2 className="mb-4">
                  สถานะ: 
                  <span className={`badge ms-2 ${isMuted ? "bg-danger" : "bg-success"}`}>
                    {isMuted ? "🔇 ปิดเสียงอยู่" : "🔊 เปิดเสียงอยู่"}
                  </span>
                </h2>

                {/* ปุ่มกดสลับค่า State (Mute / Unmute) */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`btn btn-lg w-100 fw-bold py-3 ${isMuted ? "btn-success" : "btn-danger"}`}
                >
                  {isMuted ? "▶️ เปิดเสียง" : "⏸️ ปิดเสียง"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BootstrapLayout>
  );
}