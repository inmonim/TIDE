import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface artistState {
  status: string;
  artistId: number;
  artistName: any;
  artist_img_path: string;
  is_group: boolean;
}

const initialState: artistState = {
  status: '',
  artistId: 0,
  artistName: '',
  artist_img_path: '',
  is_group: false
};

// Thunk 예시
export const artistAsync = createAsyncThunk('artist/Async', async () => {
  const accessToken = getCookie('accessToken');
  const data = await axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/artist`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      email: getCookie('email')
    }
  });
  return data.data;
});
// createSlice로 Slice생성
export const artistSlice = createSlice({
  name: 'profile',
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
        const {artistId, artistName, artist_img_path, is_group} =
          action.payload;
        state.artistId = artistId;
        state.artistName = artistName;
        state.artist_img_path = artist_img_path;
        state.is_group = is_group;
      });
  }
});

export default artistSlice.reducer;
