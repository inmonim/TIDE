import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface userFollowerListState {
  status: string;
  error: string | undefined;
  followers: userfollowerInterFace[];
}

interface userfollowerInterFace {
  nickname: string;
  profile_img_path: string;
  introduce: string;
}

interface userInfoProps {
  nickname:string;
}


// 초기값
const initialState: userFollowerListState = {
  status: '',
  error:'',
  followers:[]
};


// Thunk 예시
export const userfollowerListAsync = createAsyncThunk(
  'userfollowers/Async',
  async ({nickname}: userInfoProps)  => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/userfollower`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data:{
        nickname:nickname
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const userfollowerListSlice = createSlice({
  name: 'userfollowers',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(userfollowerListAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userfollowerListAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const followerList = action.payload;
        state.followers = followerList;
        // console.log('팔로워 리스트 요청 성공', state.followers)

      })
      .addCase(userfollowerListAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('팔로우 대기 리스트 요청 실패', action.error);
      });
  }
});
export default userfollowerListSlice.reducer;
