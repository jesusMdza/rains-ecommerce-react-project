import React from 'react';

const Image = ({url, id, changeCurrentImageIndex}) => {
  
  return (
    <div className="image-gallery-container">
      <img src={url} className="image" alt="" onClick={() => changeCurrentImageIndex(id)} />
    </div>
  );
}

export default Image;