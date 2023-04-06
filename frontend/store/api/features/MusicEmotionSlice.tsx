import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

interface EmotionState {
  status: string;
}

interface EmotionProps {
  userId: number;
  songId: number;
  emotion: number | null;
}

const initialState: EmotionState = {
  status: ''
};

export const emotionSongAsync = createAsyncThunk(
  'emotion/Async',
  async (emotionData: EmotionProps) => {
    const {userId, songId, emotion} = emotionData;
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'post',
      url: `https://tideflask.duckdns.org/api/v1/feedback/musicemotion`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data: {userId, songId, emotion}
    });
    return data.data;
  }
);

export const emotionSongSlice = createSlice({
  name: 'emotionSong',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(emotionSongAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(emotionSongAsync.fulfilled, (state, action) => {
        state.status = 'complete';
      })
      .addCase(emotionSongAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default emotionSongSlice.reducer;
