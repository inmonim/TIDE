import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface LoginState {
  status: string;
  value: any;
}

interface loginProps {
  email: string;
  password: string;
}

// 초기값
const initialState: LoginState = {
  status: '',
  value: null
};

// Thunk 예시
export const loginAsync = createAsyncThunk(
  'login/Async',
  async ({email, password}: loginProps) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
        data: {
          email,
          password
        }
      });
      console.log('로그인 성공?', data);
    } catch (error) {
      console.log(error, '로그인 thunk요청 실패');
    }
  }
);

// createSlice로 Slice생성
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.value = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.value = action.payload;
      });
  }
});

export default loginSlice.reducer;
