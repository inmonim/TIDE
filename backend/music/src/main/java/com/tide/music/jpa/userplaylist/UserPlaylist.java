package com.tide.music.jpa.userplaylist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_playlist")
public class UserPlaylist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "playlist_title")
    private String playListTitle;
    @Column(name = "is_public")
    private String isPublic;
    @Column(name = "likecnt")
    private Integer likeCnt;
}
