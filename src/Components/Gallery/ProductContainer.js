import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Product from './Product';
import Slider from '../Slider';
import Swatch from '../Swatch';

class ProductContainer extends React.Component {

  state = {
    colorTagParam: "",
    currentImageIndex: 0,
    currentSwatchIndex: 0,
    currentSwatchSelected: {},
    firstSwatch: {},
    lastSwatch: {},
    swatchData: [],
    imageUrls: this.props.inStockData[0].imageUrls,
    slider: false
  }

  componentDidMount() {
    this.mapSwatchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.mapSwatchData();
    }
  }

  mapSwatchData = () => {
    this.setState(prevState => {
      return {
        swatchData: prevState.swatchData = this.props.inStockData.map((inStockObj, index) => 
        <Swatch 
          id={inStockObj.colorID}
          key={index}
          indx={index}
          rgb={inStockObj.rgb}
          swatchUrl={inStockObj.swatchUrl}
          colorTag={inStockObj.colorTag}
          inStockData={this.props.inStockData}
          getImageUrls={this.getImageUrls}
          getColorTag={this.getColorTag}
          parentProductID={this.props.productName}
          defaultColorTag={this.props.defaultColorTag}
          getCurrentSwatchRef={this.getCurrentSwatchRef}
          getCurrentSwatchIndex={this.getCurrentSwatchIndex}
          getFirstSwatchRef={this.getFirstSwatchRef}
          getLastSwatchRef={this.getLastSwatchRef}
          mouseOverOutSwatch={this.mouseOverOutSwatch}
        />
      )
      }
    });
  }

  reset= () => {
    this.setState({
      slider: false, 
      currentImageIndex: 0, 
    });
  }

  change = () => {
    this.setState({
      slider: true,
      currentImageIndex: 2,
    });
  }

  changeToIndexZero = () => {
    this.setState({currentImageIndex: 0});
  }

  changeToIndexTwo = () => {
    this.setState({currentImageIndex: 2});
  }

  next = () => {
    if (this.state.currentSwatchIndex !== this.props.inStockData.length-1) {
      this.setState((prevState) => {
        if (this.state.currentSwatchSelected.className === "swatch-container") {
          return {
            currentSwatchSelected: prevState.currentSwatchSelected = this.state.currentSwatchSelected.nextElementSibling.firstElementChild
          }
        } else if (this.state.currentSwatchSelected.className === "color-box") {
          return {
            currentSwatchSelected: prevState.currentSwatchSelected = this.state.currentSwatchSelected.parentNode.nextElementSibling.firstElementChild
          }
        }
      }, () => {
          this.mouseOverOutSwatch(this.state.currentSwatchSelected);
      });
    } else {
      this.setState({currentSwatchSelected: this.state.firstSwatch}, () => {
        this.mouseOverOutSwatch(this.state.currentSwatchSelected);
      });
    }
  }

  previous = () => {
    if (this.state.currentSwatchIndex !== 0) {
      this.setState((prevState) => {
        if (this.state.currentSwatchSelected.className === "swatch-container") {
          return {
            currentSwatchSelected: prevState.currentSwatchSelected = this.state.currentSwatchSelected.previousElementSibling.firstElementChild
          }
        } else if (this.state.currentSwatchSelected.className === "color-box") {
          return {
            currentSwatchSelected: prevState.currentSwatchSelected = this.state.currentSwatchSelected.parentNode.previousElementSibling.firstElementChild
          }
        }
      }, () => {
          this.mouseOverOutSwatch(this.state.currentSwatchSelected);
      });
    } else {
      this.setState({currentSwatchSelected: this.state.lastSwatch}, () => {
        this.mouseOverOutSwatch(this.state.currentSwatchSelected);
      });
    }
  }

  mouseOverOutSwatch(ref) {
    ReactTestUtils.Simulate.mouseOver(ref);
    ReactTestUtils.Simulate.mouseOut(ref);
  }

  getCurrentSwatchRef = (ref) => {
    this.setState((prevState) => {
      return {
        currentSwatchSelected: prevState.currentSwatchSelected = ref
      }
    });
  }

  getCurrentSwatchIndex = (index) => {
    this.setState((prevState) => {
      return {
        currentSwatchIndex: prevState.currentSwatchIndex = index
      }
    });
  }

  getFirstSwatchRef = (ref) => {
    this.setState({firstSwatch: ref});
  }

  getLastSwatchRef = (ref) => {
    this.setState({lastSwatch: ref});
  }

  getImageUrls = (inStockObject) => {
    this.setState({
      imageUrls: inStockObject.imageUrls,
    });
  }

  getColorTag = (tag) => {
    this.setState({colorTagParam: tag});
  }

  changeUrl = () => {
    const id = this.props.id;
    if (this.props.typeOfData === 'women') {
      this.props.context.history.push(`/women/product/${id}/${this.state.colorTagParam}/xxs-xs`);
    } else if (this.props.typeOfData === 'men'){
      this.props.context.history.push(`/men/product/${id}/${this.state.colorTagParam}/xxs-xs`);
    }
  }
  
  render() {
    const {
      productName,
      price
    } = this.props;

    return (
      <Product 
        change={this.change}
        changeUrl={this.changeUrl}
        currentImageIndex={this.state.currentImageIndex}
        reset={this.reset}
        changeToIndexZero={this.changeToIndexZero}
        changeToIndexTwo={this.changeToIndexTwo}
        next={this.next}
        previous={this.previous}
        imageUrls={this.state.imageUrls}
        productName={productName}
        price={price}
        swatchData={this.state.swatchData}
        slider={this.state.slider}
      />
    );
  }
}

export default ProductContainer;