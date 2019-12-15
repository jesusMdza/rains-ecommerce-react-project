import React from 'react';
import {Consumer} from './Context';

import InputBox from './InputBox';

class CartProductRow extends React.Component {

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
            <InputBox multiply={this.multiply} index={indx} />
            <div className="product-info total-info">
              <h3>${this.state.total}.00</h3>
            </div>
            <div className="product-info remove">
              <span onClick={() => removeFromCart(indx)}><a href="/cart">X</a></span>
            </div>
          </div>
        }
      </Consumer>
    );
  }
}

export default CartProductRow;