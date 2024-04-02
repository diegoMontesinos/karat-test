export type TransactionsDetails = {
  sum: number;
  average: number;
  categories: Record<string, number>;
};

export type TransactionsDetailsResponse =
  | TransactionsDetails
  | { error: string };
