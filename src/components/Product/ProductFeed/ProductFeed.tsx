import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectCurrency } from '../../../state/basket_slice';
import { Store, IProduct } from '../../../services/Store';
import { ProductRating } from '../ProductRating';
import { PrimeBadge } from '../PrimeBadge';
import { ProductPrice } from '../ProductPrice';

interface IProductProps extends IProduct {}

function Product({ id, title, price, description, category, image, rating }: IProductProps) {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency); 
  const isPrime = !Math.floor(Math.random()*2);

  function handleAddProductToBasket() {
    dispatch(addToBasket({
      id, title, price, description, category, image, rating, isPrime
    }));
  }

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-40">{category}</p>  
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3">{title}</h4>
      <ProductRating rating={rating} />
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <ProductPrice price={price} currency={currency} />
      </div>
      <div className="-mt-4 my-3">
        <PrimeBadge isPrime={isPrime} />
      </div>
      <button onClick={handleAddProductToBasket} className="mt-auto button">Add to Basket</button>
    </div>
  );
}

function SmallMediumBusinessProductsBanner() {
  return (
    <div className="md:col-span-full md:mx-5">
      <Image src={require('./sm_mid_business_products_banner.jpg')} />
    </div>
  );
}

export function ProductFeed() {
  const storeService = new Store();
  const [products, setProducts] = useState([]);
  console.debug('ProductFeed, products', products);

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