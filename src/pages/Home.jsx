// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/Home.css'; 

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
    <div className="home-container">
      <h1 className="home-title">Pokédex App</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => navigate(`/pokemon/${pokemon.name}`, { state: { currentPage } })}
            style={{
              backgroundColor: pokeColorMap[pokemon.color] || '#EEE',
              color: pokemon.color === 'black' ? 'white' : 'black',
            }}
          >
            <p># {pokemon.id}</p>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <h2>{pokemon.name}</h2>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <button
          onClick={goToPrev}
          disabled={offset === 0}
          className={`pagination-button ${offset === 0 ? 'disabled' : ''}`}
        >
          Previous
        </button>

        <span className="current-page">
          Page {currentPage}
        </span>

        <button
          onClick={goToNext}
          disabled={offset + limit >= totalCount}
          className={`pagination-button ${offset + limit >= totalCount ? 'disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
