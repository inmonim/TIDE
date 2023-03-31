import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface musicState {
  status: string;
  musicId: number;
  musicTitle: string;
  musicUrl: string;
  artistId: number;
  artistImage: string;
  artistName: string;
  albumImage: string;
  albumName: string;
  albumId: number;
  releaseYear: number;
}
// 초기값
const initialState: musicState = {
  status: '',
  musicId: 0,
  musicTitle: '',
  musicUrl: '',
  artistId: 0,
  artistImage: '',
  artistName: '',
  albumImage: '',
  albumName: '',
  albumId: 0,
  releaseYear: 0
};

// Thunk 예시
export const fetchAsync = createAsyncThunk('music/Async', async () => {
  const accessToken = getCookie('accessToken');
  const data = await axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/info`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      email: getCookie('email')
    }
  });
  return data.data;
});

// createSlice로 Slice생성
export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(fetchAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        const {
          musicId,
          musicTitle,
          musicUrl,
          artistId,
          artistName,
          artistImage,
          albumImage,
          albumName,
          albumId,
          releaseYear
        } = action.payload;
        state.musicId = musicId;
        state.musicTitle = musicTitle;
        state.musicUrl = musicUrl;
        state.albumId = albumId;
        state.artistId = artistId;
        state.artistName = artistName;
        state.artistImage = artistImage;
        state.albumImage = albumImage;
        state.albumName = albumName;
        state.releaseYear = releaseYear;
      })
      .addCase(fetchAsync.rejected, state => {
        state.status = 'failed';
      });
  }
});

export default musicSlice.reducer;
