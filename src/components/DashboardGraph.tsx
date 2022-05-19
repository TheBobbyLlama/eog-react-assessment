import React from 'react';
import { Box } from '@material-ui/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../redux/hooks';
import { graphColors } from '../globals';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface GraphScale {
  [key: string]: object;
}

interface GraphData {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  pointRadius: number;
  yAxisID: string;
}

export default (props: { selected: string[] }) => {
  const { selected } = props;
  const { metricTypes, measurementData } = useAppSelector(
    (state) => state.metrics,
  );

  if (!selected.length) {
    return <></>;
  }

  const scales: GraphScale = {
    x: { display: false },
  };

  selected.forEach((_, index) => {
    const result = {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: index > 0 ? { drawOnChartArea: false } : undefined,
    };
    const key = `y${index}`;

    scales[key] = result;
  });

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    scales,
  };

  const datasets: GraphData[] = [];

  selected.forEach((metric, index) => {
    const key = `y${index}`;
    const result: GraphData = {
      label: metric,
      data: measurementData[metric].map((measurement) => measurement.value),
      borderColor: graphColors[metricTypes.indexOf(metric)],
      backgroundColor: graphColors[metricTypes.indexOf(metric)],
      pointRadius: 0,
      yAxisID: key,
    };

    datasets.push(result);
  });

  const data = {
    labels: measurementData[selected[0]].map(
      (measurement) => new Date(measurement.at),
    ),
    datasets,
  };

  return (
    <Box>
      <Line options={options} data={data} />
    </Box>
  );
};
