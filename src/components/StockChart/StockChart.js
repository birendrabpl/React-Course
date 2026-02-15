import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './StockChart.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const StockChart = ({ stock }) => {
  if (!stock) {
    return (
      <div className="stock-chart-container">
        <p className="no-selection">Select a stock row to view quarterly performance chart</p>
      </div>
    );
  }

  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: `${stock.symbol} - Quarterly Results`,
        data: [stock.q1, stock.q2, stock.q3, stock.q4],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#1976d2',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#0d47a1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: `${stock.name} (${stock.symbol}) - Quarterly Performance`,
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Stock Price ($)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Quarter',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="stock-chart-container">
      <div className="stock-info">
        <h3>{stock.name}</h3>
        <p><strong>Symbol:</strong> {stock.symbol}</p>
        <p><strong>Price Change:</strong> ${stock.q4 - stock.q1} ({((stock.q4 - stock.q1) / stock.q1 * 100).toFixed(2)}%)</p>
      </div>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

StockChart.propTypes = {
  stock: PropTypes.shape({
    id: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    q1: PropTypes.number.isRequired,
    q2: PropTypes.number.isRequired,
    q3: PropTypes.number.isRequired,
    q4: PropTypes.number.isRequired,
  }),
};
