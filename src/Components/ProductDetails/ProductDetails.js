import React from 'react';
import { Consumer } from '../Context';

import NamePriceContainer from './NamePriceContainer';
import DescriptionContainer from './DescriptionContainer';
import CartButton from './CartButton';
import MainImage from './MainImage';
import SizeContainer from './SizeContainer';
import ImageGallery from './ImageGallery';
import SwatchContainer from './SwatchContainer';

class ProductDetails extends React.Component {

  state = {
    slider: false,
    currentImageIndex: 0,
    productDetailsRendered: false,
    productObject: {},
    productCartObject: {},
    inStockObject: {},
    imageUrls: [],
    context: this.props.context,
    idParam: this.props.context.match.params.id,
    colorTagParam: this.props.context.match.params.color,
    sizeParam: this.props.context.match.params.size,
  }

  hideSlider = () => {
    this.setState({
      slider: false
    });
  }

  showSlider = () => {
    this.setState({
      slider: true
    });
  }

  getProductObject = (object) => {
    this.setState({productObject: object});
  }

  getProductCartObject = () => {
    this.setState({
      productCartObject: {
        name: this.state.productObject["product-name"],
        color: this.props.context.match.params.color,
        size: this.props.context.match.params.size,
        price: this.state.productObject.price,
        firstImageUrl: this.state.inStockObject.imageUrls[0]
      }
    }, () => {      console.log(this.state.productCartObject)});
  }

  getInStockObject = (object) => {
    this.setState({inStockObject: object});
  }

  getImageUrls = (object) => {
    this.setState({imageUrls: object.imageUrls});
  }

  getColorTag = (tag) => {
    this.setState({colorTagParam: tag});
  }

  changeCurrentImageIndex = (index) => {
    this.setState({currentImageIndex: index});
  }

  updateSizeParam = (tag) => {
    this.setState({
        sizeParam: tag
    }, () => {
      if (this.props.womData) {
        this.props.context.history.push(`/women/product/${this.state.idParam}/${this.state.colorTagParam}/${this.state.sizeParam}`);
      } 
      
      if (this.props.menData) {
        this.props.context.history.push(`/men/product/${this.state.idParam}/${this.state.colorTagParam}/${this.state.sizeParam}`);
      }
      this.props.refreshPage();
    });
  }

  updateUrl = (color) => {
    this.setState({
        colorTagParam: color
    }, () => {
      if (this.props.womData) {
        this.props.context.history.push(`/women/product/${this.state.idParam}/${this.state.colorTagParam}/${this.state.sizeParam}`);
      } 
      
      if (this.props.menData) {
        this.props.context.history.push(`/men/product/${this.state.idParam}/${this.state.colorTagParam}/${this.state.sizeParam}`);
      }
      this.props.refreshPage();
    });
  }

  next = () => {
    const lastIndex = this.state.imageUrls.length - 1;
    if (this.state.currentImageIndex === lastIndex) {
      this.setState({
        currentImageIndex: 0
      });
    } else {
      this.setState({
        currentImageIndex: this.state.currentImageIndex + 1
      });
    }
  }

  previous = () => {
    const lastIndex = this.state.imageUrls.length - 1;
    if (this.state.currentImageIndex === 0) {
      this.setState({
        currentImageIndex: lastIndex
      });
    } else {
      this.setState({
        currentImageIndex: this.state.currentImageIndex - 1
      });
    }
  }

  // displays a product from data array if "id" and "color" params match when component mounts
  componentDidMount() {
    const paramID = this.props.context.match.params.id;
    const paramColor = this.props.context.match.params.color;
    const data = this.props.womData || this.props.menData;
    this.setState({productDetailsRendered: true});
    data.forEach(object => 
      {
        if (paramID === object.product.id) {
          this.getProductObject(object.product);
          object.product["in-stock"].forEach(inStockObject => 
            {
              if (paramColor === inStockObject.colorTag) {
                this.getInStockObject(inStockObject);
              }
            });
        }
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.productObject !== this.state.productObject) {
      this.getProductCartObject();
    }
  }
  
  render() {
    if (this.state.inStockObject.colorTag) {
      return (
        <Consumer>
          { 
            ({addToCart, refreshPage}) =>
            <div className="product-details-container">
              <div className="side-1">
                <MainImage 
                  inStockObject={this.state.inStockObject}
                  currentImageIndex={this.state.currentImageIndex}
                  slider={this.state.slider}
                  showSlider={this.showSlider}
                  hideSlider={this.hideSlider}
                  next={this.next}
                  previous={this.previous}
                />
                <ImageGallery 
                  data={this.props.womData || this.props.menData} 
                  idParam={this.state.idParam} 
                  colorTagParam={this.state.colorTagParam}
                  getImageUrls={this.getImageUrls}
                  changeCurrentImageIndex={this.changeCurrentImageIndex}
                />
              </div>
              <div className="side-2">
                <NamePriceContainer 
                  data={this.props.womData || this.props.menData} 
                  idParam={this.state.idParam} 
                />
                <SwatchContainer
                  womData={this.props.womData}
                  menData={this.props.menData}
                  productDetailsRendered={this.state.productDetailsRendered} 
                  productObject={this.state.productObject}
                  colorTagParam={this.state.colorTagParam}
                  idParam={this.state.idParam}
                  getImageUrls={this.getImageUrls}
                  getColorTag={this.getColorTag}
                  refreshPage={refreshPage}
                  updateUrl={this.updateUrl}
                />
                <SizeContainer 
                  inStockObject={this.state.inStockObject}
                  sizeParam={this.state.sizeParam}
                  updateSizeParam={this.updateSizeParam}
                />
                <CartButton 
                  productCartObject={this.state.productCartObject} 
                  addToCart={addToCart}
                />
                <DescriptionContainer 
                  data={this.props.womData || this.props.menData} 
                  idParam={this.state.idParam}
                />
              </div>
            </div>
          }
        </Consumer>
      );
    } else {
      return(<h1>loading . . .</h1>);
    }
  }
}

export default ProductDetails;