import React from 'react';
import { Container } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react'
import { Menu } from 'semantic-ui-react';

import useStocks from './useStocks';
import Stocks from './Stocks';


function App() {
  const [stocks, setStocks] = React.useState();

  useStocks(setStocks);

  return (
    <React.Fragment>
      <Menu inverted fixed="top" as="nav">
        <Container>
          <Menu.Item active>Carteira</Menu.Item>
        </Container>
      </Menu>
      <Container style={{ marginTop: '4em'  }}>
        { stocks && <Stocks stocks={stocks} /> }
      </Container>
    </React.Fragment>
  );
}

export default App;
