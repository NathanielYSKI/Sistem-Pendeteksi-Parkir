import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
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
    const loginData = {
      usernameOrEmail: formData.usernameOrEmail,
      password: formData.password,
    };

    try {
      const response = await fetch("https://greentechsolution.cyou/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (result.status === "success") {
        // Menyimpan username di localStorage
        localStorage.setItem("username", result.user.username);

        Swal.fire({
          title: "Login Berhasil",
          text: "Selamat datang kembali!",
          icon: "success",
          confirmButtonColor: "hsl(33, 96%, 45%)",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          title: "Login Gagal",
          text: result.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Terjadi kesalahan",
        text: "Terjadi kesalahan saat login. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-orange-600">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-white bg-opacity-30 backdrop-blur-lg space-y-6">
        <div className="text-center mb-4">
          <img src="/images/logo.png" alt="Logo" className="mx-auto w-40" />
        </div>

        <h2 className="text-4xl font-semibold text-white text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Username</label>
            <input
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
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
            Login
          </button>
        </form>
        <p className="text-center text-white">
          Belum punya akun?{" "}
          <button
            className="text-orange-800 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
