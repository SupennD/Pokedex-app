// src/components/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';  // Import the CSS file

function Navigation() {
  return (
    <nav className="navbar"> {/* Apply the navbar class */}
      <ul>
        <li>
          <Link to="/" className="nav-link">Pokedex</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
