import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface myDiaryListState {
  status: string;
  error: string | undefined;
  diarylists: diaryListInterFace[];
}

interface diaryListInterFace {
  id:number,
  userId: number;
  diaryListTitle: string,
  isPublic:string
}

// 초기값
const initialState: myDiaryListState = {
  status: '',
  error:'',
  diarylists:[]
};


// Thunk 예시
export const diaryListMineAsync = createAsyncThunk(
  'diaryListMine/Async',
  async () => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/mylist`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryListMineSlice = createSlice({
  name: 'diaryListMine',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryListMineAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryListMineAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const diaryLists = action.payload;
        state.diarylists = diaryLists;
        // console.log('내 일기장 모음 요청 성공',state.diarylists)

      })
      .addCase(diaryListMineAsync.rejected, state => {
        state.status = 'failed';
        // console.log('내 일기장 모음 요청 실패');
      });
  }
});
export default diaryListMineSlice.reducer;
