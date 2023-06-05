import React, { useEffect, useState } from "react";
import "./BannersSlider.css";

const banners = [
  {
    imageUrl: "https://i.imgur.com/khOF9EN.png",
    caption: "Banner 1"
  },
  {
    imageUrl: "https://i.imgur.com/W0qPtvZ.png",
    caption: "Banner 2"
  },
  // {
  //   imageUrl: "https://i.imgur.com/ShPt9Xm.png",
  //   caption: "Banner 3"
  // }
];

export const BannersSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      <button className="slider-button prev" onClick={previousSlide}>
        <i className="material-icons">chevron_left</i>
      </button>
      <div className="slide-container">
        <img
          className="slide-image"
          src={banners[currentIndex].imageUrl}
          alt={banners[currentIndex].caption}
        />
        <div className="slide-caption">{banners[currentIndex].caption}</div>
      </div>
      <button className="slider-button next" onClick={nextSlide}>
        <i className="material-icons">chevron_right</i>
      </button>
    </div>
  );
};
