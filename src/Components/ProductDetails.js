import React from 'react';
import { Consumer } from './Context'

import Swatch from './Swatch';
import SizeBox from './SizeBox';
import Image from './Image';
import Slider from './Slider';

class ProductDetails extends React.Component {

  state = {
    name: "",
    price: "",
    description: "",
    swatchData: [],
    imageUrls: [],
    images: [],
    sizeBoxes: [],
    inStockObj: {},
    productDetailsRendered: false,
    slider: false,
    currentImageIndex: 0,
    idParam: this.props.context.match.params.id,
    colorTagParam: this.props.context.match.params.color,
    sizeParam: this.props.context.match.params.size,
    productCartObject: {}
  }

  reset = () => {
    this.setState({
      slider: false
    });
  }

  change = () => {
    this.setState({
      slider: true
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

  changeCurrentImageIndex = (index) => {
    this.setState((prevState) => {
      return {
        currentImageIndex: prevState.currentImageIndex = index
      }
    })
  }

  saveProductCartObject = () => {
    this.setState({
      productCartObject: {
        id: this.state.idParam,
        name: this.state.name,
        color: this.state.colorTagParam,
        size: this.state.sizeParam,
        price: this.state.price,
        firstImageUrl: this.state.imageUrls[0]
      }
    });
  }

  setImageUrls = (id, inStockData) => {
    for (let i = 0; i < inStockData.length; i++) {
      this.setState({
        imageUrls: inStockData[id].imageUrls,
      });
    }
  }

  getColorTag = (tag) => {
    this.setState({colorTagParam: tag});
  }

  reverseBoolean = () => {
    this.setState({productDetailsRendered: true});
  }

  updateUrl(color) {
    this.setState(prevState => {
      return {
        colorTagParam: prevState.colorTagParam = color
      }
    }, () => {
      if (this.props.womData) {
        this.props.context.history.push(`/women/product/${this.state.idParam}/${this.state.colorTagParam}/${this.state.sizeParam}`);
      } 
      
      if (this.props.menData) {
        this.props.context.history.push(`/men/product/${this.state.idParam}/${this.state.colorTagParam}/${this.state.sizeParam}`);
      }
      this.refreshPage();
    });
  }

  updateSizeParam(tag) {
    this.setState(prevState => {
      return {
        sizeParam: prevState.sizeParam = tag
      }
    }, () => {
      if (this.props.womData) {
        this.props.context.history.push(`/women/product/${this.state.idParam}/${this.state.colorTagParam}/${this.state.sizeParam}`);
      } else {
        this.props.context.history.push(`/men/product/${this.state.idParam}/${this.state.colorTagParam}/${this.state.sizeParam}`);
      }
      this.refreshPage();
    });
  }

  mapSizes = () => {
    const sizesObject = this.state.inStockObj.sizes;
    this.setState({sizeBoxes: sizesObject.map((obj, index) => 
        <SizeBox
          key={index}
          id={index}
          size={obj.size}
          tag={obj.tag}
          inventory={obj.inventory}
          sizeParam={this.state.sizeParam}
          updateSizeParam={this.updateSizeParam.bind(this)}
          returnRef={this.returnRef}
        /> 
      )
    });
  }

  mapImages = () => {
    const imageUrls = this.state.imageUrls;
    this.setState({images: imageUrls.map((url, index) => 
        <Image
          key={index}
          id={index}
          url={url}
          changeCurrentImageIndex={this.changeCurrentImageIndex}
        />
      )
    });
  }

  clear = (e) => {
    let children;
    if (e.target.className === 'size-gallery') {
      children = e.target.children;
    } else {
      const sizeGalleryDiv = e.target.parentNode;
      children = sizeGalleryDiv.children;
    }
    [...children].forEach(div => 
      div.classList.remove('selected'));
  }

  // applies "clear" function and styles a selected size box only if sizes are available
  makeActive = (e) => {
    if (e.target.className === 'size-container available') {
      this.clear(e);
      e.target.classList.add('selected');
    } 
  }

  refreshPage = () => {
    window.location.reload(false);
  }

  // displays a product from data array if "id" and "color" params match when component mounts
  componentDidMount() {
    const paramID = this.props.context.match.params.id;
    const paramColor = this.props.context.match.params.color;
    const data = this.props.womData || this.props.menData;
    data.forEach(object => 
      {
        if (paramID === object.product.id) {
          this.setState(prevState => {
            return {
              name: prevState.name = object.product["product-name"],
              price: prevState.price = object.product.price,
              description: prevState.description = object.product.description,
              swatchData: object.product["in-stock"].map((inStockObj, index) => 
                <Swatch
                  id={inStockObj.colorID}
                  key={index}
                  indx={index}
                  rgb={inStockObj.rgb}
                  swatchUrl={inStockObj.swatchUrl}
                  colorTag={inStockObj.colorTag}
                  inStockData={object.product["in-stock"]}
                  setImageUrls={this.setImageUrls}
                  getColorTag={this.getColorTag}
                  productDetailsRendered={this.state.productDetailsRendered}
                  updateUrl={this.updateUrl.bind(this)}
                />
              ),
            }
          });
          object.product["in-stock"].forEach(inStockObj => 
            {
              if (paramColor === inStockObj.colorTag) {
                this.setState( prevState => {
                  return {
                    imageUrls: prevState.imageUrls = inStockObj.imageUrls
                  }
                });
              }
            });
        }
      }
    );
  }

  componentDidUpdate() {
    const paramID = this.props.context.match.params.id;
    const paramColor = this.props.context.match.params.color;
    const data = this.props.womData || this.props.menData;
    data.forEach(object => 
      {
        if (paramID === object.product.id) {
          object.product["in-stock"].forEach(inStockObj => 
            {
              if (paramColor === inStockObj.colorTag) {
                if (this.state.inStockObj.colorTag !== inStockObj.colorTag) {
                  this.setState({inStockObj: inStockObj}, 
                    () => {
                      this.mapSizes();
                      this.mapImages();
                      this.saveProductCartObject();
                    });
                }
              }
            });
        }
      }
    );
  }

  render() {
    return (
      <Consumer>
        { 
          ({addToCart}) =>
          <div className="product-details-container">
            <div className="side-1">
              <div className="image-block" onMouseEnter={this.change} onMouseLeave={this.reset}> 
                {this.state.slider ? <Slider next={this.next} previous={this.previous} /> : null}
                <img src={this.state.imageUrls[this.state.currentImageIndex]} className="image" alt="" />
              </div>
              <div className="image-gallery">
                {this.state.images}
              </div>
            </div>
            <div className="side-2">
              <div className="product-name-price">
                <h3>{this.state.name}</h3>
                <h3>{this.state.price} USD</h3>
              </div>
              <div className="color-container-big">
                {this.state.swatchData}
              </div>
              <div className="size-gallery" onClick={(e) => this.makeActive(e)}>
                {this.state.sizeBoxes}
              </div>
              <a href="/cart">
                <div className="cart-button" onClick={() => addToCart(this.state.productCartObject)}>
                  <span>
                    Add To Cart
                  </span>
                </div>
              </a>
              <div className="product-description">
                <div className="description-section">
                  <span>Description</span>
                </div>
                <div>
                  <p>{this.state.description}</p>
                </div>
              </div>
            </div>
          </div>
        }
      </Consumer>
    );
  }
}

export default ProductDetails;