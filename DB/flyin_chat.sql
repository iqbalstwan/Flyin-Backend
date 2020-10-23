-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 23 Okt 2020 pada 14.10
-- Versi server: 10.4.13-MariaDB
-- Versi PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realtime_chat`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `friend`
--

CREATE TABLE `friend` (
  `id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `friend_id` int(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `friend`
--

INSERT INTO `friend` (`id`, `user_id`, `friend_id`, `created_at`) VALUES
(1, 1, 5, '2020-09-26 02:32:14'),
(2, 1, 6, '2020-09-27 04:58:03'),
(3, 1, 10, '2020-09-27 05:24:29'),
(4, 1, 9, '2020-09-27 05:27:04'),
(5, 1, 10, '2020-09-27 07:52:40'),
(6, 5, 1, '2020-09-27 10:13:53'),
(7, 1, 8, '2020-09-28 12:30:48'),
(8, 11, 1, '2020-09-28 14:05:10'),
(9, 11, 6, '2020-09-28 23:03:51'),
(10, 11, 8, '2020-09-29 00:05:15'),
(11, 5, 5, '2020-09-29 00:12:14'),
(12, 13, 1, '2020-09-29 04:33:38'),
(13, 13, 9, '2020-09-29 04:41:29'),
(14, 1, 13, '2020-09-29 04:52:20'),
(15, 14, 13, '2020-09-29 07:29:22'),
(16, 14, 1, '2020-10-18 22:46:53'),
(17, 14, 2, '2020-10-19 08:26:32'),
(18, 15, 14, '2020-10-22 07:08:38'),
(19, 15, 13, '2020-10-22 07:10:38');

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `msg_id` int(20) NOT NULL,
  `roomchat_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `friend_id` int(20) NOT NULL,
  `msg` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `messages`
--

INSERT INTO `messages` (`msg_id`, `roomchat_id`, `user_id`, `friend_id`, `msg`, `created_at`) VALUES
(23, 62774, 14, 13, 'hey', '2020-10-23 12:04:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `profile`
--

CREATE TABLE `profile` (
  `profile_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `profile_img` varchar(250) NOT NULL,
  `profile_name` varchar(250) NOT NULL,
  `profile_telp` varchar(250) NOT NULL,
  `profile_desc` varchar(300) NOT NULL,
  `profile_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profile_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `profile_img`, `profile_name`, `profile_telp`, `profile_desc`, `profile_created_at`, `profile_updated_at`) VALUES
(1, 1, 'blank-profile.jpg', '', '0898998989', 'life is flat', '2020-09-23 23:54:53', '2020-09-29 06:14:55'),
(2, 2, 'blank-profile.jpg', '', '', '', '2020-09-24 04:36:06', '2020-09-24 04:36:06'),
(4, 4, 'blank-profile.jpg', '', '', '', '2020-09-24 04:47:20', '2020-09-24 04:47:20'),
(5, 5, '2020-09-27T10-14-08.519Z-wiener.png', '', '', 'Stay Low', '2020-09-24 04:56:21', '2020-09-27 11:01:55'),
(6, 6, 'blank-profile.jpg', '', '', '', '2020-09-26 14:04:47', '2020-09-26 14:04:47'),
(7, 7, 'blank-profile.jpg', '', '', '', '2020-09-26 14:17:07', '2020-09-26 14:17:07'),
(8, 8, 'blank-profile.jpg', '', '', '', '2020-09-26 15:50:17', '2020-09-26 15:50:17'),
(9, 9, 'blank-profile.jpg', '', '', '', '2020-09-26 15:51:32', '2020-09-26 15:51:32'),
(10, 10, 'blank-profile.jpg', '', '', '', '2020-09-27 01:59:04', '2020-09-27 01:59:04'),
(11, 11, 'blank-profile.jpg', '', '', '', '2020-09-27 02:01:15', '2020-09-27 02:01:15'),
(13, 13, '2020-10-21T13-35-18.416Z-green-macha-tea.jpg', '', '', 'Stand By Me', '2020-09-29 02:42:54', '2020-10-22 00:34:44'),
(14, 14, '2020-10-22T07-11-44.062Z-captain.jpg', '', '', 'life is never flats', '2020-09-29 07:26:19', '2020-10-19 05:16:16'),
(15, 15, '2020-10-22T07-09-29.956Z-chris.jpg', '', '', '', '2020-10-22 07:08:00', '2020-10-22 07:08:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roomchat`
--

CREATE TABLE `roomchat` (
  `id` int(20) NOT NULL,
  `roomchat_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `friend_id` int(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roomchat`
--

INSERT INTO `roomchat` (`id`, `roomchat_id`, `user_id`, `friend_id`, `created_at`) VALUES
(1, 93855, 1, 5, '2020-09-26 04:24:47'),
(2, 50300, 1, 5, '2020-09-27 08:12:27'),
(3, 26979, 1, 6, '2020-09-27 08:16:36'),
(4, 26979, 1, 6, '2020-09-27 08:16:36'),
(5, 56290, 1, 7, '2020-09-27 08:18:01'),
(6, 56290, 7, 1, '2020-09-27 08:18:01'),
(7, 41708, 1, 5, '2020-09-28 11:27:14'),
(8, 41708, 5, 1, '2020-09-28 11:27:15'),
(9, 95816, 1, 5, '2020-09-28 11:44:50'),
(10, 95816, 5, 1, '2020-09-28 11:44:50'),
(11, 25265, 1, 10, '2020-09-28 11:45:03'),
(12, 25265, 10, 1, '2020-09-28 11:45:03'),
(13, 22880, 1, 9, '2020-09-28 11:47:00'),
(14, 22880, 9, 1, '2020-09-28 11:47:00'),
(15, 42401, 1, 6, '2020-09-28 12:22:24'),
(16, 42401, 6, 1, '2020-09-28 12:22:24'),
(17, 82403, 1, 8, '2020-09-28 12:31:01'),
(18, 82403, 8, 1, '2020-09-28 12:31:01'),
(19, 24288, 11, 1, '2020-09-28 14:05:23'),
(20, 24288, 1, 11, '2020-09-28 14:05:23'),
(21, 24717, 11, 6, '2020-09-28 23:03:58'),
(22, 24717, 6, 11, '2020-09-28 23:03:58'),
(23, 75784, 13, 1, '2020-09-29 04:34:04'),
(24, 75784, 1, 13, '2020-09-29 04:34:04'),
(25, 44772, 13, 9, '2020-09-29 04:41:41'),
(26, 44772, 9, 13, '2020-09-29 04:41:41'),
(27, 62774, 14, 13, '2020-09-29 07:29:37'),
(28, 62774, 13, 14, '2020-09-29 07:29:37'),
(29, 73896, 14, 1, '2020-10-18 22:46:59'),
(30, 73896, 1, 14, '2020-10-18 22:46:59'),
(31, 90153, 14, 2, '2020-10-20 07:47:32'),
(32, 90153, 2, 14, '2020-10-20 07:47:32'),
(33, 70443, 15, 14, '2020-10-22 07:08:48'),
(34, 70443, 14, 15, '2020-10-22 07:08:48'),
(35, 51182, 15, 13, '2020-10-22 07:10:43'),
(36, 51182, 13, 15, '2020-10-22 07:10:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `user_id` int(20) NOT NULL,
  `user_email` varchar(250) NOT NULL,
  `user_password` varchar(150) NOT NULL,
  `user_name` varchar(250) NOT NULL,
  `user_phone` varchar(250) NOT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_status` int(20) NOT NULL,
  `lat` int(15) NOT NULL,
  `lng` int(15) NOT NULL,
  `user_key` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_name`, `user_phone`, `user_created_at`, `user_updated_at`, `user_status`, `lat`, `lng`, `user_key`) VALUES
(1, 'iqbalwan@yahoo.com', '$2b$08$TIfmfX9iaVsgKGL.61Ow.eAqt3.D9B1Sd.SMQHObXZBGv9RxfAd6S', 'skuy ', '09987777777', '2020-09-23 23:54:53', '2020-10-19 09:27:46', 0, 300, 400, 0),
(2, 'iqbalwanwa@yahoo.com', '$2b$08$dQM22rEsQYK8s1XeXHj94eHn4K3KQq6SQv9xr43MXy7Sv7qayVMsq', 'wanni', '08982227787', '2020-09-24 04:36:06', '2020-09-24 04:36:06', 0, 0, 0, 0),
(4, 'iqbalwaniii@yahoo.com', '$2b$08$4V3y6tYpDn2Bhllou./Ny.h2qGTktBaMxhz9p1pTiMT.5IvAQBt7a', 'iqbal', '08928765678', '2020-09-24 04:47:20', '2020-09-24 04:47:20', 0, 0, 0, 0),
(5, 'iqbal@gmail.com', '$2b$08$58AQ/UKGLteqWls4aPFuqOWbkOwnOJhD3M/I3KNs62q6Bk.P21mJy', 'Iqbal setiawan', '08928765678', '2020-09-24 04:56:21', '2020-09-24 04:56:21', 0, 0, 0, 0),
(6, 'test7@test.com', '$2b$08$u0BJt881WgDb8vuUmuIOfutct.Gi2w9HJsmrStKF5m5T39PzjxkJi', 'namaste', '08928765678', '2020-09-26 14:04:47', '2020-09-26 14:04:47', 0, 0, 0, 0),
(7, 'test8@test.com', '$2b$08$iUtVWsBIZFBN.5jgY1Oj0uIVT85ibX69/fcLlf5.xu4W8MyPUqvHe', 'Iqbal setiawan jon', '08928765678', '2020-09-26 14:17:07', '2020-09-26 14:17:07', 0, 0, 0, 0),
(8, 'test6@test.com', '$2b$08$vDPRHWKRyqOXUbAaTTJQNe9l.LdoZ4knT46TiALCjIWgqkqKfeDCK', 'rokibu', '08928765678', '2020-09-26 15:50:17', '2020-09-26 15:50:17', 0, 0, 0, 0),
(9, 'test9@test.com', '$2b$08$1SzzLAj8ViEFvAzGwmFEZO3z5HhWkbuLufv7H4oJym1.7MRE94bSq', 'vue', '08928765678', '2020-09-26 15:51:32', '2020-09-26 15:51:32', 0, 0, 0, 0),
(10, 'test10@test.com', '$2b$08$fDQaQXlxIFVnROeqbgMYuuzUczlpFXxmUdjiZ2ledAEFEW9XlPkNy', 'adkjbasdk', '08928765678', '2020-09-27 01:59:04', '2020-09-27 01:59:04', 0, 0, 0, 0),
(11, 'test11@test.com', '$2b$08$ruVdXMtr/aCXdYOFFoEdhuaizK0TcA6oViYYDgwzRXL17RmoXyTbK', 'asask', '08928765678', '2020-09-27 02:01:15', '2020-09-27 02:01:15', 0, 0, 0, 0),
(13, 'wanwan@yahoo.com', '$2b$08$KLKybluZxq2UsdG9KARjauTFfIDEq0jYZq8ygc8faBaZhzuOsAE8K', 'Rock Lee', '08928765678', '2020-09-29 02:42:54', '2020-10-22 00:34:11', 0, -7, 107, 0),
(14, 'iqbalstwan@yahoo.com', '$2b$10$Ri9BFjwuCGa5zkRRR697pucoKjWjpsxfPxLDlWU0jbY3mFr7simU.', 'iqbal ma', '081234567897', '2020-09-29 07:26:19', '2020-10-23 12:04:08', 0, -7, 107, 0),
(15, 'danang@yahoo.com', '$2b$08$vA4/suDgnE/iqDNyB8fKtulzTjo7NOmg4Bw3EFTROaRwtszGhyBJm', 'Danang', '08928765676', '2020-10-22 07:08:00', '2020-10-23 10:58:32', 0, -7, 107, 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`msg_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `roomchat`
--
ALTER TABLE `roomchat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `friend`
--
ALTER TABLE `friend`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `messages`
--
ALTER TABLE `messages`
  MODIFY `msg_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `roomchat`
--
ALTER TABLE `roomchat`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
