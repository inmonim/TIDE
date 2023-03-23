import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { useAppDispatch } from 'store';
import { loginAsync } from './loginSlice';

// 타입
interface SignUpState {
  status: string;
  value: any;
  email: string;
  password: string;
}

interface signUpProps {
  email: string;
  password: string;
  nickname: string;
  year: string;
  month: string;
  day: string;
  gender: number;
}
// 초기값
const initialState: SignUpState = {
  status: '',
  value: null,
  email: '',
  password: ''
};

// Thunk 예시
export const signUpAsync = createAsyncThunk(
  'signup/Async',
  async ({
    email,
    password,
    nickname,
    year,
    month,
    day,
    gender
  }: signUpProps) => {
    // 생일 데이터 가공
    const birth = `${year}-${month}-${day}`;
    // console.log(
    //   '회원가입 데이터',
    //   'email :',
    //   email,
    //   'password :',
    //   password,
    //   'nickname :',
    //   nickname,
    //   'birth :',
    //   birth,
    //   'gender :',
    //   gender
    // );

    // 회원가입 요청
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
      data: {
        email,
        password,
        nickname,
        birth,
        gender
      }
    });
    console.log('회원가입 성공', data);
  }
);
// createSlice로 Slice생성
export const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(signUpAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(signUpAsync.fulfilled, (state) => {
        state.status = 'completed';

      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('회원가입 오류', action.error);
      });
  }
});

export default signUpSlice.reducer;
