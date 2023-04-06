import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';

// 타입
interface DiaryListState {
  status: string;
  error: string | undefined;
  diarys: diaryInterFace[];
}

interface userInfoProps {
  nickname:string;
}

interface diaryInterFace {
  id:number,
  nickname: string;
  title: string,
  content: string,
  createDt: Date,
  pub:string,
  like:number
}

// 초기값
const initialState: DiaryListState = {
  status: '',
  error:'',
  diarys:[]
};


// Thunk 예시
export const userDiaryAsync = createAsyncThunk(
  'userDiary/Async',
  async ({nickname}: userInfoProps) => {
    console.log(nickname, "유저 다이어리 요청하냐?");
    const accessToken = getCookie('accessToken');
    const data = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/diary/user/diaries`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data:{
        nickname
      }
    });
    console.log(data.data, "유저 다이어리 요청하냐?");
    return data.data;
  }
);

// createSlice로 Slice생성
export const userDiarySlice = createSlice({
  name: 'userDiary',
  initialState,
  reducers: {
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(userDiaryAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userDiaryAsync.fulfilled, (state,action) => {
        state.status = 'completed';
        const diaryList = action.payload;
        state.diarys = diaryList;
        // console.log('남의 다이어리들 요청 성공', state.diarys)

      })
      .addCase(userDiaryAsync.rejected, state => {
        state.status = 'failed';
        // console.log('남의 다이어리들 요청 실패');
      });
  }
});
export default userDiarySlice.reducer;
