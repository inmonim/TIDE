package com.tide.diary.jpa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;
    @Column
    private String title;
    @Column
    private String content;
    @Column(name = "create_dt")
    private String createDt;
    @Column(name = "is_public")
    private String pub;
    @Column(name = "likecnt")
    private Integer likeCnt;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "song_id")
    private Long songId;
}
