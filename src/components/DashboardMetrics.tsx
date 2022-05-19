import React, { BaseSyntheticEvent } from 'react';
import { Chip, Box, Select, MenuItem } from '@material-ui/core'; // eslint-disable-line object-curly-newline
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../redux/hooks';

import MetricCards from './MetricCards';

const useStyles = makeStyles({
  metricContainer: {
    display: 'flex',
    padding: '20px 0',
  },
  metricControls: {
    alignItems: 'flex-start',
    display: 'flex',
    flexBasis: '50%',
    justifyContent: 'flex-end',
  },
  metricSelect: {
    maxWidth: '400px',
    width: '100%',
  },
});

export default (props: {
  selectedMetrics: string[];
  setSelectedMetrics: (a: string[]) => void;
}) => {
  const { selectedMetrics, setSelectedMetrics } = props;
  const classes = useStyles();
  const metricTypes = useAppSelector((state) => state.metrics.metricTypes);

  const onMetricsChanged = (e: BaseSyntheticEvent) => {
    const {
      target: { value },
    } = e;

    const result = typeof value === 'string' ? value.split(',') : value;
    setSelectedMetrics(
      result.sort(
        (
          a: string,
          b: string, // eslint-disable-line implicit-arrow-linebreak
        ) => metricTypes.indexOf(a) - metricTypes.indexOf(b),
      ),
    );
  };

  const showMetricChips = (selected: any) => {
    const selectedItems = selected as string[];

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {selectedItems.map((value: string) => (
          <Chip key={value} label={value} />
        ))}
      </Box>
    );
  };

  return (
    <Box className={classes.metricContainer}>
      <MetricCards selected={selectedMetrics} />
      <Box className={classes.metricControls}>
        <Select
          multiple
          className={classes.metricSelect}
          value={selectedMetrics}
          onChange={onMetricsChanged}
          renderValue={showMetricChips}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          {metricTypes.map((curType) => (
            <MenuItem key={curType} value={curType}>
              {curType}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
