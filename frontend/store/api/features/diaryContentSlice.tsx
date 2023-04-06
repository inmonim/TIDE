import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface diaryContentState {
  status: string;
  content:string;
  HTMLcontent:string;
}
// 초기값
const initialState: diaryContentState = {
  status: '',
  content:'',
  HTMLcontent:''
};

// createSlice로 Slice생성
export const diaryContentSlice = createSlice({
  name: 'diaryContent',
  initialState,
  reducers: {
    initContent(state) {
      state.content = '';
      state.HTMLcontent = '';
    },
    setContent(state, action) {
      const Contents = action.payload;
      state.content = Contents.content;
      state.HTMLcontent = Contents.HTMLcontent;
      // console.log(Contents)
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const {initContent, setContent} = diaryContentSlice.actions;
export default diaryContentSlice.reducer;
