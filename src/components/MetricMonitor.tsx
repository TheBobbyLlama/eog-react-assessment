// This component does nothing but feed data to the Redux store.
import React, { useEffect } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import { useAppDispatch } from '../redux/hooks';
import { setMetricTypes, setMeasurementHistory } from '../redux/metricSlice';
import { MultipleMeasurementData } from '../globals';

type MetricTypeResponse = {
  getMetrics: string[];
};

type MultiMeasurementResponse = {
  getMultipleMeasurements: MultipleMeasurementData[];
};

const metricsQuery = gql`
  query {
    getMetrics
  }
`;

const loadMeasurements = gql`
  query getMultipleMeasurements($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        at
        value
        unit
      }
    }
  }
`;

export default () => {
  const { data: metricTypes } = useQuery<MetricTypeResponse>(metricsQuery);
  const [loadMeasurementHistory, { data: measurementHistory }] = // eslint-disable-line operator-linebreak, max-len
    useLazyQuery<MultiMeasurementResponse>(loadMeasurements);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (metricTypes?.getMetrics) {
      const after = Date.now() - 30 * 60 * 1000;

      dispatch(setMetricTypes(metricTypes.getMetrics));
      loadMeasurementHistory({
        variables: {
          input: metricTypes.getMetrics.map((metric) => ({
            metricName: metric,
            after,
          })),
        },
      });
    }
  }, [metricTypes]);

  useEffect(() => {
    if (measurementHistory?.getMultipleMeasurements) {
      dispatch(
        setMeasurementHistory(measurementHistory.getMultipleMeasurements),
      );
    }
  }, [measurementHistory]);

  return <></>;
};
