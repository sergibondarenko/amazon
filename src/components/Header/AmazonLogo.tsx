import React from 'react';
import { AmazonLogoImage } from '../images';

interface IAmazonLogoProps {
  width?: number;
  height?: number;
  onClick: () => void;
}

export function AmazonLogo({ width = 150, height = 40, onClick }: IAmazonLogoProps) {
  return (
    <div className="mt-2 flex flex-grow items-center sm:flex-grow-0">
      <AmazonLogoImage width={width} height={height} onClick={onClick} />
    </div>
  );
}