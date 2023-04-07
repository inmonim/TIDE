import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface playListCreateState {
  status: string;
  token: string;
  error: string | undefined;
}

interface playListProps {
  playListTitle: string;
  isPublic:string;
}

// 초기값
const initialState: playListCreateState = {
  status: '',
  token: '',
  error: ''
};

// Thunk 예시
export const playListCreateAsync = createAsyncThunk(
  'playListCreate/Async',
  async ({playListTitle,isPublic}: playListProps) => {
    const accessToken = getCookie('accessToken');
    console.log('타이틀왓나?',playListTitle)
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data: {
        playListTitle,
        isPublic
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const playListCreateSlice = createSlice({
  name: 'playListCreate',
  initialState,
  reducers: {
    playListCreateinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListCreateAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListCreateAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        // console.log('플레이리스트 생성 성공')
      })
      .addCase(playListCreateAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('플레이리스트 생성 실패')
      });
  }
});
export const {playListCreateinitStatus} = playListCreateSlice.actions;
export default playListCreateSlice.reducer;
