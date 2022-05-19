import React, { useState } from 'react';
import { Container } from '@material-ui/core';

import DashboardMetrics from './DashboardMetrics';
import DashboardGraph from './DashboardGraph';

export default () => {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  return (
    <Container>
      <DashboardMetrics
        selectedMetrics={selectedMetrics}
        setSelectedMetrics={setSelectedMetrics}
      />
      <DashboardGraph selected={selectedMetrics} />
    </Container>
  );
};
