import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface recomMusicState {
  status: string;
  error: string | undefined;
  // result: MusicInterface | undefined
  song_model1CosineTop:song| undefined;
  song_model1T3Top:song| undefined;
  song_model2CosineTop:song| undefined;
  song_model2T3Top:song| undefined;
}

interface MusicInterface{
  song_model1CosineTop:song,
  song_model1T3Top:song,
  song_model2CosineTop:song,
  song_model2T3Top:song
}

interface song{
  albumImgPath: string,
  albumTitle: string,
  artist: string[],
  songId:Number,
  title: string
}

interface recomProps {
  content:string;
}

// 초기값
const initialState: recomMusicState = {
  status: '',
  error: '',
  song_model1CosineTop:undefined,
  song_model1T3Top:undefined,
  song_model2CosineTop:undefined,
  song_model2T3Top:undefined
}
;

// Thunk 예시
export const recomMusicAsync = createAsyncThunk(
  'recomMusic/Async',
  async ({content}: recomProps) => {
    console.log('content= ',content)
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'post',
      // url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/recommend`,
      url: `https://tideflask.duckdns.org/api/v1/diarymusic`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // email: getCookie('email')
      },
      data:{
        content
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const recomMusicSlice = createSlice({
  name: 'recomMusic',
  initialState,
  reducers: {
    recominitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(recomMusicAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(recomMusicAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.song_model1CosineTop = action.payload.song_list.song_model1CosineTop;
        state.song_model1T3Top = action.payload.song_list.song_model1T3Top;
        state.song_model2CosineTop = action.payload.song_list.song_model2CosineTop;
        state.song_model2T3Top = action.payload.song_list.song_model2T3Top;

        console.log('음악 추천 성공', state.song_model1CosineTop,state.song_model1T3Top,state.song_model2CosineTop,state.song_model2T3Top)
      })
      .addCase(recomMusicAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('음악 추천 실패')
      });
  }
});
export const {recominitStatus} = recomMusicSlice.actions;
export default recomMusicSlice.reducer;
