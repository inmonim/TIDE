import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface FollowerListState {
  status: string;
  error: string | undefined;
  followers: followerInterFace[];
}

interface followerInterFace {
  nickname: string;
  profile_img_path: string;
  introduce: string;
}

// 초기값
const initialState: FollowerListState = {
  status: '',
  error:'',
  followers:[]
};


// Thunk 예시
export const followerListAsync = createAsyncThunk(
  'followerListAsync/Async',
  async () => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/follower`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const followerListSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(followerListAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(followerListAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const followerList = action.payload;
        state.followers = followerList;
        console.log('팔로워 리스트 요청 성공', state.followers)

      })
      .addCase(followerListAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('팔로우 대기 리스트 요청 실패', action.error);
      });
  }
});
export default followerListSlice.reducer;
