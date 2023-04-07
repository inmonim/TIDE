import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getCookie} from 'cookies-next';
import {url} from 'inspector';

interface UserIdState {
  status: string;
  userId: number;
}

const initialState: UserIdState = {
  status: '',
  userId: 0
};

export const userIdAsync = createAsyncThunk('userId/Async', async () => {
  const accessToken = getCookie('accessToken');
  const data = await axios({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/getuserid`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      email: getCookie('email')
    }
  });
  console.log(data.data, '사망플래그');
  return data.data;
});

export const userIdSlice = createSlice({
  name: 'userId',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userIdAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(userIdAsync.fulfilled, (state, action) => {
        state.status = 'complete';
        state.userId = action.payload;
        console.log('유저아이디', state.userId);
      })
      .addCase(userIdAsync.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default userIdSlice.reducer;
