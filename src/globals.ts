export type MeasurementData = {
  metric?: string;
  at: number | Date;
  value: number;
  unit: string;
};

export type MultipleMeasurementData = {
  metric: string;
  measurements: MeasurementData[];
};

export const graphColors = [
  'rgb(192, 64, 64)',
  'rgb(64, 192, 64)',
  'rgb(64, 64, 192)',
  'rgb(255, 255, 64)',
  'rgb(64, 192, 192)',
  'rgb(192, 64, 192)',
  'rgb(192, 128, 64)',
  'rgb(64, 192, 128)',
  'rgb(128, 64, 192)',
  'rgb(128, 192, 64)',
  'rgb(64, 128, 192)',
  'rgb(192, 64, 128)',
];
