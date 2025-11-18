import { configureStore } from '@reduxjs/toolkit';
import threadsReducer from './threads/slice';
import usersReducer from './users/slice';
import authReducer from './authUser/slice';
import threadDetailReducer from './threadDetail/slice';
import loadingReducer from './loading/slice';
import leaderboardReducer from './leaderboard/slice';

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    users: usersReducer,
    authUser: authReducer,
    threadDetail: threadDetailReducer,
    loading: loadingReducer,
    leaderboard: leaderboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
