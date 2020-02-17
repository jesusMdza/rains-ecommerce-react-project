import React from 'react';

import InputBoxContainer from './InputBoxContainer';

const CartProductRow = ({indx, multiply, productName, productColor, productSize, productPrice, productFirstImageUrl, removeFromCart, total}) => {
  return (
    <div className="product-added-row row">
      <div className="product-info product-info-image">
        <img src={productFirstImageUrl} alt="" />
      </div>
      <div className="product-info product-info-name-size">
        <h3>{productName} - {productColor.toUpperCase()} / {productSize.toUpperCase()}</h3>
      </div>
      <div className="product-info product-info-image product-info-name-size-mobile">
        <div>
          <img src={productFirstImageUrl} alt="" />
          <h3>{productName} - {productColor.toUpperCase()} / {productSize.toUpperCase()}</h3>
        </div>
      </div>
      <div className="product-info">
        <h3>{productPrice} USD</h3>
      </div>
      <InputBoxContainer multiply={multiply} index={indx} />
      <div className="product-info total-info">
        <h3>${total}.00</h3>
      </div>
      <div className="product-info remove">
        <span><a href="/cart" onClick={() => removeFromCart(indx)}>X</a></span>
      </div>
    </div>
  );
}

export default CartProductRow;