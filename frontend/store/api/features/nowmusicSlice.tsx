import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface musicState {
  videoId: string;
  albumImgPath: string;
  title: string;
  artist: string[];
}

// 타입
interface nowmusicState {
  status: string;
  videoId: string;
  albumImgPath: string;
  title: string;
  artist: string[];
  nowPlayList: musicState[];
  plType: number;
  nowIndex: number;
}
// 초기값
const initialState: nowmusicState = {
  videoId: '',
  status: '',
  albumImgPath: '',
  title: '',
  artist: [],
  nowPlayList: [],
  plType: 0,
  nowIndex: 0
};

// createSlice로 Slice생성
export const nowmusicSlice = createSlice({
  name: 'nowmusic',
  initialState,
  reducers: {
    getvideoId(state, action) {
      state.plType = 0;
      state.videoId = action.payload.videoId;
      state.albumImgPath = action.payload.albumImgPath;
      state.title = action.payload.title;
      state.artist = action.payload.artist;
    },
    getPlayList(state, action) {
      if (action.payload.playListSongs.length > 0) {
        const nowPlayList = action.payload.playListSongs;
        state.nowIndex = 0;
        state.plType = 1;
        state.nowPlayList = nowPlayList;
        // console.log(`순차재생`,  action.payload)
        state.videoId = state.nowPlayList[0].videoId;
        state.albumImgPath = state.nowPlayList[0].albumImgPath;
        state.title = state.nowPlayList[0].title;
        state.artist = state.nowPlayList[0].artist;
        // console.log(`순차재생가능?`,  state.nowPlayList[0])
      }
    },
    getPlayListRandom(state, action) {
      if (action.payload.playListSongs.length > 0) {
        let nowPlayList = [...action.payload.playListSongs];
        state.nowIndex = 0;
        state.plType = 2;
        nowPlayList.sort(function () {
          return Math.random() - 0.5;
        });
        // console.log(`랜덤재생`,nowPlayList)
        state.nowPlayList = nowPlayList;
        state.videoId = state.nowPlayList[0].videoId;
        state.albumImgPath = state.nowPlayList[0].albumImgPath;
        state.title = state.nowPlayList[0].title;
        state.artist = state.nowPlayList[0].artist;
        console.log(`랜덤재생가능?`, state.nowPlayList[0]);
      }
    },
    changeNextSong(state) {
      if (state.plType !== 0) {
        if (state.nowIndex + 1 < state.nowPlayList.length) state.nowIndex += 1;
        else state.nowIndex = 0;
        let nowMusic = state.nowPlayList[state.nowIndex];
        state.videoId = nowMusic.videoId;
        state.albumImgPath = nowMusic.albumImgPath;
        state.title = nowMusic.title;
        state.artist = nowMusic.artist;
      }
    },
    changePrevSong(state) {
      if (state.plType !== 0) {
        if (state.nowIndex - 1 > 0) state.nowIndex -= 1;
        else state.nowIndex = state.nowPlayList.length - 1;
        let nowMusic = state.nowPlayList[state.nowIndex];
        state.videoId = nowMusic.videoId;
        state.albumImgPath = nowMusic.albumImgPath;
        state.title = nowMusic.title;
        state.artist = nowMusic.artist;
      }
    }
  }
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const {
  getvideoId,
  getPlayList,
  changePrevSong,
  changeNextSong,
  getPlayListRandom
} = nowmusicSlice.actions;
export default nowmusicSlice.reducer;
