import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 타입
interface MusicModalState {
  type:number;
}

const initialState: MusicModalState = {
  type: 0
};

// Thunk 예시
// export const musicModalAsync = createAsyncThunk('musicModal/Async', async () => {
//   const data = await axios({
//     method: 'get',
//     url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/info`,
//     headers: {
//       token: localStorage.getItem('token'),
//       email: localStorage.getItem('email')
//     }
//   });
//   return data.data;
// });

// createSlice로 Slice생성
export const musicModalSlice = createSlice({
  name: 'musicModal',
  initialState,
  reducers: {
    setType(state,action) {
      state.type = action.payload;
  },
  }
})
export const {setType} = musicModalSlice.actions;
export default musicModalSlice.reducer;
