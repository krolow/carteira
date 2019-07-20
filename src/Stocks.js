import React from 'react';
import { Container } from 'semantic-ui-react';
import { Card } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';

import './Stocks.css';

export default function Stocks({ stocks }) {
  return (
    <Container>
      <Menu attached="top" tabular>
        <Menu.Item active>Acoes</Menu.Item>
        <Menu.Item>FIIS</Menu.Item>
      </Menu>
      <Segment attached="bottom">
        <Card.Group className="stocks">
          {stocks.map(stock => <Stock {...stock} key={stock.code}/>)}
        </Card.Group>
      </Segment>
    </Container>
  );
}

function Stock({ code, percentageDiff, price, priceopen, closeyest, currency }) {
  return (
    <Card className="stock" centered>
      <Card.Content textAlign="center">
        <Card.Header>{code}</Card.Header>
        <Card.Description>
          <div className="price">{toMoneyFormat(price, currency)}</div>
          <Percentage value={percentageDiff} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

function Percentage({ value }) {
  const directionName = value > 0 ? 'up' : 'down';
  const percentageClassName = `percentage ${directionName}`;
  const direction = directionName === 'down' ? '▼' : '▲';

  return (
    <div className={percentageClassName}>
      {value}%<span className="direction">{direction}</span>
    </div>
  );
}

function toMoneyFormat(number, currency = 'BRL') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(number);
}
