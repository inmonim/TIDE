import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface DiaryLikeCheckState {
  status: string;
  error: string | undefined;
  boolean: boolean;
}

// 초기값
const initialState: DiaryLikeCheckState = {
  status: '',
  error:'',
  boolean: false,
};

interface diaryLikeCheckProps {
  id:Number;
}


// Thunk 예시
export const diaryLikeSliceAsync = createAsyncThunk(
  'diaryLike/Async',
  async ({id}: diaryLikeCheckProps) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
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
export const diaryLikeCheckSlice = createSlice({
  name: 'dirayCheckLike',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryLikeSliceAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryLikeSliceAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        state.boolean = action.payload
        // console.log('다이어리 좋아요 체크 요청 성공')
      })
      .addCase(diaryLikeSliceAsync.rejected, state => {
        state.status = 'failed';
        // console.log('다이어리 좋아요 체크 요청 실패');
      });
  }
});
export default diaryLikeCheckSlice.reducer;
