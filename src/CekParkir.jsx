// src/CekParkir.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CekParkir() {
    const navigate = useNavigate();
    const [malls, setMalls] = useState([]);

    // Mengambil data dari API saat komponen di-mount
    useEffect(() => {
        fetch("https://greentechsolution.cyou/data_mall.php")
            .then((response) => response.json())
            .then((data) => {
                console.log("Data mall:", data); // Cek data yang diterima
                setMalls(data);
            })
            .catch((error) => console.error("Error fetching mall data:", error));
    }, []);

    return (
        <div className="bg-white min-h-screen p-4 space-y-6 flex flex-col items-center">
            {malls.map((mall, index) => {
                // Log untuk memeriksa URL gambar
                const imageUrl = mall.image_mall ? mall.image_mall : "Gambar tidak tersedia";
                console.log(`Mall: ${mall.nama_mall}, Image URL: ${imageUrl}`);

                return (
                    <div
                        key={index}
                        className="relative w-11/12 max-w-screen-lg h-64 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
                        style={{
                            backgroundImage: `url(${imageUrl})`,
                        }}
                    >
                        {/* Nama Mall di Kiri Atas */}
                        <div className="absolute top-4 left-4 text-white font-bold text-2xl bg-black bg-opacity-60 px-4 py-2 rounded">
                            {mall.nama_mall}
                        </div>
                        
                        {/* Tombol Cek Parkir di Kanan Bawah */}
                        <button
                            onClick={() => navigate(`/cek-parkir/${mall.id}`, { state: { mallName: mall.nama_mall } })} // Gunakan mall.id
                            className="absolute bottom-4 right-4 px-6 py-3 bg-black bg-opacity-50 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Cek Parkir
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default CekParkir;
