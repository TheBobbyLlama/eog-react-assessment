// This component does nothing but feed data to the Redux store.
import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useAppDispatch } from '../redux/hooks';
import { setMetricTypes } from '../redux/metricSlice';

type MetricTypeResponse = {
  getMetrics: string[];
};

const metricsQuery = gql`
  query {
    getMetrics
  }
`;

export default () => {
  const { data: metricTypes } = useQuery<MetricTypeResponse>(metricsQuery);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (metricTypes?.getMetrics) {
      dispatch(setMetricTypes(metricTypes.getMetrics));
    }
  }, [metricTypes]);

  return <></>;
};
