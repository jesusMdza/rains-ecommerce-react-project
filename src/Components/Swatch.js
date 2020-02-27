import React from 'react';

class Swatch extends React.Component {

  state = {
    defaultSwatchSelectedRef: {},
    swatchTag: "hidden"
  }

  showSwatchTag = () => {
    this.setState({swatchTag: "visible"});
  }

  hideSwatchTag = () => {
    this.setState({swatchTag: "hidden"});
  }

  ref = React.createRef();

  componentDidMount() {
    if (this.props.colorTag === this.props.defaultColorTag && this.state.defaultSwatchSelectedRef !== null) {
      this.setState({
        defaultSwatchSelectedRef: this.ref.current
      }, () => {
        this.props.mouseOverOutSwatch(this.state.defaultSwatchSelectedRef);
      });
    }

    if (this.ref !== null && this.props.productDetailsRendered === undefined) {
      if (this.props.indx === 0) {
        this.props.getFirstSwatchRef(this.ref.current);
      } else if (this.props.indx === this.props.inStockData.length-1) {
        this.props.getLastSwatchRef(this.ref.current);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.colorTag === this.props.defaultColorTag) {
        this.setState({
          defaultSwatchSelectedRef: this.ref.current
        }, () => {
          this.props.mouseOverOutSwatch(this.state.defaultSwatchSelectedRef);
        });
      }
  
      if (this.ref !== null) {
        if (this.props.indx === 0) {
          this.props.getFirstSwatchRef(this.ref.current);
        } else if (this.props.indx === this.props.inStockData.length-1) {
          this.props.getLastSwatchRef(this.ref.current);
        }
      }
    }
  }
  
  render() {

    // incoming properties
    const {
      id,
      rgb,
      swatchUrl,
      colorTag,
      inStockData,
      getImageUrls,
      getColorTag,
      productDetailsRendered
    } = this.props

    const selectImageUrls = () => {
      for (let i = 0; i < inStockData.length; i++) {
        if (id === inStockData[i].colorID) {
          getImageUrls(inStockData[i]);
          getColorTag(colorTag);
        }
      }
      if (this.props.updateUrl) {
        this.props.updateUrl(colorTag);
      }
    }
  
    // Small swatch 
    if (productDetailsRendered === undefined) {
      return (
        <div className="swatch-container">
          <div  
            className="color-box" 
            style={{backgroundColor: rgb}} 
            ref={this.ref}
            onMouseOver={() => {
                this.showSwatchTag() 
                selectImageUrls()
                this.props.getCurrentSwatchRef(this.ref.current)
                this.props.getCurrentSwatchIndex(this.props.indx)
              }
            }
            onMouseOut={() => {this.hideSwatchTag()}}
          > 
            {swatchUrl ? <img src={swatchUrl} alt="" /> : null}
          </div>

          <div className="tag-container" style={{visibility: this.state.swatchTag}}>
            {colorTag}
          </div>
        </div>
      );
    } 

    // Big swatch
    else {
      return (
        <div className="swatch-container">
          <div 
            className="color-box-big" 
            style={{backgroundColor: rgb}}
            onClick={selectImageUrls} 
            onMouseOver={this.showSwatchTag} 
            onMouseOut={this.hideSwatchTag} 
          >
            {swatchUrl ? <img src={swatchUrl} onClick={() => this.changeUrl} alt="" /> : null}
          </div>

          <div className="tag-container" style={{visibility: this.state.swatchTag}}>
            {colorTag}
          </div>
        </div>
      );
    }
  }
}

export default Swatch;