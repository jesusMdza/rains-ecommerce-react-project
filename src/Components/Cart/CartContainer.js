import React from 'react';

import Cart from './Cart';
import CartProductRowContainer from './CartProductRowContainer';

class CartContainer extends React.Component {

  state = {
    cartProductRowContainers: [],
    allPrices: [],
    total: 0
  }

  data;
  collectedPrices = [];

  componentDidMount() {
    if (sessionStorage.productsAddedToCart) {
      this.data = JSON.parse(sessionStorage.productsAddedToCart);
      this.returnProductRows();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.allPrices !== this.state.allPrices) {
      this.addAllPrices();
    }
  }

  collectPrices = (price) => {
    this.collectedPrices.push(price);
    this.setState({
      allPrices: this.collectedPrices
    });
  }

  updatePrices = (price, index) => {
    this.collectedPrices[index] = price;
    this.setState({
      allPrices: this.collectedPrices
    }, () => {
      this.addAllPrices();
    });
  }

  addAllPrices = () => {
    let sum = this.state.allPrices.reduce((startPrice, nextPrice) => startPrice + nextPrice);
    this.setState(prevState => {
      return {
        total: prevState.total = sum
      }
    });
  }

  returnProductRows = () => {
    if (this.data !== undefined) {
      const mappedCartProducts = this.data.map((product, index) => 
        product !== undefined ? 
          <CartProductRowContainer
            key={index}
            indx={index}
            object={product}
            productName={product.name}
            productColor={product.color}
            productSize={product.size}
            productPrice={product.price}
            productFirstImageUrl={product.firstImageUrl}
            collectPrices={this.collectPrices}
            updatePrices={this.updatePrices}
            addAllPrices={this.addAllPrices}
          />  
          :
          null
      );
      this.setState({cartProductRowContainers: [mappedCartProducts]}); 
    }
  }

  render() {
    return (
      <Cart 
        cartProductRowContainers={this.state.cartProductRowContainers}
        data={this.data}
        total={this.state.total}
      />
    );
  }
}

export default CartContainer;