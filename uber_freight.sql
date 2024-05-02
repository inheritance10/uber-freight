-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 02 May 2024, 20:13:07
-- Sunucu sürümü: 10.4.28-MariaDB
-- PHP Sürümü: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `uber_freight`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `carrier`
--

CREATE TABLE `carrier` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `km_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `carrier`
--

INSERT INTO `carrier` (`id`, `name`, `username`, `email`, `password`, `km_price`) VALUES
(1, 'ali', 'fdsg', 'a@gmail.com', '$2b$10$WT1tEL2xKsC1Dlkr.AIBbuk0cVIPb9P/IpMOWjp5A4tOYo4kdlNvK', 22);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `customer`
--

INSERT INTO `customer` (`id`, `name`, `username`, `email`, `password`) VALUES
(1, 'alii', 'gfds', 'a@gmail.com', '$2b$10$Z8yE8xOTt2bCxN1RR/MQDOZQzld/JTJYuk7UwvGFfM3sci8p7.8ue');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `favorite_carrier`
--

CREATE TABLE `favorite_carrier` (
  `id` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `carrierId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `favorite_carrier`
--

INSERT INTO `favorite_carrier` (`id`, `customerId`, `carrierId`) VALUES
(3, 1, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `promotion`
--

CREATE TABLE `promotion` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `discount_amount` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `carrierId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `promotion`
--

INSERT INTO `promotion` (`id`, `code`, `description`, `discount_amount`, `start_date`, `end_date`, `carrierId`) VALUES
(5, '11j0o', 'gfşksjgşsfajg', 22, '2024-06-07 00:00:00', '2024-06-09 00:00:00', 1);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `carrier`
--
ALTER TABLE `carrier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_90cd996226627e2d2b513986c7` (`email`);

--
-- Tablo için indeksler `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fdb2f3ad8115da4c7718109a6e` (`email`);

--
-- Tablo için indeksler `favorite_carrier`
--
ALTER TABLE `favorite_carrier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_b9bfc4b386a5388cc5149827ca4` (`customerId`),
  ADD KEY `FK_d67d2f775deced308ece7945ff4` (`carrierId`);

--
-- Tablo için indeksler `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_10302d9e74ea105a43e99d11def` (`carrierId`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `carrier`
--
ALTER TABLE `carrier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Tablo için AUTO_INCREMENT değeri `favorite_carrier`
--
ALTER TABLE `favorite_carrier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `favorite_carrier`
--
ALTER TABLE `favorite_carrier`
  ADD CONSTRAINT `FK_b9bfc4b386a5388cc5149827ca4` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d67d2f775deced308ece7945ff4` FOREIGN KEY (`carrierId`) REFERENCES `carrier` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Tablo kısıtlamaları `promotion`
--
ALTER TABLE `promotion`
  ADD CONSTRAINT `FK_10302d9e74ea105a43e99d11def` FOREIGN KEY (`carrierId`) REFERENCES `carrier` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
