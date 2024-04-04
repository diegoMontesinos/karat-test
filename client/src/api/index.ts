import useSWR, { Fetcher } from 'swr';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import { CardActivityResponse, TransactionsDetails } from '../types';

const API_HOST = import.meta.env.VITE_API_HOST;

// Transactions details

const getTransactionsDetails: Fetcher<TransactionsDetails, string> = async (
  path
) => {
  const response = await fetch(`${API_HOST}${path}`);

  if (!response.ok) {
    const details = await response.json();
    throw new Error(details.message);
  }

  return response.json();
};

export const useTransactionsDetails = () => {
  const { data, isLoading } = useSWR(
    'transactions-details',
    getTransactionsDetails
  );

  return {
    data,
    isLoading,
  };
};

// Card Activity

const PAGE_SIZE = 10;

const getCardActivityKey: SWRInfiniteKeyLoader<CardActivityResponse> = (
  pageIndex,
  previousPageData
) => {
  if (previousPageData && !previousPageData.has_more) return null;
  if (pageIndex === 0) return `card-activity?limit=${PAGE_SIZE}`;

  const startingAfter = previousPageData
    ? previousPageData.data[previousPageData.data.length - 1].id
    : undefined;

  return `card-activity?limit=${PAGE_SIZE}&starting_after=${startingAfter}`;
};

const getCardActivity: Fetcher<CardActivityResponse, string> = async (path) => {
  const response = await fetch(`${API_HOST}${path}`);
  if (!response.ok) {
    const details = await response.json();
    throw new Error(details.message);
  }

  return response.json();
};

export const useCardActivity = () => {
  const { data, isValidating, size, setSize } = useSWRInfinite(
    getCardActivityKey,
    getCardActivity
  );

  return {
    data,
    isValidating,
    size,
    setSize,
  };
};
