import React from 'react';
import Image from 'next/image';

export interface IPrimeLogoImageProps {
  width?: number;
  height?: number;
  className?: string;
}

export function PrimeLogoImage(props: IPrimeLogoImageProps) {
  return (
    <Image
      objectFit="contain"
      src={require('./prime_logo.png')}
      {...props}
    />
  );
}