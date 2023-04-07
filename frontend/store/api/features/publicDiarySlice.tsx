import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface DiaryListState {
  status: string;
  error: string | undefined;
  diarys: diaryInterFace[];
}

interface diaryInterFace {
  id:number,
  nickname: string;
  title: string,
  content: string,
  createDt: string,
  pub:string,
  like:number,
  songId:number,
  musicTitle:string,
  artist:string[],
  albumImgPath:string,
}

// 초기값
const initialState: DiaryListState = {
  status: '',
  error:'',
  diarys:[]
};


// Thunk 예시
export const publicDiaryAsync = createAsyncThunk(
  'publicDiary/Async',
  async () => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `https://tideapi.duckdns.org/api/diary/public`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const publicDiarySlice = createSlice({
  name: 'publicDiary',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(publicDiaryAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(publicDiaryAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const diaryList = action.payload;
        state.diarys = diaryList;
        console.log('남의 다이어리들 요청 성공', state.diarys)

      })
      .addCase(publicDiaryAsync.rejected, state => {
        state.status = 'failed';
        // console.log('남의 다이어리들 요청 실패');
      });
  }
});
export default publicDiarySlice.reducer;
