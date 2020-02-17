import React from 'react';

import NamePrice from './NamePrice';

class NamePriceContainer extends React.Component {

  state = {
    name: "",
    price: ""
  }

  componentDidMount() {
    this.getNameAndPrice();
  }

  getNameAndPrice = () => {
    const data = this.props.data;
    data.forEach(object => 
      {
        if (this.props.idParam === object.product.id) {
            this.setState({
              name: object.product["product-name"],
              price: object.product.price
          });
        }
      }
    );
  }

  render() {
    return(
      <NamePrice 
        name={this.state.name}
        price={this.state.price}
      />
    );
  }
};

export default NamePriceContainer;