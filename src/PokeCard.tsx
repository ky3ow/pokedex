import React from 'react';
import Element from './Element';
import { Pokemon } from './PokeList';
import type { SelectProps } from './PokeList';
type Props = {
  pokemon: Pokemon;
} & SelectProps;

const PokeCard = ({ pokemon, select }: Props) => {
  return (
    <div className='pokemon' onClick={() => select(pokemon)}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className='pokemon__sprite'
      />
      <h4 className='pokemon__name'>{pokemon.name}</h4>
      <div className='pokemon__elements'>
        {pokemon.types.map((element, idx) => {
          return <Element key={idx} name={element.type.name} />;
        })}
      </div>
    </div>
  );
};

export default PokeCard;
