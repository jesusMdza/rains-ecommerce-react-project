import React from 'react';

const CartButton = (props) => {

  const {
    productCartObject,
    addToCart
  } = props;

  return (
    <a href="/cart">
      <div className="cart-button" onClick={() => addToCart(productCartObject)}>
        <span>
          Add To Cart
        </span>
      </div>
    </a>
  );
}

export default CartButton;