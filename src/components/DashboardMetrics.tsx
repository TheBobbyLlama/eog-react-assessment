import React from 'react';
import { Box, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MetricCards from './MetricCards';

const useStyles = makeStyles({
  metricContainer: {
    display: 'flex',
  },
  metricControls: {
    alignItems: 'flex-start',
    display: 'flex',
    flexBasis: '50%',
    justifyContent: 'flex-end',
  },
});

export default () => {
  const classes = useStyles();

  return (
    <Box className={classes.metricContainer}>
      <MetricCards />
      <Box className={classes.metricControls}>
        <Select />
      </Box>
    </Box>
  );
};
