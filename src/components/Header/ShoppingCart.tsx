
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/outline'; 
import { useSelector } from 'react-redux';
import { selectItems } from '../../state/basket_slice';

function ShoppingCartItemsCounter({ num }: { num: number }) {
  return (
    <span
      className="absolute top-0 right-0 md:right-10 h-4 w-4
      bg-yellow-400 text-center rounded-full text-black font-bold"
    >
      {num}
    </span>
  );
}

interface IShoppingCartProps {
  onClick: () => void;
}

export function ShoppingCart({ onClick }: IShoppingCartProps) {
  const items = useSelector(selectItems);

  return (
    <div className="link relative flex items-center" onClick={onClick}>
      <ShoppingCartItemsCounter num={items.length} />
      <ShoppingCartIcon className="h-10" />
      <p className="hidden font-extrabold md:text-sm md:inline mt-2">Basket</p>
    </div>
  );
}