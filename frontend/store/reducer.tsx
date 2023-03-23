import {combineReducers} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
import countSlice from './api/features/countSlice';
import loginSlice from './api/features/loginSlice';
import signUpSlice from './api/features/signUpSlice';

// 리듀서들을 합쳐주는곳
const combinedReducer = combineReducers({
  counter: countSlice,
  signup: signUpSlice,
  login: loginSlice
});

// Hydrate와 위에서 합친 reducer들을 rootReducer에 세팅
const rootReducer: typeof combinedReducer = (state, action) => {
  // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload
    };
  }
  return combinedReducer(state, action);
};

export default rootReducer;
