import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(null);
  const limit = 12;

  const navigate = useNavigate();

  const pokeColorMap = {
    black: '#323232',
    blue: '#6495ED',
    brown: '#A0522D',
    gray: '#A9A9A9',
    green: '#7AC74C',
    pink: '#F7C6D9',
    purple: '#A33EA1',
    red: '#FF6B6B',
    white: '#F5F5F5',
    yellow: '#FFD700',
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        const res = await fetch(url);
        const data = await res.json();

        setTotalCount(data.count);

        const colorCache = {};
        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res1 = await fetch(pokemon.url);
            const pokeData = await res1.json();

            const res2 = await fetch(pokeData.species.url);
            const speciesData = await res2.json();

            const color = speciesData.color.name;
            const baseName = speciesData.evolves_from_species?.name || pokeData.name;

            let finalColor = colorCache[baseName];
            if (!finalColor) {
              finalColor = color;
              colorCache[baseName] = finalColor;
            }
            colorCache[pokeData.name] = finalColor;

            return {
              id: pokeData.id,
              name: pokeData.name,
              image: pokeData.sprites.front_default,
              color: finalColor,
            };
          })
        );

        setPokemonList(detailedData);
      } catch (err) {
        console.error('Failed to fetch Pokémon:', err);
      }
    }

    fetchData();
  }, [offset]);

  const goToNext = () => {
    if (offset + limit < totalCount) {
      setOffset(offset + limit);
    }
  };

  const goToPrev = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div style={{ alignItems: 'center', padding: '1rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>Pokédex</h1>
      <p style={{ fontSize: '2rem', textAlign: 'center' }}>Check out the Pokémon</p>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/about">
          <button
            style={{
              padding: '10px 20px',
              fontSize: '1.2rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            About This Pokedex
          </button>
        </Link>
      </div>

      <div
        className="pokemon-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          justifyContent: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            style={{
              backgroundColor: pokeColorMap[pokemon.color] || '#EEE',
              color: pokemon.color === 'black' ? 'white' : 'black',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '180px',
              width: '220px',
              justifyContent: 'center',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
          >
            <p># {pokemon.id}</p>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-image"
              style={{ width: '80px', height: '80px', objectFit: 'contain' }}
            />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={goToPrev}
          disabled={offset === 0}
          style={{
            marginRight: '1rem',
            padding: '10px 20px',
            fontSize: '1.2rem',
            backgroundColor: offset === 0 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: offset === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Previous
        </button>

        <span style={{ fontSize: '1.2rem', margin: '0 1rem' }}>
          Page {currentPage}
        </span>

        <button
          onClick={goToNext}
          disabled={offset + limit >= totalCount}
          style={{
            marginLeft: '1rem',
            padding: '10px 20px',
            fontSize: '1.2rem',
            backgroundColor: offset + limit >= totalCount ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: offset + limit >= totalCount ? 'not-allowed' : 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
