package com.tide.diary.jpa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

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
    private Date createDt;
    @Column(name = "public")
    private String pub;
    @Column(name = "like")
    private Integer like;
}
