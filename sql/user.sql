-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema music
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema music
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `music` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `music` ;

-- -----------------------------------------------------
-- Table `music`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` TEXT NULL DEFAULT NULL,
  `nickname` VARCHAR(100) NULL DEFAULT NULL,
  `birth` DATE NULL DEFAULT NULL,
  `gender` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `nickname` (`nickname` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `music`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`profile` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NULL,
  `profile_img_path` TEXT NULL,
  `introduce` TEXT NULL,
  `point` INT NULL DEFAULT 500,
  PRIMARY KEY (`id`),
  INDEX `fk_profile_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_profile_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`follow` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `to_user` BIGINT NULL,
  `from_user` BIGINT NULL,
  `accept` VARCHAR(1) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_follow_to_user_idx` (`to_user` ASC) VISIBLE,
  CONSTRAINT `fk_follow_from_user`
    FOREIGN KEY (`from_user`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_follow_to_user`
    FOREIGN KEY (`to_user`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`user_playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`user_playlist` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NULL,
  `playlist_title` VARCHAR(50) NULL,
  `is_public` VARCHAR(1) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_playlist_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_playlist_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`playlist_liked_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`playlist_liked_user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `playlist_id` BIGINT NULL,
  `user_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_playlist_liked_user_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_playlist_liked_user_user_playlist_id_idx` (`playlist_id` ASC) VISIBLE,
  CONSTRAINT `fk_playlist_liked_user_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_liked_user_user_playlist_id`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `music`.`user_playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`chating_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`chating_room` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `from_user_id` BIGINT NULL,
  `to_user_id` BIGINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chating_room_from_user_id_idx` (`from_user_id` ASC) VISIBLE,
  INDEX `fk_chating_room_to_user_id_idx` (`to_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_chating_room_from_user_id`
    FOREIGN KEY (`from_user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chating_room_to_user_id`
    FOREIGN KEY (`to_user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `music`.`chating_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`chating_log` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `chating_room_id` BIGINT NULL,
  `chated_user_id` BIGINT NULL,
  `chating_content` TEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chating_log_chating_room_id_idx` (`chating_room_id` ASC) VISIBLE,
  INDEX `fk_chated_user_id_idx` (`chated_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_chating_log_chating_room_id`
    FOREIGN KEY (`chating_room_id`)
    REFERENCES `music`.`chating_room` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chated_user_id`
    FOREIGN KEY (`chated_user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
