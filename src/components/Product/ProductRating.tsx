
import React from 'react';
import { StarIcon as StarIconSolid } from '@heroicons/react/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import { IProductRating } from '../../services/Store';

interface IProductStarRatingProps {
  rating: IProductRating;
}

export function ProductRating({ rating }: IProductStarRatingProps) {
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