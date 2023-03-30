package com.tide.diary.jpa.list;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DiaryList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "diary_list_title")
    private String diaryListTitle;
    @Column(name = "is_public")
    private String isPublic;
}
