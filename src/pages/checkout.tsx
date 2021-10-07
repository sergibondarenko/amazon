import React from 'react';
import { Header } from '../components';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotalPrice } from '../state/basket_slice';
import { CheckoutProduct, ProductPrice } from '../components';
import { useSession } from 'next-auth/client';

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

interface ICheckoutButtonProps {
  isDisabled: boolean;
}

function CheckoutButton({ isDisabled }: ICheckoutButtonProps) {
  const checkoutBtnText = isDisabled ? 'Sign in to checkout' : 'Proceed to checkout'; 

  return (
    <button
      disabled={isDisabled}
      className={`button mt-2 ${isDisabled
        && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}
    >
      {checkoutBtnText}
    </button>
  );
}

export default function Checkout() {
  const [authSession] = useSession();
  const items = useSelector(selectItems);
  const totalPrice = useSelector(selectTotalPrice);
  const titleText = !items.length ? 'Your Amazon Basket is empty!' : 'Shopping Basket';

  function renderItems() {
    return items.map((item, i) => <CheckoutProduct key={i} product={item} />);
  }

  function renderCheckout() {
    if (!items.length) return null;

    return (
      <>
        <h2 className="whitespace-nowrap">Subtotal ({items.length} items):{" "}
          <span className="font-bold">
            <ProductPrice price={totalPrice} currency="EUR" />
          </span>
        </h2>
        <CheckoutButton isDisabled={!authSession} />
      </>
    );
  }

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <PrimeDayBanner />

          {/* Left */}
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">{titleText}</h1>
            {renderItems()}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {renderCheckout()}
        </div>
      </main>
    </div>
  );
}