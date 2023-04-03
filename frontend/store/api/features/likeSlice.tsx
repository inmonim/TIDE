import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface likeState {
  status: string;
  likeCnt: number;
  likedSongs: number[];
}

const initialState: likeState = {
  status: '',
  likeCnt: 0,
  likedSongs: []
};

// Thunk 예시
export const likeAsync = createAsyncThunk('like/Async', async () => {
  const accessToken = getCookie('accessToken');
  const data = await axios({
    method: 'put',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/like`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      email: getCookie('email')
    }
  });
  return data.data;
});

export const selectLikeCount = (state: {like: likeState}) => state.like.likeCnt;

export const selectisLiked = (songId: number) => (state: {like: likeState}) =>
  state.like.likedSongs.includes(songId);

export const likeSong = createAsyncThunk(
  'like/likeSong',
  async ({songId}: {songId: number}) => {
    console.log(songId, 2233);
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/like/${songId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(likeAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(likeAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        const {likeCnt, likedSongs} = action.payload;
        state.likeCnt = likeCnt;
        state.likedSongs = likedSongs.map((songId: string) =>
          parseInt(songId, 10)
        );
      })
      .addCase(likeSong.fulfilled, (state, action) => {
        const {songId} = action.payload;
        state.likedSongs.push(songId);
      });
  }
});

export default likeSlice.reducer;
