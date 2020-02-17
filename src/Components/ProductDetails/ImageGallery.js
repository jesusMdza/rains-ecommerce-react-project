import React from 'react';

import Image from '../Image';

class ImageGallery extends React.Component {

  state = {
    images: []
  }

  componentDidMount() {
    this.props.data.forEach(object => 
      {
        if (this.props.idParam === object.product.id) {
          object.product["in-stock"].forEach(inStockObject => 
            {
              if (this.props.colorTagParam === inStockObject.colorTag) {
                this.props.getImageUrls(inStockObject);
                this.mapImages(inStockObject);
              }
            });
        }
      }
    );
  }

  mapImages = (object) => {
    this.setState({images: object.imageUrls.map((url, index) => 
        <Image
          key={index}
          id={index}
          url={url}
          changeCurrentImageIndex={this.props.changeCurrentImageIndex}
        />
      )
    });
  }

  render() {
    return (
      <div className="image-gallery">
        {this.state.images}
      </div>
    );
  }
}

export default ImageGallery;