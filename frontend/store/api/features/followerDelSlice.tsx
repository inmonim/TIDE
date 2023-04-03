import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface FollowerDelState {
  status: string;
  nickname:string;
  error: string | undefined;
}

interface FollowerDelProps {
  nickname:string;
}

// 초기값
const initialState: FollowerDelState = {
  status: '',
  nickname:'',
  error:''
};


// Thunk 예시
export const followerDelAsync = createAsyncThunk(
  'followerDel/Async',
  async ({nickname}: FollowerDelProps) => {
    const accessToken = getCookie('accessToken');
    console.log(`이메일: ${getCookie('email')} / 닉네임: ${nickname}`)
    const data = await axios({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/follower`,
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
export const followerDelSlice = createSlice({
  name: 'followerDel',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(followerDelAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(followerDelAsync.fulfilled, state => {
        state.status = 'completed';
        // console.log('팔로워 삭제 성공');
      })
      .addCase(followerDelAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('팔로워 삭제 실패', action.error);
      });
  }
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
// export const {increment, decrement} = followReqSlice.actions;
export default followerDelSlice.reducer;
