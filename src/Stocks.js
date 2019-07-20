import React from 'react';

import './Stocks.css';

export default function Stocks({ stocks }) {
  return (
    <div className="stocks">
      {stocks.map(stock => <Stock {...stock} key={stock.code}/>)}
    </div>
  )
}

function Stock({ code, percentageDiff, price, priceopen, closeyest, currency }) {
  return (
    <div className="stock">
      <h3>{code}</h3>
      <div className="price">{toMoneyFormat(price, currency)}</div>
      <Percentage value={percentageDiff} />
    </div>
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
