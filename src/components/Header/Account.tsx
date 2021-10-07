import React from 'react';
import { User } from '../../services';
import { useSession } from '../../auth';

export function Account() {
  const user = new User();
  const [session] = useSession();

  function handleClick() {
    if (!session) user.signIn();
    else user.signOut();
  }

  return (
    <div className="link" onClick={handleClick}>
      <p className="hover:underline">
        {session ? session.user.name : 'Sign In'}
      </p>
      <p className="font-extrabold md:text-sm">Account & Lists</p>
    </div>
  );
}