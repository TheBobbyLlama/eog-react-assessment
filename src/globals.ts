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

export const graphColors = [
  'rgb(255, 0, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 0, 255)',
  'rgb(255, 255, 0)',
  'rgb(0, 255, 255)',
  'rgb(255, 0, 255)',
  'rgb(255, 128, 0)',
  'rgb(0, 255, 128)',
  'rgb(128, 0, 255)',
  'rgb(128, 255, 0)',
  'rgb(0, 128, 255)',
  'rgb(255, 0, 128)',
];
