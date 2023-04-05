import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getCookie} from 'cookies-next';
import axios from 'axios';

// 타입
interface MusicSearchInterface {
  songId: number;
  title: string;
  artist: string[];
  albumImgPath: string;
}

interface MusicSearchState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  musicSearchResult: MusicSearchInterface[];
}

// 초기값
const initialState: MusicSearchState = {
  status: 'idle',
  musicSearchResult: [],
  error: undefined
};

export const musicsearchAsync = createAsyncThunk(
  'musicsearch/Async',
  async (title: any) => {
    const accessToken = getCookie('accessToken');
    const response = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/search`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data: {
        title: title
      }
    });
    // console.log(response.data);
    return response.data; //.items[0].id.musicId;
  }
);

const musicsearchSlice = createSlice({
  name: 'musicsearch',
  initialState,
  reducers: {
    searchinitStatus(state) {
      state.status = 'loading';
      state.musicSearchResult = [];
    },
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(musicsearchAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(musicsearchAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const musicSearchResult = action.payload;
        state.musicSearchResult = musicSearchResult;
      })
      .addCase(musicsearchAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // createSlice로 Slice생성
  }
});
export const {searchinitStatus} = musicsearchSlice.actions;
export default musicsearchSlice.reducer;
