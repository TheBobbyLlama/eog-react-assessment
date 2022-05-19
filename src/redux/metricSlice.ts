import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MeasurementData, MultipleMeasurementData } from '../globals';

interface MetricState {
  metricTypes: string[];
  measurementData: { [key: string]: MeasurementData[] };
}

const initialState: MetricState = {
  metricTypes: [],
  measurementData: {},
};

export const metricSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetricTypes: (state, action: PayloadAction<string[]>) => {
      state.metricTypes = action.payload;
    },
    setMeasurementHistory: (
      state,
      action: PayloadAction<MultipleMeasurementData[]>,
    ) => {
      action.payload.forEach((metric) => {
        state.measurementData[metric.metric] = metric.measurements;
      });
    },
  },
});

export const { setMetricTypes, setMeasurementHistory } = metricSlice.actions;

export default metricSlice.reducer;
