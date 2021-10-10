import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { Header } from '../components';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return { props: { session } };
}

export default function Success() {
  const router = useRouter();

  function handleGoToOrdersClick() {
    router.push('/orders');
  }

  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex flex-row items-center gap-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
          </div>

          <p>Thank you for shopping with us. We will send a confirmation once you items have shipped.
            If you want to check status of your order(s), please press the link below.
          </p>
          <button className="button mt-8" onClick={handleGoToOrdersClick}>Go to my orders</button>
        </div>
      </main>
    </div>
  );
}