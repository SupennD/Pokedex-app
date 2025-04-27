// src/components/Navigation.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../css/Navigation.css';

function Navigation() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={handleHomeClick} className="nav-link">Pokedex</button>
        </li>
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
