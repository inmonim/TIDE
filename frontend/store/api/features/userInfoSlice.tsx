import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';
import { url } from 'inspector';

// 타입
interface UserState {
  status: string;
  nickname:string;
  error: string | undefined;
  profile_img_path: string;
  introduce: string;
}

interface userInfoProps {
  nickname:string;
}

// 초기값
const initialState: UserState = {
  status: '',
  nickname:'',
  error:'',
  profile_img_path:'',
  introduce: ''
};


// Thunk 예시
export const userInfoAsync = createAsyncThunk( 
  'userInfo/Async',
  async ({nickname}: userInfoProps) => {
    const accessToken = getCookie('accessToken');
    // console.log(`이메일 : ${getCookie('email')} / 닉 : ${nickname}`)   
    const json = {"nickname" : nickname}
    // console.log( '닉타입 ', json)
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/userinfo`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data:{
        nickname
      }
    })
    return data.data
  }
);

// createSlice로 Slice생성
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(userInfoAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userInfoAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        // console.log('사람 정보 요청 성공');
        // console.log(action.payload)
        const {nickname, profile_img_path, introduce} =
          action.payload;
        state.nickname = nickname;
        state.profile_img_path = profile_img_path;
        state.introduce = introduce;

      })
      .addCase(userInfoAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('사람 정보 요청 실패', action.error);
      });
  }
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
// export const {increment, decrement} = followReqSlice.actions;
export default userInfoSlice.reducer;
