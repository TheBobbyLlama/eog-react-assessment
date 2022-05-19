export type MeasurementData = {
  metric?: string;
  at: Date;
  value: number;
  unit: string;
};

export type MultipleMeasurementData = {
  metric: string;
  measurements: MeasurementData[];
};
