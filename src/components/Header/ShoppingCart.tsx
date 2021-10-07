
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/outline'; 

function ShoppingCartItemsCounter() {
  return (
    <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">0</span>
  );
}

interface IShoppingCartProps {
  onClick: () => void;
}

export function ShoppingCart({ onClick }: IShoppingCartProps) {
  return (
    <div className="link relative flex items-center" onClick={onClick}>
      <ShoppingCartItemsCounter />
      <ShoppingCartIcon className="h-10" />
      <p className="hidden font-extrabold md:text-sm md:inline mt-2">Basket</p>
    </div>
  );
}