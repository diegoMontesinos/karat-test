import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  CardActivityRequest,
  CardActivityResponse,
  TransactionsDetails,
} from '../types';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getDetails: builder.query<TransactionsDetails, void>({
      query: () => 'transactions-details',
    }),
    getCardActivity: builder.query<CardActivityResponse, CardActivityRequest>({
      query: ({ limit, starting_after }) => {
        const params = new URLSearchParams();
        if (limit) params.set('limit', `${limit}`);
        if (starting_after) params.set('starting_after', starting_after);

        return `card-activity?${params.toString()}`;
      },
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useGetCardActivityQuery,
  useLazyGetCardActivityQuery,
} = transactionsApi;
