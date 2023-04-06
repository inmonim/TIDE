import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface myDiaryListState {
  status: string;
  error: string | undefined;
  diarys: diaryInterFace[];
}

interface diaryInterFace {
  id:number;
  nickname: string;
  title: string;
  content: string;
  createDt: string;
  pub:string;
  like:number;
  albumImgPath:string;
  artist:string[];
  musicTitle: string;
  songId:Number;
}

// 초기값
const initialState: myDiaryListState = {
  status: '',
  error:'',
  diarys:[]
};


// Thunk 예시
export const diaryYourAsync = createAsyncThunk(
  'diaryMine/Async',
  async (nickname) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/user/diaries`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data: {
        nickname: nickname
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryYourSlice = createSlice({
  name: 'diaryMine',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryYourAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryYourAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const diaryList = action.payload;
        state.diarys = diaryList;

      })
      .addCase(diaryYourAsync.rejected, state => {
        state.status = 'failed';
        // console.log('내 다이어리리스트 요청 실패');
      });
  }
});
export default diaryYourSlice.reducer;
