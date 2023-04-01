import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface userFollowListState {
  status: string;
  error: string | undefined;
  follows: userfollowInterFace[];
}

interface userfollowInterFace {
  nickname: string;
  profile_img_path: string;
  introduce: string;
}

interface userInfoProps {
  nickname:string;
}


// 초기값
const initialState: userFollowListState = {
  status: '',
  error:'',
  follows:[]
};


// Thunk 예시
export const userfollowListAsync = createAsyncThunk(
  'userfollows/Async',
  async ({nickname}: userInfoProps)  => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/userfollow`,
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
export const userfollowListSlice = createSlice({
  name: 'userfollows',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(userfollowListAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userfollowListAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const followList = action.payload;
        state.follows = followList;
        // console.log('팔로우 리스트 요청 성공', state.follows)

      })
      .addCase(userfollowListAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('팔로우 대기 리스트 요청 실패', action.error);
      });
  }
});
export default userfollowListSlice.reducer;
