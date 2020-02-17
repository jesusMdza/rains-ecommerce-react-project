import React from 'react';

const InputBox = ({checkValue, handleInputChange, value}) => {
  return(
    <div className="product-info">
      <input
        onBlur={checkValue}
        maxLength={2} 
        type="text" 
        onChange={(e) => handleInputChange(e)}
        value={value}>
      </input>
    </div>
  );
}

export default InputBox;