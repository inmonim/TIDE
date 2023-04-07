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
export const profileEditAsync = createAsyncThunk(
  'profileEdit/Async',
  async (data: {
    newNickname: string;
    newIntroduce: string;
    selectedImage: string;
  }) => {
    const accessToken = getCookie('accessToken');
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/info`,
      {
        nickname: data.newNickname,
        introduce: data.newIntroduce,
        profile_img_path: data.selectedImage
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          email: getCookie('email')
        }
      }
    );
    return response.data;
  }
);
// createSlice로 Slice생성
export const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(profileEditAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(profileEditAsync.fulfilled, (state, action) => {
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

export default profileEditSlice.reducer;
