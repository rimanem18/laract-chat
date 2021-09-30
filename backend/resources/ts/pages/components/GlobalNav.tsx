import React from 'react';
import { Link } from 'react-router-dom';

const GlobalNav = () => {
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>Top</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/auth">
          <li>Auth</li>
        </Link>
      </ul>
    </nav>
  )
}

export default GlobalNav;