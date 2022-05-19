import React from 'react';
import { Container } from '@material-ui/core';

import DashboardMetrics from './DashboardMetrics';
import DashboardGraph from './DashboardGraph';

export default () => {
  console.log('here');

  return (
    <Container>
      <DashboardMetrics />
      <DashboardGraph />
    </Container>
  );
};
