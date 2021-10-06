import { signIn, signOut } from 'next-auth/client';

export class User {
  signIn() {
    return signIn();
  }

  signOut() {
    return signOut();
  }
}