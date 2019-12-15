import React from 'react';

const Hamburger = ({toggleMenu}) => {
  return (
    <div className="hamburger" onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span className="s3"></span>
    </div>
  );
}

export default Hamburger;



