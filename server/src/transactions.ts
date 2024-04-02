import type Stripe from 'stripe';

import { TransactionsDetails } from 'types';

export const getTransactionsDetails = async (
  stripe: Stripe,
  card: string
): Promise<TransactionsDetails> => {
  let sum = 0;
  let count = 0;

  const categories: Record<string, number> = {};

  let hasMore = true;
  let cursor = '';

  while (hasMore) {
    const transactions = await stripe.issuing.transactions.list({
      card,
      limit: 100,
      starting_after: cursor ? cursor : undefined,
    });

    const dataLength = transactions.data.length;
    if (dataLength > 0) {
      transactions.data.forEach(({ amount, merchant_data }) => {
        sum += amount;

        if (!categories[merchant_data.category])
          categories[merchant_data.category] = 1;
        else categories[merchant_data.category]++;
      });

      count += dataLength;
      cursor = transactions.data[dataLength - 1].id;
    }

    hasMore = transactions.has_more;
  }

  for (const category in categories) categories[category] /= count;

  return {
    sum,
    average: count === 0 ? 0 : sum / count,
    categories,
  };
};
