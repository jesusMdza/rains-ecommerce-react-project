import React from 'react';
import {Link} from 'react-router-dom';

const NavSide = () => {
  return (
    <div className="side-nav">
      <Link to="/"><img src="/images/logo/logo-mobile.png" alt="" /></Link>
      <ul>
        <li><Link to="/women">Women</Link></li>
        <li><Link to="/men">Men</Link></li>
      </ul>
    </div>
  );
}

export default NavSide;