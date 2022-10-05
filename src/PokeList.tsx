import React, { useEffect, useState } from 'react';
import PokeCard from './PokeCard';
import type { ElementType } from './Element';

export type SelectProps = { select: (pokemon?: Pokemon) => void };
export type Pokemon = {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: ElementType;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name:
        | 'hp'
        | 'attack'
        | 'defence'
        | 'special-attack'
        | 'special-defense'
        | 'speed';
    };
  }[];
  weight: number;
  moves: {}[];
};
const DEFAULT_OFFSET = 12;

type Props = {
  filter?: ElementType | 'no filter';
} & SelectProps;

const usePokemons = (pokemonNumber: number) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [index, setIndex] = useState({ start: 1, end: pokemonNumber });
  const [loading, setLoading] = useState(false);

  const incrementIndex = (loadNumber: number = pokemonNumber) => {
    setIndex({ start: index.end + 1, end: index.end + loadNumber });
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const promises: Promise<Pokemon>[] = [];
      try {
        for (let i = index.start; i <= index.end; i++) {
          const response = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(
            (r) => r.json()
          );
          promises.push(response);
        }
        const fetchedPokemons = await Promise.all(promises);

        setPokemons((pokemons) => {
          if (
            pokemons.length !== 0 &&
            fetchedPokemons.some((pokemon, i) => pokemon.id === pokemons[i].id)
          )
            return pokemons;
          return [...pokemons, ...fetchedPokemons];
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [index.start, index.end, pokemonNumber]);

  return { pokemons, loading, loadMore: incrementIndex };
};

const PokeList = ({ select, filter }: Props) => {
  const { pokemons, loading, loadMore } = usePokemons(DEFAULT_OFFSET);

  const filteredPokemons =
    filter !== undefined && filter !== 'no filter'
      ? pokemons.filter((pokemon) => {
          return pokemon.types.some((t) => t.type.name === filter);
        })
      : pokemons;
  return (
    <div className='pokelist'>
      {filteredPokemons.map((pokemon) => {
        return (
          <PokeCard key={pokemon.name} pokemon={pokemon} select={select} />
        );
      })}
      <button
        className='pokelist__button'
        onClick={() => !loading && loadMore()}
      >
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
};

export default PokeList;
