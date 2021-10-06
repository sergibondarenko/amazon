import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.AMAZON_APP_FIREBASE_AUTH_CLIENT_ID,
      clientSecret: process.env.AMAZON_APP_FIREBASE_AUTH_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
});