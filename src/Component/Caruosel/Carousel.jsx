import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from '../Caruosel/Coursel.module.css';  // Ensure the path is correct
import { img } from './images/data';

function Carouseleefect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {
          img.map((imageItemLink, index) => (
            <img key={index} src={imageItemLink} alt={`Carousel item ${index}`} />
          ))
        }
      </Carousel>
      <div className={classes.hero_img}>
        {/* Add content for the hero image div if needed */}
      </div>
    </div>
  );
}

export default Carouseleefect;