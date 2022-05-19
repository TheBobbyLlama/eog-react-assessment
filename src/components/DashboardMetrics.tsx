import React, { useState, BaseSyntheticEvent } from 'react';
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

export default () => {
  const classes = useStyles();
  const metricTypes = useAppSelector((state) => state.metrics.metricTypes);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  console.log(selectedMetrics, setSelectedMetrics);

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

  // TODO - This won't trigger because the select component takes the event and opens itself first!
  const onMetricDeleted = (e: BaseSyntheticEvent) => {
    console.log(e);
  };

  const showMetricChips = (selected: any) => {
    const selectedItems = selected as string[];

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {selectedItems.map((value: string) => (
          <Chip key={value} label={value} onDelete={onMetricDeleted} />
        ))}
      </Box>
    );
  };

  return (
    <Box className={classes.metricContainer}>
      <MetricCards />
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
