import React from 'react';
import { Box, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../redux/hooks';

const useStyles = makeStyles({
  metricCards: {
    display: 'flex',
    flexBasis: '50%',
    flexWrap: 'wrap',
  },
  metricRealtimeCard: {
    flexBasis: '50%',
    padding: '4px',
    '& h3': {
      margin: '0',
    },
    '& span': {
      fontSize: '2.75em',
    },
  },
});

export default (props: { selected: string[] }) => {
  const { selected } = props;
  const classes = useStyles();
  const measurementData = useAppSelector(
    (state) => state.metrics.measurementData,
  );

  return (
    <Box className={classes.metricCards}>
      {selected.map((metric) => {
        const data = measurementData[metric];

        if (data) {
          const lastData = data[data.length - 1];

          return (
            <Box key={metric} className={classes.metricRealtimeCard}>
              <Card>
                <CardContent>
                  <h3>{metric}</h3>
                  <span>
                    {lastData.value} {lastData.unit}
                  </span>
                </CardContent>
              </Card>
            </Box>
          );
        }

        return null;
      })}
    </Box>
  );
};
