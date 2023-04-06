import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface FollowReqState {
  status: string;
  nickname:string;
  error: string | undefined;
}

interface FollowReqProps {
  nickname:string;
}

// 초기값
const initialState: FollowReqState = {
  status: '',
  nickname:'',
  error:''
};


// Thunk 예시
export const followReqAsync = createAsyncThunk(
  'followReq/Async',
  async ({nickname}: FollowReqProps) => {
    const accessToken = getCookie('accessToken');
    console.log(`이메일 : ${getCookie('email')} / 닉 : ${nickname}`)
    console.log('닉타입 ', typeof(nickname))
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/follow`,
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
export const followReqSlice = createSlice({
  name: 'followReq',
  initialState,
  reducers: {
    initReq(state){
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(followReqAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(followReqAsync.fulfilled, state => {
        state.status = 'completed';
        // console.log('팔로우 요청 성공');
      })
      .addCase(followReqAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('팔로우 요청 실패', action.error);
      });
  }
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const {initReq} = followReqSlice.actions;
export default followReqSlice.reducer;
