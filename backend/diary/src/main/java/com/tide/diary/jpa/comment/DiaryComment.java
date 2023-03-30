package com.tide.diary.jpa.comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "diary_comment")
public class DiaryComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "diary_id")
    private Long diaryId;
    @Column
    private String comment;
    @Column(name = "create_dt")
    private Date createDt;
}
