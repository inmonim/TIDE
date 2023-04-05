import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface nowmusicState {
  status: string;
  musicUrl: string;
  albumImage: string;
  musicTitle: string;
  artistName: string;
}
// 초기값
const initialState: nowmusicState = {
  musicUrl: '',
  status: '',
  albumImage: '',
  musicTitle: '',
  artistName: ''
};

// createSlice로 Slice생성
export const nowmusicSlice = createSlice({
  name: 'nowmusic',
  initialState,
  reducers: {
    getvideoId(state, action) {
      state.musicUrl = action.payload.musicUrl;
      state.albumImage = action.payload.albumImage;
      state.musicTitle = action.payload.musicTitle;
      state.artistName = action.payload.artistName;
    }
  }
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const {getvideoId} = nowmusicSlice.actions;
export default nowmusicSlice.reducer;
