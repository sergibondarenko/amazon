import { useRouter } from 'next/router';
import React from 'react';

export function Orders() {
  const router = useRouter();

  function handleClick() {
    router.push('/orders');
  }

  return (
    <div className="link" onClick={handleClick}>
      <p>Returns</p>
      <p className="font-extrabold md:text-sm">& Orders</p>
    </div>
  );
}