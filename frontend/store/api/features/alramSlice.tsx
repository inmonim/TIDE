import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface AlramState {
  value: boolean;
}
// 초기값
const initialState: AlramState = {
  value: false,
};

// createSlice로 Slice생성
export const alramSlice = createSlice({
  name: 'alram',
  initialState,
  reducers: {
    alramOn(state) {
      state.value = true;
    },
    alramOff(state) {
      state.value = false;
    }
  },

});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const {alramOn, alramOff} = alramSlice.actions;
export default alramSlice.reducer;
