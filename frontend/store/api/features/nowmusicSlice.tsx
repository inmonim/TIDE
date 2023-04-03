import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface nowmusicState {
  status: string;
  videoId: string;
}
// 초기값
const initialState: nowmusicState = {
  videoId: '',
  status: ''
};

// createSlice로 Slice생성
export const nowmusicSlice = createSlice({
  name: 'nowmusic',
  initialState,
  reducers: {
    getvideoId(state, action) {
      state.videoId = action.payload;
    }
  }
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const {getvideoId} = nowmusicSlice.actions;
export default nowmusicSlice.reducer;
