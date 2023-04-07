import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';
import {RootState} from 'store';

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
  cntLike: number;
  lyrics: string;
  error: string | null;
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
  releaseYear: 0,
  cntLike: 0,
  lyrics: '',
  error: null
};

// Thunk 예시
export const musicAsync = createAsyncThunk(
  'music/Async',
  async (songId: any) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/song/${songId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(musicAsync.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(musicAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'completed';
        const {
          title,
          videoId,
          artistId,
          artistName,
          artistImgPath,
          albumImgPath,
          albumTitle,
          albumId,
          releaseDt,
          lyrics
        } = action.payload;

        state.musicTitle = title;
        state.musicUrl = videoId;
        state.albumId = albumId;
        state.artistId = artistId;
        state.artistName = artistName;
        state.artistImage = artistImgPath;
        state.albumImage = albumImgPath;
        state.albumName = albumTitle;
        state.releaseYear = releaseDt;
        state.lyrics = lyrics;
        state.error = null;
      })
      .addCase(musicAsync.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? 'Unknown error';
      });
  }
});

export default musicSlice.reducer;
