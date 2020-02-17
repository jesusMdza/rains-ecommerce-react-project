import React from 'react';

const Description = (props) => {
  
  const {
    description
  } = props;

  return(
    <div className="product-description">
      <div className="description-section">
        <span>Description</span>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Description;