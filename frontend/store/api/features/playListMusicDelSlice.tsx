import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface playListMusicDelState {
  status: string;
  error: string | undefined;
}

interface playListMusicDelProps {
  songId: Number;
  playlistId:Number;
}

// 초기값
const initialState: playListMusicDelState = {
  status: '',
  error: ''
};

// Thunk 예시
export const playListMusicDelAsync = createAsyncThunk(
  'playListMusicDel/Async',
  async ({songId,playlistId}: playListMusicDelProps) => {
    const accessToken = getCookie('accessToken');
    console.log('뭐왓나?',songId, playlistId)
    const data = await axios({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist/song/${songId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data:{
        playlistId
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const playListMusicDelSlice = createSlice({
  name: 'playListMusicDel',
  initialState,
  reducers: {
    playListMusicDelinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListMusicDelAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListMusicDelAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        console.log('플레이리스트에서 음악 삭제 성공')
      })
      .addCase(playListMusicDelAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('플레이리스트 음악 삭제 실패')
      });
  }
});
export const {playListMusicDelinitStatus} = playListMusicDelSlice.actions;
export default playListMusicDelSlice.reducer;
