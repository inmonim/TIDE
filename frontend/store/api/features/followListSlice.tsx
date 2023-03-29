import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface FollowListState {
  status: string;
  error: string | undefined;
  follows: followInterFace[];
}

interface followInterFace {
  nickname: string;
  profile_img_path: string;
  introduce: string;
}

// 초기값
const initialState: FollowListState = {
  status: '',
  error:'',
  follows:[]
};


// Thunk 예시
export const followListAsync = createAsyncThunk(
  'followListAsync/Async',
  async () => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/followlist`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const followListSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(followListAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(followListAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const followList = action.payload;
        state.follows = followList;
        console.log('팔로우 리스트 요청 성공', state.follows)

      })
      .addCase(followListAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('팔로우 대기 리스트 요청 실패', action.error);
      });
  }
});
export default followListSlice.reducer;
