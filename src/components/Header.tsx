import React from 'react';
import { AmazonLogoImage } from '../components/images';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'; 

function AmazonLogo() {
  return (
    <div className="mt-2 flex flex-grow items-center sm:flex-grow-0">
      <AmazonLogoImage width={150} height={40} />
    </div>
  );
}

function SearchInput() {
  return (
    <div
      className="hidden sm:flex items-center bg-yellow-400 hover:bg-yellow-500 h-10 rounded-md flex-grow cursor-pointer"
    >
      <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none" type="text" />
      <SearchIcon className="h-12 p-4" />
    </div>
  );
}

function Account() {
  return (
    <div className="link">
      <p>Hello, John Baker!</p>
      <p className="font-extrabold md:text-sm">Account & Lists</p>
    </div>
  );
}

function Orders() {
  return (
    <div className="link">
      <p>Returns</p>
      <p className="font-extrabold md:text-sm">& Orders</p>
    </div>
  );
}

function ShoppingCartItemsCounter() {
  return (
    <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">0</span>
  );
}

function ShoppingCart() {
  return (
    <div className="link relative flex items-center">
      <ShoppingCartItemsCounter />
      <ShoppingCartIcon className="h-10" />
      <p className="hidden font-extrabold md:text-sm md:inline mt-2">Basket</p>
    </div>
  );
}

function TopNavRight() {
  return (
    <div className="text-white flex items-center space-x-6 text-xs mx-6 whitespace-nowrap">
      <Account />
      <Orders />
      <ShoppingCart />
    </div>
  );
}

function BottomNavMenu() {
  return (
    <p className="link flex items-center"><MenuIcon className="h-6 mr-1" /> All</p>
  );
}

function BottomNav() {
  return (
    <div className="flex items-center bg-amazon_blue-light text-sm text-white space-x-3">
      <BottomNavMenu />
      <p className="link">Prime Video</p>
      <p className="link">Amazon Basics</p>
      <p className="link">Today's Deals</p>
      <p className="link hidden lg:inline-flex">Electronics</p>
      <p className="link hidden lg:inline-flex">Food & Grocery</p>
      <p className="link hidden lg:inline-flex">Prime</p>
      <p className="link hidden lg:inline-flex">Buy Again</p>
      <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
      <p className="link hidden lg:inline-flex">Health & Personal Care</p>
    </div>
  );
}

export function Header() {
  return (
    <header>
      <div className="flex flex-grow items-center bg-amazon_blue p-1 py-2">
        <AmazonLogo />
        <SearchInput />
        <TopNavRight />
      </div>
      <BottomNav />
    </header>
  );
}