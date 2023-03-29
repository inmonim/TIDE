import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface ProfileState {
  status: string;
  nickname: any;
  point: number;
  profile_img_path: string;
  introduce: string;
  gender: number;
}

const initialState: ProfileState = {
  status: '',
  nickname: '',
  point: 0,
  profile_img_path: '',
  introduce: '',
  gender: 0
};

// Thunk 예시
export const profileAsync = createAsyncThunk('profile/Async', async () => {
  console.log(getCookie('accessToken'), '토큰');
  const accessToken = getCookie('accessToken');
  const data = await axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/info`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      email: getCookie('email')
    }
  });
  return data.data;
});
// createSlice로 Slice생성
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(profileAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(profileAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        const {point, gender, nickname, profile_img_path, introduce} =
          action.payload;
        state.point = point;
        state.gender = gender;
        state.nickname = nickname;
        state.profile_img_path = profile_img_path;
        state.introduce = introduce;
      });
  }
});

export default profileSlice.reducer;
