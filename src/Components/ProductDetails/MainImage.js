import React from 'react';

import Slider from '../Slider';

const MainImage = (props) => {

  const {
    inStockObject,
    currentImageIndex,
    slider,
    showSlider,
    hideSlider,
    next,
    previous
  } = props;

  return (
    <div className="image-block" onMouseEnter={showSlider} onMouseLeave={hideSlider}> 
      {slider ? <Slider next={next} previous={previous} /> : null}
      <img src={inStockObject.imageUrls[currentImageIndex]} className="image" alt="" />
    </div>
  );
} 

export default MainImage;