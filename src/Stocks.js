import React from 'react';

import './Stocks.css';

export default function Stocks({ stocks }) {
  return (
    <div className="stocks">
      {stocks.map(stock => <Stock {...stock} key={stock.code}/>)}
    </div>
  )
}

function Stock({ code, price, priceopen, closeyest, currency }) {
  const diff = price - closeyest;
  const percentage = ((diff / closeyest) * 100).toFixed(2);

  return (
    <div className="stock">
      <h3>{code}</h3>
      <div className="price">{toMoneyFormat(price, currency)}</div>
      <Percentage value={percentage} />
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
