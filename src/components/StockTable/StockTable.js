import React from 'react';
import PropTypes from 'prop-types';
import './StockTable.css';

export const StockTable = ({ stocks }) => {
  return (
    <div className="stock-table-container">
      <h2>Stock Performance</h2>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.id}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>${stock.q1}</td>
              <td>${stock.q2}</td>
              <td>${stock.q3}</td>
              <td>${stock.q4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

StockTable.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      q1: PropTypes.number.isRequired,
      q2: PropTypes.number.isRequired,
      q3: PropTypes.number.isRequired,
      q4: PropTypes.number.isRequired,
    })
  ).isRequired,
};
