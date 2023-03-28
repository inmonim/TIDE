import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface FollowWaitState {
  status: string;
  error: string | undefined;
  nickname: string;
  profile_img_path: string;
  introduce: string;
}

// 초기값
const initialState: FollowWaitState = {
  status: '',
  error:'',
  nickname: '',
  profile_img_path: '',
  introduce: '',
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
        const {
          nickname,
          profile_img_path,
          introduce,
        } = action.payload;
        state.nickname = nickname;
        state.profile_img_path = profile_img_path;
        state.introduce = introduce;
        console.log('팔로우 대기 리스트 요청 성공', state)

      })
      .addCase(followWaitAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('팔로우 대기 리스트 요청 실패', action.error);
      });
  }
});
export default followWaitSlice.reducer;
