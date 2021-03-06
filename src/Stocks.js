import React from 'react';
import { useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Card } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { Search } from 'semantic-ui-react';
import { debounce } from './fn';

import './Stocks.css';

export default function Stocks({ stocks }) {
  const [sortDirection, setSortDirection] = useState('ascending');
  const [term, setTerm] = useState(null);
  const [tab, setTab] = useState('acao');

  function handleDirectionClick(event) {
    event.preventDefault();
    setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
  }

  const setSearchTerm = debounce(value => {
    setTerm(value);
  }, 200);

  function handleSearchChange(event, data) {
    setSearchTerm(data.value);
  }

  const stocksPrepared = stocks
    .filter(byNonNullPrice)
    .filter(searchFilter.bind(null, term))
    .filter(({ type }) => {
      if (term)
        return true;

      return type === tab;
    })
    .sort(byDirection.bind(null, sortDirection));

  return (
    <Container fluid>
      <Menu attached="top" tabular>
        {!term && <Menu.Item active={tab === 'acao'} onClick={() => setTab('acao')}>Acoes</Menu.Item>}
        {!term && <Menu.Item active={tab === 'fiis'} onClick={() => setTab('fiis')}>FIIS</Menu.Item>}
        <Menu.Item position="right">
          <Search showNoResults={false} onSearchChange={handleSearchChange}/>
        </Menu.Item>
      </Menu>
      <Segment attached="bottom">
        <Menu tabular>
          <Menu.Item header>Sort:</Menu.Item>
          <Menu.Item>
            <Button.Group>
              <Button basic icon onClick={handleDirectionClick}>
                <Icon name={`sort content ${sortDirection}`} />
              </Button>
            </Button.Group>
          </Menu.Item>
        </Menu>
        <Card.Group doubling className="stocks">
            {
              stocksPrepared.length > 0 &&
              stocksPrepared.map(stock => <Stock {...stock} key={stock.code}/>)
            }
            {
              stocksPrepared.length === 0 &&
              <h4>no results</h4>
            }
        </Card.Group>
      </Segment>
    </Container>
  );
}

function searchFilter(term, entry) {
  if (!term)
    return true;

  return entry.code.toLowerCase().startsWith(term.toLowerCase());
}

function byDirection(direction, a, b) {
  if (direction === 'ascending')
    return a.percentageDiff - b.percentageDiff;

  return b.percentageDiff - a.percentageDiff;
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

  if (value.toString() === '0.00')
    return <div className="percentage">0.00</div>

  return (
    <div className={percentageClassName}>
      {value}%
      <span className="direction">{direction}</span>
    </div>
  );
}

function toMoneyFormat(number, currency = 'BRL') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(number);
}

function byNonNullPrice({ price }) {
  return Boolean(price);
}
