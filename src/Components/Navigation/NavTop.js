import React from 'react';
import {Link} from 'react-router-dom';

import Hamburger from './Hamburger';
import CartSVG from '../Cart/CartSVG';

const NavTop = ({cartLength, toggleMenu}) => {
    return (
      <div className="top-nav">
        <div className="hamburger-container">
          <Hamburger toggleMenu={toggleMenu} />
        </div>
        <div className="mobile-logo-container">
          <Link to="/women">
            <img src="/images/logo/logo-mobile.png" alt="" />
          </Link>
        </div>
        <div className="cart-button-container">
          <div className="cart-text">
            <Link to="/cart">
              {
                cartLength === 0 ? 'Cart' : `Cart(${cartLength})`
              }
            </Link>
          </div>
          <CartSVG />
        </div>
      </div>
    );
  }

export default NavTop;
