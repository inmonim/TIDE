import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface recomMusicState {
  status: string;
  error: string | undefined;
  // result: MusicInterface | undefined

  aModel2CategoryTop1One:song| undefined;
  bModel2CategoryTop1Two:song| undefined;
  cModel2CategoryTop2One:song| undefined;
  dModel2CategoryTop2Two:song| undefined;
  eModel1CategoryTop1:song| undefined;
  fModel1CategoryTop2:song| undefined;

  messageFirst:string;
  messageSecond:string;

  emotion0: number | undefined;
  emotion1: number | undefined;
  emotion2: number | undefined;
  emotion3: number | undefined;
  emotion4: number | undefined;
  emotion5: number | undefined;
  emotion6: number | undefined;
  emotion7: number | undefined;
  emotion8: number | undefined;
  emotion9: number | undefined;


  selectSong:song | undefined;
}

interface MusicInterface{
  aModel2CategoryTop1One:song,
  bModel2CategoryTop1Two:song,
  cModel2CategoryTop2One:song,
  dModel2CategoryTop2Two:song,
  eModel1CategoryTop1:song,
  fModel1CategoryTop2:song
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
  aModel2CategoryTop1One: undefined,
  bModel2CategoryTop1Two: undefined,
  cModel2CategoryTop2One: undefined,
  dModel2CategoryTop2Two: undefined,
  eModel1CategoryTop1: undefined,
  fModel1CategoryTop2: undefined,
  selectSong: undefined,
  emotion0: undefined,
  emotion1: undefined,
  emotion2: undefined,
  emotion3: undefined,
  emotion4: undefined,
  emotion5: undefined,
  emotion6: undefined,
  emotion7: undefined,
  emotion8: undefined,
  emotion9: undefined,
  messageFirst: '',
  messageSecond: ''
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
        state.aModel2CategoryTop1One = action.payload.songList.aModel2CategoryTop1One;
        state.bModel2CategoryTop1Two = action.payload.songList.bModel2CategoryTop1Two;
        state.cModel2CategoryTop2One = action.payload.songList.cModel2CategoryTop2One;
        state.dModel2CategoryTop2Two = action.payload.songList.dModel2CategoryTop2Two;
        state.eModel1CategoryTop1 = action.payload.songList.eModel1CategoryTop1;
        state.fModel1CategoryTop2 = action.payload.songList.fModel1CategoryTop2;
        state.emotion0 = action.payload.messageList.emotionList[0];
        state.emotion1 = action.payload.messageList.emotionList[1];
        state.emotion2 = action.payload.messageList.emotionList[2];
        state.emotion3 = action.payload.messageList.emotionList[3];
        state.emotion4 = action.payload.messageList.emotionList[4];
        state.emotion5 = action.payload.messageList.emotionList[5];
        state.emotion6 = action.payload.messageList.emotionList[6];
        state.emotion7 = action.payload.messageList.emotionList[7];
        state.emotion8 = action.payload.messageList.emotionList[8];
        state.emotion9 = action.payload.messageList.emotionList[9];
        state.messageFirst = action.payload.messageList.first;
        state.messageSecond = action.payload.messageList.second;


        console.log('음악 추천 성공')
        console.log(action.payload)
      })
      .addCase(recomMusicAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('음악 추천 실패')
      });
  }
});
export const {recominitStatus, setSong} = recomMusicSlice.actions;
export default recomMusicSlice.reducer;
