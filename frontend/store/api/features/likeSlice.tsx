import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface likeState {
  status: string;
  likeCnt: number;
  likedSongs: number[];
  check: boolean | undefined;
}

const initialState: likeState = {
  status: '',
  likeCnt: 0,
  likedSongs: [],
  check : false
};


// export const selectLikeCount = (state: {like: likeState}) => state.like.likeCnt;

// export const selectisLiked = (songId: number) => (state: {like: likeState}) =>
//   state.like.likedSongs.includes(songId);
// 음악 좋아요 요청
export const likeSong = createAsyncThunk(
  'like/likeSong',
  async (songId: number) => {
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

// 음악 좋아요 체크 요청
export const likeSongCheck = createAsyncThunk(
  'like/likeSongCheck',
  async (songId: number) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
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
      .addCase(likeSong.pending, state => {
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
      .addCase(likeSong.fulfilled, (state) => {
        state.status = 'completed';
      })
      .addCase(likeSongCheck.fulfilled, (state, action) => {
        state.status = 'CheckCompleted';
        state.check = action.payload;
      })
  }
});

export default likeSlice.reducer;
