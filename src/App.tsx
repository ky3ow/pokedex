import React, { useState } from 'react';
import PokeList from './PokeList';
import PokeStats from './PokeStats';
import { Pokemon } from './PokeList';
import { ElementType } from './Element';
import ElementFilter from './ElementFilter';
const App = () => {
  const [selected, setSelected] = useState<Pokemon>();
  const [filter, setFilter] = useState<ElementType | 'no filter'>();
  return (
    <>
      <header className='app__header'>
        <h1 className='app__title'>Pokedex</h1>
        <ElementFilter filter={filter} setter={setFilter} />
      </header>
      <div className='flex-wrapper'>
        <main className='app__main flex-wrapper__main'>
          <PokeList
            select={(pokemon) => {
              setSelected(pokemon);
            }}
            filter={filter}
          />
        </main>
        <aside className='flex-wrapper__aside'>
          <PokeStats selected={selected} />
        </aside>
      </div>
    </>
  );
};

export default App;
