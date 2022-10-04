import React from 'react';
import PokeList from './PokeList';
const App = () => {
  return (
    <>
      <header className='app__header'>
        <h1 className='app__title'>Pokedex</h1>
      </header>
      <div className='flex-wrapper'>
        <main className='app__main flex-wrapper__main'>
          <PokeList />
        </main>
        <aside className='flex-wrapper__aside'>13131</aside>
      </div>
    </>
  );
};

export default App;
