-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2020 a las 10:47:49
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `music_v2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img`
--

CREATE TABLE `img` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `type` text DEFAULT NULL,
  `rute` text DEFAULT NULL,
  `views` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `img`
--

INSERT INTO `img` (`id`, `name`, `type`, `rute`, `views`) VALUES
(1, 'carousel1', 'carousel', 'view/img/carousel1.jpg', 0),
(2, 'carousel2', 'carousel', 'view/img/carousel2.png', 0),
(3, 'carousel3', 'carousel', 'view/img/carousel3.png', 0),
(4, 'carousel4', 'carousel', 'view/img/carousel4.png', 0),
(5, 'carousel5', 'carousel', 'view/img/carousel5.jpg', 0),
(6, 'carousel6', 'carousel', 'view/img/carousel6.jpg', 0),
(7, 'carousel7', 'carousel', 'view/img/carousel7.jpg', 0),
(8, 'carousel8', 'carousel', 'view/img/carousel8.jpg', 0),
(10, 'POPULAR MUSIC', 'categories', 'view/img/categories1.jpg', 30),
(11, 'POPULAR SPAIN', 'categories', 'view/img/categories2.jpg', 9),
(14, 'RECOMMEND', 'categories', 'view/img/categories3.jpg', 41),
(15, 'PREMIUM', 'premium', 'view/img/premium.png', 0),
(17, 'FAMILY', 'premium', 'view/img/family.png', 0),
(18, 'STUDENT', 'premium', 'view/img/student.png', 0),
(19, 'NEWER', 'categories', 'view/img/categories4.jpg', 3),
(20, 'MORE LISTENED', 'categories', 'view/img/categories5.jpg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `idlikes` int(11) NOT NULL,
  `idusers` varchar(45) DEFAULT NULL,
  `idsongs` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`idlikes`, `idusers`, `idsongs`) VALUES
(25, 'andreu', 'A00'),
(36, 'andreu', 'M02'),
(48, 'andreu', 'A55'),
(49, 'andreu', 'A99'),
(50, 'andreu', 'T43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `map`
--

CREATE TABLE `map` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `map`
--

INSERT INTO `map` (`id`, `name`, `lat`, `lng`) VALUES
(1, 'concert1', 38.905081, -0.544696),
(2, 'concert2', 38.822001, -0.606689),
(3, 'concert3', 38.992628, -0.516578),
(4, 'concert4', 38.9844, -0.161807);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase`
--

CREATE TABLE `purchase` (
  `id` int(11) NOT NULL,
  `id_purchase` varchar(45) DEFAULT NULL,
  `product` varchar(45) DEFAULT NULL,
  `units` varchar(45) DEFAULT NULL,
  `user` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `purchase`
--

INSERT INTO `purchase` (`id`, `id_purchase`, `product`, `units`, `user`) VALUES
(60, '0', '1', '2', 'andreu'),
(61, '0', '2', '3', 'andreu'),
(62, '0', '3', '1', 'andreu'),
(63, '1', '1', '6', 'andreu'),
(64, '1', '2', '3', 'andreu'),
(65, '1', '3', '1', 'andreu'),
(66, '1', '1', '1', 'andreu'),
(67, '1', '2', '2', 'andreu'),
(68, '1', '3', '2', 'andreu'),
(69, '1', '1', '3', 'andreu'),
(70, '1', '2', '1', 'andreu'),
(71, '1', '3', '2', 'andreu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `users` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shop`
--

INSERT INTO `shop` (`id`, `name`, `users`, `price`, `img`) VALUES
(1, 'FAMILY', 6, 15, 'view/img/family.png'),
(2, 'PREMIUM', 1, 9, 'view/img/premium.png'),
(3, 'STUDENT', 1, 5, 'view/img/student.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `id_song` text DEFAULT NULL,
  `song_name` text DEFAULT NULL,
  `singer` text DEFAULT NULL,
  `album` text DEFAULT NULL,
  `relase_date` text DEFAULT NULL,
  `genre` text DEFAULT NULL,
  `duration` text DEFAULT NULL,
  `playlists` int(11) DEFAULT NULL,
  `id_img` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `songs`
--

INSERT INTO `songs` (`id`, `id_song`, `song_name`, `singer`, `album`, `relase_date`, `genre`, `duration`, `playlists`, `id_img`, `views`) VALUES
(112, 'A01', 'Test', 'Me', 'Tester', '07/01/2020', 'Rock:Pop:', '3:00', 10, 1, 7),
(113, 'A02', 'ProgrammerLife', 'LilXero', 'DAW', '07/01/2020', 'Pop:Blues:', '1:30', 10, 2, 1034),
(127, 'A99', 'uihi', 'hi', 'kjb', '29/01/2020', 'Blues:', '1:53', 14, 4, 1098),
(128, 'M02', 'check', 'me', 'test', '27/02/2020', 'Rock:Pop:', '3:25', 11, 5, 1),
(131, 'B01', 'checkdel', 'test1', 'del', '27/02/2020', 'Rock:Pop:', '4:37', 10, 6, 1),
(132, 'M03', 'TestM', 'Me', 'Test', '27/02/2020', 'Pop:', '3:35', 10, 7, 2),
(134, 'C01', 'categoriestest', 'categories', 'test', '27/02/2020', 'Rock:Pop:', '2:28', 10, 0, 1),
(135, 'A55', 'est', 'yguy', 'guy', '09/03/2020', 'Rock:', '2:10', 10, NULL, 0),
(136, 'T43', 'LOL', 'MarcTorres', 'LOL', '31/03/2020', 'Blues:', '2:51', 19, NULL, 2),
(137, 'A00', 'gjk', 'fdg', 'sgdf', '18/03/2020', 'Blues:', '2:17', 20, NULL, 0),
(138, 'A98', 'Work', 'gfh', 'sdaf', '07/03/2020', 'Pop:', '5:33', 20, NULL, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idusers` varchar(300) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `psswd` varchar(300) DEFAULT NULL,
  `type` varchar(45) DEFAULT 'client',
  `avatar` varchar(300) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 0,
  `token` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idusers`, `username`, `email`, `psswd`, `type`, `avatar`, `active`, `token`) VALUES
('andreu', 'andreu', 'andreuolleria@gmail.com', '$2y$10$e/Uw6/a/Mr8PwwKxdXSmA.2q5mV5U7vFbWWaluCQfglX7sKc/2j0S', 'client', 'https://www.gravatar.com/avatar/5f24d4c305f9bd79a2d093422059e1c6', 1, 'b1a4d80cca82e72c5139dc1419b12653');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`idlikes`);

--
-- Indices de la tabla `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idusers`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `img`
--
ALTER TABLE `img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `idlikes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `map`
--
ALTER TABLE `map`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `purchase`
--
ALTER TABLE `purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
