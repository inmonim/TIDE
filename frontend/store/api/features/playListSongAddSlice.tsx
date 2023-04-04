import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface playListSongAddState {
  status: string;
  token: string;
  songId: number;
  playlistId: number;
  error: string | undefined;
}

// 초기값
const initialState: playListSongAddState = {
  status: '',
  token: '',
  songId: 0,
  playlistId: 0,
  error: ''
};

// Thunk 예시
export const playListSongAddAsync = createAsyncThunk(
  'playListSongAdd/Async',
  async (payload: {playlistId: number; songId: number}) => {
    const {playlistId, songId} = payload;
    const accessToken = getCookie('accessToken');
    // console.log('타이틀왓나?',diaryListTitle)
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist/${songId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data: {
        playlistId
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const playListSongAddSlice = createSlice({
  name: 'playListSongAdd',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListSongAddAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListSongAddAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        const {songId, playlistId} = action.payload;
        state.songId = songId;
        state.playlistId = playlistId;
        // console.log('플레이리스트 생성 성공')
      })
      .addCase(playListSongAddAsync.rejected, (state, action) => {
        state.status = 'failed';
        // console.log('플레이리스트 생성 실패')
      });
  }
});

export default playListSongAddSlice.reducer;
