import React, { useEffect, useState } from 'react';
import CurrencyFormatter from 'react-currency-formatter';
import Image from 'next/image';
import { StarIcon as StarIconSolid } from '@heroicons/react/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import { Store, IProduct, IProductRating } from '../services/Store';
import { PrimeLogoImage } from './images';

interface IProductStarRatingProps {
  rating: IProductRating;
}

function ProductRating({ rating }: IProductStarRatingProps) {
  const baseRate = Math.floor(rating.rate);
  const rateAfterSeparator = rating.rate - baseRate;

  return (
    <div className="flex flex-row items-center space-x-2">
      <div className="flex flex-row">
        {[...Array(baseRate)].map((e, i) => <StarIconSolid key={i} className="h-5 text-yellow-500" />)}
        {rateAfterSeparator > 0 && <StarIconOutline className="h-5 text-yellow-500" />}
      </div>
      <div className="flex flex-row space-x-2">
        <p className="color text-sm">{rating.rate}</p>
        <p className="color text-sm">{rating.count} votes</p>
      </div>
    </div>
  );
}

interface IPrimeBadgeProps {
  isPrime: boolean;
}

function PrimeBadge({ isPrime }: IPrimeBadgeProps ) {
  if (!isPrime) return null;
  return (
    <div className="flex items-center space-x-2 -mt-4 my-3">
      <PrimeLogoImage className="cursor-pointer" width={60} height={20} />
      <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
    </div>
  );  
}

interface IProductPriceProps {
  price: number;
  currency: string;
}

function ProductPrice({ price, currency }: IProductPriceProps) {
  return (
    <div className="mb-5">
      <CurrencyFormatter quantity={price} currency={currency} />
    </div>
  );
}

interface IProductProps extends IProduct {}

function Product({ id, title, price, description, category, image, rating }: IProductProps) {
  const isPrime = !Math.floor(Math.random()*2);
  const currency = "EUR";

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-40">{category}</p>  
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>
      <ProductRating rating={rating} />
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <ProductPrice price={price} currency={currency} />
      <PrimeBadge isPrime={isPrime} />
      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}

function SmallMediumBusinessProductsBanner() {
  return (
    <div className="md:col-span-full md:mx-5">
      <Image src={require('../../public/sm_mid_business_products.jpg')} />
    </div>
  );
}

export function ProductFeed() {
  const storeService = new Store();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setProducts(await storeService.getProducts());
  }

  return (
    <div
    className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto"
    >
      {products.slice(0, 4).map((props) => <Product key={props.id} {...props} />)}
      <SmallMediumBusinessProductsBanner />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((props) => <Product key={props.id} {...props} />)}
      </div>
      {products.slice(5).map((props) => <Product key={props.id} {...props} />)}
    </div>
  );
}