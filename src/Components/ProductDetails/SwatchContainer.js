import React from 'react';

import Swatch from '../Swatch';

class SwatchContainer extends React.Component {

  state = {
    swatchData: [],
    currentSwatchIndex: 0,
    currentSwatchSelected: {},
    firstSwatch: {},
    lastSwatch: {}
  }

  componentDidMount() {
    this.getSwatchData();
  }

  getSwatchData = () => {
    this.setState({
      swatchData: this.props.productObject["in-stock"].map((inStockObject, index) => 
        <Swatch
          id={inStockObject.colorID}
          key={index}
          indx={index}
          rgb={inStockObject.rgb}
          swatchUrl={inStockObject.swatchUrl}
          colorTag={inStockObject.colorTag}
          inStockData={this.props.productObject["in-stock"]}
          getImageUrls={this.props.getImageUrls}
          getColorTag={this.props.getColorTag}
          productDetailsRendered={this.props.productDetailsRendered}
          getCurrentSwatchRef={this.getCurrentSwatchRef}
          getCurrentSwatchIndex={this.getCurrentSwatchIndex}
          getFirstSwatchRef={this.getFirstSwatchRef}
          getLastSwatchRef={this.getLastSwatchRef}
          updateUrl={this.props.updateUrl.bind(this)}
        />
      )
    });
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

  render() {
    return (
      <div className="color-container-big">
        {this.state.swatchData}
      </div>
    );
  }
}

export default SwatchContainer;