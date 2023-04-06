import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

interface playlisttopState {
  status: string;
  topPlaylist: Array<{
    id: number;
    playlistName: string;
    isPublic: boolean;
    likeCnt: number;
  }>;
}

const initialState: playlisttopState = {
  status: '',
  topPlaylist: []
};

export const playlisttopAsync = createAsyncThunk(
  'playlisttop/Async',
  async () => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist/top`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      }
    });
    // console.log(data.data, '231');
    return data.data;
  }
);

export const playlisttopSlice = createSlice({
  name: 'playlisttop',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(playlisttopAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playlisttopAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.topPlaylist = action.payload;
      });
  }
});

export default playlisttopSlice.reducer;
