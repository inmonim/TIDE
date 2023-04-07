import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface artistLikeState {
  status: string;
  likeCnt: number;
  check: boolean | undefined;
}

const initialState: artistLikeState = {
  status: '',
  likeCnt: 0,
  check: false
};

export const artistLikeAsync = createAsyncThunk(
  'artistLike/artistLike',
  async (artistId: any) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'put',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/like/artist/${artistId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      }
    });
    return data.data;
  }
);

// 음악 좋아요 체크 요청
export const artistLikeCheckAsync = createAsyncThunk(
  'artistLike/artistLikeCheck',
  async (artistId: any) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/like/artist/${artistId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const artistLike = createSlice({
  name: 'artistLike',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(artistLikeAsync.pending, state => {
        state.status = 'loading';
      })
      // .addCase(likeSong.fulfilled, (state, action) => {
      //   state.status = 'completed';
      //   const {likeCnt, likedSongs} = action.payload;
      //   state.likeCnt = likeCnt;
      //   state.likedSongs = likedSongs.map((songId: string) =>
      //     parseInt(songId, 10)
      //   );
      // })
      .addCase(artistLikeAsync.fulfilled, state => {
        state.status = 'completed';
        state.check = true;
      })
      .addCase(artistLikeCheckAsync.fulfilled, (state, action) => {
        state.status = 'CheckCompleted';
        state.check = action.payload;
      });
  }
});

export default artistLike.reducer;
