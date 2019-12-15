import React from 'react';

const CartContext = React.createContext();

export class Provider extends React.Component {

  addToCart = (object) => {
    let productsAddedToCart;
    if (sessionStorage.productsAddedToCart) {
      productsAddedToCart = JSON.parse(sessionStorage.getItem('productsAddedToCart'));
    } else {
      productsAddedToCart = [];
    }
    productsAddedToCart.push(object);
    sessionStorage.setItem('productsAddedToCart', JSON.stringify(productsAddedToCart));
  }

  removeFromCart = (indx) => {
    let array = JSON.parse(sessionStorage.getItem('productsAddedToCart'));
    let filteredArray = array.filter((product, index) => {
      if (index !== indx) {
        return product
      }
    });
    sessionStorage.setItem('productsAddedToCart', JSON.stringify(filteredArray));
    if (JSON.parse(sessionStorage.getItem('productsAddedToCart')).length === 0) {
      sessionStorage.clear();
    }
  }

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    return(
      <CartContext.Provider value={{
        addToCart: this.addToCart,
        removeFromCart: this.removeFromCart,
        addTotal: this.addTotal,
        refreshPage: this.refreshPage
      }}>
        { this.props.children }
      </CartContext.Provider>
    );
  }
}

export const Consumer = CartContext.Consumer;