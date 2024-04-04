import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import { getTransactionsDetails } from './transactions';

import { CardActivityResponse, TransactionsDetailsResponse } from './types';

dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_CARD_ID = process.env.STRIPE_CARD_ID || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const PORT = process.env.PORT || 3000;

const app = express();
const stripe = new Stripe(STRIPE_SECRET_KEY);
const cache = new NodeCache({ stdTTL: 15 * 60 });

const DETAILS_CACHE_KEY = 'transaction-details';

app.use(cors());
app.use(helmet());

app.get(
  '/transactions-details',
  async (_: Request, res: Response<TransactionsDetailsResponse>) => {
    if (cache.has(DETAILS_CACHE_KEY)) {
      res.status(200).json(cache.get(DETAILS_CACHE_KEY));
      return;
    }

    try {
      const details = await getTransactionsDetails(stripe, STRIPE_CARD_ID);

      cache.set(DETAILS_CACHE_KEY, details);
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

app.get(
  '/card-activity',
  async (req: Request, res: Response<CardActivityResponse>) => {
    try {
      const { limit, starting_after } = req.query as {
        limit?: string;
        starting_after?: string;
      };

      const authorizations = await stripe.issuing.authorizations.list({
        card: STRIPE_CARD_ID,
        status: 'closed',
        limit: limit && !isNaN(parseInt(limit)) ? parseInt(limit) : 10,
        starting_after,
      });

      res.json(authorizations);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  }
);

app.post(
  '/stripe_webhook',
  express.raw({ type: 'application/json' }),
  (request: Request, response: Response) => {
    const sig = request.headers['stripe-signature'];

    if (!sig) {
      response.status(400).json({ error: 'Webhook Error' });
      return;
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      if (error instanceof Error) {
        response.status(400).json({ error: error.message });
      } else {
        response.status(400).json({ error: 'Webhook Error' });
      }

      return;
    }

    if (!event) {
      response.status(400).json({ error: 'Webhook Error' });
      return;
    }

    if (
      event.type.startsWith('issuing_authorization') ||
      event.type.startsWith('issuing_transaction')
    ) {
      cache.del(DETAILS_CACHE_KEY);
    }

    response.json({ received: true });
  }
);

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
