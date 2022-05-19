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
    addNewMeasurement: (state, action: PayloadAction<MeasurementData>) => {
      if (action.payload.metric) {
        const newMeasurement = {
          at: action.payload.at,
          value: action.payload.value,
          unit: action.payload.unit,
        };

        const newList = [...state.measurementData[action.payload.metric]];

        newList.push(newMeasurement);

        state.measurementData[action.payload.metric] = newList.filter(measurement => (
          measurement.at.valueOf() > Date.now() - 30 * 60 * 1000
        ));
      }
    },
  },
});

export const { setMetricTypes, setMeasurementHistory, addNewMeasurement } = metricSlice.actions;

export default metricSlice.reducer;
