import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface barOpenState {
  BarOpen: number;
}
// 초기값
const initialState: barOpenState = {
  BarOpen: 0,
};

// createSlice로 Slice생성
export const barOpenSlice = createSlice({
  name: 'barOpen',
  initialState,
  reducers: {
    barZero(state) {
      state.BarOpen = 0;
    },
    barOne(state) {
      state.BarOpen = 1;
    },
    barTwo(state) {
      state.BarOpen = 2;
    }
  },

});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const {barZero, barOne, barTwo} = barOpenSlice.actions;
export default barOpenSlice.reducer;
