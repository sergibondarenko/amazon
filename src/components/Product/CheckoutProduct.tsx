import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { ProductRating } from './ProductRating';
import { ProductPrice } from './ProductPrice';
import { PrimeBadge } from './PrimeBadge';
import { IBasketItem, selectCurrency } from '../../state/basket_slice';
import { addToBasket, removeFromBasket } from '../../state/basket_slice';

interface ICheckoutProductProps {
  product: IBasketItem;
}

export function CheckoutProduct({ product }: ICheckoutProductProps) {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);

  function handleAddItemToBasket() {
    dispatch(addToBasket(product))
  }

  function handleRemoveItemFromBasket() {
    dispatch(removeFromBasket(product.id));
  }

  return (
    <div className="grid grid-cols-5">
      <Image src={product.image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{product.title}</p>
        <ProductRating rating={product.rating} />
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>
        <ProductPrice price={product.price} currency={currency} />
        <div className="mt-2">
          <PrimeBadge isPrime={product.isPrime} />
        </div>
      </div>

      <div className="flex flex-col gap-2 col-span-1 my-auto justify-self-end">
        <button className="button" onClick={handleAddItemToBasket}>Add to Basket</button>
        <button className="button" onClick={handleRemoveItemFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}