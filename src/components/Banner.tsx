import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function BannerGradient() {
  return (
    <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent z-20 bottom-0" />
  );
}

export function Banner() {
  return (
    <div className="relative">
      <BannerGradient />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img alt="" loading="lazy" src="banner_1.jpg" />
        </div>
        <div>
          <img alt="" loading="lazy" src="banner_2.jpg" />
        </div>
        <div>
          <img alt="" loading="lazy" src="banner_3.jpg" />
        </div>
      </Carousel>
    </div>
  );
}