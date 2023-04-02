import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface diaryListDelState {
  status: string;
  error: string | undefined;
}

interface diaryListDelProps {
  diaryListId: Number;
}

// 초기값
const initialState: diaryListDelState = {
  status: '',
  error: ''
};

// Thunk 예시
export const diaryListDelAsync = createAsyncThunk(
  'diaryListDel/Async',
  async ({diaryListId}: diaryListDelProps) => {
    const accessToken = getCookie('accessToken');
    // console.log('타이틀왓나?',diaryListTitle)
    const data = await axios({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/list/${diaryListId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryListDelSlice = createSlice({
  name: 'diaryListDel',
  initialState,
  reducers: {
    initStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryListDelAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryListDelAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        console.log('다이어리 리스트 삭제 성공')
      })
      .addCase(diaryListDelAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('다이어리 리스트 삭제 실패')
      });
  }
});

export default diaryListDelSlice.reducer;
