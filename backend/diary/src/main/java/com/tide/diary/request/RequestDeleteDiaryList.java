package com.tide.diary.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestDeleteDiaryList {
    private Long diaryListId;
    private Long diaryId;
}
