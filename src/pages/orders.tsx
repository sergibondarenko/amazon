import React from 'react';
import { getSession, useSession } from 'next-auth/client';
import moment from 'moment';
import { Header, ProductPrice } from '../components';
import { Storage, IStorageOrder } from '../services';
import { Payments } from './api/services';
import { useSelector } from 'react-redux';
import { selectCurrency } from '../state/basket_slice';

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

  return { props: { orders, session } };
}

function orderTime(ms: number) {
  return moment.unix(ms).format('DD MMM YYYY');
}

interface IOrderProps {
  order: IStorageOrder;
}

function Order({ order }: IOrderProps) {
  const currency = useSelector(selectCurrency);

  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{orderTime(order.timestamp)}</p>
        </div>

        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <ProductPrice price={order.amount} currency={currency} /> - Next Day Delivery{" "}
          <ProductPrice price={order.amountShipping} currency={currency} />
        </div>

        <p className="text-sm whitespace-nowrap sm:text-xl
          self-end flex-1 text-right text-blue-500">{order.items.length} items</p>

        <p className="absolute top-2 right-2 w-40 lg:w-72
          truncate text-xs whitespace-nowrap">ORDER # {order.id}</p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {order.images.map((image, i) => {
            return <span key={i}><img src={image} alt="" className="h-20 object-contain sm:h-32" /></span>
          })}
        </div>
      </div>
    </div>
  );
}

interface IOrdersProps {
  orders: IStorageOrder[];
}

export default function Orders({ orders }: IOrdersProps) {
  const [session] = useSession();
  
  const subTitle = session
    ? <h2>{orders.length} Orders</h2>
    : <h2>Please sign in to see your orders</h2>;

  return (
    <div>
      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b border-yellow-400 mb-2 pb-1">Your Orders</h1>
        {subTitle}
        
        <div className="mt-5 space-y-4">
          {orders?.map((order) => <Order key={order.id} order={order} />)}
        </div>
      </main>
    </div>
  );
}