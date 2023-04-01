package com.tide.music.jpa.playlist.like;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "playlist_like_user")
public class PlaylistLikeUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "playlist_id")
    private Long playlistId;
    @Column(name = "user_id")
    private Long userId;
}
