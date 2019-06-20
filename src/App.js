import React from 'react';

import useStocks from './useStocks';
import Stocks from './Stocks';

import './App.css';

function App() {
  const [stocks, setStocks] = React.useState();

  useStocks(setStocks);

  return (
    <div className="App">
      <header className="App-header">
        { stocks && <Stocks stocks={stocks} /> }
      </header>
    </div>
  );
}

export default App;
