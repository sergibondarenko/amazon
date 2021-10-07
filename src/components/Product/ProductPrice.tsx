import React from 'react';
import CurrencyFormatter from 'react-currency-formatter';

interface IProductPriceProps {
  price: number;
  currency: string;
}

export function ProductPrice({ price, currency }: IProductPriceProps) {
  return (
    <CurrencyFormatter quantity={price} currency={currency} />
  );
}
