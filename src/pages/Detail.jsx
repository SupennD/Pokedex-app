// src/pages/Detail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './../css/Detail.css';  

export default function Details() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error('Pokémon not found');
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchPokemon();
  }, [name]);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="detail-container">
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Base experience:</strong> {pokemon.base_experience}</p>

      <button onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}
