import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStockAnalysis } from '../../hooks/useStockAnalysis';
import './StockOverview.css';

export const StockOverview = ({ stock }) => {
  const { analysis, loading, error } = useStockAnalysis(stock);
  const [allocationAmount, setAllocationAmount] = useState(0);

  if (loading) return <div className="stock-overview loading">Loading analysis...</div>;
  if (error) return <div className="stock-overview error">Error: {error}</div>;
  if (!analysis) return null;

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'STRONG BUY':
        return '#4caf50';
      case 'BUY':
        return '#8bc34a';
      case 'HOLD':
        return '#ff9800';
      case 'SELL':
        return '#ff6f00';
      case 'STRONG SELL':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getZoneColor = (zone) => {
    switch (zone) {
      case 'OVERBOUGHT':
        return '#ff5252';
      case 'OVERSOLD':
        return '#64b5f6';
      case 'NEUTRAL':
        return '#81c784';
      default:
        return '#9e9e9e';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'UP') return '↑';
    if (trend === 'DOWN') return '↓';
    return '→';
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#4caf50';
    if (score >= 6) return '#8bc34a';
    if (score >= 4) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="stock-overview">
      {/* Header Section */}
      <div className="stock-header">
        <div className="stock-title">
          <h1>{analysis.name}</h1>
          <p className="stock-symbol">{analysis.symbol}</p>
          {analysis.zone && <span className="zone-badge" style={{ backgroundColor: getZoneColor(analysis.zone) }}>
            {analysis.zone}
          </span>}
        </div>
        <div className="stock-price">
          <h2>₹{analysis.currentPrice?.toFixed(2) || 'N/A'}</h2>
          <p className="price-change" style={{ color: analysis.priceTrend === 'DOWN' ? '#f44336' : '#4caf50' }}>
            {getTrendIcon(analysis.priceTrend)} {analysis.priceChange} %
          </p>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="metrics-grid">
        {/* Score Card */}
        <div className="metric-card">
          <label>Score</label>
          <div className="metric-value" style={{ color: getScoreColor(analysis.score) }}>
            {analysis.score}/10
          </div>
          {analysis.score >= 8 && <p className="status">Excellent</p>}
          {analysis.score >= 6 && analysis.score < 8 && <p className="status">Good</p>}
          {analysis.score >= 4 && analysis.score < 6 && <p className="status">Fair</p>}
          {analysis.score < 4 && <p className="status">Poor</p>}
        </div>

        {/* Rating Card */}
        <div className="metric-card">
          <label>Rating</label>
          <div 
            className="metric-value rating"
            style={{ backgroundColor: getRatingColor(analysis.rating), color: '#fff' }}
          >
            {analysis.rating}
          </div>
        </div>

        {/* Risk Meter Card */}
        <div className="metric-card">
          <label>Risk Meter</label>
          <div className="risk-meter">
            <div className="risk-bar-container">
              <div 
                className="risk-bar-fill"
                style={{ 
                  width: `${analysis.riskMeter}%`,
                  backgroundColor: analysis.riskMeter > 70 ? '#f44336' : analysis.riskMeter > 40 ? '#ff9800' : '#4caf50'
                }}
              />
            </div>
            <p className="risk-value">{analysis.riskMeter}/100</p>
          </div>
        </div>

        {/* Exit Price Card */}
        <div className="metric-card">
          <label>Exit Price (Stop Loss)</label>
          <div className="metric-value">
            {analysis.exitPrice ? `₹${analysis.exitPrice}` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="performance-section">
        <h3>Performance Indicators</h3>
        <div className="performance-bars">
          <div className="performance-item">
            <label>ATH Profit (Fundamentals)</label>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min(100, analysis.fundamentalsScore * 10)}%`, backgroundColor: '#4caf50' }}
              />
            </div>
            <span>{analysis.fundamentalsScore.toFixed(1)}/10</span>
          </div>

          <div className="performance-item">
            <label>Outperformance (Momentum)</label>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min(100, analysis.momentumScore * 10)}%`, backgroundColor: '#ff9800' }}
              />
            </div>
            <span>{analysis.momentumScore.toFixed(1)}/10</span>
          </div>

          <div className="performance-item">
            <label>Above Exit Price (Technical)</label>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min(100, analysis.technicalScore * 10)}%`, backgroundColor: '#2196f3' }}
              />
            </div>
            <span>{analysis.technicalScore.toFixed(1)}/10</span>
          </div>
        </div>
      </div>

      {/* Risk Allocation Calculator */}
      <div className="allocation-section">
        <h3>Stock Risk Allocation Calculator</h3>
        <div className="allocation-form">
          <input
            type="number"
            placeholder="Enter allocation amount (₹)"
            value={allocationAmount}
            onChange={(e) => setAllocationAmount(Number(e.target.value))}
            className="allocation-input"
          />
        </div>
        
        {allocationAmount > 0 && (
          <div className="allocation-results">
            <div className="allocation-item">
              <span>Risk per Share:</span>
              <strong>₹{(analysis.riskMeter / 100).toFixed(2)}</strong>
            </div>
            <div className="allocation-item">
              <span>Quantity (Shares):</span>
              <strong>{Math.floor(allocationAmount / (analysis.currentPrice || 1))}</strong>
            </div>
            <div className="allocation-item total">
              <span>Total Allocation Value:</span>
              <strong>₹{(Math.floor(allocationAmount / (analysis.currentPrice || 1)) * (analysis.currentPrice || 1)).toFixed(2)}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Volatility Info */}
      <div className="info-section">
        <div className="info-item">
          <span>Volatility:</span>
          <strong>{analysis.volatility.toFixed(2)}%</strong>
        </div>
        <div className="info-item">
          <span>Average Price (Q1-Q4):</span>
          <strong>₹{analysis.averagePrice.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

StockOverview.propTypes = {
  stock: PropTypes.shape({
    id: PropTypes.number.isRequired,
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    q1: PropTypes.number.isRequired,
    q2: PropTypes.number.isRequired,
    q3: PropTypes.number.isRequired,
    q4: PropTypes.number.isRequired,
    currentPrice: PropTypes.number,
    exitPrice: PropTypes.number,
  }).isRequired,
};
