import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface diaryListCreateState {
  status: string;
  token: string;
  error: string | undefined;
}

interface diaryListProps {
  diaryListTitle: string;
}

// 초기값
const initialState: diaryListCreateState = {
  status: '',
  token: '',
  error: ''
};

// Thunk 예시
export const diaryListCreateAsync = createAsyncThunk(
  'diaryListCreate/Async',
  async ({diaryListTitle}: diaryListProps) => {
    const accessToken = getCookie('accessToken');
    // console.log('타이틀왓나?',diaryListTitle)
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/list`,
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

// createSlice로 Slice생성
export const diaryListCreateSlice = createSlice({
  name: 'diaryListCreate',
  initialState,
  reducers: {
    diaryListCreateinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryListCreateAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryListCreateAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        // console.log('다이어리 리스트 생성 성공')
      })
      .addCase(diaryListCreateAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('다이어리 리스트 생성 실패')
      });
  }
});
export const {diaryListCreateinitStatus} = diaryListCreateSlice.actions;
export default diaryListCreateSlice.reducer;
