import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface SignUpState {
  status: string;
  value: any;
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
  value: null
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
    console.log(
      '회원가입 데이터',
      'email :',
      email,
      'password :',
      password,
      'nickname :',
      nickname,
      'birth :',
      birth,
      'gender :',
      gender
    );
    try {
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
      console.log('회회회회원가입 성공?', data);
    } catch (error) {
      console.log(error, '회원가입 thunk요청 실패');
    }
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
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.value = action.payload;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.value = action.payload;
      });
  }
});

export default signUpSlice.reducer;
