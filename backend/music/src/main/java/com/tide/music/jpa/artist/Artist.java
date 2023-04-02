package com.tide.music.jpa.artist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "artist")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "artist_id")
    private Long artistId;
    @Column(name = "artist_name")
    private String artistName;
    @Column(name = "artist_img_path")
    private String artistImgPath;
    @Column(name = "is_group")
    private boolean isGroup;
    @Column(name = "likecnt")
    private Integer likeCnt;
}
