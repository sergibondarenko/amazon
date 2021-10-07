import React from 'react';
import { Header } from '../components';
import Image from 'next/image';

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
  return (
    <div className="flex flex-col p-5 space-y-10 bg-white">
      <h1 className="text-3xl border-b pb-4">Your Shopping Basket</h1>
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