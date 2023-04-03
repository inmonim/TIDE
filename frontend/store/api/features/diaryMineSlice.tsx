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
  id:number,
  nickname: string;
  title: string,
  content: string,
  creatDt: string,
  pub:string,
  like:number
}

// 초기값
const initialState: myDiaryListState = {
  status: '',
  error:'',
  diarys:[]
};


// Thunk 예시
export const diaryMineAsync = createAsyncThunk(
  'diaryMine/Async',
  async () => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/mine`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryMineSlice = createSlice({
  name: 'diaryMine',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryMineAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryMineAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const diaryList = action.payload;
        state.diarys = diaryList;
        // console.log('내 다이어리 리스트 요청 성공', state.diarys)

      })
      .addCase(diaryMineAsync.rejected, state => {
        state.status = 'failed';
        // console.log('내 다이어리리스트 요청 실패');
      });
  }
});
export default diaryMineSlice.reducer;
