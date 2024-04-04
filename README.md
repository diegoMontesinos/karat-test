# Karat - Code challenge

This is the result for my code challenge of the Karat interview process.

Is separated in two parts:

- Front-end: Made with React, Typescript and Material-UI.
- Back-end: Made with Node.js, express.js and Stripe.

### Prerequisites

You need to have installed [Yarn](https://yarnpkg.com/) and the [Stripe Cli](https://docs.stripe.com/stripe-cli/overview) in your computer.

Also you need to have an [Stripe](https://stripe.com/) account setup, in the Test Mode and having access to a [secret key](https://docs.stripe.com/keys). Be sure to have a testing card with the Issuing service.

## Back-end

The backend is made with `express`, `typescript` and the [Stripe library](https://www.npmjs.com/package/stripe).

Is very simple and contains the following endpoints:

- `GET: /transactions-details`: Return the sum, average and relative frequency of the categories, of all the transactions of the card.
- `GET: /card-activity`: Return the authorizations (declined or approved) of the card. Receives a limit and a cursor for pagination.
- `POST: /stripe_webhook`: Is an endpoint to be called for Stripe webhook.

### Cache

The only endpoint that is being cached for efficiency is `GET: /transactions-details`. This is due we perform an exploration of all the transactions.

The time-to-live of the cache is set to 15 minutes. But we are invalidating the cache every time the webhook is called.

The other endpoint is efficient because we are paginating.

### Installation and setup locally

1. Once you cloned this repository, open a terminal and execute the following commands:

```sh
cd server
yarn install
```

2. Create an `.env` file inside the `server` directory:

```sh
touch .env
```

3. Open the `.env` files and fill with the right information:

```properties
# Stripe's secret key
STRIPE_SECRET_KEY=XXX
# Stripe's issued card id
STRIPE_CARD_ID=XXX
# Stripe's webhook secret (more of this ahead)
STRIPE_WEBHOOK_SECRET=XXX
# Server port, you can leave this
PORT=3000
```

4. Finally to start the server:

```sh
yarn dev
```

#### Stripe webhook

In order to receive events from Stripe (trigger the webhook):

1. Open a new terminal and login in the Stripe CLI:

```sh
stripe login
```

2. Once logged in, start to listen (update the port if you are not using 3000):

```sh
stripe listen --forward-to localhost:3000/stripe_webhook
```

This will prompt you something like:

```sh
> Ready! You are using Stripe API Version [2020-03-02]. Your webhook signing secret is whxxxxx (^C to quit)
```

3. Copy the `whxxxxx` value as the `STRIPE_WEBHOOK_SECRET` value in your `.env` file.
4. Restart the server if necessary.

### Other scripts

This project is aimed to run locally, however there is a build a production ready project. Run:

```sh
yarn build
```

For get a built project in the `/dist` directory.

Additionally you have the scripts:

```sh
# For lint code
yarn lint

# For format code
yarn format
```

## Front-end
