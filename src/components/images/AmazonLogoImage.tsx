import React from 'react';
import Image from 'next/image';

export interface IAmazonLogoImageProps {
  width: number;
  height: number;
}

export function AmazonLogoImage({ width, height }: IAmazonLogoImageProps) {
  return (
    <Image
      src={require('./amazon_logo.png')}
      width={width}
      height={height}
      objectFit="contain"
      className="cursor-pointer"
    />
  );
}