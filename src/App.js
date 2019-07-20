import React from 'react';
import { Container } from 'semantic-ui-react';

import useStocks from './useStocks';
import Stocks from './Stocks';


function App() {
  const [stocks, setStocks] = React.useState();

  useStocks(setStocks);

  return (
    <Container>
      <header className="App-header">
        { stocks && <Stocks stocks={stocks} /> }
      </header>
    </Container>
  );
}

export default App;
