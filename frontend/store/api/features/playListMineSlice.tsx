import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface playListMineState {
  status: string;
  myplaylist: playListInterface[];
  error: string | undefined;
}

interface playListInterface {
  id:number,
  playlistTitle: string,
  likeCnt: number
  isPublic:string,
}

// 초기값
const initialState: playListMineState = {
  status: '',
  myplaylist: [],
  error: ''
};

// Thunk 예시
export const playListMineAsync = createAsyncThunk(
  'playListMine/Async',
  async () => {
    const accessToken = getCookie('accessToken');
    // console.log('타이틀왓나?',diaryListTitle)
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/myplaylist`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const playListMineSlice = createSlice({
  name: 'playListMine',
  initialState,
  reducers: {
    playListMineinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListMineAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListMineAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.myplaylist = action.payload
        console.log('내 플레이리스트 조회 성공', state.myplaylist)
      })
      .addCase(playListMineAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('내 플레이리스트 조회 실패')
      });
  }
});
export const {playListMineinitStatus} = playListMineSlice.actions;
export default playListMineSlice.reducer;
