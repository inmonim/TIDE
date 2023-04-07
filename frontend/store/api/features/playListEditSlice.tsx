import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface playListEditState {
  status: string;
  error: string | undefined;
}

interface playListEditProps {
  playlistId: Number;
  playlistTitle: string;
  isPublic:string;
}

// 초기값
const initialState: playListEditState = {
  status: '',
  error: ''
};

// Thunk 예시
export const playListEditAsync = createAsyncThunk(
  'playListEdit/Async',
  async ({playlistId,playlistTitle,isPublic}: playListEditProps) => {
    const accessToken = getCookie('accessToken');

    console.log(playlistId, playlistTitle, isPublic)
    const data = await axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data:{
        playlistId,
        playlistTitle,
        isPublic
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const playListEditSlice = createSlice({
  name: 'playListEdit',
  initialState,
  reducers: {
    playListEditinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListEditAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListEditAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        console.log('일기장 모음 이름 수정 성공')
      })
      .addCase(playListEditAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('일기장 모음 이름 수정 실패')
      });
  }
});
export const {playListEditinitStatus} = playListEditSlice.actions;
export default playListEditSlice.reducer;
