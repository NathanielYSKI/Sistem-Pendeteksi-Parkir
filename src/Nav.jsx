import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Nav.module.css';

const Nav = () => {
    // Mendapatkan username dari localStorage
    const username = localStorage.getItem('username');

    // Daftar menu navigasi
    const options = [
        { id: 0, text: 'Cek Parkir', path: '/cek-parkir' },
        { id: 1, text: 'EZpoin', path: '#' },
        { id: 2, text: 'EZPay', path: '#' }
    ];

    // Membuat daftar opsi navigasi
    const listOptions = options.map((option) => (
        <li key={option.id}>
            <Link to={option.path} className={styles.option}>{option.text}</Link>
        </li>
    ));

    // Fungsi untuk menampilkan SweetAlert konfirmasi logout
    const handleLogout = () => {
        Swal.fire({
            title: "Logout",
            text: "Apakah anda ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('username'); // Menghapus username dari localStorage
                window.location.reload(); // Me-refresh halaman agar navbar berubah
            }
        });
    };

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                {listOptions}
            </ul>
            {/* Jika sudah login, tampilkan nama pengguna dan tombol logout */}
            {username ? (
                <div className={styles.user}>
                    <span
                        className={styles.view_plans_btn_bar}
                        onClick={handleLogout} // Klik username untuk logout
                    >
                        {username}
                    </span>
                </div>
            ) : (
                // Jika belum login, tampilkan tombol Login/Register
                <Link to="/login" className={styles.view_plans_btn_bar}>Login/Register</Link>
            )}
        </nav>
    );
};

export default Nav;
