import React from 'react';
import Element from './Element';
import { Pokemon } from './PokeList';
type Props = {
  pokemon: Pokemon;
};

const PokeCard = ({ pokemon }: Props) => {
  return (
    <div className='pokemon'>
      <img
        src={pokemon.sprites.front_default}
        alt='pokemon'
        className='pokemon__icon'
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
