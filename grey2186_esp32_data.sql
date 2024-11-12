-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 12 Nov 2024 pada 10.00
-- Versi server: 10.6.19-MariaDB-cll-lve
-- Versi PHP: 8.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grey2186_esp32_data`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_mall`
--

CREATE TABLE `data_mall` (
  `id` int(11) NOT NULL,
  `nama_mall` varchar(255) NOT NULL,
  `image_mall` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `data_mall`
--

INSERT INTO `data_mall` (`id`, `nama_mall`, `image_mall`) VALUES
(1, 'Duta Periwi Mall', 'https://dutapertiwi.com/app/uploads/2021/09/DPMall.jpg'),
(2, 'Paragon Mall', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/99/b9/23/20151124-165301-largejpg.jpg?w=1200&h=1200&s=1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_park`
--

CREATE TABLE `data_park` (
  `id` int(11) NOT NULL,
  `mall_id` int(11) NOT NULL,
  `slot_parkir` varchar(255) NOT NULL,
  `id_ultrasonic` varchar(255) NOT NULL,
  `id_photoresistor` varchar(255) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `data_park`
--

INSERT INTO `data_park` (`id`, `mall_id`, `slot_parkir`, `id_ultrasonic`, `id_photoresistor`, `value`) VALUES
(1, 1, 'B1-001', 'Ultrasonic_001', 'LuxSensor_001', -1),
(2, 1, 'B1-002', 'Ultrasonic-002', 'LuxSensor-002', 1),
(3, 2, 'B1-003', 'Ultrasonic-003', 'LuxSensor-003', -1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_photoresistor`
--

CREATE TABLE `data_photoresistor` (
  `id` int(6) UNSIGNED NOT NULL,
  `device_id` varchar(50) NOT NULL,
  `sensor_value` int(2) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `data_photoresistor`
--

INSERT INTO `data_photoresistor` (`id`, `device_id`, `sensor_value`, `timestamp`) VALUES
(1, 'LuxSensor_001', 1, '2024-11-02 07:22:57');

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_ultrasonic`
--

CREATE TABLE `data_ultrasonic` (
  `id` int(255) NOT NULL,
  `device_id` varchar(255) NOT NULL,
  `sensor_value` int(2) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data untuk tabel `data_ultrasonic`
--

INSERT INTO `data_ultrasonic` (`id`, `device_id`, `sensor_value`, `timestamp`) VALUES
(3, 'Ultrasonic_001', 0, '2024-11-04 03:46:27');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `data_mall`
--
ALTER TABLE `data_mall`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `data_park`
--
ALTER TABLE `data_park`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `data_photoresistor`
--
ALTER TABLE `data_photoresistor`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `data_ultrasonic`
--
ALTER TABLE `data_ultrasonic`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_id` (`device_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `data_mall`
--
ALTER TABLE `data_mall`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `data_park`
--
ALTER TABLE `data_park`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `data_photoresistor`
--
ALTER TABLE `data_photoresistor`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `data_ultrasonic`
--
ALTER TABLE `data_ultrasonic`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
