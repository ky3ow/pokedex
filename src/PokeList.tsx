import React, { useEffect, useState } from 'react';
import PokeCard from './PokeCard';
import type { ElementType } from './Element';
export type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: ElementType;
    };
  }[];
};
const DEFAULT_OFFSET = 12;

const PokeList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [index, setIndex] = useState({ start: 1, end: DEFAULT_OFFSET });
  const fetchPokemons = async () => {
    const fetchedPokemons = [];
    for (let i = index.start; i <= index.end; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const pokemon = (await response.json()) as Pokemon;
      console.log(pokemon);
      fetchedPokemons.push(pokemon);
    }
    setIndex({ start: index.end + 1, end: index.end + DEFAULT_OFFSET });
    setPokemons([...pokemons, ...fetchedPokemons]);
  };
  useEffect(() => {
    fetchPokemons();
  }, []);
  return (
    <div className='pokelist'>
      {pokemons.map((pokemon) => {
        return <PokeCard key={pokemon.name} pokemon={pokemon} />;
      })}
      <button className='pokelist__button' onClick={fetchPokemons}>
        Load more
      </button>
    </div>
  );
};

export default PokeList;
