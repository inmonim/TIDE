import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface playListAllDetailState {
  status: string;
  error: string | undefined;
  plDetail : playListInterFace
}

interface playListInterFace {
  playlistId: number;
  playlistTitle: string;
  nickname: string;
  likecnt: number;
  isPublic:string;
}

// 초기값
const initialState: playListAllDetailState = {
  status: '',
  error: '',
  plDetail: {
    playlistId: 0,
    playlistTitle: '',
    nickname: '',
    likecnt: 0,
    isPublic:'1',
  }
};

interface playListAllDetailProps {
  playListId: Number;
}

// Thunk 예시
export const playListAllDetailAsync = createAsyncThunk(
  'playListAllDetail/Async',
  async ({playListId}: playListAllDetailProps) => {
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/music/playlist/user/${playListId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      }
    });
    console.log(data.data, 222);
    return data.data;
  }
);

// createSlice로 Slice생성
export const playListAllDetailSlice = createSlice({
  name: 'playListAllDetail',
  initialState,
  reducers: {
    playListAllDetailinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(playListAllDetailAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(playListAllDetailAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.plDetail = action.payload;
        console.log('플레이리스트 상세 요청 성공', state.plDetail);
      })
      .addCase(playListAllDetailAsync.rejected, state => {
        state.status = 'failed';
        console.log('플레이리스트 상세 요청 실패');
      });
  }
});
export const {playListAllDetailinitStatus} = playListAllDetailSlice.actions;
export default playListAllDetailSlice.reducer;
