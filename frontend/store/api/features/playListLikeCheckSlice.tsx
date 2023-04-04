import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface playListLikeCheckState {
  status: string;
  error: string | undefined;
  isLike: boolean
}

// 초기값
const initialState: playListLikeCheckState = {
  status: '',
  error: '',
  isLike:false
};

interface playListProps {
  playListId: Number;
}


// Thunk 예시
export const playListLikeCheckAsync = createAsyncThunk(
  'playListLikeCheck/Async',
  async ({playListId}: playListProps) => {
    const accessToken = getCookie('accessToken');
    // console.log('타이틀왓나?',diaryListTitle)
    const data = await axios({
      method: 'get',
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
export const playListLikeCheckSlice = createSlice({
  name: 'playListLikeCheck',
  initialState,
  reducers: {
    playListLikeCheckinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListLikeCheckAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListLikeCheckAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.isLike = action.payload
        console.log('플레이리스트 좋아요 여부 조회 성공', action.payload)
      })
      .addCase(playListLikeCheckAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('내 플레이리스트 조회 실패')
      });
  }
});
export const {playListLikeCheckinitStatus} = playListLikeCheckSlice.actions;
export default playListLikeCheckSlice.reducer;
