import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface FollowWaitState {
  status: string;
  error: string | undefined;
  followWaiters: followWaitInterFace[];
}

interface followWaitInterFace {
  nickname: string;
  profile_img_path: string;
  introduce: string;
}

// 초기값
const initialState: FollowWaitState = {
  status: '',
  error:'',
  followWaiters:[]
};


// Thunk 예시
export const followWaitAsync = createAsyncThunk(
  'followWaitAsync/Async',
  async () => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/followwait`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const followWaitSlice = createSlice({
  name: 'followWait',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(followWaitAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(followWaitAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const followWaitList = action.payload;
        // console.log(action.payload)
        // console.log(followWaitList)
        // console.log(state)
        state.followWaiters = followWaitList;
        // followWaitList.map((followWaiter:followWaitInterFace) => (
        //   state.followWaiters.push({
        //     nickname:followWaiter.nickname,
        //     profile_img_path:followWaiter.profile_img_path,
        //     introduce:followWaiter.introduce
        //   })
        // ))
        // console.log('팔로우 대기 리스트 요청 성공', state.followWaiters)

      })
      .addCase(followWaitAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('팔로우 대기 리스트 요청 실패', action.error);
      });
  }
});
export default followWaitSlice.reducer;
