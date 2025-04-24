// src/pages/Detail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Details() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Added useNavigate hook

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
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem' }}>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: '150px', height: '150px' }}
      />
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Base experience:</strong> {pokemon.base_experience}</p>

     
      <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Back to Pokedox
      </button>
    </div>
  );
}
