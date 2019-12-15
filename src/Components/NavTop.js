import React from 'react';
import {Link} from 'react-router-dom';

import Hamburger from './Hamburger';
import CartSVG from './CartSVG';

class NavTop extends React.Component {

  state = {
    cartLength: 0
  }

  componentDidMount() {
    if (sessionStorage.productsAddedToCart) {
      this.setState(prevState => {
        return {
          cartLength: prevState.cartLength = JSON.parse(sessionStorage.productsAddedToCart).length
        }
      });
    } else {
      this.setState(prevState => {
        return {
          cartLength: prevState.cartLength = 0
        }
      });
    } 
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartLength !== this.state.cartLength) {
      if (sessionStorage.productsAddedToCart) {
        this.setState(prevState => {
          return {
            cartLength: prevState.cartLength = JSON.parse(sessionStorage.productsAddedToCart).length
          }
        });
      } else {
        this.setState(prevState => {
          return {
            cartLength: prevState.cartLength = 0
          }
        });
      }
    } 
  }

  render() {
    const {
      toggleMenu
    } = this.props;

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
                this.state.cartLength === 0 ? 'Cart' : `Cart(${this.state.cartLength})`
              }
            </Link>
          </div>
          <CartSVG />
        </div>
      </div>
    );
  }
}

export default NavTop;
