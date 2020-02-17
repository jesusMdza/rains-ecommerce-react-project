import React from 'react';
import {Link} from 'react-router-dom';

import NavTop from './NavTop';

class NavTopContainer extends React.Component {

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
      <NavTop 
        cartLength={this.state.cartLength}
        toggleMenu={toggleMenu}
      />
    );
  }
}

export default NavTopContainer;
