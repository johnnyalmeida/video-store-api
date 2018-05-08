-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: video_store
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `directors`
--

DROP TABLE IF EXISTS `directors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `directors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directors`
--

LOCK TABLES `directors` WRITE;
/*!40000 ALTER TABLE `directors` DISABLE KEYS */;
INSERT INTO `directors` VALUES (1,'Steven Spielberg',NULL,NULL),(2,'George Lucas',NULL,NULL),(3,'Cristopher Nolan',NULL,NULL);
/*!40000 ALTER TABLE `directors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_copies`
--

DROP TABLE IF EXISTS `movie_copies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movie_copies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `movie_id` int(10) unsigned NOT NULL,
  `available` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_movie_id_idx` (`movie_id`),
  CONSTRAINT `fk_movie_id` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_copies`
--

LOCK TABLES `movie_copies` WRITE;
/*!40000 ALTER TABLE `movie_copies` DISABLE KEYS */;
INSERT INTO `movie_copies` VALUES (1,1,0,'2018-05-08 03:40:20','2018-05-08 03:50:34'),(2,1,0,'2018-05-08 03:40:20','2018-05-08 03:50:38'),(3,2,1,'2018-05-08 03:40:20','2018-05-08 03:56:44'),(4,2,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(5,2,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(6,3,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(7,4,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(8,4,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(9,5,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(10,5,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(11,5,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(12,5,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(13,6,1,'2018-05-08 03:40:20','2018-05-08 03:40:20'),(14,6,1,'2018-05-08 03:40:20',NULL);
/*!40000 ALTER TABLE `movie_copies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_rents`
--

DROP TABLE IF EXISTS `movie_rents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movie_rents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `returned` tinyint(1) NOT NULL DEFAULT '0',
  `movie_copy_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_rents`
--

LOCK TABLES `movie_rents` WRITE;
/*!40000 ALTER TABLE `movie_rents` DISABLE KEYS */;
INSERT INTO `movie_rents` VALUES (1,1,3,1,'2018-05-08 03:49:30','2018-05-08 03:56:44'),(2,0,1,1,'2018-05-08 03:50:34','2018-05-08 03:50:34'),(3,0,2,1,'2018-05-08 03:50:38','2018-05-08 03:50:38');
/*!40000 ALTER TABLE `movie_rents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(75) NOT NULL,
  `director_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_director_id_idx` (`director_id`),
  CONSTRAINT `fk_director_id` FOREIGN KEY (`director_id`) REFERENCES `directors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Interstellar',3,NULL,NULL),(2,'Ready Player One',1,NULL,NULL),(3,'E.T.',1,NULL,NULL),(4,'Star Wars Episode IV: A new Hope',2,NULL,NULL),(5,'Jurassic Park',1,NULL,NULL),(6,'Inception',3,NULL,NULL);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'johnnymontserrat@gmail.com','Dioni M. Almeida','$2b$10$opQFqHnBfOSYOzckF5FsaucIL.jXApOOakbpRSIti8V9TQ.5.3H7e','2018-05-08 03:40:20','2018-05-08 03:40:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-08  1:31:32
