import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface DiaryDelState {
  status: string;
  nickname:string;
  error: string | undefined;
}


// 초기값
const initialState: DiaryDelState = {
  status: '',
  nickname:'',
  error:''
};


// Thunk 예시
export const diaryDelAsync = createAsyncThunk(
  'diaryDel/Async',
  async (diaryId: number) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/delete/${diaryId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    })
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryDelSlice = createSlice({
  name: 'diaryDel',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryDelAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryDelAsync.fulfilled, state => {
        state.status = 'completed';
        console.log('다이어리 삭제 성공');
      })
      .addCase(diaryDelAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('다이어리 삭제 실패', action.error);
      });
  }
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
// export const {increment, decrement} = diaryReqSlice.actions;
export default diaryDelSlice.reducer;
