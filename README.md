# Amazon clone

![Screenshot 2021-10-06 at 12 40 25](https://user-images.githubusercontent.com/5389745/136188104-07de047c-cf98-409f-876c-2f6e9df6f477.png)
![Screenshot 2021-10-06 at 12 41 06](https://user-images.githubusercontent.com/5389745/136188135-bebbd75b-a31a-428e-af6f-ef7fd6ce54ad.png)
![Screenshot 2021-10-07 at 20 28 30](https://user-images.githubusercontent.com/5389745/136443138-747353a9-d4b4-41d9-9ce5-67ce007a4ae8.png)
![Screenshot 2021-10-10 at 22 57 51](https://user-images.githubusercontent.com/5389745/136713016-06d0d485-b4cc-4ecb-b9d5-c355ede8edd6.png)
![Screenshot 2021-10-10 at 21 27 36](https://user-images.githubusercontent.com/5389745/136710479-6cd6d056-cc7e-4803-a92d-31625092805e.png)

## Technologies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Authentication OAuth 2.0 via [Google API](https://console.cloud.google.com/apis/credentials) and [NextAuth.js](https://next-auth.js.org/)
- Payments via [Stripe](https://stripe.com/en-gb-it)
- Data storage via [Google Firebase](https://firebase.google.com/)

## Deploy

Deploy using [Vercel](https://vercel.com/sergibondarenko/amazon).

## How to use

`yarn dev`

Starts the dev server.

## Configuration

### Environment variables
Put the following configuration in the .env.local in the root folder of the app.\
Substitute 1 with the real credentials that you can see in the [Firebase console](https://console.firebase.google.com/project/clone-fa29b/overview) \
and [Stripe](https://dashboard.stripe.com/test/dashboard).

```
# Firebase
AMAZON_APP_FIREBASE_API_KEY=1
AMAZON_APP_FIREBASE_AUTH_DOMAIN=1
AMAZON_APP_FIREBASE_PROJECT_ID=1
AMAZON_APP_FIREBASE_STORAGE_BUCKET=1
AMAZON_APP_FIREBASE_MESSAGING_SENDER_ID=1
AMAZON_APP_FIREBASE_APP_ID=1

## Auth
AMAZON_APP_FIREBASE_AUTH_CLIENT_ID=1
AMAZON_APP_FIREBASE_AUTH_CLIENT_SECRET=1
AMAZON_APP_NEXTAUTH_URL=http://localhost:3000

## Admin permissions
AMAZON_APP_FIREBASE_ADMIN_PROJECT_ID=1
AMAZON_APP_FIREBASE_ADMIN_PRIVATE_KEY_ID=1
AMAZON_APP_FIREBASE_ADMIN_PRIVATE_KEY=1
AMAZON_APP_FIREBASE_ADMIN_CLIENT_EMAIL=1
AMAZON_APP_FIREBASE_ADMIN_CLIENT_ID=1
AMAZON_APP_FIREBASE_ADMIN_CLIENT_X509_CERT_URL=1

# Payment

## Stripe
AMAZON_APP_STRIPE_PUBLIC_KEY=1
AMAZON_APP_STRIPE_SECRET_KEY=1
AMAZON_APP_STRIPE_SIGNING_SECRET=1

AMAZON_APP_HOST=http://localhost:3000
```

### OAuth 2.0

You can configure the credentials via the [Google Cloud Platform](https://console.cloud.google.com/apis/credentials?pli=1&project=clone-fa29b&authuser=0).\
In the dev mode, the OAuth Client ID must be configured in the following way:
- Add http://localhost:3000 to Authorized JavaScript Origins
- Add http://localhost:3000/api/auth/callback/google to Authorized redirect URIs
- Add the new Vercel build auto-generated domain to make the authentication work there


### Payment (Stripe)

Create new account, collect the keys and create the webhook endpoint at [stripe.com](https://dashboard.stripe.com/test/webhooks).\
The webhook endpoint gives you a signing secret. Assign it to the AMAZON_APP_STRIPE_SIGNING_SECRET environment variable.

#### Stripe CLI

`stripe login`

Logins to Stripe. It is required to access the Stripe webhooks to store the orders in the Firebase database.

`stripe listen --forward-to localhost:3000/api/webhook`

Creates the Stripe webhook emulator in the dev environment. The command must product the webhook signing secret.\
You must put the secret as a value for AMAZON_APP_STRIPE_SIGNING_SECRET in .env.local.


## Testing

### Fake card

4242 4242 4242 4242\
04/24\
424