import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  metricCards: {
    display: 'flex',
    flexBasis: '50%',
    flexWrap: 'wrap',
  },
});

export default () => {
  const classes = useStyles();

  return <Box className={classes.metricCards}>Cards</Box>;
};
