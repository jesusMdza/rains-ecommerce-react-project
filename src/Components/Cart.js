import React from 'react';

import CartProductRow from './CartProductRow';

class Cart extends React.Component {

  state = {
    cartProductRows: [],
    allPrices: [],
    total: 0
  }

  data;
  collected = [];

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

  collectPrices = (price, index) => {
    this.collected.push(price);
    this.setState({
      allPrices: this.collected
    });
  }

  updatePrices = (price, index) => {
    this.collected[index] = price;
    this.setState({
      allPrices: this.collected
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
        <CartProductRow
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
      );
      this.setState({cartProductRows: [mappedCartProducts]}); 
    }
  }

  render() {
    return (
      <div className="cart-container">
        <h1 className="cart-heading">Shopping Cart</h1>
          {
            this.data ?
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

            {this.state.cartProductRows}

            <div className="subtotal row-no-border">
              <h3>Subtotal: {this.state.total} USD</h3>
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
          "YOUR CART IS EMPTY"
        }
      </div>
    );
  }

  }

export default Cart;