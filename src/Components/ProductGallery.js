import React, {Component} from 'react';

import Product from './Product';

class ProductGallery extends Component {

  state = {
    data: [],
    products: [],
    typeOfData: ""
  }

  componentDidMount() {
    if (this.props.womData) {
      this.setState(prevState => {
        return {
          data: prevState.data = this.props.womData,
          typeOfData: 'women'
        }
      }, () => {
        this.mapProductData(this.state.data);
      });
    } else if (this.props.menData) {
      this.setState(prevState => {
        return {
          data: prevState.data = this.props.menData,
          typeOfData: 'men'
        }
      }, () => {
        this.mapProductData(this.state.data);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.womData !== this.props.womData || prevProps.menData !== this.props.menData) {
      if (this.props.womData) {
        this.setState(prevState => {
          return {
            data: prevState.data = this.props.womData,
            typeOfData: 'women'
          }
        }, () => {
          this.mapProductData(this.state.data);
        });
      } else if (this.props.menData) {
        this.setState(prevState => {
          return {
            data: prevState.data = this.props.menData,
            typeOfData: 'men'
          }
        }, () => {
          this.mapProductData(this.state.data);
        });
      }
    }
  }

  mapProductData = (data) => {
    this.setState(prevState => {
      return {
        products: prevState.products = data.map((object, index) => 
          <Product
            productName={object.product["product-name"]}
            id={object.product.id}
            key={index}
            price={object.product.price}
            description={object.product.description}
            inStockData={object.product["in-stock"]}
            colorTag={object.product.colorTag}
            context={this.props.context}
            defaultColorTag={object.product["default-color-tag"]}
            typeOfData={this.state.typeOfData}
          />
        )
      }
    });
  }

  render() {
    if (this.props.womData) {
      return (
        <div className="gallery-container">
          <h1 className="gallery-heading">Women's Rainwear</h1>
          <h2 className="sub-heading">Rains offers a broad selection of rainy-day essentials for both men and women. Explore the full range of contemporary rain gear for women and men.</h2>
          <div className="gallery-grid">
            {this.state.products}
          </div>
        </div>
      );
    } else {
      return (
        <div className="gallery-container">
          <h1 className="gallery-heading">Men's Rainwear</h1>
          <h2 className="sub-heading">Rains offers a broad selection of rainy-day essentials for both men and women. Explore the full range of contemporary rain gear for women and men.</h2>
          <div className="gallery-grid">
            {this.state.products}
          </div>
        </div>
      );
    }
  }
}

export default ProductGallery;