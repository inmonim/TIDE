import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

interface likeTopSixState {
  status: string;
  topArtist: [];
}

const initialState: likeTopSixState = {
  status: '',
  topArtist: []
};

export const likeTopSixAsync = createAsyncThunk(
  'likeTopSix/Async',
  async () => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/artist/top`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      }
    });
    return data.data;
  }
);

export const likeTopSixSlice = createSlice({
  name: 'likeTopSix',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(likeTopSixAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(likeTopSixAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.topArtist = action.payload;
      });
  }
});

export default likeTopSixSlice.reducer;
