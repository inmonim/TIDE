import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface diaryCreateState {
  status: string;
  token: string;
  error: string | undefined;
}

interface diaryProps {
  title: string;
  content:string;
  pub:string,
  songId: Number
}

// 초기값
const initialState: diaryCreateState = {
  status: '',
  token: '',
  error: ''
};

// Thunk 예시
export const diaryCreateAsync = createAsyncThunk(
  'diaryCreate/Async',
  async ({title, content, pub, songId}: diaryProps) => {
    const accessToken = getCookie('accessToken');
    console.log('타이틀왓나?',title)
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/write`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data: {
        title,
        content,
        pub,
        songId
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryCreateSlice = createSlice({
  name: 'diaryCreate',
  initialState,
  reducers: {
    diaryCreateinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryCreateAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryCreateAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        console.log('다이어리 생성 성공')
      })
      .addCase(diaryCreateAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('다이어리 생성 실패')
      });
  }
});
export const {diaryCreateinitStatus} = diaryCreateSlice.actions;
export default diaryCreateSlice.reducer;
