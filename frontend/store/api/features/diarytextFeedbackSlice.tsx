import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookie } from 'cookies-next';

// 타입
interface diarytextFeedbackState {
  status: string;
  token: string;
  error: string | undefined;
}

interface diarytextProps {
  userId:number,
  text:string,
  emotionLabel: number;
}

// 초기값
const initialState: diarytextFeedbackState = {
  status: '',
  token: '',
  error: ''
};

// Thunk 예시
export const diarytextFeedbackAsync = createAsyncThunk(
  'diarytextFeedback/Async',
  async ({userId, text, emotionLabel}: diarytextProps) => {
    const accessToken = getCookie('accessToken');
    // console.log('타이틀왓나?',diarytextTitle)
    const data = await axios({
      method: 'post',
      url: `https://tideflask.duckdns.org/api/v1/feedback/textfeedback`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        email: getCookie('email')
      },
      data: {
        userId,
        text,
        emotionLabel
      }
    });
    return data.data;
  }
);

// FeedbackSlice로 Slice생성
export const diarytextFeedbackSlice = createSlice({
  name: 'diarytextFeedback',
  initialState,
  reducers: {
    diarytextFeedbackinitStatus(state) {
      state.status = 'loading';
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(diarytextFeedbackAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(diarytextFeedbackAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        console.log('피드백 요청 성공')
      })
      .addCase(diarytextFeedbackAsync.rejected, (state, action) => {
        state.status = 'failed';
        console.log('피드백 요청 실패')
      });
  }
});
export const {diarytextFeedbackinitStatus} = diarytextFeedbackSlice.actions;
export default diarytextFeedbackSlice.reducer;
