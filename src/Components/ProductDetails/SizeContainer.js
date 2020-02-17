import React from 'react';

import SizeBox from './SizeBox';
import makeActive from './actions/makeActive';

class SizeContainer extends React.Component {

  state = {
    sizeGallery: []
  }

  componentDidMount() {
    this.mapSizes(this.props.inStockObject);
  }

  mapSizes = (object) => {
    this.setState({sizeGallery: object.sizes.map((obj, index) => 
        <SizeBox
          key={index}
          id={index}
          size={obj.size}
          tag={obj.tag}
          inventory={obj.inventory}
          sizeParam={this.props.sizeParam}
          updateSizeParam={this.props.updateSizeParam.bind(this)}
        /> 
      )
    });
  }

  render() {
    return (
      <div className="size-gallery" onClick={(e) => makeActive(e)}>
        {this.state.sizeGallery}
      </div>
    );
  }
}

export default SizeContainer;