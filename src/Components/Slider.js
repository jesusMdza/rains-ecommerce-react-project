import React from 'react';

const Slider = ({next, previous, changeToIndexZero, changeToIndexTwo}) => {

  // will only click the Slider and not the product image
  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  return (
    <div className="slider" onClick={(e) => handleClick(e)}>
      <div className="left-arrow" onClick={() => previous()} onMouseEnter={changeToIndexZero} onMouseLeave={changeToIndexTwo}><img src="/images/arrows/arrow-left.png" alt="" /></div>
      <div className="right-arrow" onClick={() => next()} onMouseEnter={changeToIndexZero} onMouseLeave={changeToIndexTwo}><img src="/images/arrows/arrow-right.png" alt="" /></div>
    </div>
  );
}

export default Slider;