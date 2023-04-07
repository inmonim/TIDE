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
CREATE SCHEMA IF NOT EXISTS `music` DEFAULT CHARACTER SET utf8mb4 ;
USE `music` ;

-- -----------------------------------------------------
-- Table `music`.`album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`album` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `melon_album_id` BIGINT(20) NOT NULL,
  `album_title` VARCHAR(50) NULL DEFAULT NULL,
  `album_photo_path` TEXT NULL DEFAULT NULL,
  `release_dt` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`artist` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `melon_artist_id` INT(11) NOT NULL,
  `artist_name` VARCHAR(50) NULL DEFAULT NULL,
  `artist_photo_path` TEXT NULL DEFAULT NULL,
  `is_group` TINYINT(4) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` TEXT NULL DEFAULT NULL,
  `nickname` VARCHAR(100) NULL DEFAULT NULL,
  `birth` DATE NULL DEFAULT NULL,
  `gender` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `nickname` (`nickname` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`artist_like_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`artist_like_user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `liked_artist` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_artist_like_user_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_artist_like_user_artist_id_idx` (`liked_artist` ASC) VISIBLE,
  CONSTRAINT `fk_artist_like_user_artist_id`
    FOREIGN KEY (`liked_artist`)
    REFERENCES `music`.`artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_artist_like_user_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`chating_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`chating_room` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `from_user_id` BIGINT(20) NULL DEFAULT NULL,
  `to_user_id` BIGINT(20) NULL DEFAULT NULL,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`chating_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`chating_log` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `chating_room_id` BIGINT(20) NULL DEFAULT NULL,
  `chated_user_id` BIGINT(20) NULL DEFAULT NULL,
  `chating_content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chating_log_chating_room_id_idx` (`chating_room_id` ASC) VISIBLE,
  INDEX `fk_chated_user_id_idx` (`chated_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_chated_user_id`
    FOREIGN KEY (`chated_user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chating_log_chating_room_id`
    FOREIGN KEY (`chating_room_id`)
    REFERENCES `music`.`chating_room` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `title` VARCHAR(45) NOT NULL,
  `content` TEXT NULL DEFAULT NULL,
  `create_dt` DATE NULL DEFAULT NULL,
  `public` VARCHAR(1) NULL DEFAULT NULL,
  `like` INT(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_diary_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_diary_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary_comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary_comment` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `diary_id` BIGINT(20) NULL DEFAULT NULL,
  `comment` VARCHAR(100) NULL DEFAULT NULL,
  `create_dt` DATE NULL DEFAULT NULL,
  `is_public` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary_list` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `diary_list_title` VARCHAR(45) NULL DEFAULT NULL,
  `is_public` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_diary_list_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_diary_list_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary_diarylist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary_diarylist` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `diary_list_id` BIGINT(20) NULL DEFAULT NULL,
  `diary_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `diary_list_id_idx` (`diary_list_id` ASC) VISIBLE,
  INDEX `diary_diarylist_diray_id_idx` (`diary_id` ASC) VISIBLE,
  CONSTRAINT `diary_diarylist_diray_id`
    FOREIGN KEY (`diary_id`)
    REFERENCES `music`.`diary` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `diary_diarylist_list__id`
    FOREIGN KEY (`diary_list_id`)
    REFERENCES `music`.`diary_list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary_like_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary_like_user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `diary_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_diary_like_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_diary_like_diary_id_idx` (`diary_id` ASC) VISIBLE,
  CONSTRAINT `fk_diary_like_diary_id`
    FOREIGN KEY (`diary_id`)
    REFERENCES `music`.`diary` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_diary_like_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`follow` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `to_user` BIGINT(20) NULL DEFAULT NULL,
  `from_user` BIGINT(20) NULL DEFAULT NULL,
  `accept` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_follow_to_user_idx` (`to_user` ASC) VISIBLE,
  INDEX `fk_follow_from_user` (`from_user` ASC) VISIBLE,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`genre` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `genre_id` INT(11) NOT NULL,
  `genre_name` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `genre_id_UNIQUE` (`genre_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`group_artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`group_artist` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `group_id` INT(11) NULL DEFAULT NULL,
  `artist_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_group_artist_artist_id_idx` (`artist_id` ASC) VISIBLE,
  CONSTRAINT `fk_group_artist_artist_id`
    FOREIGN KEY (`artist_id`)
    REFERENCES `music`.`artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `melon_song_id` BIGINT(20) NULL DEFAULT NULL,
  `title` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`lyrics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`lyrics` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `melon_song_id` BIGINT(20) NULL DEFAULT NULL,
  `lyrics` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_lyrics_song_id_idx` (`melon_song_id` ASC) VISIBLE,
  CONSTRAINT `fk_lyrics_song_id`
    FOREIGN KEY (`melon_song_id`)
    REFERENCES `music`.`song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`user_playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`user_playlist` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `playlist_title` VARCHAR(50) NULL DEFAULT NULL,
  `is_public` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_playlist_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_playlist_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`playlist` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `playlist_id` BIGINT(20) NULL DEFAULT NULL,
  `song_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_playlist_playlist_id_idx` (`playlist_id` ASC) VISIBLE,
  INDEX `fk_playlist_song_id_idx` (`song_id` ASC) VISIBLE,
  CONSTRAINT `fk_playlist_playlist_id`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `music`.`user_playlist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `music`.`song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`playlist_liked_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`playlist_liked_user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `playlist_id` BIGINT(20) NULL DEFAULT NULL,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
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
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`profile` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `profile_img_path` TEXT NULL DEFAULT NULL,
  `introduce` TEXT NULL DEFAULT NULL,
  `point` INT(11) NULL DEFAULT 500,
  PRIMARY KEY (`id`),
  INDEX `fk_profile_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_profile_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_album` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `melon_album_id` BIGINT(20) NULL DEFAULT NULL,
  `melon_song_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `song_album_album_id_idx` (`melon_album_id` ASC) VISIBLE,
  INDEX `song_album_song_id_idx` (`melon_song_id` ASC) VISIBLE,
  CONSTRAINT `song_album_album_id`
    FOREIGN KEY (`melon_album_id`)
    REFERENCES `music`.`album` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `song_album_song_id`
    FOREIGN KEY (`melon_song_id`)
    REFERENCES `music`.`song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_artist` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `melon_song_id` BIGINT(20) NULL DEFAULT NULL,
  `melon_artist_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_song_artist_artist_id_idx` (`melon_artist_id` ASC) VISIBLE,
  INDEX `fk_song_artist_song_id_idx` (`melon_song_id` ASC) VISIBLE,
  CONSTRAINT `fk_song_artist_artist_id`
    FOREIGN KEY (`melon_artist_id`)
    REFERENCES `music`.`artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_song_artist_song_id`
    FOREIGN KEY (`melon_song_id`)
    REFERENCES `music`.`song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_diary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_diary` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `song_id` BIGINT(20) NULL DEFAULT NULL,
  `diary_id` BIGINT(20) NULL DEFAULT NULL,
  `rating` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_song_diary_song_id_idx` (`song_id` ASC) VISIBLE,
  INDEX `fk_song_diary_diary_id_idx` (`diary_id` ASC) VISIBLE,
  CONSTRAINT `fk_song_diary_diary_id`
    FOREIGN KEY (`diary_id`)
    REFERENCES `music`.`diary` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_song_diary_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `music`.`song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_genre` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `melon_song_id` BIGINT(20) NULL DEFAULT NULL,
  `genre_id` BIGINT(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_song_genre_genre_id_idx` (`genre_id` ASC) VISIBLE,
  INDEX `fk_song_genre_song_id` (`melon_song_id` ASC) VISIBLE,
  CONSTRAINT `fk_song_genre_genre_id`
    FOREIGN KEY (`genre_id`)
    REFERENCES `music`.`genre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_song_genre_song_id`
    FOREIGN KEY (`melon_song_id`)
    REFERENCES `music`.`song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_like_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_like_user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT(20) NULL DEFAULT NULL,
  `song_id` BIGINT(20) NULL DEFAULT NULL,
  `rating` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_song_like_user_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_song_like_user_song_id_idx` (`song_id` ASC) VISIBLE,
  CONSTRAINT `fk_song_like_user_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `music`.`song` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_song_like_user_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
