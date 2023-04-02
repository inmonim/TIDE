import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface FollowAccState {
  status: string;
  nickname:string;
  error: string | undefined;
}

interface FollowAccProps {
  nickname:string;
}

// 초기값
const initialState: FollowAccState = {
  status: '',
  nickname:'',
  error:''
};


// Thunk 예시
export const followNoneAccAsync = createAsyncThunk(
  'followNoneAcc/Async',
  async ({nickname}: FollowAccProps) => {
    // console.log("닉받앗다",nickname)
    const accessToken = getCookie('accessToken');
    // console.log(`이메일: ${getCookie('email')} / 닉네임: ${nickname}`)
    const data = await axios({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/followrefuse`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data:{
        nickname
      }
    })
    return data.data;
  }
);

// createSlice로 Slice생성
export const followNoneAccSlice = createSlice({
  name: 'followNoneAcc',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(followNoneAccAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(followNoneAccAsync.fulfilled, state => {
        state.status = 'completed';
        console.log('팔로우 요청 거절 성공');
      })
      .addCase(followNoneAccAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('팔로우 요청 거절 실패', action.error);
      });
  }
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
// export const {increment, decrement} = followReqSlice.actions;
export default followNoneAccSlice.reducer;
