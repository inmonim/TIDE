import {combineReducers} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
import countSlice from './api/features/countSlice';
import loginSlice from './api/features/loginSlice';
import signUpSlice from './api/features/signUpSlice';
import profileSlice from './api/features/profileSlice';
import profileEditSlice from './api/features/profileEditSlice';
import followReqSlice from './api/features/followReqSlice';
import followWaitSlice from './api/features/followWaitSlice';
import followAccSlice from './api/features/followAccSlice';
import followNoneAccSlice from './api/features/followNoneAccSlice';
import followerListSlice from './api/features/followerListSlice';
import followListSlice from './api/features/followListSlice';
import followDelSlice from './api/features/followDelSlice';
import followerDelSlice from './api/features/followerDelSlice';
import userInfoSlice from './api/features/userInfoSlice';
import diaryMineSlice from './api/features/diaryMineSlice';
import userFollowListSlice from './api/features/userFollowListSlice';
import userFollowerListSlice from './api/features/userFollowerListSlice';
import userDiarySlice from './api/features/userDiarySlice';
import publicDiarySlice from './api/features/publicDiarySlice';
import diaryDetailSlice from './api/features/diaryDetailSlice';
import diaryListCreateSlice from './api/features/diaryListCreateSlice';
import diaryListMineSlice from './api/features/diaryListMineSlice';
import diaryListDelSlice from './api/features/diaryListDelSlice';
import diaryListEditSlice from './api/features/diaryListEditSlice';
import musicSlice from './api/features/musicSlice';
import likeSlice from './api/features/likeSlice';
import nowmusicSlice from './api/features/nowmusicSlice';
import musicsearchSlice from './api/features/musicsearchSlice';
import playListCreateSlice from './api/features/playListCreateSlice';
import playListMineSlice from './api/features/playListMineSlice';
import playListDeatilSlice from './api/features/playListDetailSlice';
import playListEditSlice from './api/features/playListEditSlice';
import playListDelSlice from './api/features/playListDelSlice';

// 리듀서들을 합쳐주는곳
const combinedReducer = combineReducers({
  counter: countSlice,
  signup: signUpSlice,
  login: loginSlice,
  profile: profileSlice,
  profileEdit: profileEditSlice,
  followReq: followReqSlice,
  followWait: followWaitSlice,
  followAcc: followAccSlice,
  followNoneAcc: followNoneAccSlice,
  followers: followerListSlice,
  follows: followListSlice,
  userFollow: userFollowListSlice,
  userFollower: userFollowerListSlice,
  followDel: followDelSlice,
  followerDel: followerDelSlice,
  userInfo: userInfoSlice,
  diaryDetail: diaryDetailSlice,
  diaryMine: diaryMineSlice,
  userDiary: userDiarySlice,
  publicDiary: publicDiarySlice,
  diaryListCreate: diaryListCreateSlice,
  diaryListMine: diaryListMineSlice,
  diaryListDel: diaryListDelSlice,
  diaryListEdit: diaryListEditSlice,
  music: musicSlice,
  playListCreate:playListCreateSlice,
  playListMine:playListMineSlice,
  playListDetail:playListDeatilSlice,
  playListEdit:playListEditSlice,
  playListDel:playListDelSlice,
  like: likeSlice,
  nowmusic: nowmusicSlice,
  musicsearch: musicsearchSlice,

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
