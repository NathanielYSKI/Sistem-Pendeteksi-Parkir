import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user", // Hardcode role sebagai "user" di frontend
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://greentechsolution.cyou/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.status === "success") {
                Swal.fire({
                  title: "Register Berhasil",
                  text: "Register Data Berhasil",
                  icon: "success",
                  confirmButtonColor: "hsl(33, 96%, 45%)",
                  confirmButtonText: "OK",
                }).then(() => {
                  navigate("/login"); // Ganti dengan halaman tujuan setelah login sukses
                });
              } else {
                Swal.fire({
                  title: "Login Gagal",
                  text: result.message, // Menampilkan pesan error dari server
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Error during registration.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-orange-600">
            {/* Container dengan latar belakang gradien orange */}
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white bg-opacity-30 backdrop-blur-lg space-y-6">
                {/* Logo di atas formulir */}
                <div className="text-center mb-4">
                    <img
                        src="/images/logo.png" // Sesuaikan dengan lokasi gambar logo Anda
                        alt="Logo"
                        className="mx-auto w-40" // Gambar logo dengan ukuran tertentu
                    />
                </div>

                <h2 className="text-4xl font-semibold text-white text-center mb-4">
                    Create Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white font-medium mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-white bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300 ease-in-out"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-white bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300 ease-in-out"
                        />
                    </div>
                    <div>
                        <label className="block text-white font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-white bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300 ease-in-out"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold rounded-lg hover:scale-105 transition duration-300 ease-in-out transform shadow-lg"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-white">
                    Sudah punya akun?{" "}
                    <button
                        className="text-orange-800 hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
