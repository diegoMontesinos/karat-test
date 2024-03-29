import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_CARD_ID = process.env.STRIPE_CARD_ID;
const PORT = process.env.PORT || 3000;

const app = express();
const stripe = new Stripe(STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.get('/api/transactions', async (req: Request, res: Response) => {
  // try {
  //   const transactions = await stripe.issuing.transactions.list({
  //     card: 'your_card_id',
  //   });
  //   res.json(transactions);
  // } catch (error) {
  //   if (error instanceof Error) {
  //     res.status(500).json({ error: error.message });
  //   } else {
  //     res.status(500).json({ error: 'An unexpected error occurred' });
  //   }
  // }
  res.json({ test: 1123 });
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
