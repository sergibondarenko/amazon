import React from 'react';
import { SearchIcon } from '@heroicons/react/outline'; 

export function SearchInput() {
  return (
    <div
      className="hidden sm:flex items-center bg-yellow-400 hover:bg-yellow-500 h-10 rounded-md flex-grow cursor-pointer"
    >
      <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none" type="text" />
      <SearchIcon className="h-12 p-4" />
    </div>
  );
}