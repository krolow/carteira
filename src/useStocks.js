import React from 'react';
import axios from 'axios';
import ms from 'ms';
import csv from 'csvtojson';

import { CSV_URL } from './config.json';

export default function useStocks(setStocks) {
  React.useEffect(() => {
    pollStocks(newStocks => {
      setStocks(newStocks);
    })
  });
}

let interval;
async function pollStocks(callback) {
  if (interval)
    return;

  callback(await getStocks());

  interval = setInterval(async () => {
    callback(await getStocks());
  }, ms('5min'));
}

async function getStocks() {
  const { data } = await axios.get(CSV_URL);
  const parsed   = await parseData(data);
  const stocks   = parsed.map(toStock);

  return stocks;
}

async function parseData(body) {
  const data = await csv().fromString(body);
  return data;
}


function toStock(stock) {
  const mapped = Object.entries(stock)
    .reduce((acc, [ key, value ]) => {
      if (value.match(/^\d+/))
        acc[key] = parseFloat(value.replace(',', '.'));
      else if (value === '#N/A')
        acc[key] = null;
      else
        acc[key] = value;

      return acc;
    }, {});

  const diff = mapped.price - mapped.closeyest;
  const percentageDiff = ((diff / mapped.closeyest) * 100).toFixed(2);

  return {
    ...mapped,
    percentageDiff
  }
}
