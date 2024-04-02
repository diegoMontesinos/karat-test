import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';

import { getTransactionsDetails } from './transactions';

import { TransactionsDetailsResponse } from './types';

dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_CARD_ID = process.env.STRIPE_CARD_ID || '';
const PORT = process.env.PORT || 3000;

const app = express();
const stripe = new Stripe(STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.get(
  '/transactions_details',
  async (_: Request, res: Response<TransactionsDetailsResponse>) => {
    try {
      const details = await getTransactionsDetails(stripe, STRIPE_CARD_ID);
      res.status(200).json(details);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  }
);

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
