-- MySQL dump 10.13  Distrib 8.0.44, for Linux (x86_64)
--
-- Host: localhost    Database: maya_site
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caption` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `tags` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `uri` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (7,'2025 12 06 15 05 15','','pastel','/products/pastel/2025-12-06 15.05.15.jpg','pastel-2025-12-06-15-05-15'),(8,'2025 12 06 15 05 34','','pastel','/products/pastel/2025-12-06 15.05.34.jpg','pastel-2025-12-06-15-05-34'),(9,'2025 12 06 15 05 37','','pastel','/products/pastel/2025-12-06 15.05.37.jpg','pastel-2025-12-06-15-05-37'),(10,'2025 12 06 15 05 39','','pastel','/products/pastel/2025-12-06 15.05.39.jpg','pastel-2025-12-06-15-05-39'),(11,'2025 12 06 15 05 44','','pastel','/products/pastel/2025-12-06 15.05.44.jpg','pastel-2025-12-06-15-05-44'),(12,'2025 12 06 15 05 48','','pastel','/products/pastel/2025-12-06 15.05.48.jpg','pastel-2025-12-06-15-05-48'),(13,'2025 12 06 15 05 51','','pastel','/products/pastel/2025-12-06 15.05.51.jpg','pastel-2025-12-06-15-05-51'),(14,'2025 12 06 15 05 54','','pastel','/products/pastel/2025-12-06 15.05.54.jpg','pastel-2025-12-06-15-05-54'),(15,'2025 12 06 15 05 58','','peyzazhi','/products/peyzazhi/2025-12-06 15.05.58.jpg','peyzazhi-2025-12-06-15-05-58'),(16,'2025 12 06 15 06 25','','peyzazhi','/products/peyzazhi/2025-12-06 15.06.25.jpg','peyzazhi-2025-12-06-15-06-25'),(17,'2025 12 06 15 06 29','','peyzazhi','/products/peyzazhi/2025-12-06 15.06.29.jpg','peyzazhi-2025-12-06-15-06-29'),(18,'2025 12 06 15 13 06','','peyzazhi','/products/peyzazhi/2025-12-06 15.13.06.jpg','peyzazhi-2025-12-06-15-13-06'),(19,'2025 12 06 15 13 10','','peyzazhi','/products/peyzazhi/2025-12-06 15.13.10.jpg','peyzazhi-2025-12-06-15-13-10'),(20,'2025 12 06 14 14 19','','tsvety','/products/tsvety/2025-12-06 14.14.19.jpg','tsvety-2025-12-06-14-14-19'),(21,'2025 12 06 14 15 03','','tsvety','/products/tsvety/2025-12-06 14.15.03.jpg','tsvety-2025-12-06-14-15-03'),(22,'2025 12 06 14 15 07','','tsvety','/products/tsvety/2025-12-06 14.15.07.jpg','tsvety-2025-12-06-14-15-07'),(23,'2025 12 06 14 15 10','','tsvety','/products/tsvety/2025-12-06 14.15.10.jpg','tsvety-2025-12-06-14-15-10'),(24,'2025 12 06 14 15 12','','tsvety','/products/tsvety/2025-12-06 14.15.12.jpg','tsvety-2025-12-06-14-15-12'),(25,'2025 12 06 14 15 14','','tsvety','/products/tsvety/2025-12-06 14.15.14.jpg','tsvety-2025-12-06-14-15-14'),(26,'2025 12 06 14 15 17','','tsvety','/products/tsvety/2025-12-06 14.15.17.jpg','tsvety-2025-12-06-14-15-17'),(27,'2025 12 06 14 15 21','','tsvety','/products/tsvety/2025-12-06 14.15.21.jpg','tsvety-2025-12-06-14-15-21'),(28,'2025 12 06 14 15 23','','tsvety','/products/tsvety/2025-12-06 14.15.23.jpg','tsvety-2025-12-06-14-15-23'),(29,'2025 12 06 14 15 27','','tsvety','/products/tsvety/2025-12-06 14.15.27.jpg','tsvety-2025-12-06-14-15-27'),(30,'2025 12 06 14 15 31','','tsvety','/products/tsvety/2025-12-06 14.15.31.jpg','tsvety-2025-12-06-14-15-31'),(31,'2025 12 06 14 15 33','','tsvety','/products/tsvety/2025-12-06 14.15.33.jpg','tsvety-2025-12-06-14-15-33'),(32,'2025 12 06 14 15 36','','tsvety','/products/tsvety/2025-12-06 14.15.36.jpg','tsvety-2025-12-06-14-15-36'),(33,'2025 12 06 14 15 38','','tsvety','/products/tsvety/2025-12-06 14.15.38.jpg','tsvety-2025-12-06-14-15-38'),(34,'2025 12 06 14 15 42','','tsvety','/products/tsvety/2025-12-06 14.15.42.jpg','tsvety-2025-12-06-14-15-42'),(35,'2025 12 06 14 15 44','','tsvety','/products/tsvety/2025-12-06 14.15.44.jpg','tsvety-2025-12-06-14-15-44');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caption` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `tags` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Ботанические иллюстрации','Цветы, травы и веточки в акварели. Лёгкие композиции для интерьера и подарков.','Оригиналы и принты, Натуральные оттенки, Индивидуальные сюжеты','/services/bottt222.jpg'),(2,'Пейзажи','Спокойные акварельные виды: море, горы, закаты. Лёгкая цветовая гамма для домашнего уюта.','Бумага 100% хлопок, Паспарту по желанию, Доставка по всей России','/services/peizaj.jpg'),(3,'Принты и открытки','Печать моих работ на плотной дизайнерской бумаге. Небольшие форматы — для приятных поводов.','Качественная печать, Подарочная упаковка, Доступные цены','/services/prints.jpg'),(4,'Пастель','Тёплые и мягкие пастельные работы: портреты, натюрморты и уютные сюжеты для интерьера.','Нежные оттенки, Эффект мягкости, Индивидуальные заказы','/services/pastel11.jpg');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-19 11:07:37
