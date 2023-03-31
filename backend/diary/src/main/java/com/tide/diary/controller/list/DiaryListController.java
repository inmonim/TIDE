package com.tide.diary.controller.list;

import com.tide.diary.jpa.list.DiaryList;
import com.tide.diary.request.RequestDeleteDiaryList;
import com.tide.diary.request.RequestListTitle;
import com.tide.diary.response.ResponseDiary;
import com.tide.diary.service.list.DiaryListService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class DiaryListController {

    private Environment env;
    private DiaryListService diaryListService;

    public DiaryListController(Environment env, DiaryListService diaryListService) {
        this.env = env;
        this.diaryListService = diaryListService;
    }

    // 다이어리 리스트 생성
    @PostMapping("/list")
    public ResponseEntity<String> addList(@RequestHeader("email") String email,
                                          @RequestBody RequestListTitle request) {
        diaryListService.addList(email, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Create List");
    }

    // 내 다이어리 리스트 조회
    @GetMapping("/mylist")
    public List<DiaryList> getDiaryList(@RequestHeader("email") String email) {
        return diaryListService.getMyDiaryList(email);
    }

    // 다이어리 리스트에 다이어리 추가
    @PostMapping("/diaryadd/{diaryId}")
    public ResponseEntity<String> diaryAdd(@RequestHeader("email") String email,
                                           @PathVariable("diaryId") Long diaryId,
                                           @RequestBody RequestListTitle request) {
        diaryListService.diaryAdd(email, diaryId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Saved");
    }

    // 다이어리 리스트 내의 다이어리 조회
    @GetMapping("/list/{diaryListId}")
    public List<ResponseDiary> getListDiary(@RequestHeader("email")String email,
                                            @PathVariable("diaryListId") Long diaryListId) {
        return diaryListService.getListDiary(email, diaryListId);
    }

    // 다이어리 리스트의 다이어리 삭제
    @DeleteMapping("/list/diary")
    public ResponseEntity<String> deleteListDiary(@RequestHeader("email")String email,
                                                  @RequestBody RequestDeleteDiaryList request) {
        diaryListService.deleteListDiary(email, request);
        return ResponseEntity.status(HttpStatus.OK).body("Delete diary list");
    }

    // 다이어리 리스트 이름 변경
    @PutMapping("/list/{diaryListId}")
    public ResponseEntity<String> updateListDiary(@RequestHeader("email") String email,
                                                  @PathVariable("diaryListId") Long diaryListId,
                                                  @RequestBody RequestListTitle request) {
        diaryListService.updateListDiary(email, diaryListId ,request.getDiaryListTitle());
        return ResponseEntity.status(HttpStatus.OK).body("Update");
    }

    // 다이어리 리스트 삭제
    @DeleteMapping("/list/{diaryListId}")
    public ResponseEntity<String> deleteListDiary(@PathVariable("diaryListId") Long diaryListId,
                                                  @RequestHeader("email") String email) {
        diaryListService.deleteList(email, diaryListId);
        return ResponseEntity.status(HttpStatus.OK).body("Delete");
    }
}
