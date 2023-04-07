import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface diaryListEditState {
  status: string;
  error: string | undefined;
}

interface diaryListEditProps {
  diaryListId: Number;
  diaryListTitle: string;
}

// 초기값
const initialState: diaryListEditState = {
  status: '',
  error: ''
};

// Thunk 예시
export const diaryListEditAsync = createAsyncThunk(
  'diaryListEdit/Async',
  async ({diaryListId,diaryListTitle}: diaryListEditProps) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/list/${diaryListId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data:{
        diaryListTitle
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryListEditSlice = createSlice({
  name: 'diaryListEdit',
  initialState,
  reducers: {
    diaryListEditinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryListEditAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryListEditAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        // console.log('일기장 모음 이름 수정 성공')
      })
      .addCase(diaryListEditAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('일기장 모음 이름 수정 실패')
      });
  }
});
export const {diaryListEditinitStatus} = diaryListEditSlice.actions;
export default diaryListEditSlice.reducer;
