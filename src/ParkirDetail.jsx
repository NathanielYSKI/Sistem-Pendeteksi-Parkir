import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ParkirDetail() {
    const { mallId } = useParams(); // Mengambil mallId dari URL
    const [parkirDetails, setParkirDetails] = useState([]);
    const location = useLocation();
    const { mallName } = location.state || {};
    const [loading, setLoading] = useState(true);
    const [responseMessage, setResponseMessage] = useState('');

    // Mengambil data parkir berdasarkan mallId
    useEffect(() => {
        fetch(`https://greentechsolution.cyou/data_mall_detail.php?mall_id=${mallId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setParkirDetails(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching parkir data:", error);
                setLoading(false);
            });
    }, [mallId]);

    const updateSlotValue = async (id) => {
        const postData = {
            id: id,    // ID yang ingin dikirim
            value: -1, // Value yang ingin dikirim
        };

        try {
            const response = await fetch('https://greentechsolution.cyou/update_slot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData), // Mengonversi data menjadi JSON
            });

            // Cek apakah respons oke
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Mengurai respons sebagai JSON
            setResponseMessage(`Success: ${data.message}`); // Menampilkan pesan sukses

            return data; // Kembalikan response jika diperlukan
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`); // Menampilkan pesan error
        }
    };

    const handleBooking = async (id) => {
        // Memperbarui nilai di database
        const result = await updateSlotValue(id);
        // Update state untuk menandai slot sebagai dipesan
        if (result && result.status === 'success') {
            setParkirDetails((prevDetails) =>
                prevDetails.map((detail) =>
                    detail.id === id ? { ...detail, value: -1 } : detail // -1 menandakan slot telah dipesan
                )
            );
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Menampilkan loading saat data sedang diambil
    }

    return (
        <div className="bg-white min-h-screen p-4 flex flex-col items-center"> {/* Menambahkan flex untuk sentralisasi */}
            <h1 className="text-3xl font-bold mb-4 text-center relative z-10" style={{ 
                backgroundImage: 'url(https://sika.scene7.com/is/image/sika/glo-car-parking-garage-floor-03:16-9?wid=1920&hei=1080&fit=crop%2C1)',
                backgroundSize: '100% 100%', // Memperbesar lebar gambar latar belakang
                backgroundPosition: 'center',
                color: 'white', // Ubah warna teks agar kontras dengan background
                padding: '60px', // Mengubah padding untuk memperbesar area h1
                borderRadius: '10px', // Membuat sudut membulat
                textShadow: '0 0 2px black', // Menambahkan outline hitam di teks
            }}>
                {mallName}
            </h1> {/* Menampilkan nama mall */}
            {parkirDetails.length === 0 ? (
                <p className="text-lg text-red-600">Tidak ada detail parkir tersedia untuk mall ini.</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-4"> {/* Flexbox untuk menempatkan kotak berdampingan */}
                    {parkirDetails.map((detail) => (
                        <div key={detail.id} className="mb-4">
                            <div className="bg-white rounded-lg border-2 border-black p-4 shadow-md max-w-xs"> {/* Kotak dengan latar belakang putih, outline hitam */}
                                <h2 className="text-xl font-bold text-center">{detail.slot_parkir.toUpperCase()}</h2> {/* Menyelaraskan teks di tengah */}
                                <p className="text-center">Status: {detail.value === 1 ? 'Terisi' : detail.value === -1 ? 'Slot telah dipesan' : 'Tersedia'}</p>
                                <div className="flex justify-center"> {/* Flex untuk menyelaraskan tombol ke tengah */}
                                    <button
                                        className={`px-4 py-2 rounded text-white ${
                                            detail.value === 1 ? 'bg-red-500 cursor-not-allowed' : detail.value === -1 ? 'bg-orange-500 cursor-not-allowed' : 'bg-green-500'
                                        }`}
                                        disabled={detail.value === 1 || detail.value === -1} // Disable button jika value 1 atau -1
                                        onClick={() => handleBooking(detail.id)} // Panggil fungsi untuk memesan slot
                                    >
                                        {detail.value === 1 ? 'Tidak Bisa Dipesan' : detail.value === -1 ? 'Slot telah dipesan' : 'Pesan Slot'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ParkirDetail;
