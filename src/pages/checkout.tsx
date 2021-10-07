import React from 'react';
import { Header } from '../components';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems } from '../state/basket_slice';
import { CheckoutProduct } from '../components';

function PrimeDayBanner() {
  return (
    <Image
      src="/prime_day_banner.png"
      width={1020}
      height={250}
      objectFit="contain"
    />
  );
}

function ShoppingBasket() {
  const items = useSelector(selectItems);
  const titleText = !items.length ? 'Your Amazon Basket is empty!' : 'Shopping Basket';

  function renderItems() {
    return items.map((item, i) => <CheckoutProduct key={i} product={item} />);
  }

  return (
    <div className="flex flex-col p-5 space-y-10 bg-white">
      <h1 className="text-3xl border-b pb-4">{titleText}</h1>
      {renderItems()}
    </div>
  );
}

export default function Checkout() {
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <PrimeDayBanner />
          <ShoppingBasket />
        </div>
      </main>
    </div>
  );
}