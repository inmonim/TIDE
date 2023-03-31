package com.tide.diary.jpa.diarylist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "diary_diary_list")
public class DiaryDiaryList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "diary_list_id")
    private Long diaryListId;
    @Column(name = "diary_id")
    private Long diaryId;
    
}
