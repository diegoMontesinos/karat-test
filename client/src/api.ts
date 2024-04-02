import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { MetricsResponse } from './types';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getMetrics: builder.query<MetricsResponse, void>({
      query: () => 'metrics',
    }),
  }),
});

export const { useGetMetricsQuery } = transactionsApi;
