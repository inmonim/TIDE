import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface diaryListInputState {
  status: string;
  token: string;
  error: string | undefined;
}

interface diaryListProps {
  diaryListTitle: string;
  diaryId:Number;
}

// 초기값
const initialState: diaryListInputState = {
  status: '',
  token: '',
  error: ''
};

// Thunk 예시
export const diaryListInputAsync = createAsyncThunk(
  'diaryListInput/Async',
  async ({diaryListTitle, diaryId}: diaryListProps) => {
    const accessToken = getCookie('accessToken');
    // console.log('타이틀왓나?',diaryListTitle)
    const data = await axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/diaryadd/${diaryId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data: {
        diaryListTitle
      }
    });
    return data.data;
  }
);

// InputSlice로 Slice생성
export const diaryListInputSlice = createSlice({
  name: 'diaryListInput',
  initialState,
  reducers: {
    diaryListInputinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryListInputAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryListInputAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        console.log('다이어리 리스트에 다이어리 추가 성공')
      })
      .addCase(diaryListInputAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('다이어리 리스트에 다이어리 추가 실패')
      });
  }
});
export const {diaryListInputinitStatus} = diaryListInputSlice.actions;
export default diaryListInputSlice.reducer;
