import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface playListLikeState {
  status: string;
  error: string | undefined;
}

// 초기값
const initialState: playListLikeState = {
  status: '',
  error: ''
};

interface playListProps {
  playListId: Number;
}


// Thunk 예시
export const playListLikeAsync = createAsyncThunk(
  'playListLike/Async',
  async ({playListId}: playListProps) => {
    const accessToken = getCookie('accessToken');
    // console.log('타이틀왓나?',diaryListTitle)
    const data = await axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist/like/${playListId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const playListLikeSlice = createSlice({
  name: 'playListLike',
  initialState,
  reducers: {
    playListLikeinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListLikeAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListLikeAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        // console.log('내 플레이리스트 조회 성공', state.myplaylist)
      })
      .addCase(playListLikeAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('내 플레이리스트 조회 실패')
      });
  }
});
export const {playListLikeinitStatus} = playListLikeSlice.actions;
export default playListLikeSlice.reducer;
