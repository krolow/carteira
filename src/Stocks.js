import React from 'react';
import { Card } from 'semantic-ui-react';

import './Stocks.css';

export default function Stocks({ stocks }) {
  return (
    <Card.Group className="stocks">
      {stocks.map(stock => <Stock {...stock} key={stock.code}/>)}
    </Card.Group>
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
