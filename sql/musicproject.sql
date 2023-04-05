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
CREATE SCHEMA IF NOT EXISTS `music` DEFAULT CHARACTER SET latin1 ;
USE `music` ;

-- -----------------------------------------------------
-- Table `music`.`album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`album` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `album_id` INT(11) NOT NULL,
  `album_title` VARCHAR(80) NOT NULL,
  `album_img_path` TEXT NULL DEFAULT NULL,
  `release_dt` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `album_id_UNIQUE` (`album_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4118
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`artist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `artist_id` INT(11) NOT NULL,
  `artist_name` VARCHAR(70) NOT NULL,
  `artist_img_path` TEXT NULL DEFAULT NULL,
  `is_group` TINYINT(4) NULL DEFAULT 0,
  `likecnt` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `artist_id_UNIQUE` (`artist_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2981
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` TEXT NOT NULL,
  `nickname` VARCHAR(30) NOT NULL,
  `birth` DATE NULL DEFAULT NULL,
  `gender` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `nickname` (`nickname` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`artist_like_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`artist_like_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `liked_artist_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_artist_like_user_artist_id_idx` (`liked_artist_id` ASC) VISIBLE,
  INDEX `FK_artist_like_user_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_artist_like_user_artist_id`
    FOREIGN KEY (`liked_artist_id`)
    REFERENCES `music`.`artist` (`artist_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_artist_like_user_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`chating_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`chating_room` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `from_user_id` INT(11) NOT NULL,
  `to_user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_chating_room_from_user_id_idx` (`from_user_id` ASC) VISIBLE,
  INDEX `FK_chating_room_to_user_id_idx` (`to_user_id` ASC) VISIBLE,
  CONSTRAINT `FK_chating_room_from_user_id`
    FOREIGN KEY (`from_user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_chating_room_to_user_id`
    FOREIGN KEY (`to_user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`chating_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`chating_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `chating_room_id` INT(11) NOT NULL,
  `chated_user_id` INT(11) NOT NULL,
  `chating_content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_chating_room_chating_room_id_idx` (`chating_room_id` ASC) VISIBLE,
  INDEX `FK_chating_room_chated_user_id_idx` (`chated_user_id` ASC) VISIBLE,
  CONSTRAINT `FK_chating_room_chated_user_id`
    FOREIGN KEY (`chated_user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_chating_room_chating_room_id`
    FOREIGN KEY (`chating_room_id`)
    REFERENCES `music`.`chating_room` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `song_id` INT(11) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `video_id` VARCHAR(100) NULL DEFAULT NULL,
  `likecnt` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `song_id_UNIQUE` (`song_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 9167
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `song_id` INT(11) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `content` TEXT NULL DEFAULT NULL,
  `create_dt` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `is_public` VARCHAR(1) NULL DEFAULT '0',
  `rating` INT(11) NOT NULL DEFAULT 0,
  `likecnt` INT(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `FK_diary_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `FK_diary_song_id_idx` (`song_id` ASC) VISIBLE,
  CONSTRAINT `FK_diary_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `music`.`song` (`song_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_diary_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary_comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary_comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(30) NULL DEFAULT NULL,
  `diary_id` INT(11) NOT NULL,
  `comment` VARCHAR(100) NULL DEFAULT NULL,
  `create_dt` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `is_public` VARCHAR(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_diary_comment_diary_id_idx` (`diary_id` ASC) VISIBLE,
  INDEX `FK_diary_comment_nickname_idx` (`nickname` ASC) VISIBLE,
  CONSTRAINT `FK_diary_comment_diary_id`
    FOREIGN KEY (`diary_id`)
    REFERENCES `music`.`diary` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_diary_comment_nickname`
    FOREIGN KEY (`nickname`)
    REFERENCES `music`.`user` (`nickname`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary_list` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `diary_list_title` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_diary_list_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_diary_list_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary_diary_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary_diary_list` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `diary_list_id` INT(11) NOT NULL,
  `diary_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `diary_diarylist_diray_id_idx` (`diary_id` ASC) VISIBLE,
  INDEX `FK_diary_diary_list_diary_list_id_idx` (`diary_list_id` ASC) VISIBLE,
  CONSTRAINT `FK_diary_diary_list_diary_id`
    FOREIGN KEY (`diary_id`)
    REFERENCES `music`.`diary` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_diary_diary_list_diary_list_id`
    FOREIGN KEY (`diary_list_id`)
    REFERENCES `music`.`diary_list` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`diary_like_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`diary_like_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `diary_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_diary_like_user_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `FK_diary_like_user_diary_id_idx` (`diary_id` ASC) VISIBLE,
  CONSTRAINT `FK_diary_like_user_diary_id`
    FOREIGN KEY (`diary_id`)
    REFERENCES `music`.`diary` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_diary_like_user_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`follow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`follow` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `to_user` INT(11) NOT NULL,
  `from_user` INT(11) NOT NULL,
  `accept` VARCHAR(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_follow_to_user_idx` (`to_user` ASC) VISIBLE,
  INDEX `FK_follow_from_user_idx` (`from_user` ASC) VISIBLE,
  CONSTRAINT `FK_follow_from_user`
    FOREIGN KEY (`from_user`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_follow_to_user`
    FOREIGN KEY (`to_user`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`genre` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `genre_id` INT(11) NOT NULL,
  `genre_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `genre_id_UNIQUE` (`genre_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 32
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`group_artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`group_artist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `group_id` INT(11) NOT NULL,
  `artist_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_group_artist_group_id_idx` (`group_id` ASC) VISIBLE,
  INDEX `FK_group_artist_artist_id_idx` (`artist_id` ASC) VISIBLE,
  CONSTRAINT `FK_group_artist_artist_id`
    FOREIGN KEY (`artist_id`)
    REFERENCES `music`.`artist` (`artist_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_group_artist_group_id`
    FOREIGN KEY (`group_id`)
    REFERENCES `music`.`artist` (`artist_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1653
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`lyrics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`lyrics` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `song_id` INT(11) NOT NULL,
  `lyrics` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_lyrics_song_id_idx` (`song_id` ASC) VISIBLE,
  CONSTRAINT `FK_lyrics_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `music`.`song` (`song_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 9135
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`user_playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`user_playlist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `playlist_title` VARCHAR(50) NULL DEFAULT NULL,
  `is_public` VARCHAR(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_user_playlist_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_user_playlist_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`playlist_like_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`playlist_like_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `playlist_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_playlist_like_user_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `FK_playlist_like_user_playlist_id_idx` (`playlist_id` ASC) VISIBLE,
  CONSTRAINT `FK_playlist_like_user_playlist_id`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `music`.`user_playlist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_playlist_like_user_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`playlist_song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`playlist_song` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `playlist_id` INT(11) NOT NULL,
  `song_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_playlist_playlist_id_idx` (`playlist_id` ASC) VISIBLE,
  INDEX `FK_playlist_song_song_id_idx` (`song_id` ASC) VISIBLE,
  CONSTRAINT `FK_playlist_song_playlist_id`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `music`.`user_playlist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_playlist_song_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `music`.`song` (`song_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`profile` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `profile_img_path` TEXT NULL DEFAULT NULL,
  `introduce` TEXT NULL DEFAULT NULL,
  `point` INT(11) UNSIGNED NULL DEFAULT 500,
  PRIMARY KEY (`id`),
  INDEX `FK_profile_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_profile_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_album`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_album` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `album_id` INT(11) NOT NULL,
  `song_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_song_album_song_id_idx` (`song_id` ASC) VISIBLE,
  INDEX `FK_song_album_album_id_idx` (`album_id` ASC) VISIBLE,
  CONSTRAINT `FK_song_album_album_id`
    FOREIGN KEY (`album_id`)
    REFERENCES `music`.`album` (`album_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 9201
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_artist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `song_id` INT(11) NOT NULL,
  `artist_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_song_artist_song_id_idx` (`song_id` ASC) VISIBLE,
  INDEX `FK_song_artist_artist_id_idx` (`artist_id` ASC) VISIBLE,
  CONSTRAINT `FK_song_artist_artist_id`
    FOREIGN KEY (`artist_id`)
    REFERENCES `music`.`artist` (`artist_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_song_artist_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `music`.`song` (`song_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 10059
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_emotion_keyword`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_emotion_keyword` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `song_id` INT(11) NOT NULL,
  `emotion_1` INT(11) NULL DEFAULT NULL,
  `emotion_2` INT(11) NULL DEFAULT NULL,
  `emotion_3` INT(11) NULL DEFAULT NULL,
  `key_sentence` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `song_id_UNIQUE` (`song_id` ASC) VISIBLE,
  INDEX `ix_song_emotion_keyword_id` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 9135
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_genre` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `song_id` INT(11) NOT NULL,
  `genre_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_song_genre_genre_id_idx` (`genre_id` ASC) VISIBLE,
  INDEX `FK_song_genre_song_id_idx` (`song_id` ASC) VISIBLE,
  CONSTRAINT `FK_song_genre_genre_id`
    FOREIGN KEY (`genre_id`)
    REFERENCES `music`.`genre` (`genre_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_song_genre_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `music`.`song` (`song_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 10345
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `music`.`song_like_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`song_like_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NULL DEFAULT NULL,
  `song_id` INT(11) NULL DEFAULT NULL,
  `rating` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_song_like_user_song_id_idx` (`song_id` ASC) VISIBLE,
  INDEX `FK_song_like_user_user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_song_like_user_song_id`
    FOREIGN KEY (`song_id`)
    REFERENCES `music`.`song` (`song_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_song_like_user_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `music`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
