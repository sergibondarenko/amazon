import React from 'react';
import CurrencyFormatter from 'react-currency-formatter';

interface IProductPriceProps {
  price: number;
  currency: string;
}

export function ProductPrice({ price, currency }: IProductPriceProps) {
  return (
    <div className="mb-5">
      <CurrencyFormatter quantity={price} currency={currency} />
    </div>
  );
}
