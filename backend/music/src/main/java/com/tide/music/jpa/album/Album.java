package com.tide.music.jpa.album;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "album")
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "album_id")
    private Long albumId;
    @Column(name = "album_title")
    private String albumTitle;
    @Column(name = "album_img_path")
    private String albumImgPath;
    @Column(name = "release_dt")
    private String releaseDt;
}
