import React from 'react';
import { getSession, useSession } from 'next-auth/client';
import { Header } from '../components';
import { Storage } from '../services';
import { Payments } from './api/services';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session?.user?.email) {
    return { props: {} };
  }

  const storageService = new Storage(); 
  let orders = await storageService.getOrders({ email: session.user.email });

  // Enrich orders with data from the payment processor.
  const paymentService = new Payments()
  orders = await Promise.all(
    orders.map(async (order) => {
      const items = await paymentService.getOrder(order.id);
      return { ...order, items: items.data };
    })
  );

  return { props: { orders } };
}

// Stopped at 2:21
export default function Orders({ orders }) {
  const [session] = useSession();
  console.log('orders', orders);
  
  const subTitle = session
    ? <h2>X Orders</h2>
    : <h2>Please sign in to see your orders</h2>;

  return (
    <div>
      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b border-yellow-400 mb-2 pb-1">Your Orders</h1>
        {subTitle}
        
        <div className="mt-5 space-y-4">
        </div>
      </main>
    </div>
  );
}