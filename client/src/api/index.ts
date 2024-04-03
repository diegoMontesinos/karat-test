import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  CardActivityRequest,
  CardActivityResponse,
  TransactionsDetails,
} from '../types';

const API_HOST = import.meta.env.VITE_API_HOST;

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
  endpoints: (builder) => ({
    getDetails: builder.query<TransactionsDetails, void>({
      query: () => 'transactions-details',
    }),
    getCardActivity: builder.query<CardActivityResponse, CardActivityRequest>({
      query: (arg) => {
        const params = new URLSearchParams();
        if (arg) {
          const { limit, starting_after } = arg;
          if (limit) params.set('limit', `${limit}`);
          if (starting_after) params.set('starting_after', starting_after);
        }

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
