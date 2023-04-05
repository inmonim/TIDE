import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface recomMusicState {
  status: string;
  error: string | undefined;
  // result: MusicInterface | undefined
  songModel1CosineTop:song| undefined;
  songModel1T3Top:song| undefined;
  songModel2CosineTop:song| undefined;
  songModel2T3Top:song| undefined;
  selectSong:song | undefined;
}

interface MusicInterface{
  songModel1CosineTop:song,
  songModel1T3Top:song,
  songModel2CosineTop:song,
  songModel2T3Top:song
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
  songModel1CosineTop:undefined,
  songModel1T3Top:undefined,
  songModel2CosineTop:undefined,
  songModel2T3Top:undefined,
  selectSong: undefined
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
    },
    setSong(state,action){
      state.selectSong = action.payload
      console.log('선택된송 = ',state.selectSong)
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
        state.songModel1CosineTop = action.payload.song_list.songModel1CosineTop;
        state.songModel1T3Top = action.payload.song_list.songModel1T3Top;
        state.songModel2CosineTop = action.payload.song_list.songModel2CosineTop;
        state.songModel2T3Top = action.payload.song_list.songModel2T3Top;

        console.log('음악 추천 성공', state.songModel1CosineTop,state.songModel1T3Top,state.songModel2CosineTop,state.songModel2T3Top)
      })
      .addCase(recomMusicAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('음악 추천 실패')
      });
  }
});
export const {recominitStatus, setSong} = recomMusicSlice.actions;
export default recomMusicSlice.reducer;
