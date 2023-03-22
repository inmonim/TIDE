import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// 타입
interface CountState {
  value: number;
  status: string;
}
// 초기값
const initialState: CountState = {
  value: 0,
  status: ''
};

// Thunk 예시
export const fetchAsync = createAsyncThunk(
  'count/fetchAsync',
  async () => {
    const resp = await fetch(
      'https://api.countapi.xyz/hit/opesaljkdfslkjfsadf.com/visits'
    );
    const data = await resp.json();
    return data.value;
  }
);

// createSlice로 Slice생성
export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    }
  },
  // 비동기 처리를 위한 redux-thunk사용 extraReducers
  extraReducers: builder => {
    builder
      .addCase(fetchAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'completed';
        state.value = action.payload;
      })
      .addCase(fetchAsync.rejected, state => {
        state.status = 'failed';
      });
  }
});

// createSlice의 reducers 에서 만든 state 변경 함수를 export 하기
export const {increment, decrement} = countSlice.actions;
export default countSlice.reducer;
