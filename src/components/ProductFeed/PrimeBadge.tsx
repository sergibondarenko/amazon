import React from 'react';
import { PrimeLogoImage } from '../images';

interface IPrimeBadgeProps {
  isPrime: boolean;
}

export function PrimeBadge({ isPrime }: IPrimeBadgeProps ) {
  if (!isPrime) return null;
  return (
    <div className="flex items-center space-x-2 -mt-4 my-3">
      <PrimeLogoImage className="cursor-pointer" width={60} height={20} />
      <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
    </div>
  );  
}
