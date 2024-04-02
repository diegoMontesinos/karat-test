import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TransactionsDetails } from '../types';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getDetails: builder.query<TransactionsDetails, void>({
      query: () => 'transactions_details',
    }),
  }),
});

export const { useGetDetailsQuery } = transactionsApi;
