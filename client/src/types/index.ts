export type TransactionsDetails = {
  sum: number;
  average: number;
  categories: Record<string, number>;
};

export type CardActivity = {
  id: string;
  amount: number;
  approved: boolean;
  created: number;
  currency: string;
  merchant_data: {
    category: string;
    city: string;
    country: string;
    name: string;
  };
};

export type CardActivityResponse = {
  data: CardActivity[];
  has_more: boolean;
};
