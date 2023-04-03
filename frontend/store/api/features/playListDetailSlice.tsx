import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface playListDetailState {
  status: string;
  error: string | undefined;
  playListSongs: playListInterFace[];
}

interface playListInterFace {
  songId:number,
  title: string,
  artist: string[],
  albumImgPath: string,
}

// 초기값
const initialState: playListDetailState = {
  status: '',
  error:'',
  playListSongs:[]
};

interface playListDetailProps {
  playListId:Number;
}


// Thunk 예시
export const playListDetailAsync = createAsyncThunk(
  'playListDeatil/Async',
  async ({playListId}: playListDetailProps) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist/${playListId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const playListDeatilSlice = createSlice({
  name: 'playListDeatil',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListDetailAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListDetailAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const playListSongs = action.payload;
        state.playListSongs = playListSongs;
        // console.log('플레이리스트 상세 요청 성공')

      })
      .addCase(playListDetailAsync.rejected, state => {
        state.status = 'failed';
        // console.log('플레이리스트 상세 요청 실패');
      });
  }
});
export default playListDeatilSlice.reducer;
