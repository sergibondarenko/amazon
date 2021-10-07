import React from 'react';
import Image from 'next/image';

export interface IAmazonLogoImageProps {
  width: number;
  height: number;
  onClick: () => void;
}

export function AmazonLogoImage(props: IAmazonLogoImageProps) {
  return (
    <Image
      src={require('./amazon_logo.png')}
      objectFit="contain"
      className="cursor-pointer"
      {...props}
    />
  );
}