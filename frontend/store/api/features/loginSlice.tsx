import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface LoginState {
  status: string;
  token: string;
  email: string;
  error: string | undefined;
}

interface loginProps {
  email: string;
  password: string;
}

// 초기값
const initialState: LoginState = {
  status: '',
  token: '',
  email: '',
  error: ''
};

// Thunk 예시
export const loginAsync = createAsyncThunk(
  'login/Async',
  async ({email, password}: loginProps) => {
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
      data: {
        email,
        password
      }
    });
    const token = data.headers.token;
    const myEmail = data.headers.email;
    return {token, myEmail};
  }
);

// createSlice로 Slice생성
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    initStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        const {token, myEmail} = action.payload;
        state.token = token;
        state.email = myEmail;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('로그인 에러', action.error);
      });
  }
});

export default loginSlice.reducer;
