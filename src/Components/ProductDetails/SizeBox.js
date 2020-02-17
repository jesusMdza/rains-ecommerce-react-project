import React from 'react';

const SizeBox = ({size, inventory, tag, sizeParam, updateSizeParam, returnRef}) => {

  const ref = React.createRef();
  
  if (tag === sizeParam && inventory > 0) {
    return (
      <div onClick={() => updateSizeParam(tag)} className='size-container available selected'>{size}</div>
    );
  } else if (tag === sizeParam && inventory === 0) {
    return (
      <div className='size-container not-available'>{size}</div>
    );
  } else if (inventory === 0) {
    return (
      <div className='size-container not-available'>{size}</div>
    );
  } else if (inventory > 0) {
    return (
      <div ref={ref} onClick={() => updateSizeParam(tag)} className='size-container available'>{size}</div>
    );
  }
}

export default SizeBox;