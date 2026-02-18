import React, { useState } from 'react';
import { stocks } from '../../data/stocks';
import { StockOverview } from './StockOverview';
import './StockAnalysisPage.css';

export const StockAnalysisPage = () => {
  const [selectedStockId, setSelectedStockId] = useState(stocks[0]?.id);
  const selectedStock = stocks.find(s => s.id === selectedStockId);

  return (
    <div className="stock-analysis-page">
      <div className="page-header">
        <h1>Stock Analysis</h1>
        <p>Comprehensive stock analysis with scores, ratings, and risk assessment</p>
      </div>

      <div className="page-container">
        {/* Stock Selector */}
        <div className="stock-selector">
          <label htmlFor="stock-select">Select Stock:</label>
          <select
            id="stock-select"
            value={selectedStockId}
            onChange={(e) => setSelectedStockId(Number(e.target.value))}
            className="stock-select-input"
          >
            {stocks.map(stock => (
              <option key={stock.id} value={stock.id}>
                {stock.symbol} - {stock.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Overview */}
        {selectedStock && <StockOverview stock={selectedStock} />}
      </div>
    </div>
  );
};
