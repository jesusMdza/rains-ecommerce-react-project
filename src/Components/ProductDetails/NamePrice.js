import React from 'react';

const NamePrice = (props) => {

  const {
    name,
    price
  } = props;

  return(
    <div className="product-name-price">
      <h3>{name}</h3>
      <h3>{price} USD</h3>
    </div>
  );
};

export default NamePrice;