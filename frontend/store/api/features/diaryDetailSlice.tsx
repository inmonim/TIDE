import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface DiaryDetailState {
  status: string;
  error: string | undefined;
  diary: diaryInterFace;
}

interface diaryInterFace {
  id: number;
  nickname: string;
  title: string;
  content: string;
  createDt: string;
  pub: string;
  like: number;
  songId: number;
  artist: [];
  albumImgPath: string;
  musicTitle: string;
  videoId: string;
}

// 초기값
const initialState: DiaryDetailState = {
  status: '',
  error: '',
  diary: {
    id: 0,
    nickname: '',
    title: '',
    content: '',
    createDt: '',
    pub: '',
    like: 0,
    songId: 0,
    artist: [],
    albumImgPath: '',
    musicTitle: '',
    videoId: ''
  }
};

// Thunk 예시
export const diaryDetailAsync = createAsyncThunk(
  'diaryDeatil/Async',
  async (id: number) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/detail/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryDeatilSlice = createSlice({
  name: 'diaryDeatil',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryDetailAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryDetailAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.diary = action.payload;
      })
      .addCase(diaryDetailAsync.rejected, state => {
        state.status = 'failed';
        // console.log('다이어리 상세 요청 실패');
      });
  }
});
export default diaryDeatilSlice.reducer;
