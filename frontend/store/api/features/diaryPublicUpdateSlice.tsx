import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface diaryPublicUpdateState {
  status: string;
  error: string | undefined;
}

interface diaryPublicProps {
  id: number;
  pub: string;
}

// 초기값
const initialState: diaryPublicUpdateState = {
  status: '',
  error: ''
};

// Thunk 예시
export const diaryPublicUpdateAsync = createAsyncThunk(
  'diaryListDel/Async',
  async ({id, pub}: diaryPublicProps) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/public/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data: {
        pub: pub
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const diaryPublicUpdateSlice = createSlice({
  name: 'diaryPublicUpdate',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diaryPublicUpdateAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diaryPublicUpdateAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        console.log('다이어리 공개여부 변경 성공');
      })
      .addCase(diaryPublicUpdateAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('다이어리 리스트 삭제 실패')
      });
  }
});

export default diaryPublicUpdateSlice.reducer;
