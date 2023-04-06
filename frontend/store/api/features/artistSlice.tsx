import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface artistState {
  status: string;
  artistId: number;
  songId: number[];
  artistName: any;
  title: string[];
  artistImgPath: string;
  is_group: boolean;
  likeCnt: number;
}

const initialState: artistState = {
  status: '',
  artistId: 0,
  songId: [],
  artistName: '',
  title: [],
  artistImgPath: '',
  is_group: false,
  likeCnt: 0
};

// Thunk 예시
export const artistAsync = createAsyncThunk(
  'artist/Async',
  async (artistId: any) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/artist/${artistId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      }
    });
    return data.data;
  }
);
// createSlice로 Slice생성
export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(artistAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(artistAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        const {
          artistId,
          artistName,
          title,
          artistImgPath,
          is_group,
          songId,
          likeCnt
        } = action.payload;
        state.artistId = artistId;
        state.songId = songId;
        state.artistName = artistName;
        state.title = title;
        state.artistImgPath = artistImgPath;
        state.is_group = is_group;
        state.likeCnt = likeCnt;
      });
  }
});

export default artistSlice.reducer;
