import { signIn, signOut, useSession } from 'next-auth/client';

export class User {
  signIn() {
    return signIn();
  }
}