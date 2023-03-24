import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface ProfileState {
  status: string;
  nickname: any;
  email: string;
  password: string;
  profileImage: string;
  profileBGImage: string;
  introduction: string;
}

const initialState: ProfileState = {
  status: '',
  email: '',
  password: '',
  nickname: '',
  profileImage: '',
  profileBGImage: '',
  introduction: ''
};

// Thunk 예시
export const profileAsync = createAsyncThunk('profile/Async', async () => {
  const data = await axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/info`,
    headers: {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email')
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
        const {
          email,
          password,
          nickname,
          profileImage,
          profileBGImage,
          introduction
        } = action.payload;
        state.email = email;
        state.password = password;
        state.nickname = nickname;
        state.profileImage = profileImage;
        state.profileBGImage = profileBGImage;
        state.introduction = introduction;
      });
  }
});

export default profileSlice.reducer;
