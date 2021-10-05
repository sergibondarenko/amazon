import React from 'react';
import { AmazonLogoImage } from '../components/images';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'; 

function TopSearchInput() {
  return (
    <div
      className="hidden sm:flex items-center bg-yellow-400 hover:bg-yellow-500 h-10 rounded-md flex-grow cursor-pointer"
    >
      <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none" type="text" />
      <SearchIcon className="h-12 p-4" />
    </div>
  );
}

function TopNav() {
  return (
    <div className="flex flex-grow items-center bg-amazon_blue p-1 py-2">
      <div className="mt-2 flex flex-grow items-center sm:flex-grow-0">
        <AmazonLogoImage width={150} height={40} />
      </div>
      <TopSearchInput />
    </div>
  );
}

export function Header() {
  return (
    <header>
      <TopNav />
    </header>
  );
}