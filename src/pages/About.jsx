// src/pages/About.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '1rem', textAlign: 'center' }}>
      <h1>About This Pokédex</h1>
      <p>
        Welcome to the Pokédex! This is a simple app built with React and powered by the PokéAPI. 
        Browse through your favorite Pokémon, explore their details, and learn more about their unique characteristics.
      </p>
      <p>
        Whether you're a Pokémon Trainer or just starting your journey, this app provides an easy and fun way to discover all things Pokémon!
      </p>
      
      <p>Enjoy exploring!</p>

        <button 
        onClick={() => navigate('/')} 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#4682B4',
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          fontSize: '1rem', 
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#5A9BD5'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4682B4'} 
      >
        Back to Home
      </button>
    </div>
  );
}
