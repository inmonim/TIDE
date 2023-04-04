import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface DiaryLikeState {
  status: string;
  error: string | undefined;
}

// 초기값
const initialState: DiaryLikeState = {
  status: '',
  error:'',
};

interface diaryLikeProps {
  id:Number;
}


// Thunk 예시
export const diaryLikeAsync = createAsyncThunk(
  'diaryLike/Async',
  async ({id}: diaryLikeProps) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/like/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryLikeSlice = createSlice({
  name: 'dirayLike',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryLikeAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryLikeAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        // console.log('다이어리 좋아요 요청 성공')
      })
      .addCase(diaryLikeAsync.rejected, state => {
        state.status = 'failed';
        // console.log('다이어리 좋아요 요청 실패');
      });
  }
});
export default diaryLikeSlice.reducer;
