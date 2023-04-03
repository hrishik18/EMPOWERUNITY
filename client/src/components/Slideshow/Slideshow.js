import React from 'react';
import { Slide } from 'react-slideshow-image';
import { useState,useEffect } from 'react';
import 'react-slideshow-image/dist/styles.css';
import './Slideshow.css';
import first from '../images/1.png';
import second from '../images/2.png';
import third from '../images/3.png';

const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  const images = [
    {
      url: first,
      alt: 'Slide 1',
    },
    {
      url: second,
      alt: 'Slide 2',
    },
    {
      url: third,
      alt: 'Slide 3',
    },
  ];

  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current => (current === length - 1 ? 0 : current + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [length]);

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div className="slideshow">
      {images.map((image, index) => (
        <div
          className={index === current ? 'slide active' : 'slide'}
          key={index}
        >
          {index === current && (
            <img height="760px" width="1399px" src={image.url} alt={image.alt} className="image" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
