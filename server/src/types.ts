export type MetricsResponse =
  | {
      sum: number;
      average: number;
    }
  | { error: string };
