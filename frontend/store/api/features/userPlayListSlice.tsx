import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface PlayListState {
  status: string;
  error: string | undefined;
  playlists: PlayList[];
}

interface userInfoProps {
  nickname:string;
}

interface PlayList {
  id:number,
  playlistTitle: string,
  isPublic: string,
  likeCnt:number
}

// 초기값
const initialState: PlayListState = {
  status: '',
  error:'',
  playlists:[]
};


// Thunk 예시
export const userPlayListAsync = createAsyncThunk(
  'userPlayList/Async',
  async ({nickname}: userInfoProps) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist/user`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data:{
        nickname
      }
    });
    return data.data;
  }
);

// createSlice로 Slice생성
export const userPlayListSlice = createSlice({
  name: 'userPlayList',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(userPlayListAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userPlayListAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const playlists = action.payload;
        state.playlists = playlists;
        console.log('남의 플리 요청 성공', state.playlists)

      })
      .addCase(userPlayListAsync.rejected, state => {
        state.status = 'failed';
        console.log('남의 플리 요청 실패', state.playlists)
      });
  }
});
export default userPlayListSlice.reducer;
