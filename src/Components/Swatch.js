import React from 'react';

class Swatch extends React.Component {

  state = {
    defaultSwatchSelectedRef: {},
    visibility: "hidden"
  }

  showSwatchTag = () => {
    this.setState({visibility: "visible"});
  }

  hideSwatchTag = () => {
    this.setState({visibility: "hidden"});
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
    const {
      id,
      rgb,
      swatchUrl,
      colorTag,
      inStockData,
      setImageUrls,
      productDetailsRendered
    } = this.props

    const selectImageUrls = () => {
      for (let i = 0; i < inStockData.length; i++) {
        if (id === inStockData[i].colorID) {
          setImageUrls(id, inStockData);
          this.props.getColorTag(colorTag);
        }
      }
      if (this.props.updateUrl) {
        this.props.updateUrl(colorTag);
      }
    }
  
    if (productDetailsRendered === undefined) {
      return (
        <div className="swatch-container" onMouseOver={this.showSwatchTag} onMouseOut={this.hideSwatchTag}>
          {/* onMouseover color-box */}
          <div onMouseOver={() => {selectImageUrls(); this.props.getCurrentSwatchRef(this.ref.current); this.props.getCurrentSwatchIndex(this.props.indx)}} className="color-box" style={{backgroundColor: rgb}} ref={this.ref}> 
            {swatchUrl ? <img src={swatchUrl} alt="" /> : null}
          </div>
          <div className="tag-container" style={{visibility: this.state.visibility}}>
            {colorTag}
          </div>
        </div>
      );
    } else {
      return (
        <div className="swatch-container" onMouseOver={this.showSwatchTag} onMouseOut={this.hideSwatchTag}>
          {/* onClick color-box-big */}
          <div onClick={selectImageUrls} className="color-box-big" style={{backgroundColor: rgb}}>
            {swatchUrl ? <img src={swatchUrl} onClick={() => this.changeUrl} alt="" /> : null}
          </div>
          <div className="tag-container" style={{visibility: this.state.visibility}}>
            {colorTag}
          </div>
        </div>
      );
    }
  }
}

export default Swatch;