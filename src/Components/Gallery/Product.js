import React from 'react';

import Slider from '../Slider';

const Product = (props) => {

  const {
    change,
    changeUrl,
    currentImageIndex,
    reset,
    next,
    previous,
    changeToIndexZero,
    changeToIndexTwo,
    imageUrls,
    productName,
    price,
    slider,
    swatchData
  } = props;

  return (
    <div className="product-container">
      <div className="image-block" onClick={() => changeUrl()} onMouseEnter={change} onMouseLeave={reset}> 
        {slider ? 
          <Slider previous={previous} next={next} changeToIndexZero={changeToIndexZero} changeToIndexTwo={changeToIndexTwo} /> 
          : 
          null
        }
        <img src={imageUrls[currentImageIndex]} className="image" alt={productName} />
      </div>
      <div className="name-price">
        <h3>{productName}</h3>
        <h3>{price} USD</h3>
      </div>
      <div className="color-container">
        {swatchData}
      </div>
    </div>
  );
}

export default Product;