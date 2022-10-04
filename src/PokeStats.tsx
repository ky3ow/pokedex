import React from 'react';
import { Pokemon } from './PokeList';

const PokeStats = ({ selected }: { selected: Pokemon | undefined }) => {
  if (!selected) return null;
  const id = `${selected.id}`.padStart(3, '0');
  const showStats: Record<string, number> = {};
  selected.stats.forEach((stat) => {
    const statName = stat.stat.name.replace('special-', 'SP ');
    const statValue = stat.base_stat;
    showStats[statName] = statValue;
  });
  showStats['Weight'] = selected.weight;
  showStats['Total moves'] = selected.moves.length;

  return (
    <div className='pokestats'>
      <img
        src={selected.sprites.front_default}
        alt='pokestats'
        className='pokemon__sprite'
      />
      <h2 className='pokestats__name'>{`${selected.name} #${id}`}</h2>
      <table className='pokestats__table'>
        <tbody>
          <tr className='pokestats__row'>
            <td className='pokestats__key'>type</td>
            <td className='pokestats__value'>
              <p>
                {selected.types.reduce((acc, type) => {
                  const typeName = type.type.name;
                  if (acc === '') return `${typeName}`;
                  return `${acc}, ${typeName}`;
                }, '')}
              </p>
            </td>
          </tr>
          {Object.entries(showStats).map(([key, value]) => {
            return (
              <tr className='pokestats__row' key={key}>
                <td className='pokestats__key'>{key}</td>
                <td className='pokestats__value'>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PokeStats;
