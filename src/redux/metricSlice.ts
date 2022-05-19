import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MetricState {
  metricTypes: string[];
  measurementData: number[];
}

const initialState: MetricState = {
  metricTypes: [],
  measurementData: [],
};

export const metricSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetricTypes: (state, action: PayloadAction<string[]>) => {
      state.metricTypes = action.payload;
    },
  },
});

export const { setMetricTypes } = metricSlice.actions;

export default metricSlice.reducer;
