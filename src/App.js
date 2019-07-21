import React from 'react';
import { Dimmer } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react';

import useStocks from './useStocks';
import Stocks from './Stocks';


function App() {
  const [stocks, setStocks] = React.useState();

  useStocks(setStocks);

  if (stocks)
    return <Stocks stocks={stocks} />;

  return (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
}

export default App;
