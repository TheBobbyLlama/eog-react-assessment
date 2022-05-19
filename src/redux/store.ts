import { configureStore } from '@reduxjs/toolkit';
import metricReducer from './metricSlice';

const store = configureStore({
  reducer: {
    metrics: metricReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
