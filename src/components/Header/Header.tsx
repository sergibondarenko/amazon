import React from 'react';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'; 
import { useRouter } from 'next/router';
import { AmazonLogo } from './AmazonLogo';
import { SearchInput } from './SearchInput';
import { Account } from './Account';
import { Orders } from './Orders';
import { ShoppingCart } from './ShoppingCart';

function TopNavRight() {
  const router = useRouter(); 

  function handleShoppingCartClick() {
    router.push('/checkout');
  }

  return (
    <div className="text-white flex items-center space-x-6 text-xs mx-6 whitespace-nowrap">
      <Account />
      <Orders />
      <ShoppingCart onClick={handleShoppingCartClick} />
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
  const router = useRouter(); 

  function handleLogoClick() {
    router.push('/');
  }

  return (
    <header>
      <div className="flex flex-grow items-center bg-amazon_blue p-1 py-2">
        <AmazonLogo onClick={handleLogoClick} />
        <SearchInput />
        <TopNavRight />
      </div>
      <BottomNav />
    </header>
  );
}