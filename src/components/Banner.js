import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative max-w-screen-xl mx-auto">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            src="https://links.papareact.com/gi1"
            alt=".png"
            loading="lazy"
          />
        </div>
        <div>
          <img
            src="https://links.papareact.com/6ff"
            alt=".png"
            loading="lazy"
          />
        </div>
        <div>
          <img
            src="https://links.papareact.com/7ma"
            alt=".png"
            loading="lazy"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
