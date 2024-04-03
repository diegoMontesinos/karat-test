import type Stripe from 'stripe';

export type TransactionsDetails = {
  sum: number;
  average: number;
  categories: Record<string, number>;
};

export type TransactionsDetailsResponse =
  | TransactionsDetails
  | { error: string };

export type CardActivityResponse =
  | {
      data: Stripe.Issuing.Authorization[];
      has_more: boolean;
    }
  | { error: string };
