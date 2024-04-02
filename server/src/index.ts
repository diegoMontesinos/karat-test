import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';

import { MetricsResponse } from 'types';

dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_CARD_ID = process.env.STRIPE_CARD_ID;
const PORT = process.env.PORT || 3000;

const app = express();
const stripe = new Stripe(STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.get('/api/metrics', async (_: Request, res: Response<MetricsResponse>) => {
  let sum = 0;
  let count = 0;

  try {
    let hasMore = true;
    let cursor = '';

    while (hasMore) {
      const transactions = await stripe.issuing.transactions.list({
        card: STRIPE_CARD_ID,
        limit: 100,
        starting_after: cursor ? cursor : undefined,
      });

      const dataLength = transactions.data.length;
      if (dataLength > 0) {
        sum += transactions.data.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );

        count += dataLength;
        cursor = transactions.data[dataLength - 1].id;
      }

      hasMore = transactions.has_more;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }

    return;
  }

  res.status(200).json({ sum, average: count === 0 ? 0 : sum / count });
});

app.get('/api/transactions', async (_: Request, res: Response) => {
  try {
    await stripe.issuing.authorizations.list({
      card: STRIPE_CARD_ID,
      limit: 3,
    });

    const transactions = await stripe.issuing.transactions.list({
      card: STRIPE_CARD_ID,
    });

    console.log(transactions.has_more, transactions.data.length);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  res.json({ test: 1123 });
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
