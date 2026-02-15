import React, { useState } from 'react';
import { StockTable } from './StockTable/StockTable';
import { StockChart } from './StockChart/StockChart';
import { stocks } from '../data/stocks';
import './Dashboard.css';

export const DashboardLegacy = () => {
  const [selectedStock, setSelectedStock] = useState(stocks[0]); // Default to first stock

  const handleSelectStock = (stock) => {
    setSelectedStock(stock);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard (Legacy)</h1>
      
      <section className="stocks-section">
        <StockTable stocks={stocks} onSelectStock={handleSelectStock} selectedStock={selectedStock} />
        <StockChart stock={selectedStock} />
      </section>
    </div>
  );
};
