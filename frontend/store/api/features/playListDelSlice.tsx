import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface playListDelState {
  status: string;
  error: string | undefined;
}

interface playListDelProps {
  playListId: Number;
}

// 초기값
const initialState: playListDelState = {
  status: '',
  error: ''
};

// Thunk 예시
export const playListDelAsync = createAsyncThunk(
  'playListDel/Async',
  async ({playListId}: playListDelProps) => {
    const accessToken = getCookie('accessToken');
    // console.log('타이틀왓나?',playListTitle)
    const data = await axios({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist/${playListId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const playListDelSlice = createSlice({
  name: 'playListDel',
  initialState,
  reducers: {
    playListDelinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListDelAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListDelAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        console.log('플레이리스트 삭제 성공')
      })
      .addCase(playListDelAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('플레이리스트 삭제 실패')
      });
  }
});
export const {playListDelinitStatus} = playListDelSlice.actions;
export default playListDelSlice.reducer;
