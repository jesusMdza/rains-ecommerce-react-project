import React from 'react';
import {Consumer} from '../Context';

import CartProductRow from './CartProductRow';

class CartProductRowContainer extends React.Component {

  state = {
    total: this.props.productPrice
  }

  multiply = (quantity) => {
    this.setState({
      total: this.props.productPrice * quantity
    });
  }

  componentDidMount() {
    this.props.collectPrices(this.state.total);
  }

  componentDidUpdate() {
    const indx = this.props.indx
    this.props.updatePrices(this.state.total, indx);
  }

  render() {
    const {
      indx, 
      productName, 
      productColor, 
      productSize, 
      productPrice, 
      productFirstImageUrl
    } = this.props;

    return (
      <Consumer>
        {
          ({removeFromCart}) => 
          <CartProductRow 
            indx={indx}
            multiply={this.multiply}
            productName={productName}
            productColor={productColor}
            productSize={productSize}
            productPrice={productPrice}
            productFirstImageUrl={productFirstImageUrl}
            removeFromCart={removeFromCart}
            total={this.state.total}
          />
        }
      </Consumer>
    );
  }
}

export default CartProductRowContainer;