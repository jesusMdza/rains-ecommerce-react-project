import React from 'react';

import {Link} from 'react-router-dom';

const MobileNavMenu = ({closeMenu}) => {
  return (
    <div id="mobile-nav-menu" className="menu-slide">
      <div className="menu-content">
        <ul>
          <Link to="/women" onClick={closeMenu}>
            <li>Women</li>
          </Link>
          <Link to="/men" onClick={closeMenu}>
            <li>Men</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default MobileNavMenu;


