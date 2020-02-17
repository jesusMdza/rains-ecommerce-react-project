import React from 'react';

import CartError from './CartError';

const Cart = ({cartProductRowContainers, data, total}) => {
  return (
    <div className="cart-container">
      <h1 className="cart-heading">Shopping Cart</h1>
        {
          data ?
          <div className="cart-details">
          <div className="product-heading-row row">
            <div className="cart-heading-text">
              <h3> </h3>
            </div>
            <div className="cart-heading-text item-heading">
              <h3>Item</h3>
            </div>
            <div className="cart-heading-text">
              <h3>Price</h3>
            </div>
            <div className="cart-heading-text">
              <h3>Quantity</h3>
            </div>
            <div className="cart-heading-text total-heading">
              <h3>Total</h3>
            </div>
            <div className="cart-heading-text">
              <h3>Remove</h3>
            </div>
          </div>

          {cartProductRowContainers}

          <div className="subtotal row-no-border">
            <h3>Subtotal: {total} USD</h3>
          </div>
          <div className="update row-no-border">
            <div 
              onClick={() => {
                sessionStorage.clear()
                window.location.reload(false)
                }}>
              <span className="purchase-button">Purchase</span>
            </div>
          </div>
        </div>
        :
        <CartError />
      }
    </div>
  );
}

export default Cart;